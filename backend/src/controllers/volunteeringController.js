const Volunteering = require('../models/Volunteering');
const { StatusCodes } = require('http-status-codes');

const createVolunteeringOpportunity = async (req, res) => {
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

module.exports = createVolunteeringOpportunity;