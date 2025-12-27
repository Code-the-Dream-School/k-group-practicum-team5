const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const HeroMediaSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuidv4,
    unique: true,
    required: true,
  },
  type: {
    type: String,
    enum: ["IMAGE", "VIDEO"],
    required: true,
    maxlength: 20,
  },
  media_url: {
    type: String,
    maxlength: 150,
  },
  title: {
    type: String,
    maxlength: 150,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("HeroMedia", HeroMediaSchema);
