const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const passport = require("passport");

const User = require("../models/User");

const registerUser = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: hashedPassword });

        if (user) {
            res.render("login.ejs");
        }
    } catch (error) {
        console.log(error);
        res.render("register.ejs");
    }
});

const loginUser = passport.authenticate("local", {
    failureRedirect: "/api/user/login",
    successRedirect: "/api/user",
    failureFlash: true,
});

const logOutUser = (req, res) => {
    req.logOut((err) => {
        if (!err) {
            res.redirect("/api/user/login");
        }
    });
};

//function used by passport JS

const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email });
        if (user) return user;
    } catch (err) {
        console.log(err);
    }
};

const getUserById = async (userId) => {
    try {
        const user = await User.findOne({ _id: userId });
        if (user) return user;
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    registerUser,
    loginUser,
    logOutUser,
    getUserByEmail,
    getUserById,
};
