const { Sequelize } = require("sequelize");
const DBConstants = require("../config/DBconfig");

const sequelize = new Sequelize(
    DBConstants.DATABASE_NAME,
    DBConstants.USER,
    DBConstants.PASSWORD,
    {
        host: DBConstants.HOST,
        dialect: DBConstants.DIALECT,
        password: DBConstants.PASSWORD,
    }
);

sequelize
    .authenticate()
    .then((obj) => {
        console.log(obj);
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
DB.User = require("./User.js")(sequelize);

DB.sequelize.sync({ force: false }).then(() => {
    console.log("DB SYNCed SucessFully");
});

module.exports = DB;
