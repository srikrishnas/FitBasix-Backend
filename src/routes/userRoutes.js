const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const passport = require("../middlewares/passport");
const { authorize } = require("../middlewares/roleAuthorizationMiddleware");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/getAllUsers", UserController.getAllUsers);

// Get User Information by User ID
router.get("/:userId", passport.authenticate("jwt", { session: false }), UserController.getUserInfo);
// Update User Information
router.put('/:userId',passport.authenticate('jwt', { session: false }), UserController.updateUserInfo);

module.exports = router;
