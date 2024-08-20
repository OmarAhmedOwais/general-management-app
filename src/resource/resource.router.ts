import { Router } from "express";
import {
  getResources,
  createResource,
  updateResource,
  deleteResource,
  getResourceById,
  searchResources,
} from "./resource.controller";
import { MiddlewareFactory } from "@/common/factories";
import { UserService } from "@/user";
import { UserRole } from "@/data";

// Instantiate UserService and MiddlewareFactory
const userService = new UserService();
const middlewareFactory = new MiddlewareFactory(userService);

const authMiddleware = middlewareFactory.createAuthMiddleware();
const adminAllowedMiddleware = middlewareFactory.createAllowedToMiddleware(
  UserRole.ADMIN
);


const resourceRoutes = Router();

resourceRoutes.get("/", authMiddleware, getResources);

resourceRoutes.post(
  "/",
  authMiddleware,
  adminAllowedMiddleware,
  createResource
);

resourceRoutes.route("/search").get(authMiddleware, searchResources);

resourceRoutes.route("/:id").get(authMiddleware, getResourceById);

resourceRoutes.put(
  "/:id",
  authMiddleware,
  adminAllowedMiddleware,
  updateResource
);

resourceRoutes.delete(
  "/:id",
  authMiddleware,
  adminAllowedMiddleware,
  deleteResource
);

export { resourceRoutes };
