const express = require("express");
const Appliance = require("../../models/ApplianceModel");
const createAppliance = async (req, res, next) => {
  const { name, consumption, price, dateStart, dateEnd } = req.body;

  let createdAppliance;
  try {
    const appliances = await Appliance.find().exec();
    createdAppliance = new Appliance({
      name,
      consumption,
      price,
      dateStart,
      dateEnd,
    });
    await createdAppliance.save();
  } catch (err) {
    res.status(500).json("Appliance create has failed!");
  }
  res.json({
    message: "New appliance added!",
    appliance: createdAppliance,
  });
};

module.exports = createAppliance;
