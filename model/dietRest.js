const mongoose = require("mongoose");

const DietRestSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    option: [
      {
        itemId: { type: String, required: true },
        dietName: { type: String, required: true },
      },
    ],
  },
  { collection: "dietRest" }
);

const DietRest = mongoose.model("dietRest", DietRestSchema);
module.exports = DietRest;
