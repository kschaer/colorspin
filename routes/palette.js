const express = require("express");
const router = express.Router();

const { Palette, Color } = require("../db");

//GET api/palettes
router.get("/", async (req, res, next) => {
  try {
    const palettes = await Palette.findAll({ include: [Color] });
    res.json(palettes);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
