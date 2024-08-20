import { Router } from "express";

import { UserController } from "./user.controller";
import { MiddlewareFactory } from "@/common/factories";
import { UserRole } from "@/data/types";
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
  .get(authMiddleware, adminAllowedMiddleware, userController.getUsers)
  .post(authMiddleware, adminAllowedMiddleware, userController.createUser);

userRouter
  .route("/:id")
  .get(authMiddleware, adminAllowedMiddleware, userController.getUser)
  .put(authMiddleware, adminAllowedMiddleware, userController.updateUser)
  .delete(authMiddleware, adminAllowedMiddleware, userController.deleteUser);

export { userRouter };
