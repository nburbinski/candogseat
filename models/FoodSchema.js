const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  edible: {
    type: String,
    enum: ["YES", "NO", "MAYBE"],
    required: true,
  },
  count: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = mongoose.model("Food", FoodSchema);
