const express = require("express");
const router = express.Router();
const Food = require("../models/FoodSchema");

// @desc Dashbaord
// @route GET /
router.get("/", async (req, res) => {
  const foods = await Food.find().lean();
  res.render("main", {
    foods: foods,
  });
});

module.exports = router;
