const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const { getAllUsers, deleteUser, makeAdmin } = require('../controllers/adminController');
const { 
    createOpeningDay, 
    updateOpeningDay, 
    deleteOpeningDay 
} = require('../controllers/calendar.controller');

router.get('/users', auth, admin, getAllUsers);
router.delete('/users/:id', auth, admin, deleteUser);
router.put('/users/:id', auth, admin, makeAdmin);


router.post('/opening-days', auth, admin, createOpeningDay);
router.put('/opening-days/:id', auth, admin, updateOpeningDay);
router.delete('/opening-days/:id', auth, admin, deleteOpeningDay);

module.exports = router;
