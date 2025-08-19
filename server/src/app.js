const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/user.router");
const skillRouter = require("./routes/user.skills.router");
const skillsRouter = require("./routes/skills.router");
const taskRouter = require("./routes/task.router");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const http = require("http");
const db = require("./db/models");

const server = http.createServer(app);
const io = new Server(server);

io.use((socket, next) => {
  try {
    const cookies = cookie.parse(socket.handshake.headers.cookie);
    const token = cookies.refreshToken;

    if (!token) {
      return next(new Error("Токен не прилетел бро"));
    }

    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    socket.user = decoded;
    //тут можно доставать айдишник у юзера
  } catch (error) {
    console.log(`Ошибка в io.use: ${error}`);
    socket.emit("unauthorized", {
      message: "Недействительный токен",
      status: 401,
    });
    socket.disconnect();
    next(new Error(`Недействительный токен - ${error}`));
  }
});

app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  "/api/uploads/avatars",
  express.static(path.join(__dirname, "../uploads/avatars"))
);
app.use("/api/auth", userRouter);
app.use("/api/users", skillRouter);
app.use("/api/skills", skillsRouter);
app.use("/api/tasks", taskRouter);




module.exports = app;
