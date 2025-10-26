//ts-worksheet
const express = require("express");
const route = express.Router();
const User = require("../configs/databaseSchema");
const { signupValidator } = require("../middlewares/validator");
route.get("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await User.findOne({ email: email });

    if (!userData) {
      throw new Error("Wrong User Credentials");
    } else {
      if (userData.verifyPassword(password)) {
        const token = userData.generateToken();
        res.cookie("token", token, {
          expires: new Date(Date.now() + 168 * 3600000),
        });
        res.status(200).send("Login Successfull!");
      } else {
        res.status(400).send("Wrong User Credentials");
      }
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

route.post("/signup", async (req, res) => {
  try {
    const userCredentials = signupValidator(req.body);
    const user = new User(userCredentials);
    await user.save();
    res.status(201).send("Data Saved Successfully");
  } catch (error) {
    res.status(403).send(error.message);
  }
});

route.get("/logout", async (req, res) => {
  try {
    res.clearCookie("token").send("Cookie Cleared");
  } catch (error) {
    throw new Error("Failed to LogOut");
  }
});

module.exports = route;
