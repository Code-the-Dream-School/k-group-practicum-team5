const Event = require('../../models/Event');
const OpeningDay = require('../../models/OpeningDay');
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

        const [openingDays, events] = await Promise.all([
            OpeningDay.find({
                date: { $gte: startDate, $lte: endDate }
            }).sort({ date: 1 }),
            Event.find({
                isActive: true,
                date: { $gte: startDate, $lte: endDate }
            }).sort({ date: 1 })
        ]);

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
