const mongoose = require("mongoose");

const GuideSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  mobile: { type: String, required: true },
  contact: { type: String, required: true },
  info: { type: String, required: true },
});

module.exports = mongoose.model("Guide", GuideSchema);
