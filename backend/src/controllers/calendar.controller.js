const Event = require('../models/Event');
const OpeningDay = require('../models/OpeningDay');
const { normalizeDate, getMonthBoundaries } = require('../utils/dateUtils');

// GET /api/calendar/opening-days
exports.getOpeningDays = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        const query = {};
        if (startDate || endDate) {
            query.date = {};
            if (startDate) query.date.$gte = normalizeDate(startDate);
            if (endDate) query.date.$lte = normalizeDate(endDate);
        }

        const openingDays = await OpeningDay.find(query).sort({ date: 1 });
        res.json(openingDays);
    } catch (error) {
        console.error('Error fetching opening days:', error);
        res.status(500).json({
            message: 'Error fetching opening days',
            error: error.message
        });
    }
};

// GET /api/calendar/events
exports.getEvents = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        const query = { isActive: true };
        if (startDate || endDate) {
            query.date = {};
            if (startDate) query.date.$gte = normalizeDate(startDate);
            if (endDate) query.date.$lte = normalizeDate(endDate);
        }

        const events = await Event.find(query).sort({ date: 1 });
        res.json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({
            message: 'Error fetching events',
            error: error.message
        });
    }
};

// GET /api/calendar/month-data
exports.getMonthData = async (req, res) => {
    try {
        console.log("getMonthData called with query:", req.query);
        const { year, month } = req.query;

        if (!year || !month) {
            return res.status(400).json({
                message: 'Year and month are required'
            });
        }

        const yearNum = parseInt(year, 10);
        const monthNum = parseInt(month, 10);

        if (isNaN(yearNum) || isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
            return res.status(400).json({
                message: 'Invalid year or month'
            });
        }

        const { startDate, endDate } = getMonthBoundaries(yearNum, monthNum);
        console.log(`Calculated month boundaries for ${yearNum}-${monthNum}:`, { startDate, endDate });

        const [openingDays, events] = await Promise.all([
            OpeningDay.find({
                date: { $gte: startDate, $lte: endDate }
            }).sort({ date: 1 }),
            Event.find({
                isActive: true,
                date: { $gte: startDate, $lte: endDate }
            }).sort({ date: 1 })
        ]);
        console.log(`Fetched ${openingDays.length} opening days and ${events.length} events for ${yearNum}-${monthNum}`);
        res.json({
            openingDays,
            events,
            meta: { year: yearNum, month: monthNum }
        });
    } catch (error) {
        console.error('Error fetching month data:', error);
        res.status(500).json({
            message: 'Error fetching month data',
            error: error.message
        });
    }
};

// POST /api/v1/admin/opening-days - Create opening day
exports.createOpeningDay = async (req, res) => {
    try {
        const { date, isOpen, specialHours, notes } = req.body;

        if (!date) {
            return res.status(400).json({
                message: 'Date is required'
            });
        }

        const normalizedDate = normalizeDate(date);

        // Check if opening day already exists for this date
        const existingOpeningDay = await OpeningDay.findOne({ date: normalizedDate });
        if (existingOpeningDay) {
            return res.status(400).json({
                message: 'Opening day already exists for this date'
            });
        }

        const openingDay = new OpeningDay({
            date: normalizedDate,
            isOpen: isOpen !== undefined ? isOpen : true,
            specialHours,
            notes
        });

        await openingDay.save();
        res.status(201).json(openingDay);
    } catch (error) {
        console.error('Error creating opening day:', error);
        res.status(500).json({
            message: 'Error creating opening day',
            error: error.message
        });
    }
};

// PUT /api/v1/admin/opening-days/:id - Update opening day
exports.updateOpeningDay = async (req, res) => {
    try {
        const { id } = req.params;
        const { isOpen, specialHours, notes } = req.body;

        const openingDay = await OpeningDay.findByIdAndUpdate(
            id,
            { isOpen, specialHours, notes },
            { new: true, runValidators: true }
        );

        if (!openingDay) {
            return res.status(404).json({
                message: 'Opening day not found'
            });
        }

        res.json(openingDay);
    } catch (error) {
        console.error('Error updating opening day:', error);
        res.status(500).json({
            message: 'Error updating opening day',
            error: error.message
        });
    }
};

// DELETE /api/v1/admin/opening-days/:id - Delete opening day
exports.deleteOpeningDay = async (req, res) => {
    try {
        const { id } = req.params;

        const openingDay = await OpeningDay.findByIdAndDelete(id);

        if (!openingDay) {
            return res.status(404).json({
                message: 'Opening day not found'
            });
        }

        res.json({ message: 'Opening day deleted successfully' });
    } catch (error) {
        console.error('Error deleting opening day:', error);
        res.status(500).json({
            message: 'Error deleting opening day',
            error: error.message
        });
    }
};
