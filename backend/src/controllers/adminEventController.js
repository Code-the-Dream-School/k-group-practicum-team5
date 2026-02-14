const Event = require("../models/Event");
const { normalizeDate } = require("../utils/dateUtils");

const getEvents = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const query = { isActive: true };

        if (startDate || endDate) {
            query.date = {};
            if (startDate) query.date.$gte = normalizeDate(startDate);
            if (endDate) query.date.$lte = normalizeDate(endDate);
        }
        const events = await Event.find(query).sort({ date: 1, startTime: 1 });
        return res.status(200).json(events);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Server error", error: err.message });
    }
};


const createEvent = async (req, res) => {
    try {
        const { title, eventType, description, date, capacity, startTime, endTime } = req.body;
        if (!title || !eventType || !description || !date || capacity === undefined ||
            capacity <= 0 || !startTime || !endTime) {
            return res.status(400).json({ msg: "All fields are required" });
        }
        if (endTime <= startTime) {
            return res.status(400).json({ message: "End time must be after start time" });
        }
        const normalizedDate = normalizeDate(date);
        const today = normalizeDate(new Date());
        if (normalizedDate < today) {
            return res.status(400).json({ msg: "Event date cannot be in the past" });
        }
        const event = await Event.create({ ...req.body, date: normalizedDate });
        return res.status(201).json(event);
    } catch (err) {
        console.error("Error creating event:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
};



const updateEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ msg: "Event not found" });
        }
        // DATE VALIDATION
        if (req.body.date) {

            req.body.date = normalizeDate(req.body.date);

        } else {
            const eventDate = normalizeDate(event.date);
            if (eventDate < today) {
                return res.status(400).json({ msg: "Cannot update past events" });
            }
        }

        const {
            title,
            eventType,
            description,
            capacity,
            startTime,
            endTime
        } = req.body;

        // REQUIRED FIELDS
        if (
            (title !== undefined && !title) ||
            (eventType !== undefined && !eventType) ||
            (description !== undefined && !description) ||
            (capacity !== undefined && capacity <= 0) ||
            (startTime !== undefined && !startTime) ||
            (endTime !== undefined && !endTime)
        ) {
            return res.status(400).json({ msg: "Required fields cannot be empty" });
        }

        // TIME VALIDATION
        if (
            startTime !== undefined &&
            endTime !== undefined &&
            endTime <= startTime
        ) {
            return res.status(400).json({ message: "End time must be after start time" });
        }

        Object.assign(event, req.body);
        await event.save();

        return res.status(200).json(event);
    } catch (err) {
        console.error("Error updating event:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ msg: "Event not found" });
        }

        const today = normalizeDate(new Date());
        const evenDate = normalizeDate(event.date);
        if (evenDate < today) {
            return res.status(400).json({ msg: "Cannot delete past events" });
        }
        event.isActive = false;
        await event.save();
        return res.status(200).json({ msg: "Event deleted" });
    } catch (err) {
        console.error("Error deleting event:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
};