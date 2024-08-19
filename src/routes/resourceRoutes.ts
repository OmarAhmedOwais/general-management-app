import { Router } from "express";
import {
  getResources,
  createResource,
  updateResource,
  deleteResource,
} from "../controllers/ResourceController";
import {
  authenticateToken,
  authorizeRoles,
} from "../middlewares/authMiddleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Resources
 *   description: Endpoints for resource management
 */

/**
 * @swagger
 * /resources:
 *   get:
 *     summary: Get all resources
 *     description: Retrieve a list of all resources.
 *     tags: [Resources]
 *     responses:
 *       200:
 *         description: List of resources
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/",
  authenticateToken,
  authorizeRoles("admin", "user"),
  getResources
);

/**
 * @swagger
 * /resources:
 *   post:
 *     summary: Create a new resource
 *     description: Add a new resource to the system.
 *     tags: [Resources]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Example Resource
 *               description:
 *                 type: string
 *                 example: This is an example resource.
 *     responses:
 *       201:
 *         description: Resource created
 *       401:
 *         description: Unauthorized
 */
router.post("/", authenticateToken, authorizeRoles("admin"), createResource);

/**
 * @swagger
 * /resources/{id}:
 *   put:
 *     summary: Update a resource
 *     description: Update an existing resource by ID.
 *     tags: [Resources]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Resource ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Resource
 *               description:
 *                 type: string
 *                 example: This is an updated resource.
 *     responses:
 *       200:
 *         description: Resource updated
 *       404:
 *         description: Resource not found
 *       401:
 *         description: Unauthorized
 */
router.put("/:id", authenticateToken, authorizeRoles("admin"), updateResource);

/**
 * @swagger
 * /resources/{id}:
 *   delete:
 *     summary: Delete a resource
 *     description: Remove a resource from the system by ID.
 *     tags: [Resources]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Resource ID
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Resource deleted
 *       404:
 *         description: Resource not found
 *       401:
 *         description: Unauthorized
 */
router.delete(
  "/:id",
  authenticateToken,
  authorizeRoles("admin"),
  deleteResource
);

export default router;
