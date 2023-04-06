const express = require("express");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/UsersModel");
const dotenv = require("dotenv");
dotenv.config();

// //login
const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(400);
      throw new Error("All fields are mandatory");
    }
    const user = await User.findOne({ email });
    //compare paswword with hashedpassword
    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = jwt.sign(
        {
          user: {
            email: user.email,
            password: user.password,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "60m" }
      );
      return res.status(200).json({ accessToken: accessToken, user: user });
    } else {
      return res
        .status(400)
        .json({ message: JSON.stringify("Password and email is not valid") });
      // return res.status(500).send();
    }
  } catch (err) {
    return res.json({ err: err });
  }
};
const currentUser = async (req, res) => {
  res.json(req.user);
};

// module.exports = { login, currentUser };

// const login = async (req, res, next) => {
//   const { email, password } = req.body;

//   console.log(req.body);

//   let existingUser;
//   try {
//     existingUser = await User.findOne({ email: email });
//     // console.log(existingUser);
//   } catch (error) {
//     return res.status(500).json("Login has failed!");
//   }
//   const decryptedPassword = await bcrypt.compare(
//     password,
//     existingUser.password
//   );
//   console.log(decryptedPassword);

//   try {
//     if (
//       !existingUser ||
//       !(await bcrypt.compare(password, existingUser.password))
//     )
//       return res.status(401).json({ message: "Invalid credentials!" });
//   } catch (error) {
//     return res.status(401).json({ error });
//   }

//   res.json({
//     message: "Welcome back" + existingUser,
//     user: existingUser.toObject({ getters: true }),
//   });
// };

//const currentUser = async (req, res) => {
//res.json(req.user);
//};

module.exports = { login, currentUser };
