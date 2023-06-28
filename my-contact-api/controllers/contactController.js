const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// @discription get all contacts
// @route GET api/contacts/
// @access private

const getContacts = asyncHandler(async (request, response) => {
    const contacts = await Contact.find({ user_id: request.user.id });
    if (!contacts) {
        response.status(400);
        throw new Error("no contact found");
    }
    response.status(200).json({
        status: true,
        message: "All Contact fetched Sucessfully",
        contacts,
    });
});

// @discription get contact  with id
// @route GET api/contacts/id
// @access private

const getContact = asyncHandler(async (request, response) => {
    const contact = await Contact.findById(request.params.id);

    if (!contact) {
        response.status(404);
        throw new Error("Contact not found");
    }
    if (contact.user_id.toString() !== request.user.id) {
        response.status(403);
        throw new Error("Unauthorized Access to Contacts");
    }

    response.status(200).json({
        status: true,
        message: "Contact fetched Sucessfully",
        contact,
    });
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
});

// @discription update contact
// @route PUT api/contacts/id
// @access private

const updateContact = asyncHandler(async (request, response) => {
    const contact = await Contact.findById(request.params.id);

    if (!contact) {
        response.status(404);
        throw new Error("Contact not found");
    }

    if (contact.user_id.toString() !== request.user.id) {
        response.status(403);
        throw new Error("Unauthorized Access to Contacts");
    }

    const { name, email, phone } = request.body;
    if (!name || !email || !phone) {
        response.status(400);
        throw new Error("All fields are required");
    }

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
});

// @discription Delete Contact
// @route DELETE api/contacts/id
// @access private

const deleteContact = asyncHandler(async (request, response) => {
    const contact = await Contact.findById(request.params.id);

    if (!contact) {
        response.status(404);
        throw new Error("Contact not found");
    }

    if (contact.user_id.toString() !== request.user.id) {
        response.status(403);
        throw new Error("Unauthorized Access to Contacts");
    }

    await Contact.deleteOne({ _id: request.params.id });
    response.status(200).json({
        status: true,
        message: "Contact Deleted Sucessfully",
        deletedContact: contact,
    });
});

module.exports = {
    getContact,
    getContacts,
    createContact,
    updateContact,
    deleteContact,
};
