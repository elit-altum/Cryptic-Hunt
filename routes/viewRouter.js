const express = require("express");
const userController = require("../controllers/userController");
const questionController = require("../controllers/questionController");

const router = express.Router();

router.get("/", (req, res) => {
	res.status(200).render("base");
});

module.exports = router;
