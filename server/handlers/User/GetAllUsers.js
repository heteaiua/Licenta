const User = require("../../models/UsersModel");

const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find().exec();

    if (!users)
      return res.json({
        message: "No users found!",
      });
  } catch (err) {
    return res.json({
      message: "Error! Could not get users!",
      err: err,
    });
  }
  res.json({
    message: "Users:",
    users: users,
  });
};
module.exports = getAllUsers;
