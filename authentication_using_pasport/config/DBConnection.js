const mongoose = require("mongoose");

module.exports = () => {
    mongoose
        .connect(process.env.CONNECTION_STRING)
        .then(() => {
            console.log("DataBase Connected");
        })
        .catch((err) => {
            console.log(err);
        });
};
