const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Task = sequelize.define("Task", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        description: {
            type: DataTypes.TEXT,
        },
    });
    return Task;
};
