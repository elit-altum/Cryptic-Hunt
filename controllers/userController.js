const util = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// 0. Generating and providing jwt
const generateJwt = async (user, res) => {
	const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRE,
	});

	// Remove password
	if (user.password) {
		user.password = undefined;
	}

	res.cookie("jwt", token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production" ? true : false,
		expires: new Date(
			Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
		),
	});

	res.status(200).json({
		status: "success",
		token,
		data: {
			user,
		},
	});
};

// 1. Signing up participants
exports.signupUser = catchAsync(async (req, res, next) => {
	const userInfo = {
		username: req.body.username,
		password: req.body.password,
	};

	const newUser = await User.create(userInfo);

	await generateJwt(newUser, res);
});

// 2. Login User
exports.loginUser = catchAsync(async (req, res, next) => {
	const { username, password } = req.body;

	const foundUser = await User.findOne({ username }).select("+password");

	if (!foundUser) {
		throw new AppError("Invalid username or password. Please try again!", 404);
	}

	const checked = await foundUser.comparePassword(password, foundUser.password);

	if (!checked) {
		throw new AppError("Invalid username or password. Please try again!", 404);
	}

	await generateJwt(foundUser, res);
});

// 3. Auth middleware for protected routes
exports.protect = catchAsync(async (req, res, next) => {
	let token = "";
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		token = req.headers.authorization.split(" ")[1];
	} else if (req.cookies.jwt) {
		token = req.cookies.jwt;
	}

	if (!token) {
		throw new AppError("Please login to access!", 400);
	}

	const payload = await util.promisify(jwt.verify)(
		token,
		process.env.JWT_SECRET
	);

	const user = await User.findById(payload.id);
	if (!user) {
		throw new AppError("This user does not exist.", 404);
	}

	req.user = user;
	res.locals.user = user;
	next();
});

// 3A. Auth middleware to just check if user is logged in or not for informing the views about it.
exports.isLoggedIn = catchAsync(async (req, res, next) => {
	let token = "";
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		token = req.headers.authorization.split(" ")[1];
	} else if (req.cookies.jwt) {
		token = req.cookies.jwt;
	}

	if (!token) {
		return next();
	}

	const payload = await util.promisify(jwt.verify)(
		token,
		process.env.JWT_SECRET
	);

	const user = await User.findById(payload.id);
	if (!user) {
		return next();
	}

	res.locals.user = user;
	next();
});

// 4. Auth middleware for user roles
exports.restrictTo = (...roles) => {
	return catchAsync(async (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			throw new AppError(
				"You do not have permission to perform this action.",
				403
			);
		}
		next();
	});
};

// 5. Logout uses
exports.logout = (req, res, next) => {
	res.cookie("jwt", "loggedout", {
		expires: new Date(Date.now() + 10),
	});

	res.status(200).json({
		status: "success",
	});
};
