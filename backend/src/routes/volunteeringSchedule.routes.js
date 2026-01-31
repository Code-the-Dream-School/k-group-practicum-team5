const express = require('express');
const router = express.Router();

const { createVolunteeringSchedule } = require('../controllers/volunteeringSchedule.controller');

router.post("/:volunteeringId/schedules", createVolunteeringSchedule);

module.exports = router;