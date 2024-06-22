const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Doc = require("../../models/Doc");
require("dotenv").config();

const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

const generateToken = (user) => {
  const payload = {
    _id: user._id,
    email: user.email,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_TOKEN_EXP,
  });
  return token;
};

exports.register = async (req, res, next) => {
  try {
    const existingUserEmail = await User.findOne({ email: req.body.email });
    if (existingUserEmail) {
      return res.status(403).json("This email is already in use");
    }
    req.body.password = await hashPassword(req.body.password);
    const newUser = await User.create({
      email: req.body.email,
      password: req.body.password,
    });
    const token = generateToken(newUser);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

exports.logIn = async (req, res, next) => {
  try {
    const token = generateToken(req.user);
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

exports.getMyData = async (req, res, next) => {
  try {
    const loggedInUser = await User.findById(req.user._id).select("-password");
    if (!loggedInUser) {
      return res.status(404).json("Error with fetch the user data");
    }
    res.status(200).json(loggedInUser);
  } catch (error) {
    next(error);
  }
};

exports.changeMyPassword = async (req, res, next) => {
  try {
    const loggedInUser = await User.findById(req.user._id);
    if (!loggedInUser) {
      return res.status(404).json("Error with fetch the user data");
    }
    const comparePassword = await bcrypt.compare(
      req.body.currentPassword,
      loggedInUser.password
    );
    if (!comparePassword) {
      return res.status(400).json("The entered password is wrong");
    }
    const hashedPassword = await hashPassword(req.body.newPassword);
    await loggedInUser.updateOne({ password: hashedPassword });
    res.status(200).json("The password has been updated.");
  } catch (error) {
    next(error);
  }
};

exports.deleteMyAccount = async (req, res, next) => {
  try {
    const loggedInUser = await User.findById(req.user._id);
    if (!loggedInUser) {
      return res.status(404).json("Error with fetch the user data");
    }
    const comparePassword = await bcrypt.compare(
      req.body.currentPassword,
      loggedInUser.password
    );
    if (!comparePassword) {
      return res.status(400).json("The entered password is wrong");
    }
    await Doc.deleteMany({ user: req.user._id });
    await loggedInUser.deleteOne();
    res.status(200).json("Deleted");
  } catch (error) {
    next(error);
  }
};
