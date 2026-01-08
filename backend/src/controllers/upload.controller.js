const { StatusCodes } = require('http-status-codes');
const { REPTILE_ZOO_FOLDER } = require('../constants');
const cloudinaryService = require('../services/cloudinary.service');

class UploadController {
    async uploadImage(req, res) {
        const { file } = req;

        if (!file) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: 'No file uploaded' });
        }

        const result = await cloudinaryService.uploadToCloudinary(
            file.buffer,
            REPTILE_ZOO_FOLDER
        );

        res.status(StatusCodes.CREATED).json({
            message: 'Image uploaded successfully',
            image: {
                url: result.secure_url,
                publicId: result.public_id,
                width: result.width,
                height: result.height,
            },
        });
    }

    async getImages(req, res) {

        const files = await cloudinaryService.getFilesFromFolder(REPTILE_ZOO_FOLDER);
        res.status(StatusCodes.OK).json({ len: files.length, files });

    }
}

module.exports = new UploadController();