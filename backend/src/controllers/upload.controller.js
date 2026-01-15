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
        const queryParams = req.query.params || req.query;
        const limit = Math.min(Number(queryParams.limit) || 8, 8);
        const cursor = queryParams.cursor || null;

        // console.log("Query Parameters:", req.query);
        console.log("Parsed - limit:", limit, "cursor:", cursor);

        const result = await cloudinaryService.getFilesFromFolder(
            REPTILE_ZOO_FOLDER,
            limit,
            cursor
        );

        //console.log("Cloudinary result:", result);

        if (!result || (!result.resources && !result.images)) {
            console.error("Invalid result from Cloudinary:", result);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error: "Failed to fetch images from Cloudinary"
            });
        }

        const imagesList = result.resources || result.images;

        const images = imagesList.map(file => ({
            asset_id: file.asset_id,
            url: file.secure_url,
            title: file.display_name,
        }));

        const nextCursor = result.next_cursor || result.nextCursor || null;

        res.status(StatusCodes.OK).json({
            data: images,
            nextCursor,
        });

    }

}

module.exports = new UploadController();