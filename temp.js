const express = require("express");
const app = express();
// console.log("Script Started!");

app.use(
  "/user",
  (req, res, next) => {
    console.log("1st Route Handler");
    next();
    console.log("After Next() 1");
  },
  (req, res, next) => {
    console.log("2nd Route Handler");
    next();
    console.log("After Next() 2");
  },
  (req, res, next) => {
    console.log("3rd Route Handler");
    next();
    console.log("After Next() 3");
  },
  (req, res, next) => {
    console.log("4th Route Handler");
    next();
    console.log("After Next() 4");
  }
);
app.get("/user", (req, res) => {
  res.send("you are on root");
});
app.get("/test", (req, res) => {
  res.send("you are on test");
});
app.use("/", (req, res) => {
  if (req.headers["user-agent"].includes("Postman")) {
    res.send({ status: "No Route Found" });
  } else {
    res.send("<h1>No Route Found</h1>");
  }
});
app.listen(3000, () => {
  console.log("Server Started Successfully!");
});
