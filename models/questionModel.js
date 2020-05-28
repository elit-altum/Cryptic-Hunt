const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
	problem: {
		type: String,
		required: [true, "Please provide problem statement!"],
	},
	answer: {
		type: String,
		required: [true, "Please provide the answer!"],
		lowercase: true,
		select: false,
	},
	hint: {
		type: String,
		required: [true, "Please provide user hint!"],
	},
	level: {
		type: Number,
		min: 0,
		unique: true,
		required: [true, "Please provide level number!"],
	},
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
