const express = require("express");
const Flat = require("../../models/FlatModel");
const createFlat = async (req, res, next) => {
  const { name, city, street, county, userId } = req.body;

  let createdFlat;
  try {
    const flats = await Flat.find().exec();
    createdFlat = new Flat({
      name,
      city,
      street,
      county,
      userId,
    });
    await createdFlat.save();
  } catch (err) {
    res.status(500).json("Flat create failed!");
  }
  res.json({
    message: "New flat added!",
    flats: createdFlat,
  });
};

module.exports = createFlat;
