const express = require("express");
const FlatModel = require("../../models/FlatModel");
const UserModel = require("../../models/UsersModel");

exports.getAllFlats = async (req, res) => {
  try {
    let data = await FlatModel.find().populate({
      path: "user",
      options: { strictPopulate: false },
    });
    res.status(200).json({ data: [...data], success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, msg: err.message });
  }
};
