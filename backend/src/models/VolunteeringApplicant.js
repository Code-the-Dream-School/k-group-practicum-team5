const mongoose = require('mongoose');

const VolunteeringApplicantSchema = new mongoose.Schema({
    ScheduleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'VolunteeringSchedule',
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending"
    }
},
    { timestamps: true, _id: false }
);

module.exports = mongoose.model('VolunteeringApplicant', VolunteeringApplicantSchema);
