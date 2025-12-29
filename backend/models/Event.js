const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,

    },
    description: {
        type: String,
    },
    eventType: {
        type: String,
        enum: ["Show", "Feeding", "Workshop", "Guided Tour", "Education"],
        required: true
    },
    date: {
        type: Date,
        required: true,
    },
    startTime: String,
    endTime: String,

    location: {
        type: String,
        default: "Reptile Zoo"
    },
    capacity: {
        type: Number,
        required: true
    },

    price: {
        type: Number,
        default: 0
    },
    image: String,

    isActive: {
        type: Boolean,
        default: true
    }
},
    { timestamps: true }
);

module.exports = mongoose.model('Event', EventSchema);
