const cloudinary = require('../config/cloudinary.config');

class CloudinaryService {

    constructor() {
        cloudinary.config({
            secure: true 
        });
    }

    async uploadToCloudinary(fileSource, folder = 'uploads') {
        try {
            const result = await cloudinary.uploader.upload(fileSource, {
                folder: folder,
                resource_type: "auto", 
            });           
            return result;
        } catch (error) {
            console.error("Cloudinary Upload Error:", error);
            throw error;
        }
    }

    async getFilesFromFolder(folderName) {
        try {
            const result = await cloudinary.api.resources({
                resource_type: 'image',
                type: 'upload',
                asset_folder: folderName,
                max_results: 500
            });
            return result.resources; 
        } catch (error) {
            console.error("Cloudinary Admin API Error:", error);
            throw error;
        }
    }
}

module.exports = new CloudinaryService();