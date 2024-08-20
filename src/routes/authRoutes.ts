import { Router } from "express";
import { register, login } from "../controllers/AuthController";
import { validate } from "../middlewares/validate";
import { userValidationSchema } from "../validation/userValidation";

const router = Router();


router.post("/register", userValidationSchema, validate, register);


router.post("/login", userValidationSchema, validate, login);

export default router;
