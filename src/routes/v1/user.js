const express = require("express");

const { userController } = require("@controllers");

const router = express.Router();

router.get("/health", userController.health);
router.post("/register", userController.register);

module.exports = router;
