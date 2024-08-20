import express from "express";
import "reflect-metadata";
import dotenv from "dotenv";

import { errorHandler } from "./middlewares/errorMiddleware";
import { apiLimiter } from "./middlewares/rateLimit";
import { AppDataSource } from "./config/data-source";
import { setupSwagger } from "./utils/swagger";

dotenv.config();

const app = express();

app.use(express.json());
app.use(apiLimiter);

app.use(errorHandler);

setupSwagger(app);

export default app;
