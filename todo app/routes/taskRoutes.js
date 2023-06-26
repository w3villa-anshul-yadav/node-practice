const express = require("express");
const router = express.Router();

router.route("/").get((req, res) => {
    res.status(200).send("get all todo list");
});

router.route("/").post((req, res) => {
    res.status(200).send("todo task created");
});

router.route("/:id").get((req, res) => {
    res.status(200).send(`get todo task having ${req.params.id}`);
});

router.route("/:id").put((req, res) => {
    res.status(200).send(`update todo task having ${req.params.id}`);
});

router.route("/:id").delete((req, res) => {
    res.status(200).send(`delete todo task having ${req.params.id}`);
});

module.exports = router;
