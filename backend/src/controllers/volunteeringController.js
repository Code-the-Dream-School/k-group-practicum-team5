const Volunteering = require('../models/Volunteering');
const { StatusCodes } = require('http-status-codes');

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
                    totalAssignees: { $size: { $ifNull: ["$assignees", []] } },
                    totalApplicants: { $size: { $ifNull: ["$applicants", []] } },
                },
            },
            { $project: { assignees: 0, applicants: 0 } },
            { $sort: { date: -1 } },
        ]);
        res.status(StatusCodes.OK).json(opportunities);
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: error.message || "Unexpected server error while fetching opportunities."
        });
    }
}

const createOpportunity = async (req, res) => {
    try {
        await Volunteering.create(req.body);

        res.status(StatusCodes.CREATED).json({
            message: "Volunteering opportunity created successfully",
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