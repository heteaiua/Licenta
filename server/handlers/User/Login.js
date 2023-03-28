const express = require('express');
const mongoose=require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const User = require('../../models/UsersModel');
const dotenv = require("dotenv");
dotenv.config();

//login 
const login = async(req,res,next)=> {
    const {email, password} = req.body;
    if(!email || !password) {
       res.status(400);
       throw new Error("All fields are mandatory");
    }
    const user = await User.findOne({ email });
    //compare paswword with hashedpassword
    if(user && (await bcrypt.compare(password,user.password)))  {
       const accessToken = jwt.sign({
               email:user.email,
               password:user.password
    }, dotenv.config(`${process.env.ACCESS_TOKEN_SECRET}`),   
       {expiresIn:'1m'}
       )
       
       res.status(200).json({accessToken});

   } else {
       res.status(401)
       throw new Error("Password and email is not valid");
   }
   res.json({message: "login user"});
   };
   
   
  
   module.exports = login;