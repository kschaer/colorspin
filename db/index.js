const db = require("./db");
const Color = require("./Color");
const Palette = require("./Palette");

Color.belongsToMany(Palette, { through: "colorPalette" });
Palette.belongsToMany(Color, { through: "colorPalette" });

module.exports = {
  db,
  Color,
  Palette
};
