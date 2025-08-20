const UserController = require('../controllers/user.controller');
const verifyAccessToken = require('../middlewares/verifyAccessToken');

const authRouter = require('express').Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/avatars/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

authRouter.post('/signup', UserController.signup);
authRouter.delete('/logout', UserController.logout);
authRouter.get('/refresh', UserController.refresh);
authRouter.post('/signin', UserController.signin);
authRouter.get('/:id', UserController.findOne);
authRouter.post(
  '/submitForm',
  verifyAccessToken,
  upload.single('avatar'),
  UserController.submitForm,
);
authRouter.put(
  '/updateProfile',
  verifyAccessToken,
  upload.single('avatar'),
  UserController.updateProfile,
);

module.exports = authRouter;
