import express, { Application } from "express";
import "reflect-metadata";
import dotenv from "dotenv";

import { globalErrorMiddleware } from "./common/middlewares/global-error.middleware";
import { apiLimiter } from "./common/middlewares/rateLimit.middleware";
import { AppDataSource } from "./common/config/data-source";
import { setupSwagger } from "./common/utils/swagger";
import { mountRouter } from "./common/routers";
import { NotFoundMiddleware } from "./common/middlewares/not-found.middleware";

dotenv.config();

const app: Application = express();
const notFoundMiddleware = new NotFoundMiddleware();
app.use(express.json());
app.use(apiLimiter);

// Mount routers
app.use('/api/v1', mountRouter);

// Apply custom middleware
app.all('*', notFoundMiddleware.execute);
app.use(globalErrorMiddleware);

setupSwagger(app);

export default app;
