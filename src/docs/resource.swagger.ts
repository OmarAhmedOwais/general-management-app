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
