const express = require('express');
const router = express.Router();

const { createOpportunity, getCategories, getOpportunities } = require('../controllers/volunteering.controller');

router.get('/enums/categories', getCategories);
router.get('/opportunities', getOpportunities);
router.post('/new', createOpportunity);
module.exports = router;