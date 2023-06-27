const express = require("express");
const app = express();

require("dotenv").config();

//DB Connection
const DB = require("./models/index");

// Task  Routes

const noRoutesMiddleWare = require("./middleWares/noRoutesMiddleWare");
const errorHandlerMiddware = require("./middleWares/errorHandlerMiddware");
const taskRoutes = require("./routes/taskRoutes");

//middleWares

app.use(express.json());
app.use("/api/task", taskRoutes);
app.use(noRoutesMiddleWare);
app.use(errorHandlerMiddware);

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server Started at : http://127.0.0.1:${port}/api/task`);
});
