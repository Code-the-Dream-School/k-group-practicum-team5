const express = require('express');
const router = express.Router();

const { register } = require('../controllers/authcontroller');
//register = require('../controllers/authcontroller');
// const auth = require('../middleware/auth');

// Route to get user profile
// router.get('/profile', auth, userController.getProfile);
router.post('/register', register);

module.exports = router;
