const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const { getAllUsers, deleteUser, makeAdmin } = require('../controllers/adminController');

router.get('/users', auth, admin, getAllUsers);
router.delete('/users/:id', auth, admin, deleteUser);
router.put('/users/:id', auth, admin, makeAdmin);

module.exports = router;
