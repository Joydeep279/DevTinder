const express = require("express");
const app = express();

app.get("/abc/:userID", (req, res) => {
  console.log(req.params.userID);

  res.send("Regex Worked!");
});

app.get("/user", (req, res) => {
  if (req.headers["user-agent"].includes("Postman")) {
    res.send({ Fname: "Joydeep", Lname: "Nath" });
  } else {
    res.send("<h1>Welcome Joydeep Nath</h1>");
  }
});

app.get("/test", (req, res) => {
  res.send("Welcome to test Page");
});

app.post("/user", (req, res) => {
  res.send("Send to server Successfully");
});

app.delete("/user", (req, res) => {
  res.send("Delete Request Recieved");
});

app.patch("/user", (req, res) => {
  res.send("Patched!");
});

app.use("/", (req, res) => {
  if (req.headers["user-agent"].includes("Postman")) {
    res.send({ status: "No Route Found" });
  } else {
    res.send("<h1>No Route Found</h1>");
  }
});

app.listen(3000, () => {
  console.log("Server Started SuccessFully!");
});
