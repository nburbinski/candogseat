const { count } = require("console");
const express = require("express");
const router = express.Router();
const Food = require("../models/FoodSchema");

// @desc Foods
// @route GET /
router.get("/", async (req, res) => {
  const foods = await Food.find().lean();
  foods.sort((foodA, foodB) => (foodA.count > foodB.count ? -1 : 1));

  res.render("foods", {
    foods: foods,
  });
});

// @desc Search one food
// @route GET /api/foods/:name
router.get("/search", async (req, res) => {
  const name = req.query.name.trim().toLowerCase();

  try {
    const food = await Food.findOne({ name: name });
    console.log(food);
    if (food) {
      await Food.findByIdAndUpdate(food._id, { count: food.count + 1 });
      res.render("food", {
        food: food,
        name: name,
        edible: food.edible,
        description: food._doc.description,
      });
    } else {
      res.render("notFound", {
        name: name,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: `${name} not currently listed ` });
  }
});

module.exports = router;
