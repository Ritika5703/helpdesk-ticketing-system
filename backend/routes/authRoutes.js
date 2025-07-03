import express from "express";
import {
  register,
  login,
  logout,
  isAuthenticated,
  getUserData,
  sendResetOtp,
  resetPassword,
} from "../controllers/authController.js";
import userAuth from "../middleware/userAuth.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/is-auth", userAuth, isAuthenticated);
authRouter.get("/data", userAuth, getUserData);
authRouter.post("/send-reset-otp", sendResetOtp);
authRouter.post("/reset-password", resetPassword);

export default authRouter;
