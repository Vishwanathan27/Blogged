const express = require("express");

const { mediaController } = require("@controllers");

const router = express.Router();

// Health check endpoint
router.get("/health", mediaController.health);

// CRUD endpoints for media
router.post("/", mediaController.upload);

module.exports = router;
