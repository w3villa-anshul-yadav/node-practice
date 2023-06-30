const asyncHandler = require("express-async-handler");
const DB = require("../models");
const Role = DB.Role;
const User = DB.User;


// utility function 
const getUserRoleName = async (user) => {
    const existingRoles = await user.getRoles();
    return existingRoles.map((roles) => roles.name);
};


//controller function 

// @discription get All Roles
// @route GET api/roles
// @access private to admin 

const getRoles = asyncHandler(async (req, res) => {
    try {
        const roles = await Role.findAll();
        res.status(200).json({ status: true, messgae: "roles ", roles });
    } catch (error) {
        console.log(error);
        res.status(400).json({ status: false, error });
    }
});


// @discription get All Roles
// @route POST api/roles/assign_role
// @access private to admin 

const assignNewRoleToUser = asyncHandler(async (req, res) => {
    const { email, roles } = req.body;

    if (!email || !roles) {
        res.status(400).json({
            status: false,
            messgae: "Email and roles are Required ",
        });
    }
    try {
        const user = await User.findOne({ where: { email } });

        if (user) {
            const existingRolesNames = await getUserRoleName(user);

            console.log("previous roles", await getUserRoleName(user));

            roles.forEach(async (roleName) => {
                if (!existingRolesNames.includes(roleName)) {
                    const role = await Role.findOne({
                        where: { name: roleName },
                    });
                    await user.addRoles(role);
                }
            });

            await user.reload();

            console.log("updated roles", await getUserRoleName(user));

            res.status(201).json({
                status: true,
                messgae: "Roles updated Sucessfully",
                roles: await getUserRoleName(user),
            });
        } else {
            res.status(400).json({
                status: false,
                messgae: "User is not Registred",
            });
        }
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ status: false, msg: "Internal server error" });
    }
});


// @discription get All Roles
// @route DELETE api/roles/remove_role
// @access private to admin 


const removeRole = asyncHandler(async (req, res) => {
    const { email, roles } = req.body;

    if (!email || !roles) {
        res.status(400).json({
            status: false,
            messgae: "Email and roles are Required ",
        });
    }

    try {
        const user = await User.findOne({ where: { email } });

        if (user) {
            const existingRolesNames = await getUserRoleName(user);

            console.log("previous roles", existingRolesNames);

            let roleNotExistCount = 0;

            roles.forEach(async (roleName) => {
                console.log("existing", existingRolesNames.includes(roleName));
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

            console.log("updated roles", await getUserRoleName(user));

            if (roleNotExistCount > 0) {
                res.status(400).json({
                    status: false,
                    messgae: `${roleNotExistCount} does not exist so not removed `,
                });
            }
            res.status(201).json({
                status: true,
                messgae: "Roles Removed Sucessfully",
                roles: await getUserRoleName(user),
            });
        } else {
            res.status(400).json({
                status: false,
                messgae: "User is not Registred",
            });
        }
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ status: false, msg: "Internal server error" });
    }
});

// @discription get All User Roles
// @route GET api/roles/user_role
// @access private to admin 


const getUserRoles = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) {
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
                return res
                    .status(200)
                    .json({ status: false, msg: "roles of user ", rolesName });
            }
        } else {
            return res
                .status(400)
                .json({ status: false, msg: "User does not exist" });
        }
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ status: false, msg: "Internal server error" });
    }
});
module.exports = { getRoles, assignNewRoleToUser, removeRole, getUserRoles };
