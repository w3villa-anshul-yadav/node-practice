const DB = require("../models");
const Task = DB.Task;

const asyncHandler = require("express-async-handler");

// @discription get All Task
// @route GET api/task
// @access private
const getTasks = asyncHandler(async (req, res) => {
    const tasks = await Task.findAll();
    res.status(200).json(tasks);
});



// @discription get one Task by ID
// @route GET api/task/:id
// @access private
const getTask = asyncHandler(async (req, res) => {
    await noTaskFound(req, res);

    const task = await Task.findAll({ where: { id: req.params.id } });

    res.status(200).json(task);
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

    const task = await Task.create({
        title,
        description,
    });
    console.log("Task Created");
    res.status(200).json(task);
});



// @discription Update one Task by ID
// @route PUT api/task/:id
// @access private
const updateTask = asyncHandler(async (req, res) => {
    await noTaskFound(req, res);

    const { title, description } = req.body;
    if (!title || !description) {
        res.status(400);
        throw new Error("All fields Are Required");
    }

    const task = await Task.update(
        { title, description },
        { where: { id: req.params.id } }
    );
    res.status(200).json({ "Number of Task Updated: ": task });
});



// @discription Delete one Task by ID
// @route DELETE api/task/:id
// @access private
const deleteTask = asyncHandler(async (req, res) => {
    await noTaskFound(req, res);
    const count = await Task.destroy({ where: { id: req.params.id } });
    res.status(200).json({ "Number of Task Deleted:": count });
});



// for all /api/task/:id checks whether task exists or not
const noTaskFound = asyncHandler(async (req, res) => {
    const task = await Task.findAll({ where: { id: req.params.id } });
    if (task.length === 0) {
        res.status(404);
        throw new Error("No Task Found");
    } else {
        return false;
    }
});

module.exports = { getTask, getTasks, createTask, updateTask, deleteTask };
