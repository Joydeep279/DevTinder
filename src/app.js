const express = require("express");
const app = express();
const { connectDB } = require("./configs/database");
const User = require("./configs/databaseSchema");
const { signupValidator } = require("./middlewares/validator");
const { compareSync } = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(cookieParser());

app.get("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await User.findOne({ email: email });

    if (!userData) {
      throw new Error("Wrong User Credentials");
    } else {
      if (compareSync(password, userData.password)) {
        const token = jwt.sign({ email: userData.email }, "Joydeep@279");
        res.cookie("token", token);
        res.status(200).send("Login Successfull!");
      } else {
        res.status(400).send("Wrong User Credentials");
      }
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post("/signup", async (req, res) => {
  try {
    const userCredentials = signupValidator(req.body);
    const user = new User(userCredentials);
    await user.save();
    res.status(201).send("Data Saved Successfully");
  } catch (error) {
    res.status(403).send(error.message);
  }
});

app.get("/user", async (req, res) => {
  try {
    const decoded = jwt.verify(req.cookies.token, "Joydeep@279");

    const document = await User.findOne({
      email: decoded.email,
    });

    if (!document) {
      res.status(404).send("Error Collecting Data");
    } else {
      res.send(document.firstName + " " + document.lastName);
    }
  } catch (error) {
    res.status(404).send("Error Collecting Data");
  }
});

app.patch("/signup/:userID", async (req, res) => {
  try {
    const allowedUpdate = ["firstName", "lastName", "age", "gender"];
    const isUpdateAllowed = Object.keys(req.body).every((keys) =>
      allowedUpdate.includes(keys)
    );
    if (!isUpdateAllowed) {
      res.status(403).send("Update not Allowed");
    } else {
      await User.findByIdAndUpdate(req.params.userID, req.body);
      res.status(201).send("Success!");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

connectDB()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server Started Successfully!");
    });
  })
  .catch((err) => {
    console.log("OOPS Error occurred!", err);
  });
