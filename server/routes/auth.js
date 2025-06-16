import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      return res
        .status(409)
        .json({ success: false, message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
    });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "5h",
    });

    return res
      .status(200)
      .json({
        success: true,
        token,
        user: { name: newUser.name },
        message: "User registered",
      });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "error adding user" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not logged in" });
    }

    const checkpassword = await bcrypt.compare(password, user.password);
    if (!checkpassword) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });
    }
    // generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "5h",
    });

    return res
      .status(200)
      .json({
        success: true,
        token,
        user: { name: user.name },
        message: "User logged in",
      });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "error logining user" });
  }
});
export default router;
