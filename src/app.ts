import 'colors';
import dotenv from 'dotenv';
// Load environment variables
dotenv.config();

// ==================================================================================
// !!!!!!!!!!!!!!!!!!!!!!!!!! SAFE TO CODE AFTER THIS LINE !!!!!!!!!!!!!!!!!!!!!!!!!!
// ==================================================================================

import express, { Application } from "express";
import "reflect-metadata";

import { globalErrorMiddleware } from "./common/middlewares/global-error.middleware";
import { apiLimiter } from "./common/middlewares/rateLimit.middleware";
import { setupSwagger } from "./common/utils/swagger";
import { mountRouter } from "./common/routers";
import { globalNotFoundMiddleware } from "./common/middlewares/not-found.middleware";

dotenv.config();

const app: Application = express();
app.use(express.json());
app.use(apiLimiter);

// Mount routers
app.use('/api/v1', mountRouter);

// Apply custom middleware
app.all('*', globalNotFoundMiddleware);
app.use(globalErrorMiddleware);

setupSwagger(app);

export default app;
