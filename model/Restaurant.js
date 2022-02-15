const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    review: { type: String },
    cuisine: [{ type: String, required: true }],
    price: { type: String, required: true },
    occasion: [{ type: String, required: true }],
  },
  { collection: "restaurant" },
  { timestamps: true }
);

const Restaurant = mongoose.model("restaurant", RestaurantSchema);
module.exports = Restaurant;
