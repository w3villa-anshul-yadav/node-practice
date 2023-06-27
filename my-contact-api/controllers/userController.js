const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = {
    // @discription Register new User
    // @route POST api/user/register
    // @access public
    registerUser: asyncHandler(async (request, response) => {
        const { name, email, password } = request.body;
        if (!name || !email || !password) {
            response.status(400);
            throw new Error("All fields Are Required");
        }
        const userAvilable = await User.findOne({ email });
        if (userAvilable) {
            response.status(400);
            throw new Error("User is already Created");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        if (user) {
            response.status(201).json({
                _id: user.id,
                email: user.email,
                status: true,
            });
        } else {
            response.status(400);
            throw new Error("user not created");
        }
    }),

    // @discription Login   User
    // @route POST api/user/login
    // @access public

    loginUser: asyncHandler(async (request, response) => {
        const { email, password } = request.body;
        if ((!email, !password)) {
            response.status(400);
            throw new Error("All field are required");
        }
        const user = await User.findOne({ email });
        console.log(`user found : ${user}`);
        if (user && (await bcrypt.compare(password, user.password))) {
            const acessToken = jwt.sign(
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

            response.status(200).json({ acessToken, status: true });
        } else {
            response.status(401);
            console.log("Email or Password did not Matched");
            throw new Error("Email or Password did not Matched");
        }
    }),

    // @discription Get Current User
    // @route GET api/user/current
    // @access private

    currentUser: asyncHandler(async (request, response) => {
        response.status(200).json(request.user);
    }),
};
