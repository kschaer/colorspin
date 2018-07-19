const Sequelize = require("sequelize");
const db = require("./db");

const Color = db.define("color", {
  name: Sequelize.STRING,
  hex: Sequelize.STRING
});

module.exports = Color;
