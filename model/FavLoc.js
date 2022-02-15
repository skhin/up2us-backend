const mongoose = require("mongoose");

const FavLocSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    favLoc: [
      {
        loc: { type: String, required: true },
        add: { type: String, required: true },
      },
    ],
  },
  { collection: "favLoc" }
);

const FavLoc = mongoose.model("favLoc", FavLocSchema);
module.exports = FavLoc;
