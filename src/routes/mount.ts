import { Router } from 'express';
import resourceRoutes from "./resourceRoutes";
import authRoutes from "./authRoutes";

const mountRouter = Router();

mountRouter.use("/auth", authRoutes);
mountRouter.use("/resources", resourceRoutes);

export default mountRouter;