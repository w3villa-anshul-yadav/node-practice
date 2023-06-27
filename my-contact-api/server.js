"use strict";
const express = require("express");
const app = express();
require("dotenv").config();

//database connection
const conncetDB = require("./config/DBConnection");
conncetDB();

//error handler middleware
const errorHandler = require("./middleWare/errorHandler");

//routes
const contactRoutes = require("./routes/contactRoutes");
const userRoutes = require("./routes/userRoutes");

app.use(express.json());
app.use("/api/contacts", contactRoutes);
app.use("/api/user", userRoutes);
app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Server is running at  : http://127.0.0.1:${port}/`);
    }
});
