const { StatusCodes } = require('http-status-codes');
const mongoose = require('mongoose');
const Volunteering = require('../models/Volunteering');
const User = require('../models/User');


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

const getOpportunityApplicants = async (req, res) => {
    const { opportunityId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(opportunityId)) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid opportunity id" });
    }

    try {
        const opportunity = await Volunteering.findById(opportunityId).lean();
        if (!opportunity) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Volunteering opportunity not found" });
        }

        const uniqueUserIds = [...new Set(
            opportunity.schedules.flatMap((schedule) =>
                schedule.applicants.map((applicant) => String(applicant.userId)),
            ),
        )];

        const validObjectIds = uniqueUserIds.filter((userId) => mongoose.Types.ObjectId.isValid(userId));
        const users = validObjectIds.length > 0
            ? await User.find({ _id: { $in: validObjectIds } })
                .select('first_name last_name email')
                .lean()
            : [];

        const usersById = new Map(users.map((user) => [String(user._id), user]));

        const schedules = opportunity.schedules.map((schedule) => ({
            ...schedule,
            applicants: schedule.applicants.map((applicant) => ({
                ...applicant,
                user: usersById.get(String(applicant.userId))
                    ? {
                        first_name: usersById.get(String(applicant.userId)).first_name,
                        last_name: usersById.get(String(applicant.userId)).last_name,
                        email: usersById.get(String(applicant.userId)).email,
                    }
                    : null,
            })),
        }));

        return res.status(StatusCodes.OK).json({
            opportunity: {
                _id: String(opportunity._id),
                category: opportunity.category,
                description: opportunity.description,
                schedules,
            },
        });
    } catch (error) {
        console.error("getOpportunityApplicants error:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Failed to load applicants" });
    }
};

const updateApplicantStatus = async (req, res) => {
    const { opportunityId, scheduleId, userId, status } = req.body;
    const allowedStatuses = ["Pending", "Approved", "Rejected"];

    if (!opportunityId || !scheduleId || !userId || !status) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: "opportunityId, scheduleId, userId and status are required" });
    }

    if (!allowedStatuses.includes(status)) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid status value" });
    }

    try {
        const opportunity = await Volunteering.findById(opportunityId);
        if (!opportunity) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Volunteering opportunity not found" });
        }

        const schedule = opportunity.schedules.find((item) => String(item._id) === String(scheduleId));
        if (!schedule) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Schedule not found" });
        }

        const applicant = schedule.applicants.find((item) => String(item.userId) === String(userId));
        if (!applicant) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Applicant not found on selected schedule" });
        }

        applicant.status = status;
        await opportunity.save();

        return res.status(StatusCodes.OK).json({ message: "Applicant status updated successfully" });
    } catch (error) {
        console.error("updateApplicantStatus error:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Failed to update applicant status" });
    }
};

module.exports = {
    createOpportunity,
    getCategories,
    getOpportunities,
    getUserOpportunities,
    getUserAppliedOpportunities,
    addApplicantToSchedule,
    getOpportunityApplicants,
    updateApplicantStatus,
}
