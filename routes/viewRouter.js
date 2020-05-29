const express = require("express");
const userController = require("../controllers/userController");
const playController = require("../controllers/playController");

const router = express.Router();

router.get("/", (req, res) => {
	res.status(200).render("base");
});

router.get("/login", (req, res) => {
	res.status(200).render("login");
});

router.use(userController.protect);
router.get("/play", async (req, res) => {
	const question = await playController.getViewQuestion(req);
	res.status(200).render("play", {
		question,
	});
});

module.exports = router;
