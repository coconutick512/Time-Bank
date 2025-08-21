const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/user.router');
const skillRouter = require('./routes/user.skills.router');
const skillsRouter = require('./routes/skills.router');
const taskRouter = require('./routes/task.router');
const messagesRouter = require('./routes/messages.router');
const chatRouter = require('./routes/chat.router');
const reviewRouter = require('./routes/review.router');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
  method: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const cookie = require('cookie');
const http = require('http');
const db = require('../db/models');
const ChatService = require('./services/chat.service');
const user = require('../db/models/user');
const MessagesController = require('./controllers/messages.controller');
const MessagesService = require('./services/messages.service');

const server = http.createServer(app);
const io = new Server(server, {
  cors: corsOptions,
});

server.listen(3001, () => {
  console.log('Server is listening on port 3001');
});

io.use((socket, next) => {
  try {
    const cookies = cookie.parse(socket.handshake.headers?.cookie);
    const token = cookies.refreshToken;

    if (!token) {
      return next(new Error('Токен не прилетел'));
    }

    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    socket.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    socket.emit('unauthorized', {
      message: 'Недействительный токен',
      status: 401,
    });
    socket.disconnect();
    next(new Error(`Недействительный токе - ${error}`));
  }
});

app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  '/api/uploads/avatars',
  express.static(path.join(__dirname, '../uploads/avatars')),
);
app.use('/api/auth', userRouter);
app.use('/api/users', skillRouter);
app.use('/api/skills', skillsRouter);
app.use('/api/tasks', taskRouter);
app.use('/api/messages', messagesRouter);
app.use('/api/chats', chatRouter);
app.use('/api/reviews', reviewRouter);

io.on('connection', async (socket) => {
  socket.on('joinChat', (chatId) => {
    socket.join(`chat_${chatId}`);
  });

  console.log(`Пользователь подключился -${socket.user.user.name}`);

  socket.on('sendMessage', async ({ senderId, chatId, text }) => {
    try {
      console.log('Вот такое сообщение принял: ', { senderId, chatId, text });
      const message = await MessagesService.createMessage({
        chatId,
        text,
        senderId,
      });
      console.log('Вот в этом сообщении сломалось:', message);
      const plainMessage = message.get({ plain: true });

      socket.emit('newMessage', plainMessage); // чтобы отправитель тоже получил
      socket.broadcast.to(`chat_${chatId}`).emit('newMessage', plainMessage); // другие участники
    } catch (error) {
      console.error('Ошибка при создании сообщения:', error);
      socket.emit('errorMessage', { message: 'Ошибка при отправке сообщения' });
    }
  });
});

module.exports = app;
