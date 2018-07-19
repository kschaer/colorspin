const Sequelize = require("sequelize");
const db = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost:5432/colorspin",
  {
    logging: false
  }
);

module.exports = db;
