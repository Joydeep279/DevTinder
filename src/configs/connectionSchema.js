const mongoose = require("mongoose");

const connectionSchema = new mongoose.Schema(
  {
    fromUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    toUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: {
        values: ["accepted", "rejected", "interested", "ignored"],
        message: "{VALUE} status does not exist",
      },
    },
  },
  { timestamps: true }
);

connectionSchema.pre("save", function (next) {
  if (this.toUser.equals(this.fromUser)) {
    return next(new Error("Cannot send request to same user"));
  }
  next();
});

module.exports = mongoose.model("Connection", connectionSchema);
