const express = require("express");

const { postsController } = require("@controllers");

const router = express.Router();

// Health check endpoint
router.get("/health", postsController.health);

// CRUD endpoints for posts
router.post("/", postsController.createPost); // Create a new post
router.get("/", postsController.getAllPosts); // Get all posts
router.get("/:id", postsController.getPostById); // Get a specific post by its ID
router.put("/:id", postsController.updatePost); // Update a post by its ID
router.delete("/:id", postsController.deletePost); // Delete a post by its ID

module.exports = router;
