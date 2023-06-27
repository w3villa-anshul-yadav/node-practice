const mongoose = require("mongoose");

const conatctSchema = mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        name: {
            type: String,
            required: [true, "please add name"],
        },
        email: {
            type: String,
            required: [true, "please add email"],
        },
        phone: {
            type: String,
            required: [true, "please add phone number"],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Contact", conatctSchema);
