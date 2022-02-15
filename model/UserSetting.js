const mongoose = require("mongoose");

const UserSettingSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    restaurants: [
      {
        restId: { type: String, required: true },
        name: { type: String, required: true },
        address: { type: String, required: true },
      },
    ],
  },
  { collection: "userSettings" },
  { timestamps: true }
);

module.exports = mongoose.model("UserSetting", UserSettingSchema);
