const User = require("../../models/UsersModel");

const getUserById = async (req, res, next) => {
  const userId = req.params.userId;
  let users;
  try {
    users = await User.findById(userId);
    console.log(users);
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
module.exports = getUserById;
