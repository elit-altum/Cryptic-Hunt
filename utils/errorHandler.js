const errHandler = (err, req, res, next) => {
	err.statusCode = err.statusCode || 400;
	err.status = err.statusCode.toString().startsWith("5") ? "error" : "failure";

	// For the API
	if (req.originalUrl.startsWith("/api")) {
		return res.status(err.statusCode).json({
			status: err.status,
			message: err.message,
		});
	}

	// For the website
	res.status(200).render("error", {
		title: "Error",
		err,
	});
};

module.exports = errHandler;
