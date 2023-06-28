const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//utility functions

const checkContactAvilability = (contact, response) => {
    if (!contact) {
        response
            .status(404)
            .json({ status: false, message: "Contact not found" });
        return false;
    }
    return true;
};

const checkUserAuthorization = (contact, request, response) => {
    if (contact.user_id.toString() !== request.user.id) {
        response.status(403).json({
            status: false,
            message: "Unauthorized Access to Contacts",
        });
        return false;
    }
    return true;
};

// controller functions

// @discription get all contacts
// @route GET api/contacts/
// @access private

const getContacts = asyncHandler(async (request, response) => {
    try {
        const contacts = await Contact.find({ user_id: request.user.id });

        if (checkContactAvilability(contacts, response)) {
            response.status(200).json({
                status: true,
                message: " Contact fetched Sucessfully",
                contacts,
            });
        }
    } catch (err) {
        console.error(err);
        return response
            .status(500)
            .json({ status: false, msg: "Internal server error" });
    }
});

// @discription get contact  with id
// @route GET api/contacts/id
// @access private

const getContact = asyncHandler(async (request, response) => {
    try {
        const contact = await Contact.findById(request.params.id);

        if (
            checkContactAvilability(contact, response) &&
            checkUserAuthorization(contact, request, response)
        ) {
            response.status(200).json({
                status: true,
                message: "Contact fetched Sucessfully",
                contact,
            });
        }
    } catch (err) {
        console.error(err);
        return response
            .status(500)
            .json({ status: false, msg: "Internal server error" });
    }
});

// @discription create new Contact
// @route POST api/contacts/
// @access private

const createContact = asyncHandler(async (request, response) => {
    const { name, email, phone } = request.body;

    if (!name || !email || !phone) {
        response.status(400);
        throw new Error("All fields are required");
    }

    try {
        const contact = await Contact.create({
            name,
            email,
            phone,
            user_id: request.user.id,
        });
        response.status(200).json({
            status: true,
            message: "Contact Created Sucessfully",
            contact,
        });
    } catch (err) {
        console.error(err);
        return response
            .status(500)
            .json({ status: false, msg: "Internal server error" });
    }
});

// @discription update contact
// @route PUT api/contacts/id
// @access private

const updateContact = asyncHandler(async (request, response) => {
    try {
        const contact = await Contact.findById(request.params.id);

        if (
            checkContactAvilability(contact, response) &&
            checkUserAuthorization(contact, request, response)
        ) {
            const updatedContact = await Contact.findByIdAndUpdate(
                request.params.id,
                request.body,
                { new: true }
            );

            response.status(200).json({
                status: true,
                message: "Contact Updated Sucessfully",
                updatedContact,
            });
        }
    } catch (err) {
        console.error(err);
        return response
            .status(500)
            .json({ status: false, msg: "Internal server error" });
    }
});

// @discription Delete Contact
// @route DELETE api/contacts/id
// @access private

const deleteContact = asyncHandler(async (request, response) => {
    try {
        const contact = await Contact.findById(request.params.id);

        if (
            checkContactAvilability(contact, response) &&
            checkUserAuthorization(contact, request, response)
        ) {
            await Contact.deleteOne({ _id: request.params.id });
            response.status(200).json({
                status: true,
                message: "Contact Deleted Sucessfully",
                deletedContact: contact,
            });
        }
    } catch (err) {
        console.error(err);
        return response
            .status(500)
            .json({ status: false, msg: "Internal server error" });
    }
});

module.exports = {
    getContact,
    getContacts,
    createContact,
    updateContact,
    deleteContact,
};
