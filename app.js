const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const xss = require("xss-clean");

const userRouter = require("./routes/userRouter");
const questionsRouter = require("./routes/questionsRouter");
const playRouter = require("./routes/playRouter");
const viewRouter = require("./routes/viewRouter");

const errHandler = require("./utils/errorHandler");

const app = express();
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "public", "views"));

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

app.use(helmet());
app.use(xss());

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

// Mounting routers
app.use("/api/v1/users", userRouter);
app.use("/api/v1/questions", questionsRouter);
app.use("/api/v1/play", playRouter);
app.use("/", viewRouter);

app.all("*", (req, res) => {
	res.status(404).json({
		status: "fail",
		message: "This route does not exist!",
	});
});

// Error handler
app.use(errHandler);
module.exports = app;
