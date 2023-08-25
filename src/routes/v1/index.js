const express = require('express');

const miscRouter = require('./misc');
const userRouter = require("./user");

const router = express.Router();

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
  console.log("router :", router);
});

module.exports = router;
