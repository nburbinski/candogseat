const express = require("express");
const router = express.Router();
const Food = require("../models/FoodSchema");

// @desc Dashbaord
// @route GET /
router.get("/", async (req, res) => {
  const foods = await Food.find().lean();
  foods.sort((foodA, foodB) => (foodA.count > foodB.count ? -1 : 1));

  res.render("main", {
    foods: foods,
  });
});

module.exports = router;
