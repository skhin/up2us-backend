const mongoose = require("mongoose");

const FavSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    option: [
      {
        itemId: { type: String, required: true },
        favCuisine: { type: String, required: true },
      },
    ],
  },
  { collection: "favCuisine" }
);

const FavCuisine = mongoose.model("favCuisine", FavSchema);
module.exports = FavCuisine;
