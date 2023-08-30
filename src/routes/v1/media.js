const express = require("express");
const { mediaController } = require("@controllers");

const router = express.Router();

/**
 * @swagger
 * /private/media/health:
 *   get:
 *     tags:
 *       - Media
 *     summary: Health check for media
 *     description: Check if the media service is running
 *     security:
 *       - JWT: []
 *     responses:
 *       '200':
 *         description: Media service is healthy
 */
router.get("/health", mediaController.health);

/**
 * @swagger
 * /private/media:
 *   post:
 *     tags:
 *       - Media
 *     summary: Upload media
 *     description: Uploads a media file.
 *     security:
 *       - JWT: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               destination:
 *                 type: string
 *                 description: The destination ID.
 *                 example: "64e9cdd9c5a9192f8de7a54d"
 *               sourcefile:
 *                 type: object
 *                 properties:
 *                   content:
 *                     type: string
 *                     description: Base64 encoded file content.
 *                     example: "iVBORw...ErkJggg=="
 *                   contentType:
 *                     type: string
 *                     description: The content type of the uploaded file.
 *                     example: "image/png"
 *                   filename:
 *                     type: string
 *                     description: The original filename of the uploaded file.
 *                     example: "1693194793250_Logo-mark-with-bg-18-18.png"
 *     responses:
 *       '200':
 *         description: Media uploaded successfully
 *       '400':
 *         description: Invalid request format
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Server error
 */
router.post("/", mediaController.upload);

module.exports = router;
