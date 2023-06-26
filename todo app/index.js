const express = require("express");
const app = express();

const noRoutesMiddleWare = require("./middleWares/noRoutesMiddleWare");
const errorHandlerMiddware = require("./middleWares/errorHandlerMiddware");
// Task  Routes
const taskRoutes = require("./routes/taskRoutes");

app.use(express.json());
app.use("/api/v1/task", taskRoutes);
app.use(noRoutesMiddleWare);
app.use(errorHandlerMiddware);

app.listen("5000", () => {
    console.log("Server Started");
});
