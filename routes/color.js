const express = require("express");
const router = express.Router();
const { Color, Palette } = require("../db");

router.get("/", async (req, res, next) => {
  try {
    const colors = await Color.findAll({
      include: [Palette]
    });
    res.json(colors);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
