const express = require("express");
const router = express.Router();

/* GET home page. */
router.use("/users", require("./users"));
//router.use("/palettes", require("./palette"));

//"main" api route
router.get("/", function(req, res, next) {
  try {
    console.log("main api route");
    res.send("api is alive");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
