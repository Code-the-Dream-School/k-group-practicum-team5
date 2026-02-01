const { StatusCodes } = require('http-status-codes');
const { REPTILE_ZOO_FOLDER } = require('../constants');
const cloudinaryService = require('../services/cloudinary.service');
const { BadRequestError, NotFoundError } = require('../errors');

class UploadController {
    async uploadImage(req, res) {
        const { file } = req;
        const { title, description } = req.body;

        if (!file) {
            throw new BadRequestError('No file uploaded');
        }

        const result = await cloudinaryService.uploadToCloudinary(
            file.buffer,
            REPTILE_ZOO_FOLDER,
            { title, description }
        );

        res.status(StatusCodes.CREATED).json({
            message: 'Image uploaded successfully',
            image: {
                url: result.secure_url,
                publicId: result.public_id,
                width: result.width,
                height: result.height,
                title: title || result.display_name,
                description: description || "",
            },
        });
    }

    async getImages(req, res) {
        const limit = Math.min(Number(req.query.limit) || 8, 8);
        const cursor = req.query.cursor || null;

        console.log("Parsed - limit:", limit, "cursor:", cursor);

        const result = await cloudinaryService.getFilesFromFolder(
            REPTILE_ZOO_FOLDER,
            limit,
            cursor
        );

        if (!result || (!result.resources && !result.images)) {
            console.error("Invalid result from Cloudinary:", result);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error: "Failed to fetch images from Cloudinary"
            });
        }

        const imagesList = result.resources || result.images;

        const images = imagesList.map(file => ({
            publicId: file.public_id,
            asset_id: file.asset_id,
            url: file.secure_url,
            title: file.context?.custom?.caption ?? "Reptile Zoo",
            description: file.context?.custom?.alt ?? "Reptile Zoo",
        }));

        const nextCursor = result.next_cursor || result.nextCursor || null;

        res.status(StatusCodes.OK).json({
            data: images,
            nextCursor,
        });

    }

    async deleteImage(req, res) {
        const { publicId } = req.body;

        if (!publicId) {
            throw new BadRequestError('Public ID is required');
        }
        const result = await cloudinaryService.deleteFromCloudinary(publicId);

        if (result.result === 'ok') {
            res.status(StatusCodes.OK).json({
                message: 'Image deleted successfully',
                result
            });
        } else {
            throw new NotFoundError('Image not found or already deleted');
        }

    }

    async updateImage(req, res) {
        const { publicId, title, description } = req.body;

        if (!publicId) {
            throw new BadRequestError('Public ID is required');
        }

        if (!title && !description) {
            throw new BadRequestError('title and description must be provided');
        }

        const metadata = {};
        if (title !== undefined) metadata.title = title;
        if (description !== undefined) metadata.description = description;

        const result = await cloudinaryService.updateInCloudinary(publicId, metadata);

        res.status(StatusCodes.OK).json({
            message: 'Image metadata updated successfully',
            image: {
                url: result.secure_url,
                publicId: result.public_id,
                title: metadata.title,
                description: metadata.description,
            }
        });

    }

}

module.exports = new UploadController();