const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.route("/signup").post(userController.signupUser);
router.route("/login").post(userController.loginUser);

router.route("/logout").get(userController.protect, userController.logout);

// router
// 	.route("/check")
// 	.get(userController.protect, userController.restrictTo("admin"), (req, res) =>
// 		res.send("Good")
// 	);

module.exports = router;
