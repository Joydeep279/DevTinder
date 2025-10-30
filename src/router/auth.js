const express = require("express");
const router = express.Router();
const User = require("../configs/databaseSchema");
const { signupValidator } = require("../middlewares/validator");
const auth = require("../middlewares/auth");
const jwt = require("jsonwebtoken");
const { jwtPrivateKey } = require("../utils/constants");
const { hash } = require("bcrypt");
router.get("/login", async (req, res) => {
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

router.post("/signup", async (req, res) => {
  try {
    const userCredentials = signupValidator(req.body);
    const user = new User(userCredentials);
    await user.save();
    res.status(201).send("Data Saved Successfully");
  } catch (error) {
    res.status(403).send(error.message);
  }
});

router.get("/logout", async (req, res) => {
  try {
    res.clearCookie("token").send("Cookie Cleared");
  } catch (error) {
    throw new Error("Failed to LogOut");
  }
});

router.patch("/change-password", auth, async (req, res) => {
  try {
    const { curPassword, newPassword } = req.body;
    // retrieve userID from token
    const { _id } = jwt.verify(req.cookies.token, jwtPrivateKey);

    // get the userdetails

    const user = await User.findById(_id);

    if (user.verifyPassword(curPassword)) {
      // compare  the current password with the stored(hashed form) one in the DB
      const hashedPassword = await hash(newPassword, 10);

      await User.findByIdAndUpdate(_id, { password: hashedPassword });
      res.send("Password Change");
    } else {
      res.status(400).send("Invalid Password!");
    }
  } catch (error) {
    res.status(400).send("Invalid Password");
  }
});

module.exports = router;
