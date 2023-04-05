const Appliance = require("../../models/ApplianceModel");

const deleteAppliance = async (req, res, next) => {
  const applianceId = req.params.applianceId;
  let appliances;
  try {
    appliances = await Appliance.findByIdAndDelete(applianceId);
    console.log(appliances);
    if (!appliances)
      return res.json({
        message: "No appliances found!",
      });
  } catch (err) {
    return res.json({
      message: "Error! Could not delete appliance!",
      err: err,
    });
  }
  res.json({
    message: "Appliances:",
    appliances: appliances,
  });
};
module.exports = deleteAppliance;
