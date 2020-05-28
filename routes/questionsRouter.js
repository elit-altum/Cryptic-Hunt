const express = require("express");
const userController = require("../controllers/userController");
const questionController = require("../controllers/questionController");

const router = express.Router();

router
	.route("/")
	.post(
		userController.protect,
		userController.restrictTo("admin"),
		questionController.createQuestion
	);

module.exports = router;
