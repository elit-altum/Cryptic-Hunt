const Question = require("../models/questionModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.createQuestion = catchAsync(async (req, res, next) => {
	const question = await Question.create(req.body);

	res.status(200).json({
		status: "success",
		data: {
			question,
		},
	});
});
