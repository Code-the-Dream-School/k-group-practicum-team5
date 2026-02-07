const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      enum: ["Animals", "Education", "Guest Services", "Management", "Maintenance", "Event Assistance"],
      required: true,
    },
    bio: String,
    email: String,
    phone: String,
    image: String, // image URL
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Staff", staffSchema);
