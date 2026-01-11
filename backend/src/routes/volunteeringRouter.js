const express = require('express');
const router = express.Router();

const { createOpportunity, getCategories, getOpportunities } = require('../controllers/volunteeringController');

router.get('/enums/categories', getCategories);
router.get('/opportunities', getOpportunities);
router.post('/new', createOpportunity);
module.exports = router;