const express = require('express');
const mongoose=require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require('../../models/UsersModel');

//register
const signup = async(req, res, next) => {
    const {firstName,lastName,username,email, password,cnp,phoneNumber,age} = req.body;
    if(!email || !password) {
        res.status(400);
        throw new Error('All fields are mandatory!');
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable) {
        res.status(400);
        throw new Error('User Already registered!');
    }

    //Hash password

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password ", hashedPassword);
    const user = await User.create({
        firstName,
        lastName,
        username,
        email, 
        password:hashedPassword,
        cnp,
        phoneNumber,
        age,
    });
    console.log(`User created ${user}`);
    if(user) {
        res.status(201).json({email:User.email});
    } else{
        res.status(400);
        throw new Error('User data is not valid!');
    }
    };


module.exports = signup;