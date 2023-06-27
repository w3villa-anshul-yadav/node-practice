const express = require("express");
const app = express();

require("dotenv").config();

//DB Connection
const DB = require("./models/index");

//models
const Task = DB.Task;


// Task  Routes

const noRoutesMiddleWare = require("./middleWares/noRoutesMiddleWare");
const errorHandlerMiddware = require("./middleWares/errorHandlerMiddware");
const taskRoutes = require("./routes/taskRoutes");

//middleWares

app.use(express.json());
app.use("/api/v1/task", taskRoutes);
app.use(noRoutesMiddleWare);
app.use(errorHandlerMiddware);





app.listen("5000", () => {
    console.log("Server Started");
});
