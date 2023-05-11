const ApplianceModel = require("../../models/ApplianceModel");

const getAllAppliancesByFlatId = async (req, res) => {
  const flatId = req.params.flatId;
  console.log(flatId);
  try {
    let data = await ApplianceModel.find({ flatId: flatId }).populate("flatId");
    console.log(data);
    res.status(200).json({ data, success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, msg: err.message });
  }
};
module.exports = getAllAppliancesByFlatId;
