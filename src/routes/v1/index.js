const express = require('express');

const miscRouter = require('./misc');

const router = express.Router();

const allRoutes = [
  {
    path: '/misc',
    route: miscRouter,
  },
];

allRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
