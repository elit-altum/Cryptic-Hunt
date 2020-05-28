// Wrapper for express error handling
const catchAsync = (fn) => {
	return (req, res, next) => {
		fn(req, res, next).catch((err) => next(err));
	};
};

module.exports = catchAsync;
