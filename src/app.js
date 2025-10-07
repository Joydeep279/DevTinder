const express = require("express");

const app = express();
app.use("/", (req, res) => {
  res.send("Server responding root");
});

app.use("/hello", (req, res) => {
  res.send("Server responding hello");
});

app.use("/test", (req, res) => {
  res.send("Server responding test");
});

app.listen(3000, () => {
  console.log("Server Started SuccessFully!");
});

