"use strict";
const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;

const contactRoutes = require("./routes/contactRoutes");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middleWare/errorHandler");

const conncetDB = require("./config/DBConnection");
conncetDB();

app.use(express.json());
app.use("/api/contacts", contactRoutes);
app.use("/api/user", userRoutes);
app.use(errorHandler);

app.listen(port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Server is running at  : http://127.0.0.1:${port}/`);
    }
});
