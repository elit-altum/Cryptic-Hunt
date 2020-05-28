const errHandler = (err, req, res, next) => {
	err.statusCode = err.statusCode || 400;
	let status = err.statusCode.toString().startsWith("5") ? "error" : "failure";

	res.status(err.statusCode).json({
		status,
		message: err.message,
	});
};

module.exports = errHandler;
