const asyncHandler = require("express-async-handler");
const DB = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = DB.User;

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
            res.status(201).json({
                data: {
                    name: user.name,
                    email: user.email,
                    id: user.id,
                },
                message: "User Created",
                status: true,
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

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields Are Required");
    }
    let user;

    user = await User.findOne({
        where: {
            email,
        },
    });
    if (user && (await bcrypt.compare(password, user.password))) {
        let token;
        try {
            token = jwt.sign(
                {
                    user: {
                        email: user.email,
                        name: user.name,
                        id: user.id,
                    },
                },
                process.env.SECTRET_ACCESS_KEY,
                { expiresIn: "1m" }
            );
        } catch (error) {
            console.log(error);
        }
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

const currentUser = asyncHandler(async (req, res) => {
    res.status(200).json({
        data: "",
        message: "Current User",
    });
});

module.exports = { registerUser, loginUser, currentUser };
