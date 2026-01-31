const express = require('express');
const router = express.Router();

const {
  createOpportunity,
  getCategories,
  getOpportunities,
  getOpportunitiesWithSchedulesAndApplicants,
} = require('../controllers/volunteering.controller');

router.get('/enums/categories', getCategories);
router.get('/opportunities', getOpportunities);
router.get('/opportunities/full', getOpportunitiesWithSchedulesAndApplicants);
router.post('/new', createOpportunity);
module.exports = router;
