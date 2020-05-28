const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: [true, "This username is already taken!"],
	},
	password: {
		type: String,
		required: true,
		minlength: [8, "Please have atleast 8 characters!"],
		select: false,
	},
	role: {
		type: String,
		enum: ["user", "admin"],
		default: "user",
	},
	level: {
		type: Number,
		default: 0,
	},
	lastSolved: {
		type: Date,
		default: Date.now(),
	},
});

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();

	this.password = await bcrypt.hash(this.password, 12);
	next();
});

userSchema.methods.comparePassword = async function (
	candidatePassword,
	hashedPassword
) {
	return await bcrypt.compare(candidatePassword, hashedPassword);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
