const mongoose = require("mongoose");

const businessHourSchema = new mongoose.Schema({
  day: {
    type: String,
    required: true,
    unique: true,
  },
  openTime: String, // "09:00"
  closeTime: String, // "17:00"
  isClosed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("BusinessHour", businessHourSchema);
