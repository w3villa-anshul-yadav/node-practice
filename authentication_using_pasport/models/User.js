const mongoose = require("mongoose");

const User = mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email is already taken"],
    },
    password: {
        type: String,
        required: [true, "Password is mandetory"],
    },
});

module.exports = mongoose.model("User", User);
