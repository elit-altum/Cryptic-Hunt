// Error handling class
class AppError {
	constructor(message, statusCode) {
		this.message = message;
		this.statusCode = statusCode;

		this.isOperational = true;
	}
}

module.exports = AppError;
