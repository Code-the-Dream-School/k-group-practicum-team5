const mongoose = require('mongoose');

const VolunteeringApplicantSchema = new mongoose.Schema({
    userId: {
        type: String,
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

const VolunteeringScheduleSchema = new mongoose.Schema({
    timeFrom: {
        type: Date,
        required: [true, 'Start date/time is required'],
    },
    timeTo: {
        type: Date,
        required: [true, 'End date/time is required'],
    },
    slotsAvailable: {
        type: Number,
        required: true,
        min: 1,
    },
    applicants: { type: [VolunteeringApplicantSchema], default: [] },
}, { timestamps: true });

const VolunteeringSchema = new mongoose.Schema({
    category: {
        type: String,
        enum: ["Animal Care", "Education", "Event Assistance", "General Support", "Conservation Projects", "Research", "Other"],
        required: [true, 'Category is required']
    },
    description: {
        type: String,
        default: '',
    },
    schedules: { type: [VolunteeringScheduleSchema], default: [] },
},
    { timestamps: true }
);

VolunteeringScheduleSchema.index({ timeFrom: 1, timeTo: 1 });

VolunteeringScheduleSchema.pre('validate', function (next) {
    if (this.timeFrom >= this.timeTo) {
        return next(new Error('Start date/time must be before end date/time'));
    }
    next();
});

module.exports = mongoose.model('Volunteering', VolunteeringSchema);
