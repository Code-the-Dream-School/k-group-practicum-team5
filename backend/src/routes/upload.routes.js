const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/upload.controller'); 
const multer = require('../middleware/upload.multer'); 

const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.get('/', uploadController.getImages);

router.post('/upload', auth, admin, multer.single('image'), uploadController.uploadImage);
router.delete('/', auth, admin, uploadController.deleteImage);
router.put('/', auth, admin, uploadController.updateImage);

module.exports = router;