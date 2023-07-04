const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../../models/UsersModel");

//register
const signup = async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    cnp,
    phoneNumber,
    age,
  } = req.body;
  try {
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
      return res.status(400).json("User Already registered!");
    }

    //Hash password

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password ", hashedPassword);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      confirmPassword,
      cnp,
      phoneNumber,
      age,
    });
    console.log(`User created ${user}`);
    if (user) {
      return res.status(201).json({
        email: user.email,
        message: "Thank you for joing us!" + user.firstName,
      });
    } else {
      return res
        .status(400)
        .json({ message: JSON.stringify("User data is not valid!") });
    }
  } catch (err) {
    return res.json({ err: err });
  }
};

module.exports = signup;
