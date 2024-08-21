import { Router } from "express";
import {
  getResources,
  createResource,
  updateResource,
  deleteResource,
  getResourceById,
  searchResources,
} from "./resource.controller";
import { MiddlewareFactory } from "../common/factories";
import { UserService } from "../user";
import { UserRole } from "../data";

// Instantiate UserService and MiddlewareFactory
const userService = new UserService();
const middlewareFactory = new MiddlewareFactory(userService);

const authMiddleware = middlewareFactory.createAuthMiddleware();
const adminAllowedMiddleware = middlewareFactory.createAllowedToMiddleware(
  UserRole.ADMIN
);


const resourceRouter = Router();

resourceRouter.get("/", authMiddleware, getResources);

resourceRouter.post(
  "/",
  authMiddleware,
  adminAllowedMiddleware,
  createResource
);

resourceRouter.route("/search").get(authMiddleware, searchResources);

resourceRouter.route("/:id").get(authMiddleware, getResourceById);

resourceRouter.put(
  "/:id",
  authMiddleware,
  adminAllowedMiddleware,
  updateResource
);

resourceRouter.delete(
  "/:id",
  authMiddleware,
  adminAllowedMiddleware,
  deleteResource
);

export { resourceRouter };
