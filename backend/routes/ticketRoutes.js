import express from "express";
import { createTicket, getMyTickets } from "../controllers/ticketController.js";
import multer from "multer";
import userAuth from "../middleware/userAuth.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
router.post("/create", userAuth, upload.single("attachment"), createTicket); // POST /api/tickets
router.get("/my", userAuth, getMyTickets); // GET /api/tickets/my

export default router;
