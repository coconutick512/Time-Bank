const UserController = require('../controllers/user.controller');

const authRouter = require('express').Router();

authRouter.post('/signup', UserController.signup);
authRouter.delete('/logout', UserController.logout);
authRouter.get('/refresh', UserController.refresh);
authRouter.post('/signin', UserController.signin);
authRouter.get('/:id', UserController.findOne);

module.exports = authRouter