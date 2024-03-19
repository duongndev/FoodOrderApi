const User = require("../model/userModel");
const bycrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const {
  generateJwtToken,
  generateRefreshToken,
} = require("../config/verifyToken");

const register = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }
    const hashedPassword = await bycrypt.hash(password, 10);
    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });
    res.status(200).json(user);
  } catch (e) {
    res.status(500).json(e);
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ message: "User does not exist" });
    }

    const isPasswordCorrect = await bycrypt.compare(password, user.password);

    if (isPasswordCorrect) {
      return res.json({ message: "Invalid credentials" });
    }

    const token = generateJwtToken(user._id);

    const { password: _, ...userInfo } = user._doc;

    res.send({
      susccess: true,
      message: "Login successful",
      token: token
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
});

module.exports = {
  register,
  login,
};
