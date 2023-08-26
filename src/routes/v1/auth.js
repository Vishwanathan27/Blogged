const express = require("express");

const { authController } = require("@controllers");

const router = express.Router();

router.get("/health", authController.health);
router.post("/login", authController.login);

module.exports = router;
