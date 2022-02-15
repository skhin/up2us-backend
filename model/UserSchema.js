const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      min: 3,
      max: 30,
    },
    hash_password: {
      type: String,
      required: true,
    },
  },
  { collection: "users" },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
