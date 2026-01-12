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

    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Number(req.query.limit) || 8, 8);

    const offset = (page - 1) * limit;

    // Get ALL files once (Cloudinary limitation)
    const files = await cloudinaryService.getFilesFromFolder(REPTILE_ZOO_FOLDER);

    const total = files.length;

    const paginatedFiles = files.slice(offset, offset + limit);

    const images = paginatedFiles.map(file => ({
        asset_id: file.asset_id,
        url: file.secure_url,
        title: file.display_name,
    }));

    res.status(StatusCodes.OK).json({
        data: images,
        total,
        totalPages: Math.ceil(total / limit),
    });
}

}

module.exports = new UploadController();