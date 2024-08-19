import express from "express";
import "reflect-metadata";
import dotenv from "dotenv";
import resourceRoutes from "./routes/resourceRoutes";
import authRoutes from "./routes/authRoutes";
import { errorHandler } from "./middlewares/errorMiddleware";
import {
  authenticateToken,
  authorizeRoles,
} from "./middlewares/authMiddleware";
import { apiLimiter } from "./middlewares/rateLimit";
import { AppDataSource } from "./data-source";
import { setupSwagger } from "./utils/swagger";

dotenv.config();

const app = express();

app.use(express.json());
app.use(apiLimiter);

app.use("/auth", authRoutes);
app.use(
  "/resources",
  authenticateToken,
  authorizeRoles("admin", "user"),
  resourceRoutes
);

app.use(errorHandler);

setupSwagger(app);

export default app;
