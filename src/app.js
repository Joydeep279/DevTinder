const express = require("express");
const app = express();
const { connectDB } = require("./configs/database");
const User = require("./configs/databaseSchema");

app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    const user = new User(req.body);
    user.save();
    res.send("Data Saved Successfully");
  } catch (error) {
    res.send("Error Occurred!!", error.message);
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

connectDB()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server Started Successfully!");
    });
  })
  .catch((err) => {
    console.log("OOPS Error occurred!", err);
  });
