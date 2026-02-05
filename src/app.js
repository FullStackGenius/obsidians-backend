import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url"; // ← Add this
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import manageRoutes from "./routes/manage.route.js";
import testimonialRoutes from "./routes/testimonial.route.js";
import homeContentRoutes from "./routes/homeContent.route.js";
import projectRoutes from "./routes/project.routes.js";
dotenv.config();
connectDB();

const app = express();

// Fix __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve uploaded images
app.use(
  "/uploads",
  express.static(path.join(__dirname, "..", "public", "uploads"))
);

// CORS & middlewares
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/company-logo", manageRoutes);
app.use("/api/testimonial", testimonialRoutes);
app.use("/api/home-content", homeContentRoutes);
app.use("/api/project", projectRoutes);

export default app;
