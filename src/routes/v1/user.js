const express = require("express");
const { userController } = require("@controllers");

const router = express.Router();

/**
 * @swagger
 * /private/users/health:
 *   get:
 *     tags:
 *       - Users
 *     summary: Health check for users
 *     description: Check if the users service is running
 *     security:
 *       - JWT: []
 *     responses:
 *       '200':
 *         description: Users service is healthy
 */
router.get("/health", userController.health);

/**
 * @swagger
 * /private/users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get all users
 *     security:
 *       - JWT: []
 *     responses:
 *       '200':
 *         description: Successfully retrieved all users
 */
router.get("/", userController.getAllUsers);

/**
 * @swagger
 * /private/users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get a specific user by its ID
 *     security:
 *       - JWT: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully retrieved the user
 */
router.get("/:id", userController.getUserById);

/**
 * @swagger
 * /private/users/{id}:
 *   put:
 *     tags:
 *       - Users
 *     summary: Update a user by its ID
 *     security:
 *       - JWT: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Your user object properties here, e.g.:
 *               firstName:
 *                 type: string
 *                 example: 'John'
 *     responses:
 *       '200':
 *         description: Successfully updated the user
 */
router.put("/:id", userController.updateUser);

/**
 * @swagger
 * /private/users/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Delete a user by its ID
 *     security:
 *       - JWT: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully deleted the user
 */
router.delete("/:id", userController.deleteUser);

module.exports = router;
