const mongoose = require('mongoose')

const AnimalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    species: {
        type: String,
        required: true
    },
    age: {
        type: Number,

    },
    category: {
        type: String,
        enum: ["Reptile", "Amphibian"],
        default: "Reptile"
    },
    habitat: {
        type: String,
        enum: ["Desert", "Forest", "Wetland", "Grassland", "Rainforest"]
    },
    diet: {
        type: String,
        enum: ["Herbivore", "Carnivore", "Omnivore"]
    },
    location: {
        type: String,
        required: true
    },
    venomous: {
        type: Boolean,
        default: false
    },
    isEndangered: {
        type: Boolean,
        default: false
    },
    image: {
        type: String,

    },
    description: {
        type: String,

    }
},
    { timestamps: true }
)

module.exports = mongoose.model('Animal', AnimalSchema)
