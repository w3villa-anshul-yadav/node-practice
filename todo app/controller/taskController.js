const asyncHandler = require("express-async-handler");

const DB = require("../models");
const Task = DB.Task;

//utility functions
// for all /api/task/:id checks whether task exists or not
const noTaskFound = asyncHandler(async (req, res) => {
    try {
        const task = await Task.findAll({
            where: { id: req.params.id },
        });

        if (task.length === 0) {
            res.status(404).json({ status: false, message: "No Task Found" });
            return true;
        }
    } catch (error) {
        console.error(error);
        res.status(404).json({ status: false, error });
        return true;
    }
    return false;
});

//controller functions
// @discription get All Task
// @route GET api/task
// @access private
const getTasks = asyncHandler(async (req, res) => {
    try {
        const tasks = await Task.findAll({ where: { UserId: req.user.id } });

        res.status(200).json({
            status: true,
            message: "All Task Created By User",
            tasks,
        });
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ status: false, msg: "Internal server error" });
    }
});

// @discription get  Task by ID
// @route GET api/task/:id
// @access private
const getTask = asyncHandler(async (req, res) => {
    if (!(await noTaskFound(req, res))) {
        try {
            const task = await Task.findAll({
                where: { id: req.params.id, UserId: req.user.id },
            });

            if (task.length === 0) {
                res.status(403).json({
                    status: false,
                    message: "You are not Authorized To do this Task",
                });
            } else {
                res.status(200).json({
                    status: true,
                    message: `Task with id : ${req.params.id}`,
                    task,
                });
            }
        } catch (error) {
            console.error(error);
            return res
                .status(500)
                .json({ status: false, msg: "Internal server error" });
        }
    }
});

// @discription create   Task by
// @route POST api/task/
// @access private
const createTask = asyncHandler(async (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        res.status(400);
        throw new Error("All fields Are Required");
    }
    try {
        const task = await Task.create({
            title,
            description,
            UserId: req.user.id,
        });

        console.log("Task Created");
        res.status(200).json(task);
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ status: false, msg: "Internal server error" });
    }
});

// @discription Update one Task by ID
// @route PUT api/task/:id
// @access private
const updateTask = asyncHandler(async (req, res) => {
    const { title, description } = req.body;
    if (!(await noTaskFound(req, res))) {
        try {
            const task = await Task.findAll({
                where: { id: req.params.id, UserId: req.user.id },
            });

            if (task.length !== 0) {
                const count = await Task.update(
                    { title, description },
                    { where: { id: req.params.id } }
                );

                const updatedTask = await Task.findAll({
                    where: { id: req.params.id, UserId: req.user.id },
                });

                res.status(200).json({
                    status: true,
                    message: `Number of Task Updated: ${count}`,
                    task: updatedTask,
                });
            } else {
                res.status(403);
                throw new Error("You are not Authorized To do this Task");
            }
        } catch (error) {
            console.error(error);
            return res
                .status(500)
                .json({ status: false, msg: "Internal server error" });
        }
    }
});

// @discription Delete one Task by ID
// @route DELETE api/task/:id
// @access private
const deleteTask = asyncHandler(async (req, res) => {
    if (!(await noTaskFound(req, res))) {
        try {
            const count = await Task.destroy({
                where: { id: req.params.id, UserId: req.user.id },
            });

            if (count) {
                res.status(200).json({
                    status: true,
                    message: `Number of Task Deleted: ${count}`,
                });
            } else {
                res.status(403);
                throw new Error("You are not Authorized To do this Task");
            }
        } catch (error) {
            console.error(error);
            return res
                .status(500)
                .json({ status: false, msg: "Internal server error" });
        }
    }
});

module.exports = { getTask, getTasks, createTask, updateTask, deleteTask };
