const Flat = require("../../models/FlatModel");

const getAllFlats = async (req, res, next) => {
  let flats;
  try {
    flats = await Flat.find().exec();

    if (!flats)
      return res.json({
        message: "No flats found!",
      });
  } catch (err) {
    return res.json({
      message: "Error! Could not get flats!",
      err: err,
    });
  }
  res.json({
    message: "Flats:",
    flats: flats,
  });
};
module.exports = getAllFlats;
