const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    tickets: {
      adults: {
        type: Number,
        default: 0,
        min: 0,
      },
      children: {
        type: Number,
        default: 0,
        min: 0,
      },
      toddler: {
        type: Number,
        default: 0,
        min: 0,
      },
    },
    numberOfTickets: {
      type: Number,
      required: true,
      min: 1,
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    bookingStatus: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled"],
      default: "Pending",
    },
    bookingDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Booking", BookingSchema);
