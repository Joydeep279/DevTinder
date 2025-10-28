//ts-worksheet
const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const Connection = require("../configs/connectionSchema");
const USER = require("../configs/databaseSchema");

router.post("/request/:status/:toUser", auth, async (req, res) => {
  try {
    const toUser = req.params.toUser;
    const fromUser = req.userData._id;
    const status = req.params.status;
    const allowedStatusType = ["rejected", "interested"];

    if (!allowedStatusType.includes(status)) {
      res.status(400).send("INVALID statustype");
    }

    const toUserDetails = await USER.findById(toUser);

    if (!toUserDetails) {
      throw new Error("USER doesnot exists!");
    }

    const existingReq = await Connection.findOne({
      $or: [
        { fromUser, toUser },
        { fromUser: toUser, toUser: fromUser },
      ],
    });
    if (!existingReq) {
      const document = new Connection();
      document.fromUser = fromUser;
      document.toUser = toUser;
      document.status = status;
      await document.save();
      res.send(`${status} Request Send Successfully`);
    } else {
      res.status(400).send("Request already send!");
    }
  } catch (error) {
    throw new Error("Unable to send Request");
  }
});

module.exports = router;
