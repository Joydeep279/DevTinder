const express = require("express");
const app = express();
const { connectDB } = require("./configs/database");
const User = require("./configs/databaseSchema");
const { signupValidator } = require("./middlewares/validator");
const cookieParser = require("cookie-parser");
const auth = require("./middlewares/auth");

app.use(express.json());
app.use(cookieParser());

app.get("/login", async (req, res) => {
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

app.get("/user", auth, (req, res) => {
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

app.get("/profile", auth, (req, res) => {
  try {
    res.send(req.userData);
  } catch (error) {
    res.send(error.message);
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
    res.status(400).send(error.message);
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
