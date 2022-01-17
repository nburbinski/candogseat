const express = require("express");
const router = express.Router();
const Food = require("../../models/FoodSchema");

// Send all foods
router.get("/", async (req, res) => {
  const foods = await Food.find().lean();
  res.send(foods);
  res.render("main", {
    foods: foods,
  });
});

// Get one food
router.get("/:name", async (req, res) => {
  const name = req.params.name;

  try {
    let food = await Food.findOne({ name: name });

    if (food) {
      done(null, food);
    }
  } catch (err) {
    res.status(400).json({ msg: `${name} not currently listed ` });
  }
});

// Create new food
router.post("/", async (req, res) => {
  const newFood = {
    name: req.body.name,
    poison: req.body.poison,
  };

  try {
    await Food.create(newFood);
  } catch (err) {
    console.log(err);
  }
});

// // Update a single member
// router.put("/:id", (req, res) => {
//   const id = req.params.id;
//   const found = MEMBERS.some((member) => member.id == id);

//   if (found) {
//     const updMember = req.body;

//     MEMBERS.forEach((member) => {
//       if (member.id == id) {
//         member.name = updMember.name ? updMember.name : member.name;

//         res.json({ msg: "Member updated" });
//       }
//     });
//   } else {
//     res.status(400).json({ msg: `Member with id ${id} not found` });
//   }
// });

// // Delete a single member
// router.delete("/:id", (req, res) => {
//   const id = req.params.id;
//   const found = MEMBERS.some((member) => member.id == id);

//   if (found) {
//     MEMBERS.remo;
//     res.json({ members: MEMBERS });
//   } else {
//     res.status(400).json({ msg: `Member with id ${id} not found` });
//   }
// });

module.exports = router;
