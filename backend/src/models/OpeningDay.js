const mongoose = require('mongoose');

const OpeningDaySchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        unique: true
    },
    isOpen: {
        type: Boolean,
        required: true,
        default: true
    },
    notes: {
        type: String,
        maxlength: 200
    },
    specialHours: {
        openTime: String,
        closeTime: String
    }
}, { timestamps: true });

// Index for fast date lookups
//OpeningDaySchema.index({ date: 1 }, { unique: true });

// Normalize date and clean special hours before save
OpeningDaySchema.pre('save', function (next) {
    if (this.date) {
        this.date.setUTCHours(0, 0, 0, 0);
    }

    if (!this.isOpen) {
        this.specialHours = undefined;
    }

    next();
});

module.exports = mongoose.model('OpeningDay', OpeningDaySchema);
