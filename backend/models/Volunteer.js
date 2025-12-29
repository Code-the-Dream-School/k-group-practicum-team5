const mongoose = require('mongoose');

const VolunteerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
    },
    age: {
        type: Number,
        min: 16
    },

    availability: {
        type: [String],
        enum: ["Weekdays", "Weekends", "Both"]
    },

    interests: {
        type: [String],
        enum: ["Animal Care", "Education", "Event Assistance", "General Support"]
    },

    experience: {
        type: String
    },
    status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending"
    }
},
    { timestamps: true }
);

module.exports = mongoose.model('Volunteer', VolunteerSchema);