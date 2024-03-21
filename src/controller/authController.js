const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const {
  generateJwtToken,
  generateRefreshToken,
} = require("../config/verifyToken");

const register = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      res.send({
        success: "failed",
        message: "All fields are required",
        data: null,
      });
      return;
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.send({
        success: "fail",
        message: "User already exists",
      });
      return;
    }

    const user = await User.create({
      fullName,
      email,
      password
    });
    res.send({
      success: "success",
      message: "User created successfully",
      data: user,
    });
  } catch (e) {
    res.send({
      success: "failed",
      message: e.message,
    });
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.send({
        success: "fail",
        message: "All fields are required",
        token: null,
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.send({
        success: "fail",
        message: "Invalid credentials",
        token: null,
      });
    }
    
    const userPassword = user.password;
    console.log(userPassword);

    const passwordMatch = await bcrypt.compare(password, userPassword);

    if (!passwordMatch) {
      return res.send({
        success: "fail",
        message: "Invalid credentials",
        token: null,
      });
    }
    const token = generateJwtToken(user._id);
    
    res.send({
      success: "success",
      message: "Login successful",
      token: token,
    });

  } catch (error) {
    res.send({
      success: "fail",
      message: "Something went wrong",
      error: error.message,
    });
  }
});

module.exports = {
  register,
  login,
};
