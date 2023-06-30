const validateToken = require("../middleWares/validateTokenMiddleware");

const {
    getTask,
    getTasks,
    createTask,
    updateTask,
    deleteTask,
} = require("../controller/taskController");

const express = require("express");
const router = express.Router();

//validate Token Middleware
router.use(validateToken);

// Task Routes
router.route("/").get(getTasks).post(createTask);
router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask);

module.exports = router;
