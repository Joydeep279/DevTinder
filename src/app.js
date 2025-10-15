const express = require("express");
const app = express();
const { connectDB } = require("./configs/database");
const User = require("./configs/databaseSchema");

app.post("/signup", async (req, res) => {
  const userData = {
    firstName: "Joydeep",
    lastName: "Nath",
    email: "joydeepnath279@gmail.com",
    age: 22,
    gender: "male",
  };
  try {
    const user = new User(userData);
    user.save();
    res.send("Data Saved Successfully");
  } catch (error) {
    res.send("Error Occurred!!", error.message);
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
