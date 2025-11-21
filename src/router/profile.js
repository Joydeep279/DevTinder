const express = require("express");
const route = express.Router();
const auth = require("../middlewares/auth");
const User = require("../configs/databaseSchema");

route.get("/profile/view", auth, (req, res) => {
  try {
    res.send(req.userData);
  } catch (error) {
    res.status(403).send(error.message);
  }
});

route.patch("/profile/edit", auth, async (req, res) => {
  try {
    const allowedUpdate = ["firstName", "lastName", "profileURL", "gender"];
    const isUpdateAllowed = Object.keys(req.body).every((keys) =>
      allowedUpdate.includes(keys)
    );
    if (!isUpdateAllowed) {
      res.status(403).send("Update not Allowed");
    } else {
      console.log(req.userData._id);

      const userData = await User.findByIdAndUpdate(
        req.userData._id,
        req.body
      );
      res.status(201).send({ userData });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// route.patch("/profile/password", auth, async (req, res) => {});

route.get("/user", auth, (req, res) => {
  try {
    if (!req.userData) {
      res.status(404).send("Error Collecting Data");
    } else {
      res.send(req.userData.firstName + " " + req.userData.lastName);
    }
  } catch (error) {
    res.status(404).send("Error Collecting Data");
  }
});

module.exports = route;
