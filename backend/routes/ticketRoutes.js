import express from "express";
import { createTicket, getMyTickets } from "../controllers/ticketController.js";

import userAuth from "../middleware/userAuth.js";

const router = express.Router();

router.post("/create", userAuth, createTicket); // POST /api/tickets
router.get("/my", userAuth, getMyTickets); // GET /api/tickets/my

export default router;
