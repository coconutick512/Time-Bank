const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/user.router');
const skillRouter = require('./routes/user.skills.router');
const skillsRouter = require('./routes/skills.router');
const taskRouter = require('./routes/task.router');
const bodyParser = require('body-parser');

const app = express();

app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/uploads/avatars', express.static('uploads/avatars'));
app.use('/api/auth', userRouter);
app.use('/api/users', skillRouter);
app.use('/api/skills', skillsRouter);
app.use('/api/tasks', taskRouter);

module.exports = app;
