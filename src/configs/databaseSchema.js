const mongoose = require("mongoose");
const { isEmail, isURL } = require("validator");
const { jwtPrivateKey } = require("../utils/constants");
const jwt = require("jsonwebtoken");
const { compare, compareSync } = require("bcrypt");
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
userSchema.methods.generateToken = function () {
  return jwt.sign({ _id: this._id }, jwtPrivateKey, {
    expiresIn: "7d",
  });
};

userSchema.methods.verifyPassword = function (inputPassword) {
  return compareSync(inputPassword, this.password);
};

module.exports = mongoose.model("Users", userSchema);
