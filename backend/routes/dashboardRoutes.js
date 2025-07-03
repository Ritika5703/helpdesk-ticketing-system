import express from "express";
import userAuth from "../middleware/userAuth.js";
import { getDashboardStats } from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/stats", userAuth, getDashboardStats);

export default router;
