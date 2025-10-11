const express = require("express");
const app = express();

app.get("/user", (req, res) => {
  if (req.headers["user-agent"].includes("Postman")) {
    //request from postman
    res.send({ Fname: "Joydeep", Lname: "Nath" });
  } else {
    //request from other Apps
    res.send("<h1>Welcome Joydeep Nath</h1>");
  }
});

app.get("/test", (req, res) => {
  res.send("Welcome to test Page");
});

app.use("/", (req, res) => {
  if (req.headers["user-agent"].includes("Postman")) {
    //request from postman
    res.send({ status: "Success" });
  } else {
    //request from other Apps
    res.send("<h1>Welcome Joydeep Nath</h1>");
  }
});
app.listen(3000, () => {
  console.log("Server Started SuccessFully!");
});
