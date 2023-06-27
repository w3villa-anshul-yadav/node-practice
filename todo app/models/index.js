const { Sequelize, DataTypes } = require("sequelize");
const DBConstants = require("../config/DBconfig");

const sequelize = new Sequelize(
    DBConstants.DATABASE_NAME,
    DBConstants.USER,
    DBConstants.PASSWORD,
    {
        host: DBConstants.HOST,
        dialect: DBConstants.DIALECT,
    }
);

sequelize
    .authenticate()
    .then(() => {
        console.log("Connected to DataBase");
    })
    .catch(() => {
        throw new Error("DataBase did not Connect properly");
        process.exit(1);
    });

const DB = {};

DB.Sequelize = Sequelize;
DB.sequelize = sequelize;

DB.task = require("./Task.js")(sequelize);

DB.sequelize.sync({ force: false });

module.exports = DB;
