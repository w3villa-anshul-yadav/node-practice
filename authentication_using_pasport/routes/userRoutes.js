const express = require("express");
const route = express.Router();

const {
    registerUser,
    loginUser,
    logOutUser,
} = require("../controller/userController");

const checkUserAuthentication = require("../middleware/checkUserAuthenticationMiddleware");
const checkUserNotAuthentication = require("../middleware/checkUserNotAuthenticationMiddleware");

route.get("/", checkUserAuthentication, (req, res) => {
    res.render("index.ejs", { userName: req.user?.email });
});

route.get("/login", checkUserNotAuthentication, (req, res) => {
    res.render("login.ejs");
});

route.get("/register", checkUserNotAuthentication, (req, res) => {
    res.render("register.ejs");
});

route.post("/register", checkUserNotAuthentication, registerUser);

route.post("/login", checkUserNotAuthentication, loginUser);

route.delete("/logout", checkUserAuthentication, logOutUser);

module.exports = route;
