const express = require("express");
const userController = require("../controllers/userController");
const playController = require("../controllers/playController");

const router = express.Router();

router.route("/dashboard").get(playController.getDashboard);

router.use(userController.protect);

router
	.route("/")
	.get(playController.getQuestion)
	.post(playController.checkAnswer);

module.exports = router;
