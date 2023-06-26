const express = require("express");
const router = express.Router();

const {
    getTask,
    getTasks,
    createTask,
    updateTask,
    deleteTask,
} = require("../controller/taskController");

router.route("/").get(getTasks).post(createTask);

router.route("/:id").get(getTask).put(updateTask).delete(deleteTask);


module.exports = router;
