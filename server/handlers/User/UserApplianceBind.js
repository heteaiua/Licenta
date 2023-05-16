const ApplianceModel = require("../../models/ApplianceModel");

const getAllAppliancesByUserId = async (req, res) => {
  const userId = req.params.userId;
  console.log(userId);
  try {
    let data = await ApplianceModel.find({ userId: userId }).populate("userId");
    console.log(data);
    res.status(200).json({ data, success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, msg: err.message });
  }
};
module.exports = getAllAppliancesByUserId;
