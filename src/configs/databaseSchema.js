const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
    },
    profileURL: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/456/456283.png",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Users", userSchema);
