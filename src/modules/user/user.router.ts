import { Router } from "express";

import { UserController } from "./user.controller";
import { MiddlewareFactory } from "../../common/factories";
import { UserRole } from "../../data/types";
import { UserService } from "./user.service";
import { UserValidation } from "./user.validation";

const userRouter = Router();
const userController = new UserController();

// Instantiate UserService and MiddlewareFactory
const userService = new UserService();
const middlewareFactory = new MiddlewareFactory(userService);

const authMiddleware = middlewareFactory.createAuthMiddleware();
const adminAllowedMiddleware = middlewareFactory.createAllowedToMiddleware(
  UserRole.ADMIN
);

const userValidation = new UserValidation();

userRouter
  .route("/")
  .get(
    authMiddleware,
    adminAllowedMiddleware,
    userValidation.findAllValidationMiddleware,
    userController.findAll
  )
  .post(
    authMiddleware,
    adminAllowedMiddleware,
    userValidation.createValidationMiddleware,
    userController.create
  );

userRouter
  .route("/:id")
  .get(
    authMiddleware,
    adminAllowedMiddleware,
    userValidation.findByIdValidationMiddleware,
    userController.findById
  )
  .put(
    authMiddleware,
    adminAllowedMiddleware,
    userValidation.updateValidationMiddleware,
    userController.update
  )
  .delete(
    authMiddleware,
    adminAllowedMiddleware,
    userValidation.deleteValidationMiddleware,
    userController.delete
  );

export { userRouter };
