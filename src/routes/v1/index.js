const express = require('express');
const { validateToken } = require("@auth");

const miscRouter = require("./misc");
const userRouter = require("./user");
const authRouter = require("./auth");
const postsRouter = require("./posts");

const publicRouter = express.Router();
const privateRouter = express.Router();

// Public routes
publicRouter.use("/misc", miscRouter);
publicRouter.use("/user", userRouter);
publicRouter.use("/auth", authRouter);

// Private routes
privateRouter.use("/user", userRouter);
privateRouter.use("/posts", postsRouter);

const router = express.Router();

router.use("/public", publicRouter);
router.use("/private", validateToken, privateRouter);

module.exports = router;
