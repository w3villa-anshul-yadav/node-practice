const asyncHandler = require("express-async-handler");

const logger = require("../logger");

const DB = require("../models");
const Role = DB.Role;
const User = DB.User;

// utility function

const getUserRoleName = async (user) => {
    //get User roles
    const existingRoles = await user.getRoles();
    return existingRoles.map((roles) => roles.name);
};

//controller function

// @discription get All Roles
// @route GET api/roles
// @access private to admin

const getRoles = asyncHandler(async (req, res) => {
    /**
        #swagger.summary = "Get all roles"
        #swagger.tags = ['Role']
        #swagger.description="Endpoint to get all Role"
     */
    try {
        const roles = await Role.findAll();

        res.status(200).json({ status: true, messgae: "Roles ", roles });
    } catch (error) {
        logger.error(error.toString());
        res.status(400).json({ status: false, error });
    }
});

// @discription get All Roles
// @route POST api/roles/assign_role
// @access private to admin

const assignNewRoleToUser = asyncHandler(async (req, res) => {
    /**
        #swagger.summary = "Assign new roles to user"
        #swagger.tags = ['Role']
        #swagger.description="Endpoint Assign new roles to user"
     */
    const { email, roles } = req.body;

    if (!email || !roles) {
        logger.error("Email and Roles are Required ");

        res.status(400).json({
            status: false,
            messgae: "Email and Roles are Required ",
        });
    }

    try {
        const user = await User.findOne({ where: { email } });

        if (user) {
            const existingRolesNames = await getUserRoleName(user);

            roles.forEach(async (roleName) => {
                if (!existingRolesNames.includes(roleName)) {
                    const role = await Role.findOne({
                        where: { name: roleName },
                    });

                    await user.addRoles(role);
                }
            });

            await user.reload();

            logger.info("Roles Updated Sucessfully","user => " ,req.user ,"role",roles);

            res.status(201).json({
                status: true,
                messgae: "Roles Updated Sucessfully",
                roles: await getUserRoleName(user),
            });
        } else {
            logger.error("User is not Registred");

            res.status(400).json({
                status: false,
                messgae: "User is not Registred",
            });
        }
    } catch (error) {
        logger.error(error.toString());
        return res
            .status(500)
            .json({ status: false, msg: "Internal server error" });
    }
});

// @discription get All Roles
// @route DELETE api/roles/remove_role
// @access private to admin

const removeRole = asyncHandler(async (req, res) => {
    /**
        #swagger.summary = "Remove roles of user"
        #swagger.tags = ['Role']
        #swagger.description="Endpoint Remove roles of user"
     */
    const { email, roles } = req.body;

    if (!email || !roles) {
        logger.error("Email and roles are Required ");

        res.status(400).json({
            status: false,
            messgae: "Email and roles are Required ",
        });
    }

    try {
        const user = await User.findOne({ where: { email } });

        if (user) {
            const existingRolesNames = await getUserRoleName(user);

            let roleNotExistCount = 0;

            roles.forEach(async (roleName) => {
                if (!existingRolesNames.includes(roleName)) {
                    roleNotExistCount++;
                } else {
                    const role = await Role.findOne({
                        where: { name: roleName },
                    });
                    await user.removeRoles(role);
                }
            });

            await user.reload();

            if (roleNotExistCount > 0) {
                logger.error(
                    `${roleNotExistCount} does not exist so not removed `
                );
                res.status(400).json({
                    status: false,
                    messgae: `${roleNotExistCount} does not exist so not removed `,
                });
            }

            logger.info("Roles Removed Sucessfully","user => " ,req.user ,"role",roles);

            res.status(201).json({
                status: true,
                messgae: "Roles Removed Sucessfully",
                roles: await getUserRoleName(user),
            });
        } else {
            logger.error("User is not Registred");

            res.status(400).json({
                status: false,
                messgae: "User is not Registred",
            });
        }
    } catch (error) {
        logger.error(error.toString());
        return res
            .status(500)
            .json({ status: false, msg: "Internal server error" });
    }
});

// @discription get All User Roles
// @route GET api/roles/user_role
// @access private to admin

const getUserRoles = asyncHandler(async (req, res) => {
    /**
        #swagger.summary = "Get roles of user"
        #swagger.tags = ['Role']
        #swagger.description="Endpoint Get roles of user"
     */
    const { email } = req.body;

    if (!email) {
        logger.error("Email is Required ");

        res.status(400).json({
            status: false,
            messgae: "Email is Required ",
        });
    }

    try {
        const user = await User.findOne({ where: { email } });

        if (user) {
            const roles = await user.getRoles();
            const rolesName = roles.map((role) => role.name);
            if (rolesName) {
                logger.info("roles of user ", rolesName);

                return res
                    .status(200)
                    .json({ status: true, msg: "roles of user ", rolesName });
            }
        } else {
            logger.error("User does not exist","user => " ,req.user );

            return res
                .status(400)
                .json({ status: false, msg: "User does not exist" });
        }
    } catch (error) {
        logger.error(error);

        return res
            .status(500)
            .json({ status: false, msg: "Internal server error" });
    }
});
module.exports = { getRoles, assignNewRoleToUser, removeRole, getUserRoles };
