const express = require("express");
const app = express();
const authArray = require("./middlewares/auth");

app.use("/data", authArray[0]);

app.get("/data/100", (req, res) => {
  res.send({
    Fname: "Joydeep",
    Lname: "Nath",
    age: 20,
    email: "joydeepnath279@gmail.com",
    password: "5d41402abc4b2a76b9719d911017c592",
  });
});
app.post("/data/100", (req, res) => {
  res.send("data Injected!");
});

app.use("/login", authArray[1]);

app.post("/login", (req, res) => {
  res.send("POST:Logged IN");
});

app.get("/login", (req, res) => {
  res.send("GET:Logged IN");
});

app.use("/", (req, res) => {
  res.status(404).send("Bad Request No Route Found!");
});

app.listen(3000, () => {
  console.log("Server Started Successfully!");
});
