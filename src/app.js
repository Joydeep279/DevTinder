const express = require("express");

const app = express();

app.use("/hello", (req, res) => {
  res.send("Routed /hello");
});

app.use("/test/get", (req, res) => {
  res.send("Routed to /test/get");
});

app.use("/test", (req, res) => {
  res.send("Routed to /test");
});

app.use("/", (req, res) => {
  res.send("Server responding root");
});

app.listen(3000, () => {
  console.log("Server Started SuccessFully!");
});
console.log(app.listen);
