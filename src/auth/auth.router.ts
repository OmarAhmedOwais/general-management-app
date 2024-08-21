import { Router } from "express";
import { AuthController } from "./auth.controller";
import { createUserValidation } from "../user";

const authController = new AuthController();
const authRouter = Router();

authRouter.post("/register", createUserValidation, authController.register);

authRouter.post("/login", createUserValidation, authController.login);

export { authRouter };
