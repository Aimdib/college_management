const jwt = require("jsonwebtoken");
const db = require("../models");
const student =db.student




exports.validateAdmin = async (req) => {
  const adminToken = req.headers.authorization;
  const token = adminToken.split(" ");
  const decoded = jwt.verify(token[1], process.env.ACCESS_TOKEN_SECRET);
  let Admin = await student.findOne({ where: { email: decoded.user } });
  return Admin;
};



