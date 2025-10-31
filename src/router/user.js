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

    res.json({ data: requestsList });
  } catch (error) {
    throw new Error("MESSAGE: ", error.message);
  }
});

module.exports = router;
