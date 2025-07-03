import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDb from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";

const app = express();
const port = process.env.PORT || 4000;
connectDb();

const allowedOrigins = [
  process.env.FRONTEND_URL, // e.g. https://helpdesk-ticketing-system.vercel.app
  "http://localhost:5173", // for development
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS Not Allowed"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // This ensures URL-encoded body parsing
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

// API Endpoint
app.get("/", (req, res) => res.send("API Working"));
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/tickets", ticketRoutes);
app.listen(port, () => console.log(`Server started on Port:${port}`));
