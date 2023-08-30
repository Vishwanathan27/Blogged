const express = require("express");
const { postsController } = require("@controllers");

const router = express.Router();

/**
 * @swagger
 * /private/posts/health:
 *   get:
 *     tags:
 *       - Posts
 *     summary: Health check for posts
 *     description: Check if the posts service is running
 *     security:
 *       - JWT: []
 *     responses:
 *       '200':
 *         description: Posts service is healthy
 */
router.get("/health", postsController.health);

/**
 * @swagger
 * /private/posts:
 *   post:
 *     tags:
 *       - Posts
 *     summary: Create a new post
 *     security:
 *       - JWT: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Tile Test"
 *               content:
 *                 type: array
 *                 items:
 *                   type: object
 *                   additionalProperties:
 *                     type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               author:
 *                 type: string
 *                 example: "64e9bef85a7ac9dc53c896ae"
 *               published:
 *                 type: boolean
 *               headerImageUrl:
 *                 type: string
 *                 example: "https://blogged.s3.amazonaws.com/64e9cdd9c5a9192f8de7a54d/1693194793250_Logo-mark-with-bg-18-18.png"
 *               imageName:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Post successfully created
 *       '401':
 *         description: Unauthorized
 */
router.post("/", postsController.createPost);
/**
 * @swagger
 * /private/posts:
 *   get:
 *     tags:
 *       - Posts
 *     summary: Get all posts
 *     security:
 *       - JWT: []
 *     responses:
 *       '200':
 *         description: Successfully retrieved all posts
 */
router.get("/", postsController.getAllPosts);

/**
 * @swagger
 * /private/posts/tags:
 *   get:
 *     tags:
 *       - Posts
 *     summary: Get all tags from posts
 *     security:
 *       - JWT: []
 *     responses:
 *       '200':
 *         description: Successfully retrieved all tags
 */
router.get("/tags", postsController.getAllTags);

/**
 * @swagger
 * /private/posts/{id}:
 *   get:
 *     tags:
 *       - Posts
 *     summary: Get a specific post by its ID
 *     security:
 *       - JWT: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the post to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully retrieved the post
 */
router.get("/:id", postsController.getPostById);

/**
 * @swagger
 * /private/posts/{id}:
 *   put:
 *     tags:
 *       - Posts
 *     summary: Update a post by its ID
 *     security:
 *       - JWT: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the post to update
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       '200':
 *         description: Successfully updated the post
 */
router.put("/:id", postsController.updatePost);

/**
 * @swagger
 * /private/posts/{id}:
 *   delete:
 *     tags:
 *       - Posts
 *     summary: Delete a post by its ID
 *     security:
 *       - JWT: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the post to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully deleted the post
 */
router.delete("/:id", postsController.deletePost);

module.exports = router;
