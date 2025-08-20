const TaskController = require('../controllers/task.controller');
const verifyAccessToken = require('../middlewares/verifyAccessToken');

const taskRouter = require('express').Router();


taskRouter.get("/oneTask/:id", TaskController.getTask);
taskRouter.get("/", TaskController.getAllTasks);
taskRouter.post("/update", TaskController.updateTask);
taskRouter.put("/:id", TaskController.updateTask);
taskRouter.post("/newTask", TaskController.createTask);
taskRouter.get("/categories", TaskController.getCategories);
taskRouter.delete("/:id", TaskController.deleteTask);
taskRouter.get('/user/:userId', TaskController.getUserTasks);
taskRouter.get('/user/:userId/hours', TaskController.fetchHours);
taskRouter.get('/executed/:userId', TaskController.getUserExecutedTasks);
taskRouter.post('/create', verifyAccessToken, TaskController.createTask);


module.exports = taskRouter;
