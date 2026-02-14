const express = require('express');
const router = express.Router();

const {
  createOpportunity,
  getCategories,
  getOpportunities,
  getUserOpportunities,
  getUserAppliedOpportunities,
  addApplicantToSchedule,
  getOpportunityApplicants,
  updateApplicantStatus,
} = require('../controllers/volunteering.controller');

router.get('/enums/categories', getCategories);
router.get('/opportunities', getOpportunities);
router.get('/opportunities/full', getUserOpportunities);
router.get('/opportunities/applied', getUserAppliedOpportunities);
router.get('/opportunities/:opportunityId/applicants', getOpportunityApplicants);
router.post('/new', createOpportunity);
router.post('/opportunity/addApplicant', addApplicantToSchedule);
router.patch('/opportunity/applicant/status', updateApplicantStatus);

module.exports = router;
