const mongoose = require("mongoose");

const NonFavSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    option: [
      {
        itemId: { type: String, required: true },
        nonFav: { type: String, required: true },
      },
    ],
  },
  { collection: "nonfav" }
);

const NonFavCuisine = mongoose.model("nonfav", NonFavSchema);
module.exports = NonFavCuisine;
