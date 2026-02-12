const { StatusCodes } = require('http-status-codes');
const Volunteering = require('../models/Volunteering');


const getCategories = async (req, res) => {
    try {
        const categories = Volunteering.schema.path('category').enumValues;
        res.status(StatusCodes.OK).json(categories);
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: error.message || "Unexpected server error while fetching categories."
        });
    }
}

const getOpportunities = async (req, res) => {
    try {
        const opportunities = await Volunteering.aggregate([
            {
                $addFields: {
                    schedulesCount: { $size: "$schedules" },
                    slotsAvailableCount: {
                        $sum: "$schedules.slotsAvailable",
                    },
                    applicants: {
                        $sum: {
                            $map: {
                                input: "$schedules",
                                as: "sch",
                                in: {
                                    $size: "$$sch.applicants",
                                },
                            },
                        },
                    },
                    pendingApplicantsCount: {
                        $sum: {
                            $map: {
                                input: "$schedules",
                                as: "sch",
                                in: {
                                    $size: {
                                        $filter: {
                                            input: "$$sch.applicants",
                                            as: "a",
                                            cond: { $eq: ["$$a.status", "Pending"] },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    approvedApplicantsCount: {
                        $sum: {
                            $map: {
                                input: "$schedules",
                                as: "sch",
                                in: {
                                    $size: {
                                        $filter: {
                                            input: "$$sch.applicants",
                                            as: "a",
                                            cond: { $eq: ["$$a.status", "Approved"] },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            { $sort: { createdAt: -1 } },
        ]);
        return res.status(StatusCodes.OK).json({ opportunities });
    } catch (error) {
        console.error("getOpportunities error:", error);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: "Failed to load opportunities" });
    }
};

const createOpportunity = async (req, res) => {
    try {
        const volunteering = await Volunteering.create(req.body);

        res.status(StatusCodes.CREATED).json({
            data: {
                message: "Volunteering opportunity created successfully",
            }
        });
    } catch (error) {
        console.error(error);
        if (error.name === "ValidationError") {
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: error.message || "Creation failed: Missing or invalid required fields."
            });
        }
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: error.message || "Unexpected server error during creation."
        });
    }
}

const getUserOpportunities = async (req, res) => {
    const userId = String(req.query.userId || "").trim();
    if (!userId) {
        return res.status(400).json({ message: "userId is required in query" });
    }

    const now = new Date();

    const opportunities = await Volunteering.aggregate([
        {
            $addFields: {
                schedules: {
                    $filter: {
                        input: "$schedules",
                        as: "sch",
                        cond: {
                            $and: [
                                { $gt: ["$$sch.timeFrom", now] },
                                {
                                    $not: {
                                        $in: [
                                            userId,
                                            {
                                                $map: {
                                                    input: "$$sch.applicants",
                                                    as: "a",
                                                    in: "$$a.userId",
                                                },
                                            },
                                        ],
                                    },
                                },
                                {
                                    $gte: [
                                        {
                                            $subtract: [
                                                "$$sch.slotsAvailable",
                                                {
                                                    $size: {
                                                        $filter: {
                                                            input: "$$sch.applicants",
                                                            as: "a",
                                                            cond: { $eq: ["$$a.status", "Approved"] }
                                                        }
                                                    }
                                                }
                                            ]
                                        },
                                        1
                                    ]
                                },
                            ],
                        },
                    },
                },
            },
        },

        // Keep only volunteerings that still have at least 1 schedule
        {
            $match: {
                $expr: { $gt: [{ $size: "$schedules" }, 0] },
            },
        },
        { $sort: { "schedules.timeFrom": 1 } },
        {
            $project: {
                category: 1,
                description: 1,
                schedules: 1,
                createdAt: 1,
                updatedAt: 1,
            },
        },
    ]);

    return res.status(200).json({ count: opportunities.length, opportunities });
};

const getUserAppliedOpportunities = async (req, res) => {
    const userId = String(req.query.userId || "").trim();
    if (!userId) {
        return res.status(400).json({ message: "userId is required in query" });
    }

    const now = new Date();

    const opportunities = await Volunteering.aggregate([
        {
            $addFields: {
                schedules: {
                    $map: {
                        input: {
                            $filter: {
                                input: "$schedules",
                                as: "sch",
                                cond: {
                                    $and: [
                                        { $gte: ["$$sch.timeTo", now] },
                                        {
                                            $in: [
                                                userId,
                                                {
                                                    $map: {
                                                        input: "$$sch.applicants",
                                                        as: "a",
                                                        in: "$$a.userId",
                                                    },
                                                },
                                            ],
                                        },
                                    ],
                                },
                            },
                        },
                        as: "sch",
                        in: {
                            $mergeObjects: [
                                "$$sch",
                                {
                                    applicationStatus: {
                                        $let: {
                                            vars: {
                                                matchedApplicant: {
                                                    $first: {
                                                        $filter: {
                                                            input: "$$sch.applicants",
                                                            as: "a",
                                                            cond: { $eq: ["$$a.userId", userId] },
                                                        },
                                                    },
                                                },
                                            },
                                            in: "$$matchedApplicant.status",
                                        },
                                    },
                                },
                            ],
                        },
                    },
                },
            },
        },
        {
            $match: {
                $expr: { $gt: [{ $size: "$schedules" }, 0] },
            },
        },
        { $sort: { "schedules.timeFrom": 1 } },
        {
            $project: {
                category: 1,
                description: 1,
                schedules: 1,
                createdAt: 1,
                updatedAt: 1,
            },
        },
    ]);

    return res.status(200).json({ count: opportunities.length, opportunities });
};

const addApplicantToSchedule = async (req, res) => {
    const { opportunityId, scheduleId, userId } = req.body;
    try {
        const volunteering = await Volunteering.findById(opportunityId);
        if (!volunteering) {
            return res.status(404).json({ message: "Volunteering opportunity not found" });
        }

        const scheduleIndex = volunteering.schedules.findIndex(s => s._id.toString() === scheduleId);
        if (scheduleIndex === -1) {
            return res.status(404).json({ message: "Schedule not found" });
        }

        volunteering.schedules[scheduleIndex].applicants.push({ userId, status: "Pending" });
        await volunteering.save();

        return res.status(200).json({ message: "Applicant added successfully" });
    } catch (error) {
        console.error("addApplicantToSchedule error:", error);
        return res.status(500).json({ message: "Failed to add applicant" });
    }
};

module.exports = {
    createOpportunity,
    getCategories,
    getOpportunities,
    getUserOpportunities,
    getUserAppliedOpportunities,
    addApplicantToSchedule,
}
