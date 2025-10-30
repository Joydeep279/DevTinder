const Connection = require("../configs/connectionSchema");
const User = require("../configs/databaseSchema");
const auth = require("../middlewares/auth");
const express = require("express");

const router = express.Router();
router.post("/request/:status/:toUser", auth, async (req, res) => {
  try {
    const { toUser, status } = req.params;
    const fromUser = req.userData._id;

    const allowedStatusType = ["ignored", "interested"];

    if (!allowedStatusType.includes(status)) {
      return res.status(400).json({ error: "Invalid status type" });
    }

    const toUserDetails = await User.findById(toUser);
    if (!toUserDetails) {
      return res.status(404).json({ error: "User does not exist" });
    }

    // prevent self-request
    if (toUser.toString() === fromUser.toString()) {
      return res.status(400).json({ error: "Cannot send request to yourself" });
    }

    // check for existing connection (both directions)
    const existingReq = await Connection.findOne({
      $or: [
        { fromUser, toUser },
        { fromUser: toUser, toUser: fromUser },
      ],
    });

    if (existingReq) {
      return res.status(400).json({ error: "Request already sent!" });
    }

    const document = new Connection({ fromUser, toUser, status });
    await document.save();

    return res.json({ message: `${status} request sent successfully` });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.post("/request/review/:status/:toUser", auth, async (req, res) => {
  try {
    const fromUser = req.userData._id;
    const { status, toUser } = req.params;

    const validStatus = ["accepted", "rejected"];
    if (!validStatus.includes(status)) {
      throw new Error("INVALID STATUS REQUEST");
    }
    const interestedDocument = await Connection.findOne({
      fromUser: fromUser,
      toUser: toUser,
      status: "interested",
    });

    if (!interestedDocument) {
      throw new Error("Invalid Request");
    }
    const newConnection = new Connection({ toUser, fromUser, status });
    await newConnection.save();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
