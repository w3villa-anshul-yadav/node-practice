const express = require("express");
const route = express.Router();
const validateToken = require("../middleWare/validateTockenHandler");

const {
    registerUser,
    loginUser,
    currentUser,
} = require("../controllers/userController");

route.post("/register", registerUser);

route.post("/login", loginUser);

route.get("/current", validateToken, currentUser);

module.exports = route;
