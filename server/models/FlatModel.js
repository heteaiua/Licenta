const mongoose = require("mongoose");

const Flat = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  street: { type: String, required: true },
  county: { type: String, required: true },
});
module.exports = mongoose.model("Flat", Flat);
