const { StatusCodes } = require("http-status-codes");
const mongoose = require("mongoose");
const Volunteering = require("../models/Volunteering");
const VolunteeringSchedule = require("../models/VolunteeringSchedule");

const createVolunteeringSchedule = async (req, res) => {
    const { volunteeringId } = req.params; // e.g. POST /volunteering/:volunteeringId/schedules
    const { date, timeFrom, timeTo, slotsAvailable } = req.body;

    // 1) Validate ObjectId format (avoid CastError)
    if (!mongoose.Types.ObjectId.isValid(volunteeringId)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: "Invalid volunteeringId",
        });
    }

    // 2) Make sure parent exists
    const volunteering = await Volunteering.findById(volunteeringId).select("_id");
    if (!volunteering) {
        return res.status(StatusCodes.NOT_FOUND).json({
            error: "Volunteering opportunity not found",
        });
    }

    // 3) Create schedule referencing the parent id
    const schedule = await VolunteeringSchedule.create({
        volunteeringId: volunteering._id, // or just volunteeringId
        date,
        timeFrom,
        timeTo,
        slotsAvailable,
    });

    return res.status(StatusCodes.CREATED).json({
        message: "Schedule created",
        schedule,
    });
};

module.exports = {
    createVolunteeringSchedule,
};
