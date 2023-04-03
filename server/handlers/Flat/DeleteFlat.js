const Flat = require("../../models/FlatModel");

const deleteFlat = async (req, res, next) => {
  const flatId = req.params.flatId;
  let flats;
  try {
    flats = await Flat.findByIdAndDelete(flatId).exec();

    if (!flats)
      return res.json({
        message: "No flats found!",
      });
  } catch (err) {
    return res.json({
      message: "Error! Could not delete flat!",
      err: err,
    });
  }
  res.json({
    message: "Flats:",
    flats: flats,
  });
};
module.exports = deleteFlat;
