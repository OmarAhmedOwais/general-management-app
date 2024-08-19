import { Request, Response } from "express";
import { ResourceService } from "../services/ResourceService";

const resourceService = new ResourceService();

/**
 * @swagger
 * /resources:
 *   get:
 *     summary: Get all resources
 *     description: Retrieve all resources
 *     responses:
 *       200:
 *         description: List of resources
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 */
export const getResources = async (
  _req: Request,
  res: Response
): Promise<void> => {
  const resources = await resourceService.getResources();
  res.json(resources);
};

/**
 * @swagger
 * /resources/{id}:
 *   get:
 *     summary: Get a resource by ID
 *     description: Retrieve a resource by its ID
 *     tags: [Resources]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the resource
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Resource found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Resource not found
 */
export const getResourceById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const resource = await resourceService.getResourceById(Number(req.params.id));
  if (resource) {
    res.json(resource);
  } else {
    res.status(404).send("Resource not found");
  }
};

/**
 * @swagger
 * /resources:
 *   post:
 *     summary: Create a new resource
 *     description: Add a new resource
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Resource created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 */
export const createResource = async (
  req: Request,
  res: Response
): Promise<void> => {
  const resource = await resourceService.createResource(req.body);
  res.status(201).json(resource);
};

/**
 * @swagger
 * /resources/{id}:
 *   put:
 *     summary: Update a resource
 *     description: Modify a resource by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the resource
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
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Resource updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Resource not found
 */
export const updateResource = async (
  req: Request,
  res: Response
): Promise<void> => {
  const resource = await resourceService.updateResource(
    Number(req.params.id),
    req.body
  );
  if (resource) {
    res.json(resource);
  } else {
    res.status(404).send("Resource not found");
  }
};

/**
 * @swagger
 * /resources/{id}:
 *   delete:
 *     summary: Delete a resource
 *     description: Remove a resource by its ID
 *     tags: [Resources]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the resource
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Resource deleted successfully
 *       404:
 *         description: Resource not found
 */
export const deleteResource = async (
  req: Request,
  res: Response
): Promise<void> => {
  await resourceService.deleteResource(Number(req.params.id));
  res.status(204).send();
};

/**
 * @swagger
 * /resources/search:
 *   get:
 *     summary: Search resources
 *     description: Search for resources based on a query
 *     tags: [Resources]
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         description: Search query
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of matching resources
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 */
export const searchResources = async (
  req: Request,
  res: Response
): Promise<void> => {
  const query = req.query.q as string;
  const resources = await resourceService.searchResources(query);
  res.json(resources);
};
