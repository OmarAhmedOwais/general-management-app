import { Router } from 'express';
import { register, login } from '../controllers/AuthController';
import { validate } from '../middlewares/validate';
import { checkSchema } from 'express-validator';

const router = Router();

const userValidationSchema = checkSchema({
  email: {
    in: ['body'],
    isEmail: true,
    errorMessage: 'Invalid email',
  },
  password: {
    in: ['body'],
    isLength: {
      options: { min: 6 },
      errorMessage: 'Password should be at least 6 characters',
    },
  },
});

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Endpoints for user authentication
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     description: Create a new user with email and password.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/register', userValidationSchema, validate, register);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Log in a user
 *     description: Authenticate a user and return a JWT token.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   description: User details
 *                 token:
 *                   type: string
 *                   description: JWT token
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', userValidationSchema, validate, login);

export default router;
