const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const logger = require("../logger");

const DB = require("../models");
const User = DB.User;

//utility function
const generateToken = (user, roles) => {
    return jwt.sign(
        {
            user: {
                email: user.email,
                name: user.name,
                id: user.id,
                roles,
            },
        },
        process.env.SECTRET_ACCESS_KEY,
        { expiresIn: "10m" }
    );
};

// controller function

// @discription Register New User
// @route POST api/user/register
// @access public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error("All fields Are Required");
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const existingUser = await User.findAll({ where: { email } });

        if (existingUser.length !== 0) {
            res.status(400).json({
                status: false,
                message: "User is already created",
            });
        } else {
            const user = await User.create({
                name,
                email,
                password: hashedPassword,
            });

            if (user) {
                const roles = ["user"];

                await user.addRole(2); // w is primary key for User Role

                const token = generateToken(user, roles);

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
        }
    } catch (error) {
        logger.error(error.toString());
        return res
            .status(500)
            .json({ status: false, msg: "Internal server error", error });
    }
});

// @discription Login  User
// @route POST api/user/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        logger.error("All fields Are Required");
        throw new Error("All fields Are Required");
    }

    try {
        const user = await User.findOne({
            where: {
                email,
            },
        });

        if (!user) {
            logger.error("Email did not matched");
            res.status(400).json({
                sucess: false,
                message: "Email did not matched",
            });
        }

        if (user && (await bcrypt.compare(password, user.password))) {
            const roles = await user.getRoles();

            const rolesName = roles.map((role) => role.name);

            const token = generateToken(user, rolesName);

            if (token) {
                logger.info("User logged In");
                res.status(200).json({
                    status: true,
                    message: "User logged In",
                    token,
                });
            }
        } else {
            logger.error("Password did not matched");
            res.status(400).json({
                sucess: false,
                message: "Password did not matched",
            });
        }
    } catch (error) {
        logger.error(error.toString());
        return res
            .status(500)
            .json({ status: false, msg: "Internal server error", error });
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

module.exports = { registerUser, loginUser, currentUser };
