import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import sendMail from "../utils/sendMail.js"; // You need to create this
import crypto from "crypto";

export const register = async (req, res) => {
  const { name, password, email } = req.body;

  if (!name || !password || !email) {
    return res.json({ success: false, message: "Missing Details" });
  }

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userModel({ name, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({
      success: false,
      message: "Email and Password are required",
    });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.json({ success: false, message: "Invalid email" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.json({ success: false, message: "Invalid password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });
    return res.json({ success: true, message: "Logged Out" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const isAuthenticated = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;

    return res.json({ success: true });
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Authentication failed" });
  }
};

export const getUserData = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId).select("-password");
    if (!user) return res.json({ success: false, message: "User not found" });
    return res.json({ success: true, userData: user });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// route: PUT /api/user/update-role
export const updateUserRole = async (req, res) => {
  const { email, newRole } = req.body;

  if (!email || !newRole) {
    return res.json({ success: false, message: "Missing data" });
  }

  if (!["user", "admin", "operation", "technical"].includes(newRole)) {
    return res.json({ success: false, message: "Invalid role" });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    user.role = newRole;
    await user.save();

    return res.json({ success: true, message: `Role updated to ${newRole}` });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};

// 1. Send OTP to user's email
export const sendResetOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.json({ success: false, message: "Email is required" });

  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.json({ success: false, message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpire = Date.now() + 15 * 60 * 1000; // 15 min expiry

    user.resetOtp = otp;
    user.resetOtpExpireAt = otpExpire;
    await user.save();

    await sendMail(
      email,
      "Reset Password OTP",
      `Your OTP for resetting password is: ${otp}`
    );

    return res.json({ success: true, message: "OTP sent to email" });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};

// 2. Verify OTP & Reset Password
export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword)
    return res.json({ success: false, message: "All fields required" });

  try {
    const user = await userModel.findOne({ email });

    if (!user || user.resetOtp !== otp || user.resetOtpExpireAt < Date.now()) {
      return res.json({ success: false, message: "Invalid or expired OTP" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetOtp = "";
    user.resetOtpExpireAt = 0;
    await user.save();

    return res.json({ success: true, message: "Password reset successful" });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};
