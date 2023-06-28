const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// utility function

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
const varifyAllInputAvilability = (name, email, password, response) => {
    if (!name || !email || !password) {
        response.status(400);
        throw new Error("All fields Are Required");
    }
};

// controller functions

// @discription Register new User
// @route POST api/user/register
// @access public
const registerUser = asyncHandler(async (request, response) => {
    const { name, email, password } = request.body;

    varifyAllInputAvilability(name, email, password, response);

    try {
        const userAvilable = await User.findOne({ email });

        if (userAvilable) {
            response.status(400).json({
                status: false,
                message: "User is already Created",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        if (user) {
            const token = generateToken(user);
            response.status(201).json({
                status: true,
                message: "user registred Sucessfully",
                _id: user.id,
                email: user.email,
                token,
            });
        } else {
            response.status(400).json({
                status: false,
                message: "user not created",
            });
        }
    } catch (error) {
        console.error(error);
        return response
            .status(500)
            .json({ status: false, msg: "Internal server error" });
    }
});

// @discription Login   User
// @route POST api/user/login
// @access public

const loginUser = asyncHandler(async (request, response) => {
    const { email, password } = request.body;
    if ((!email, !password)) {
        response.status(400);
        throw new Error("All field are required");
    }

    try {
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            console.log(`user found `);
            const acessToken = generateToken(user);
            response.status(200).json({
                status: true,
                message: "user loged in sucessfully",
                acessToken,
            });
        } else {
            response.status(401);
            console.log("Email or Password did not Matched");
            throw new Error("Email or Password did not Matched");
        }
    } catch (error) {
        console.error(error);
        return response
            .status(500)
            .json({ status: false, msg: "Internal server error" });
    }
});

// @discription Get Current User
// @route GET api/user/current
// @access private

const currentUser = asyncHandler(async (request, response) => {
    response.status(200).json(request.user);
});

module.exports = { registerUser, loginUser, currentUser };
