const mongoose = require('mongoose');

const AssigneeSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        timeFrom: {
            type: String, // "09:00"
            required: true,
            match: [/^([01]\d|2[0-3]):[0-5]\d$/, 'Invalid time format'],
        },
        timeTo: {
            type: String, // "13:00"
            required: true,
            match: [/^([01]\d|2[0-3]):[0-5]\d$/, 'Invalid time format'],
        },
        assignedAt: {
            type: Date,
            default: Date.now,
            immutable: true,
        },
    },
    { _id: false }
);

const ApplicantSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        timeFrom: {
            type: String, // "09:00"
            required: true,
            match: [/^([01]\d|2[0-3]):[0-5]\d$/, 'Invalid time format'],
        },
        timeTo: {
            type: String, // "13:00"
            required: true,
            match: [/^([01]\d|2[0-3]):[0-5]\d$/, 'Invalid time format'],
        },
        status: {
            type: String,
            enum: ["Pending", "Approved", "Rejected"],
            default: "Pending"
        }
    },
    { _id: false }
);

const VolunteeringSchema = new mongoose.Schema({
    category: {
        type: String,
        enum: ["Animal Care", "Education", "Event Assistance", "General Support"],
        required: true
    },
    description: {
        type: String,
        default: '',
    },
    date: {
        type: Date,
        required: true,
    },
    timeFrom: {
        type: String, // "16:00"
        required: true,
        match: [/^([01]\d|2[0-3]):[0-5]\d$/, 'Invalid time format'], // 00:00 → 23:59
    },
    timeTo: {
        type: String, // "18:00"
        required: true,
        match: [/^([01]\d|2[0-3]):[0-5]\d$/, 'Invalid time format'], // 00:00 → 23:59
    },
    assignees: {
        type: [AssigneeSchema],
        default: [],
    },
    applicants: {
        type: [ApplicantSchema],
        default: [],
    },
},
    { timestamps: true }
);

AssigneeSchema.pre('validate', function (next) {
    if (this.timeFrom >= this.timeTo) {
        return next(new Error('Assignee from time must be before to time'));
    }
    next();
});

ApplicantSchema.pre('validate', function (next) {
    if (this.timeFrom >= this.timeTo) {
        return next(new Error('Applicant from time must be before to time'));
    }
    next();
});

VolunteeringSchema.path('timeFrom').validate(function (value) {
    return value < this.timeTo;
}, 'Volunteering from time must be before to time');

module.exports = mongoose.model('Volunteering', VolunteeringSchema);
