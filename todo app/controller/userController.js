const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const DB = require("../models");
const User = DB.User;

// @discription Register New User
// @route POST api/user/register
// @access public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error("All fields Are Required");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        if (user) {
            console.log("User Created");

            const token = generateToken(user);

            res.status(201).json({
                message: "User Created",
                status: true,
                token,
                data: {
                    name: user.name,
                    email: user.email,
                    id: user.id,
                },
            });
        }
    } catch (error) {
        res.status(400).json({
            status: false,
            message: "User not Registred",
            error,
        });
    }
});

// @discription Login  User
// @route POST api/user/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error("All fields Are Required");
    }

    const user = await User.findOne({
        where: {
            email,
        },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
        const token = generateToken(user);
        console.log("token generated");

        if (token) {
            res.status(200).json({
                status: true,
                message: "User logged In",
                token,
            });
        }
    } else {
        res.status(400);
        throw new Error("email or password did not matched");
    }
});

// @discription Register New User
// @route POST api/user/current
// @access private
const currentUser = asyncHandler(async (req, res) => {
    res.status(200).json({
        status: true,
        user: req.user,
        message: "Current User Details",
    });
});

const generateToken = (user) => {
    return jwt.sign(
        {
            user: {
                email: user.email,
                name: user.name,
                id: user.id,
            },
        },
        process.env.SECTRET_ACCESS_KEY,
        { expiresIn: "10m" }
    );
};

module.exports = { registerUser, loginUser, currentUser };
