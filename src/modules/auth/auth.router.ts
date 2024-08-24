import { Router } from "express";
import { AuthController } from "./auth.controller";
import { AuthValidation } from "./auth.validation";



const authController = new AuthController();
const authRouter = Router();
const authValidation = new AuthValidation();

authRouter.post("/register", authValidation.registerValidationMiddleware, authController.register);

authRouter.post("/login", authValidation.loginValidationMiddleware, authController.login);

export { authRouter };
