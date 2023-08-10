const express = require('express');
const router = express.Router();
const passport = require("../middlewares/passport");
const ActivityController = require('../controllers/activityController');

router.get('/getAllActivities', passport.authenticate('jwt', { session: false }), ActivityController.getAllActivities);
router.get('/activity/:activityName', passport.authenticate('jwt', { session: false }), ActivityController.getActivity);
router.put('/updateActivity', passport.authenticate('jwt', { session: false }), ActivityController.createOrUpdateActivity);
router.delete('/deleteActivity', passport.authenticate('jwt', { session: false }), ActivityController.deleteActivity);

module.exports = router;
