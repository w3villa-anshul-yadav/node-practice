"use strict";
require("dotenv").config();
const port = process.env.PORT || 5000;

//database connection
const conncetDB = require("./config/DBConnection");
conncetDB();

//error handler middleware
const errorHandler = require("./middleWare/errorHandler");
const noRoutesMiddleWare = require("./middleWare/noRoutesMiddleWare");

//routes
const contactRoutes = require("./routes/contactRoutes");
const userRoutes = require("./routes/userRoutes");

// express app
const express = require("express");
const app = express();

app.use(express.json());

//contact Rout
app.use("/api/contacts", contactRoutes);

// User Rout
app.use("/api/user", userRoutes);

//error handler middlewares
app.use(noRoutesMiddleWare);
app.use(errorHandler);

app.listen(port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Server is running at  : http://127.0.0.1:${port}/`);
    }
});
