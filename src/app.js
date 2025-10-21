const express = require("express");
const app = express();
const { connectDB } = require("./configs/database");
const User = require("./configs/databaseSchema");
app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send("Data Saved Successfully");
  } catch (error) {
    res.status(403).send(error.message);
  }
});

app.get("/user", async (req, res) => {
  try {
    const document = await User.findOne(req.body);
    if (!document) {
      res.status(404).send("Error Collecting Data");
    } else {
      res.send(document);
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
