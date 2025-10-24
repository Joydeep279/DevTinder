const jwt = require("jsonwebtoken");
const USER = require("../configs/databaseSchema");
const { jwtPrivateKey } = require("../utils/constants");

async function auth(req, res, next) {
  try {
    const decoded = jwt.verify(req.cookies.token, jwtPrivateKey);
    if (decoded) {
      const userData = await USER.findById(decoded._id);
      req.userData = userData;
      next();
    } else {
      throw new Error("Invalid TOKEN!!");
    }
  } catch (error) {
    throw new Error("Invalid TOKEN!!");
  }
}
module.exports = auth;
