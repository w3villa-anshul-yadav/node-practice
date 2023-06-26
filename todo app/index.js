const express = require("express");
const app = express();


// Task  Routes
const taskRoutes = require("./routes/taskRoutes"); 

app.use("/api/v1/task",taskRoutes);



app.listen("5000", () => {
    console.log("Server Started");
})
