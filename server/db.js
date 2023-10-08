require("dotenv").config();
module.exports = {
  HOST: process.env.HOST,
  USER: process.env.USER,
  PASSWORD: "",
  DB: process.env.DB,
  dialect: process.env.DIALECT,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
  },
};
