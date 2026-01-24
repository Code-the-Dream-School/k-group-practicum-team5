const cloudinary = require('../config/cloudinary.config');

class CloudinaryService {

    constructor() {
        cloudinary.config({
            secure: true
        });
    }

    async uploadToCloudinary(fileSource, folder = 'uploads', metadata = {}) {
        try {
            const result = await cloudinary.uploader.upload(fileSource, {
                folder: folder,
                resource_type: "auto",
                context: {
                    alt: metadata.title || "",
                    caption: metadata.description || "",
                    custom: {
                        title: metadata.title || "",
                        description: metadata.description || "",
                    }
                }
            });
            return result;
        } catch (error) {
            console.error("Cloudinary Upload Error:", error);
            throw error;
        }
    }

    async getFilesFromFolder(folderName, maxResults, nextCursor = null) {
        try {
            const options = {
                resource_type: "image",
                type: "upload",
                folder: folderName,
                max_results: maxResults,
                context: true,
            };

            if (nextCursor) {
                options.next_cursor = nextCursor;
            }

            const result = await cloudinary.api.resources(options);

            return {
                images: result.resources,
                nextCursor: result.next_cursor || null,
            };

        } catch (error) {
            console.error("Cloudinary Admin API Error:", error);
            throw error;
        }
    }

}

module.exports = new CloudinaryService();