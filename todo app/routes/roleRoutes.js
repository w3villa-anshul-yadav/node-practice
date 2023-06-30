const express = require("express");
const router = express.Router();
const DB = require("../models");
const Role = DB.Role;

const {
    getRoles,
    assignNewRoleToUser,
    removeRole,
    getUserRoles,
} = require("../controller/roleController");

const validateToken = require("../middleWares/validateTokenMiddleware");
const validateAdmin = require("../middleWares/validateAdminMiddleware");

router.route("/").get(validateToken, validateAdmin, getRoles);

router.route("/user_role").get(validateToken, validateAdmin, getUserRoles);

router
    .route("/assign_role")
    .post(validateToken, validateAdmin, assignNewRoleToUser);

router.route("/remove_role").delete(validateToken, validateAdmin, removeRole);

module.exports = router;
