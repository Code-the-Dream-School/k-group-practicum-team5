const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const { createEvent, updateEvent, deleteEvent } = require('../controllers/adminEventController');
const { getEvents } = require('../controllers/calendar.controller');

router.get('/', auth, admin, getEvents);
router.post('/', auth, admin, createEvent);
router.put('/:id', auth, admin, updateEvent);
router.delete('/:id', auth, admin, deleteEvent);

module.exports = router;