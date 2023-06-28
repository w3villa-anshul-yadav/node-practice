const express = require("express");
const router = express.Router();
const validateToken = require("../middleWare/validateTockenHandler");

const {
    getContact,
    getContacts,
    createContact,
    updateContact,
    deleteContact,
} = require("../controllers/contactController");

router.use(validateToken);
router.route("/").get(getContacts).post(createContact);

router.route("/:id").get(getContact).patch(updateContact).delete(deleteContact);

module.exports = router;
