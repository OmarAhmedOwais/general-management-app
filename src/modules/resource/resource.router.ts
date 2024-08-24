import { Router } from "express";
import { ResourceController } from "./resource.controller";
import { MiddlewareFactory } from "../../common/factories";
import { UserService } from "../user";
import { UserRole } from "../../data";
import { ResourceValidation } from "./resource.validatoin";
// Instantiate UserService and MiddlewareFactory
const userService = new UserService();
const middlewareFactory = new MiddlewareFactory(userService);
const resourceController = new ResourceController();
const authMiddleware = middlewareFactory.createAuthMiddleware();
const adminAllowedMiddleware = middlewareFactory.createAllowedToMiddleware(
  UserRole.ADMIN
);

// Instantiate the validation class
const resourceValidation = new ResourceValidation();

const resourceRouter = Router();

resourceRouter.get(
  "/",
  authMiddleware,
  resourceValidation.findAllValidationMiddleware,
  resourceController.findAll
);

resourceRouter.post(
  "/",
  authMiddleware,
  adminAllowedMiddleware,
  resourceValidation.createValidationMiddleware,
  resourceController.create
);

resourceRouter
  .route("/search")
  .get(authMiddleware, resourceController.searchResources);

resourceRouter
  .route("/:id")
  .get(
    authMiddleware,
    resourceValidation.findByIdValidationMiddleware,
    resourceController.findById
  );

resourceRouter.put(
  "/:id",
  authMiddleware,
  adminAllowedMiddleware,
  resourceValidation.updateValidationMiddleware,
  resourceController.update
);

resourceRouter.delete(
  "/:id",
  authMiddleware,
  adminAllowedMiddleware,
  resourceValidation.deleteValidationMiddleware,
  resourceController.delete
);

export { resourceRouter };
