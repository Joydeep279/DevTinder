const express = require("express");

const app = express();
app.use("/", (req, res) => {
  res.send("Hello From Server!");
});

app.use("/test", (req, res) => {
  res.send("Testing the Server!");
});

app.use("/about", (req, res) => {
  res.send("This is About Page");
});

app.listen(3000, () => {
  console.log("Server Started SuccessFully!");
});