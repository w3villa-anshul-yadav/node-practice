const asyncHandler = require("express-async-handler");

const logger = require("../logger");

const DB = require("../models");
const { log } = require("console");
const Task = DB.Task;
const User = DB.User;

//utility functions

const isAdmin = (req) => req.user.roles.includes("admin");

const isModerator = (req) => req.user.roles.includes("moderator");

// for all /api/task/:id checks whether task exists or not

const noTaskFound = asyncHandler(async (req, res) => {
    try {
        const task = await Task.findAll({
            where: { id: req.params.id },
        });

        if (task.length === 0) {
            logger.error("No Task Found","params ",req.params);
            res.status(404).json({ status: false, message: "No Task Found" });
            return true;
        }
    } catch (error) {
        logger.error(error.toString());
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
            message: " Task Created By User",
            tasks,
        });
    } catch (error) {
        logger.error(error);
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
            const task = await Task.findOne(
                {
                    where: { id: req.params.id },
                },
                {
                    include: "user",
                }
            );

            const taskCreator = await task.getUser();

            if (
                taskCreator.email !== req.user.email &&
                !isModerator(req) &&
                !isAdmin(req)
            ) {
                logger.error("You are not Authorized To do this Task");
                res.status(403).json({
                    status: false,
                    message: "You are not Authorized To do this Task",
                });
            } else {
                logger.info(`Task with id : ${req.params.id}`);
                res.status(200).json({
                    status: true,
                    message: `Task with id : ${req.params.id}`,
                    task,
                });
            }
        } catch (error) {
            console.error(error.toString());

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

    if (!title) {
        res.status(400);
        logger.error("Title is Required");
        throw new Error("Title is Required");
    }
    try {
        const task = await Task.create({
            title,
            description,
            UserId: req.user.id,
        });

        res.status(200).json(task);
    } catch (error) {
        logger.error(error.toString());
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
            const task = await Task.findOne(
                {
                    where: { id: req.params.id },
                },
                {
                    include: "user",
                }
            );

            const taskCreator = await task.getUser();

            if (
                taskCreator.email !== req.user.email &&
                !isModerator(req) &&
                !isAdmin(req)
            ) {
                logger.error("You are not Authorized To do this Task");
                res.status(403).json({
                    status: false,
                    message: "You are not Authorized To do this Task",
                });
            } else {
                const count = await Task.update(
                    { title, description },
                    { where: { id: req.params.id } }
                );

                const updatedTask = await Task.findAll({
                    where: { id: req.params.id },
                });

                logger.info(`Number of Task Updated: ${count}`);

                res.status(200).json({
                    status: true,
                    message: `Number of Task Updated: ${count}`,
                    task: updatedTask,
                });
            }
        } catch (error) {
            logger.error(error.toString());
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
            const task = await Task.findOne(
                {
                    where: { id: req.params.id },
                },
                {
                    include: "user",
                }
            );
            const taskCreator = await task.getUser();

            if (taskCreator.email !== req.user.email && !isAdmin(req)) {
                logger.error("You are not Authorized To do this Task");

                res.status(403).json({
                    status: false,
                    message: "You are not Authorized To do this Task",
                });
            } else {
                const count = await Task.destroy({
                    where: { id: req.params.id },
                });

                if (count) {
                    logger.info(`Number of Task Deleted: ${count}`);

                    res.status(200).json({
                        status: true,
                        message: `Number of Task Deleted: ${count}`,
                    });
                }
            }
        } catch (error) {
            logger.error(error.toString());
            
            return res
                .status(500)
                .json({ status: false, msg: "Internal server error" });
        }
    }
});

module.exports = { getTask, getTasks, createTask, updateTask, deleteTask };
