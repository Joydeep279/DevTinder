const mongoose = require("mongoose");
const connectString = require("../utils/constants");
const connectDB = async () => {
  await mongoose.connect(connectString);
  console.log("Connected To DB");
};

module.exports.connectDB = connectDB;
