import { Router } from "express";

import { UserController } from "./user.controller";
import { MiddlewareFactory } from "../common/factories";
import { UserRole } from "../data/types";
import { UserService } from "./user.service";

const userRouter = Router();
const userController = new UserController();

// Instantiate UserService and MiddlewareFactory
const userService = new UserService();
const middlewareFactory = new MiddlewareFactory(userService);

const authMiddleware = middlewareFactory.createAuthMiddleware();
const adminAllowedMiddleware = middlewareFactory.createAllowedToMiddleware(
  UserRole.ADMIN
);

userRouter
  .route("/")
  .get(authMiddleware, adminAllowedMiddleware, userController.findAll)
  .post(authMiddleware, adminAllowedMiddleware, userController.create);

userRouter
  .route("/:id")
  .get(authMiddleware, adminAllowedMiddleware, userController.findById)
  .put(authMiddleware, adminAllowedMiddleware, userController.update)
  .delete(authMiddleware, adminAllowedMiddleware, userController.delete);

export { userRouter };
