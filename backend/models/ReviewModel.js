const mongoose = require("mongoose");

const { Schema } = mongoose;

const ReviewSchema = new Schema({
  location: {
    type: String,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  problemFaced: {
    type: String,
    required: true,
  },
  adviceForOthers: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Review", ReviewSchema);
