const express = require("express");
const app = express();

require("dotenv").config({ path: "../.env" });

//DB Connection
const DB = require("./models/index");

const noRoutesMiddleWare = require("./middleWares/noRoutesMiddleWare");
const errorHandlerMiddware = require("./middleWares/errorHandlerMiddware");

//   Routes
const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes");
//middleWares

app.use(express.json());
app.use("/api/task", taskRoutes);
app.use("/api/user", userRoutes);
app.use(noRoutesMiddleWare);
app.use(errorHandlerMiddware);

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server Started at : http://127.0.0.1:${port}`);
});
