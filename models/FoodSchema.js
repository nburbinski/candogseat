const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  poison: {
    type: String,
    enum: ["YES", "NO", "MAYBE"],
    required: true,
  },
});

module.exports = mongoose.model("Food", FoodSchema);
