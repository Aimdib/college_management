require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
const jwt = require("jsonwebtoken");

exports.validateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    if (token == null)
      res.status(400).send({
        message: "Token not present",
        success: false,
        data: {},
      });
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, admin) => {
      if (err) {
        res.status(403).send({
          message: "Token invalid",
          success: false,
          data: null,
        });
      } else {
        req.admin = admin;

        next(); //proceed to the next action in the calling function
      }
    }); //end of jwt.verify()
  } else {
    res.status(400).send({
      message: "Token not present",
      success: false,
      data: null,
    });
  }
};
