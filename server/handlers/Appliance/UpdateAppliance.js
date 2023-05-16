const Appliance = require("../../models/ApplianceModel");

const updateAppliance = async (req, res, next) => {
  let appliances;
  try {
    appliances = await Appliance.findByIdAndUpdate(
      { _id: req.params.applianceId },
      {
        name: req.body.name,
        consumption: req.body.consumption,
        price: req.body.price,
        dateStart: req.body.dateStart,
        dateEnd: req.body.dateEnd,
        flatId: req.body.flatId,
        userId: req.body.userId,
      }
    );

    if (!appliances)
      return res.json({
        message: "No appliances found!",
      });
  } catch (err) {
    return res.json({
      message: "Error! Could not update appliances!",
      err: err,
    });
  }
  res.json({
    message: "Appliances:",
    appliances: appliances,
  });
};
module.exports = updateAppliance;
