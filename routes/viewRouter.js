const express = require("express");
const userController = require("../controllers/userController");
const playController = require("../controllers/playController");

const router = express.Router();

router.get("/login", (req, res) => {
	res.status(200).render("login", {
		title: "Login",
	});
});

// Just to check if user is logged in or not so that the header can render accordingly
router.use(userController.isLoggedIn);

router.get("/leaderboard", async (req, res) => {
	const users = await playController.getDashboardView();
	res.status(200).render("leaderboard", {
		title: "Dashboard",
		users,
	});
});

router.get("/", (req, res) => {
	res.status(200).render("index", {
		title: "Home",
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
