const mongoose = require('mongoose')

const GallerySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },

    imageUrl: {
        type: String,
        required: true
    },

    animal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Animal"
    },

    category: {
        type: String,
        enum: ["Reptile", "Event", "Zoo", "Education"],
        default: "Reptile"
    },
    description: {
        type: String
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    isFeatured: {
        type: Boolean,
        default: false
    }
},
    { timestamps: true }
)
module.exports = mongoose.model('Gallery', GallerySchema)