const mongoose = require("mongoose");
const { mongoString } = require("../utils/constants");

const connectDB = async () => {
  await mongoose.connect(mongoString);
  console.log("Connected To DB");
};

module.exports.connectDB = connectDB;
