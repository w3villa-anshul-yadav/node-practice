const DB = require("../models");
const Task = DB.Task;

const asyncHandler = require("express-async-handler");

// @discription get All Task
// @route GET api/task
// @access private
const getTasks = asyncHandler(async (req, res) => {
    const tasks = await Task.findAll({ where: { UserId: req.user.id } });
    res.status(200).json({
        status: true,
        message: "All Task Created By User",
        tasks,
    });
});

// @discription get one Task by ID
// @route GET api/task/:id
// @access private
const getTask = asyncHandler(async (req, res) => {
    await noTaskFound(req, res);

    const task = await Task.findAll({
        where: { id: req.params.id, UserId: req.user.id },
    });
    if (task.length === 0) {
        res.status(400);
        throw new Error("You are not Authorized To do this Task");
    } else {
        res.status(200).json({
            status: true,
            message: `Task with id : ${req.params.id}`,
            task,
        });
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
        res.status(400);
        throw new Error(error);
    }
});

// @discription Update one Task by ID
// @route PUT api/task/:id
// @access private
const updateTask = asyncHandler(async (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
        res.status(400);
        throw new Error("All fields Are Required");
    }
    await noTaskFound(req, res);

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
        res.status(400);
        throw new Error("You are not Authorized To do this Task");
    }
});

// @discription Delete one Task by ID
// @route DELETE api/task/:id
// @access private
const deleteTask = asyncHandler(async (req, res) => {
    await noTaskFound(req, res);
    const count = await Task.destroy({
        where: { id: req.params.id, UserId: req.user.id },
    });
    if (count) {
        res.status(200).json({
            status: true,
            message: `Number of Task Deleted: ${count}`,
        });
    } else {
        res.status(400);
        throw new Error("You are not Authorized To do this Task");
    }
});

// for all /api/task/:id checks whether task exists or not
const noTaskFound = asyncHandler(async (req, res) => {
    const task = await Task.findAll({
        where: { id: req.params.id },
    });
    if (task.length === 0) {
        res.status(404);
        throw new Error("No Task Found");
    } 
});

module.exports = { getTask, getTasks, createTask, updateTask, deleteTask };
