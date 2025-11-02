const express = require("express");
const auth = require("../middlewares/auth");
const Connection = require("../configs/connectionSchema");
const router = express.Router();

router.get("/user/requests", auth, async (req, res) => {
  try {
    const { _id } = req.userData;
    const requestsList = await Connection.find({
      fromUser: _id,
      status: "interested",
    }).populate("toUser", ["firstName", "lastName"]);
    const jsonData = requestsList.map((items) => items.toUser);
    res.json({ data: jsonData });
  } catch (error) {
    throw new Error("MESSAGE: ", error.message);
  }
});

router.get("/user/connections", auth, async (req, res) => {
  try {
    const { _id } = req.userData;

    const allConnections = await Connection.find({
      $or: [
        { fromUser: _id, status: "accepted" },
        { toUser: _id, status: "accepted" },
      ],
    }).populate("toUser", ["firstName", "lastName", "profileURL"]);
    const jsonData = allConnections.map((items) => items.toUser);
    res.json(jsonData);
  } catch (error) {
    res.status(400).send("ERROR: ", error.message);
  }
});

module.exports = router;
