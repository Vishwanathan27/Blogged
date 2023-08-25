const express = require('express');

const miscRouter = require('./misc');
const userRouter = require("./user");

const router = express.Router();
router.get("/test", (req, res) => res.send("Test route!"));

const allRoutes = [
  {
    path: "/misc",
    route: miscRouter,
  },
  {
    path: "/user",
    route: userRouter,
  },
];

allRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
