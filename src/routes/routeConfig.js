const express = require('express');
const userRoutes = require('./userRoutes');
const activityRoutes = require('./activityRoutes');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/activities',
    route: activityRoutes,
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
