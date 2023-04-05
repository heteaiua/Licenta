const mongoose = require("mongoose");

const Appliance = new mongoose.Schema({
  name: { type: String, required: true },
  consumption: { type: String, required: true },
  price: { type: Number, required: true },
  dateStart: { type: Date, required: true },
  dateEnd: { type: Date, required: true },
});
module.exports = mongoose.model("Appliance", Appliance);
