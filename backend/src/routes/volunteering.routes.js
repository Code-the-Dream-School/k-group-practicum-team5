const express = require('express');
const router = express.Router();

const {
  createOpportunity,
  getCategories,
  getOpportunities,
  getUserOpportunities,
  getUserAppliedOpportunities,
  addApplicantToSchedule,
} = require('../controllers/volunteering.controller');

router.get('/enums/categories', getCategories);
router.get('/opportunities', getOpportunities);
router.get('/opportunities/full', getUserOpportunities);
router.get('/opportunities/applied', getUserAppliedOpportunities);
router.post('/new', createOpportunity);
router.post('/opportunity/addApplicant', addApplicantToSchedule);

module.exports = router;
