
const validateToken = require("../middleWares/validateTokenMiddleware");

const {
    registerUser,
    loginUser,
    currentUser,
} = require("../controller/userController");

const express = require("express");
const router = express.Router();

// Users Routes
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/current").get(validateToken, currentUser);

module.exports = router;
