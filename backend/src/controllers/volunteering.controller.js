const { StatusCodes } = require('http-status-codes');
const Volunteering = require('../models/Volunteering');
const VolunteeringSchedule = require('../models/VolunteeringSchedule');


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

    const scheduleCollection = VolunteeringSchedule.collection.name;

    try {
        const opportunities = await Volunteering.aggregate([
            {
                $lookup: {
                    from: scheduleCollection,
                    localField: "_id",
                    foreignField: "volunteeringId",
                    as: "schedules",
                },
            }, {
                $addFields: {
                    schedulesCount: { $size: "$schedules" },
                    slotsAvailableCount: {
                        $sum: "$schedules.slotsAvailable",
                    },
                },
            },
            
            {
                $project: {
                    _id: 1,
                    createdAt: 1,
                    category: 1,
                    description: 1,
                    schedulesCount: 1,
                    slotsAvailableCount: 1,
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
            message: "Volunteering opportunity created successfully",
            data: {
                id: volunteering._id,
            },
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

module.exports = {
    createOpportunity,
    getCategories,
    getOpportunities,
}