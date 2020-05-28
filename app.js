const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const userRouter = require("./routes/userRouter");
const questionsRouter = require("./routes/questionsRouter");
const playRouter = require("./routes/playRouter");

const errHandler = require("./utils/errorHandler");

const app = express();

mongoose
	.connect(process.env.MONGO_SRV, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
	.then(() => {
		console.log("MongoDB connected successfully!");
	})
	.catch((err) => {
		console.log(err);
	});

app.use(express.json());
app.use(cookieParser());

// Mounting routers
app.use("/api/v1/users", userRouter);
app.use("/api/v1/questions", questionsRouter);
app.use("/api/v1/play", playRouter);

// Error handler
app.use(errHandler);
module.exports = app;
