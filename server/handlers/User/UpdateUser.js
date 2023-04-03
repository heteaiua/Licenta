const User = require("../../models/UsersModel");

const updateUser = async (req, res, next) => {
  let users;
  try {
    users = await User.findByIdAndUpdate(
      { _id: req.params.userId },
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        confirmPassword: req.body.confirmPassword,
        email: req.body.email,
        password: req.body.password,
        cnp: req.body.cnp,
        phoneNumber: req.body.phoneNumber,
        age: req.body.age,
      }
    );

    if (!users)
      return res.json({
        message: "No users found!",
      });
  } catch (err) {
    return res.json({
      message: "Error! Could not update user!",
      err: err,
    });
  }
  res.json({
    message: "Users:",
    users: users,
  });
};
module.exports = updateUser;
