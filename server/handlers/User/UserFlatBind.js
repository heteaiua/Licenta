const FlatModel = require("../../models/FlatModel");

const getAllFlatsByUserId = async (req, res) => {
  const userId = req.params.userId;
  console.log(userId);
  try {
    let data = await FlatModel.find({ userId: userId }).populate("userId");
    // let data = await FlatModel.find({ userId: userId });
    console.log(data);
    res.status(200).json({ data, success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, msg: err.message });
  }
};
module.exports = getAllFlatsByUserId;
