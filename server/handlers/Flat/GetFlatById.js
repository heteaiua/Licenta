const Flat = require("../../models/FlatModel");

const getFlatById = async (req, res, next) => {
  const flatId = req.params.flatId;
  let flats;
  try {
    flats = await Flat.findById(flatId);
    console.log(flats);
    if (!flats)
      return res.json({
        message: "No flats found!",
      });
  } catch (err) {
    return res.json({
      message: "Error! Could not get flats by id!",
      err: err,
    });
  }
  res.json({
    message: "Flats:",
    flats: flats,
  });
};
module.exports = getFlatById;
