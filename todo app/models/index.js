const { Sequelize } = require("sequelize");

const DBConstants = require("../config/DBconfig");

const logger = require("../logger");

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
        logger.info("Connected to DataBase");
    })
    .catch((err) => {
        logger.error(err);
        process.exit(1);
    });

const DB = {};

DB.Sequelize = Sequelize;
DB.sequelize = sequelize;

DB.Task = require("./Task.js")(sequelize);
DB.User_Role = require("./User_Role.js")(sequelize);
DB.User = require("./User.js")(sequelize);
DB.Role = require("./Role.js")(sequelize);

DB.User.hasMany(DB.Task);
DB.Task.belongsTo(DB.User);
DB.User.belongsToMany(DB.Role, { through: "User_Role" }); // User_Role is third table for many to many Association
DB.Role.belongsToMany(DB.User, { through: "User_Role" });

DB.sequelize.sync({ force: false }).then(() => {
    logger.info("DB Synced SucessFully");
});

module.exports = DB;
