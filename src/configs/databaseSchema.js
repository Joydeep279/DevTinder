const mongoose = require("mongoose");
const { isEmail, isURL, isStrongPassword } = require("validator");
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
      validate(value) {
        if (!isEmail(value)) {
          throw new Error("Email Not Valid!");
        }
      },
    },
    password: {
      type: String,
      validate(value) {
        if (!isStrongPassword(value)) {
          throw new Error("Password too weak!");
        }
      },
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
      validate(value) {
        if (!isURL(value)) {
          throw new Error("Improper URL!");
        }
      },
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Users", userSchema);
