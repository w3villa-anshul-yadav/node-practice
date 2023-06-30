"use strict";
require("dotenv").config();
const port = process.env.PORT;

//DB Connection
const DB = require("./models/index");

const noRoutesMiddleWare = require("./middleWares/noRoutesMiddleWare");
const errorHandlerMiddware = require("./middleWares/errorHandlerMiddware");

//   Routes
const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes");
const roleRoutes = require("./routes/roleRoutes");

//express app
const express = require("express");
const app = express();

//middleWares
app.use(express.json());

//API Routes
app.use("/api/task", taskRoutes);
app.use("/api/user", userRoutes);
app.use("/api/roles", roleRoutes);

//error handler middlewares
app.use(noRoutesMiddleWare);
app.use(errorHandlerMiddware);

app.listen(port, () => {
    console.log(`Server Started at : http://127.0.0.1:${port}`);
});
