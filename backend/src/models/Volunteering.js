const mongoose = require('mongoose');

const VolunteeringSchema = new mongoose.Schema({
    category: {
        type: String,
        enum: ["Animal Care", "Education", "Event Assistance", "General Support", "Conservation Projects", "Research", "Other"],
        required: true
    },
    description: {
        type: String,
        default: '',
    },
},
    { timestamps: true }
);

module.exports = mongoose.model('Volunteering', VolunteeringSchema);
