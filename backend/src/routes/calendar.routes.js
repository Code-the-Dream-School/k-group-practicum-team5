const express = require('express');
const router = express.Router();
const {
    getOpeningDays,
    getEvents,
    getMonthData
} = require('../controllers/calendar.controller');

// Calendar routes
router.get('/opening-days', getOpeningDays);
router.get('/events', getEvents);
router.get('/month-data', getMonthData);

module.exports = router;
