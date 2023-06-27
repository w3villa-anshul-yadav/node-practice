const express = require("express");
const router = express.Router();
const validateToken = require("../middleWares/validateTokenMiddleware");
const {
    getTask,
    getTasks,
    createTask,
    updateTask,
    deleteTask,
} = require("../controller/taskController");

router.use(validateToken);
router.route("/").get(getTasks).post(createTask);
router.route("/:id").get(getTask).put(updateTask).delete(deleteTask);

module.exports = router;
