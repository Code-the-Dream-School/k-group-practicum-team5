const express = require('express');
const router = express.Router();

const {
  createOpportunity,
  getCategories,
  getOpportunities,
  getUserOpportunities,
} = require('../controllers/volunteering.controller');

router.get('/enums/categories', getCategories);
router.get('/opportunities', getOpportunities);
router.get('/opportunities/full', getUserOpportunities);
router.post('/new', createOpportunity);
module.exports = router;
