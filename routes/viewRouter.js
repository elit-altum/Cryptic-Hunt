const express = require("express");
const userController = require("../controllers/userController");
const playController = require("../controllers/playController");

const router = express.Router();

router.get("/", (req, res) => {
	res.status(200).render("base");
});

router.get("/login", (req, res) => {
	res.status(200).render("login", {
		title: "Login",
	});
});

router.get("/dashboard", async (req, res) => {
	const users = await playController.getDashboardView();
	res.status(200).render("dashboard", {
		title: "Dashboard",
		users,
	});
});

router.use(userController.protect);

router.get("/play", async (req, res) => {
	const question = await playController.getViewQuestion(req);
	res.status(200).render("play", {
		question,
		title: "Play",
	});
});

module.exports = router;
