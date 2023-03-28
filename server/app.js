const express=require('express');
const bodyParser=require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const usersRoutes = require('./routes/users-routes');
const dotenv = require("dotenv");
mongoose
    .connect("mongodb+srv://hetea:hetea@licenta.0fh6mcx.mongodb.net/?retryWrites=true&w=majority",
    {
        useNewUrlParser :true,
    }
    )
    .then(() => {
        console.log("connected to database");
    })
    .catch((err) => {
        console.log("connection failed"),console.log(err);
    });

    const app=express();

    app.use(cors({origin: true, credentials: true}));
    app.use(bodyParser.json({ limit: "400mb" }));
    app.use(bodyParser.urlencoded({ limit: "400mb", extended: true }));
    app.use("/", usersRoutes);

    app.listen(5000);