const Flat = require("../../models/FlatModel");

const updateFlat = async (req, res, next) => {
  const flatId = req.params.flatId;
  let flats;
  try {
    flats = await Flat.findByIdAndUpdate(
      { _id: req.params.flatId },
      {
        name: req.body.name,
        city: req.body.city,
        street: req.body.street,
        county: req.body.county,
      }
    );

    if (!flats)
      return res.json({
        message: "No flats found!",
      });
  } catch (err) {
    return res.json({
      message: "Error! Could not update flat!",
      err: err,
    });
  }
  res.json({
    message: "Flats:",
    flats: flats,
  });
};
module.exports = updateFlat;
