const Appliance = require("../../models/ApplianceModel");

const getApplianceById = async (req, res, next) => {
  const applianceId = req.params.applianceId;
  let appliances;
  try {
    appliances = await Appliance.findById(applianceId);
    console.log(appliances);
    if (!appliances)
      return res.json({
        message: "No appliances found!",
      });
  } catch (err) {
    return res.json({
      message: "Error! Could not get appliances!",
      err: err,
    });
  }
  res.json({
    message: "Users:",
    appliances: appliances,
  });
};
module.exports = getApplianceById;
