const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/upload.controller'); 
const multer = require('../middleware/upload.multer'); 

router.post('/upload', multer.single('image'), uploadController.uploadImage);
router.get('/', uploadController.getImages);

module.exports = router;