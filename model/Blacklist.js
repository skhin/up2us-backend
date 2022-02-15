const mongoose = require("mongoose");

const BlacklistSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    favLoc: [
      {
        loc: { type: String, required: true },
        add: { type: String, required: true },
      },
    ],
  },
  { collection: "blacklist" }
);

const Blacklist = mongoose.model("blacklist", BlacklistSchema);
module.exports = Blacklist;
