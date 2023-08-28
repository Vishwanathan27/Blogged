const express = require('express');
const { validateToken } = require("@auth");
const { userController } = require("@controllers");

const miscRouter = require("./misc");
const userRouter = require("./user");
const authRouter = require("./auth");
const postsRouter = require("./posts");
const mediaRouter = require("./media");

const publicRouter = express.Router();
const privateRouter = express.Router();

// Public routes
publicRouter.use("/misc", miscRouter);
publicRouter.use("/auth", authRouter);
publicRouter.use("/user/register", userController.register);

// Private routes
privateRouter.use("/user", userRouter);
privateRouter.use("/posts", postsRouter);
privateRouter.use("/media", mediaRouter);

const router = express.Router();

router.use("/public", publicRouter);
router.use("/private", validateToken, privateRouter);

module.exports = router;
