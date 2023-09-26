const db = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { where } = require("sequelize");
const student =db.student
require("dotenv").config();

/**@Login functionality for the employee and manager */

exports.login = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      success: false,
      message: "Please provide email and password",
      data: null,
    });
  }
  try {
    const user = await student.findOne({ where:{email: req.body.email.toUpperCase()} });
    if (!user || !user.password) {
      return res.status(404).json({
        success: false,
        message: "Student does not exist!",
        data: null,
      });
    }

    const passwordMatch = await bcrypt.compare(req.body.password, user.password);
    if (passwordMatch) {
      const accessToken = generateAccessToken({ user: req.body.email.toUpperCase() });
     await student.update(
        { token: accessToken },
        { where: { email: req.body.email.toUpperCase() } }
      );
      let responceObj ={
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "phone": user.phone,
        "countryCode": user.countryCode,
        "password": user.password,
        "roleId": user.roleId,
        "createdAt": user.createdAt,
        "updatedAt":user.updatedAt
      }

      return res.status(200).json({
        success: true,
        message: "Login successfully!",
        accessToken: accessToken,
        data: responceObj,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Wrong email or password!",
        data: null,
      });
    }
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
      data: null,
    });
  }
};

  let accessTokens = [];
  // accessTokens
  function generateAccessToken(user) {
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "10m",
    });
    accessTokens.push(accessToken);
    return accessToken;
  }

  exports.signup = async (req, res) => {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({
        success: false,
        message: "Please provide both email and password.",
        data: null,
      });
    }
  
    try {
      // Check if user exists with the same email
      const existingUser = await student.findOne({
where:{        email: req.body.email.toUpperCase(),
}      });
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: "Student already registered.",
          data: null,
        });
      }


const password = req.body.password
      if (password.length < 8 || password.length > 20) {
        return res.status(400).json({
            success: false,
            message: "Password must be between 8 and 20 characters long!",
            data: null,
        });
    }
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const userData = {
        email: req.body.email.toUpperCase(),
        name: req.body.name ,
        phone:req.body.name ,
        countryCode:req.body.countryCode,
        password: hashedPassword,
        roleId: 2,
      };
  
      // Create a new user
      const newUser = await student.create(userData);
      
      return res.status(201).json({
        success: true,
        message: "Student added successfully,",
        data: newUser
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "An error occurred while processing the request.",
        data: null,
      });
    }
  };
  

  exports.logout = async (req, res) => {
    if (!req.body.token || !req.body.email) {
      return res.status(400).json({
        success: false,
        message: "Please provide both email and token.",
        data: null,
      });
    }
    try {
      const updatedStudent = await student.update(
        { token: null },
        { where: { email: req.body.email.toUpperCase() } }
      );
  
      if (updatedStudent[0] === 1) {
        return res.status(200).json({
          success: true,
          message: "Logged out!",
          data: null,
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "Student not found.",
          data: null,
        });
      }
    } catch (error) {
      console.error(error); 
      return res.status(500).json({
        success: false,
        message: "An error occurred while processing the request.",
        data: null,
      });
    }
  }
  