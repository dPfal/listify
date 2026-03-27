const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const generateToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required",
      });
    }

    const userExists = await User.findOne({ username });

    if (userExists) {
      return res.status(400).json({
        message: "Username already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      password: hashedPassword,
    });

    res.status(201).json({
      id: user.id,
      username: user.username,
      token: generateToken(user.id),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required",
      });
    }

    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
        id: user.id,
        username: user.username,
        token: generateToken(user.id),
      });
    } else {
      res.status(401).json({
        message: "Invalid username or password",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const logoutUser = async (req, res) => {
  res.status(200).json({
    message: "Logged out successfully",
  });
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      id: user.id,
      username: user.username,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getProfile,
};
