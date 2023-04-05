const Appliance = require("../../models/ApplianceModel");

const getAllAppliances = async (req, res, next) => {
  let appliances;
  try {
    appliances = await Appliance.find().exec();

    if (!appliances)
      return res.json({
        message: "No appliance found!",
      });
  } catch (err) {
    return res.json({
      message: "Error! Could not get appliances!",
      err: err,
    });
  }
  res.json({
    message: "Appliances:",
    appliances: appliances,
  });
};
module.exports = getAllAppliances;
