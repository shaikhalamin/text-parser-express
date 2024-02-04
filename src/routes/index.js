const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res) {
  res.status(200).json({
    success: true,
    message: "Welcome to the File Parser API",
    data: null,
  });
});

module.exports = router;
