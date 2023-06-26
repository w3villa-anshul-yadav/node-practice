const express = require("express");

const asyncHandler = require("express-async-handler");
const getTasks = asyncHandler(async (req, res) => {
    res.status(200).send("get all todo list");
});

const getTask = asyncHandler(async (req, res) => {
    res.status(200).send(`get todo task having ${req.params.id}`);
});

const createTask = asyncHandler(async (req, res) => {
    res.status(200).send("todo task created");
});

const updateTask = asyncHandler(async (req, res) => {
    res.status(200).send(`update todo task having ${req.params.id}`);
});

const deleteTask = asyncHandler(async (req, res) => {
    res.status(200).send(`delete todo task having ${req.params.id}`);
});

module.exports = { getTask, getTasks, createTask, updateTask, deleteTask };
