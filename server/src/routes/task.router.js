const TaskController = require('../controllers/task.controller');
const verifyAccessToken = require('../middlewares/verifyAccessToken');

const taskRouter = require('express').Router();


taskRouter.get("/oneTask/:id", TaskController.getTask);
taskRouter.get("/", TaskController.getAllTasks);
taskRouter.post("/update", verifyAccessToken, TaskController.updateTask);
taskRouter.put("/:id",  TaskController.updateTask);
taskRouter.post("/newTask",  TaskController.createNewTask);
taskRouter.get("/categories", TaskController.getCategories);
taskRouter.delete("/:id", verifyAccessToken, TaskController.deleteTask);
taskRouter.get('/user/:userId', TaskController.getUserTasks);
taskRouter.get('/user/:userId/hours', TaskController.fetchHours);
taskRouter.get('/executed/:userId', TaskController.getUserExecutedTasks);
taskRouter.post('/create', TaskController.createTask);


module.exports = taskRouter;
