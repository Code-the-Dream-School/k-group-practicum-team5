const { Router } = require('express');
const router = Router();
const { addAvailability, getVolunteeringOpportunities } = require('../controllers/volunteeringController.js');

router.post('/addAvailability', addAvailability);
router.get('/opportunities', getVolunteeringOpportunities);


module.exports = router;