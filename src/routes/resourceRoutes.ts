import { Router } from "express";
import {
  getResources,
  createResource,
  updateResource,
  deleteResource,
  getResourceById,
  searchResources,
} from "../controllers/ResourceController";
import {
  authenticateToken,
  authorizeRoles,
} from "../middlewares/authMiddleware";

const router = Router();


router.get(
  "/",
  authenticateToken,
  authorizeRoles("admin", "user"),
  getResources
);


router.post("/", authenticateToken, authorizeRoles("admin"), createResource);

router.route('/search').get(
  authenticateToken,
  authorizeRoles("admin", "user"),
  searchResources
);

router.route('/:id').get(
  authenticateToken,
  authorizeRoles("admin", "user"),
  getResourceById
);


router.put("/:id", authenticateToken, authorizeRoles("admin"), updateResource);


router.delete(
  "/:id",
  authenticateToken,
  authorizeRoles("admin"),
  deleteResource
);

export default router;
