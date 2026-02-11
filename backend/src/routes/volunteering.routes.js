const express = require('express');
const router = express.Router();

const {
  createOpportunity,
  getCategories,
  getOpportunities,
  getUserOpportunities,
  addApplicantToSchedule,
} = require('../controllers/volunteering.controller');

router.get('/enums/categories', getCategories);
router.get('/opportunities', getOpportunities);
router.get('/opportunities/full', getUserOpportunities);
router.post('/new', createOpportunity);
router.post('/opportunity/addApplicant', addApplicantToSchedule);

module.exports = router;
