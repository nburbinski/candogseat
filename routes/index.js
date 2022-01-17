const express = require("express");
const router = express.Router();
const Food = require("../models/FoodSchema");

// @desc Foods
// @route GET /
router.get("/", async (req, res) => {
  const foods = await Food.find().lean();
  foods.sort((foodA, foodB) => (foodA.count > foodB.count ? -1 : 1));

  res.render("main", {
    foods: foods,
  });
});

// @desc Search one food
// @route GET /api/foods/:name
router.get("/search", async (req, res) => {
  const name = req.query.name;
  try {
    let food = await Food.findOne({ name: name });
    res.render("main", {
      foods: food,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: `${name} not currently listed ` });
  }
});

module.exports = router;
