const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
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

  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400).json("User Already registered!");
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
    res.status(400);
    throw new Error("User data is not valid!");
  }
};

module.exports = signup;
