const mongoose = require('mongoose');
const Volunteering = require("./Volunteering");

const VolunteeringScheduleSchema = new mongoose.Schema({
    volunteeringId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Volunteering',
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    timeFrom: {
        type: Date,
        required: true,
    },
    timeTo: {
        type: Date,
        required: true,
    },
    slotsAvailable: {
        type: Number,
        required: true,
        min: 1,
    },
}, { timestamps: true});

VolunteeringScheduleSchema.index({ volunteeringId: 1, timeFrom: 1, timeTo: 1 });

VolunteeringScheduleSchema.pre('validate', function (next) {
    if (this.timeFrom >= this.timeTo) {
        return next(new Error('Start date/time must be before end date/time'));
    }
    next();
});

module.exports = mongoose.model('VolunteeringSchedule', VolunteeringScheduleSchema);