const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/user.router");
const skillRouter = require("./routes/user.skills.router");
const taskRouter = require("./routes/task.router");

const app = express();

app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", userRouter);
app.use("/api/users", skillRouter);
app.use("/api/tasks", taskRouter);

module.exports = app;
