const express = require('express');
const router = express.Router();

const { register, login, forgotPassword, resetPassword } = require('../controllers/authcontroller');

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);

module.exports = router;
