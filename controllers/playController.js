const User = require("../models/userModel");
const Question = require("../models/questionModel");
const Response = require("../models/responseModel");

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// 00. Get total number of questions
const getTotalQuestions = async () => {
	let number = await Question.countDocuments({});
	return number;
};

// 01. Gets question for the user based on its current level
exports.getQuestion = catchAsync(async (req, res, next) => {
	// If user has completed the quiz
	if (req.user.level >= (await getTotalQuestions())) {
		return res.status(200).json({
			status: "success",
			message: "Congratulations you have completed cypher!",
		});
	}

	const question = await Question.findOne({ level: req.user.level });

	if (!question) {
		throw new AppError("This question does not exist. (yet?).", 403);
	}

	res.status(200).json({
		status: "success",
		data: {
			question,
		},
	});
});

// 02. Checks user answer for its level
exports.checkAnswer = catchAsync(async (req, res, next) => {
	const { level, username } = req.user;
	const question = await Question.findOne({ level }).select("+answer");

	if (!question) {
		throw new AppError("This question does not exist. (yet?).", 403);
	}

	await Response.create({
		answer: req.body.answer,
		level,
		username,
	});

	if (question.answer !== req.body.answer) {
		throw new AppError("Wrong answer, please try again", 400);
	}

	if (question.level + 1 >= (await getTotalQuestions())) {
		return res.status(200).json({
			status: "sucess",
			message: "Congratulations you have completed cypher!",
		});
	}

	const newLevel = question.level + 1;

	await User.findByIdAndUpdate(req.user._id, {
		level: newLevel,
		lastSolved: Date.now(),
	});

	res.status(200).json({
		status: "success",
		message: `Welcome to level ${newLevel} `,
	});
});

// 03. Get the game dashboard
exports.getDashboard = catchAsync(async (req, res, next) => {
	const users = await User.find().sort("-level lastSolved");

	res.status(200).json({
		status: "success",
		data: {
			users,
		},
	});
});
