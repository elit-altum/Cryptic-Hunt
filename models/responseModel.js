const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({
	answer: {
		type: String,
		maxlength: 200,
	},
	username: {
		type: String,
	},
	level: {
		type: Number,
	},
});

const Response = mongoose.model("Response", responseSchema);

module.exports = Response;
