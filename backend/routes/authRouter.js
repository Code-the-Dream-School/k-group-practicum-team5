const { Router } = require('express');
const router = Router();
const { register } = require('../controllers/authController.js');

router.post('/register', register);

module.exports = router;