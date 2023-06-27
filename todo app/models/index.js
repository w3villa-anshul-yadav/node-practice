const { Sequelize } = require("sequelize");
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
    .catch((err) => {
        console.log(err);
        process.exit(1);
    });

const DB = {};

DB.Sequelize = Sequelize;
DB.sequelize = sequelize;

DB.Task = require("./Task.js")(sequelize);

DB.sequelize.sync({ force: false }).then(() => {
    console.log("DB SYNCed SucessFully");
});

module.exports = DB;
