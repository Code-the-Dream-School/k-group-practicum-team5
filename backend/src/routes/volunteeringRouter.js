const express = require('express');
const router = express.Router();

const  createVolunteeringOpportunity = require('../controllers/volunteeringController');

router.post('/new', createVolunteeringOpportunity);

module.exports = router;