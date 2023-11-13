const dbConfig = require("../db.js");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("connected");
  })
  .catch((err) => console.log(err));

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.accounts = require("./account.js")(sequelize, DataTypes);
db.users = require("./user.js")(sequelize, DataTypes);
db.tags = require("./tag.js")(sequelize, DataTypes);
db.events = require("./event.js")(sequelize, DataTypes);
db.links = require("./link.js")(sequelize, DataTypes);
db.baseline_survey = require("./baseline_survey.js")(sequelize, DataTypes);
db.endofday_survey = require("./endofday_survey.js")(sequelize, DataTypes);
db.user_tags = require("./user_tags.js")(sequelize, DataTypes);
module.exports = db;
