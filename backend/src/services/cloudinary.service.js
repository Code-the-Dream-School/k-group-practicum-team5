const cloudinary = require('../config/cloudinary.config');

class CloudinaryService {

    constructor() {
        cloudinary.config({
            secure: true
        });
    }

    async uploadToCloudinary(fileBuffer, folder = 'uploads', metadata = {}) {

        const base64File = `data:image/jpeg;base64,${fileBuffer.toString('base64')}`;

        const result = await cloudinary.uploader.upload(base64File, {
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

    }

    async getFilesFromFolder(folderName, maxResults, nextCursor = null) {

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


    }

    async deleteFromCloudinary(publicId) {

        const result = await cloudinary.uploader.destroy(publicId);
        return result;

    }

    async updateInCloudinary(publicId, metadata = {}) {
        const currentResource = await cloudinary.api.resource(publicId, { context: true });
        const existing = currentResource.context?.custom || {};
        
        const title = metadata.title ?? existing.title ?? "";
        const description = metadata.description ?? existing.description ?? "";
        
        const result = await cloudinary.uploader.explicit(publicId, {
            type: 'upload',
            context: {
                caption: title,
                alt: description
            }
        });
        return result;
    }

}

module.exports = new CloudinaryService();