const TaskController = require("../controllers/task.controller");

const taskRouter = require("express").Router();

taskRouter.get("/oneTask/:id", TaskController.getTask);
taskRouter.get("/", TaskController.getAllTasks);
taskRouter.post("/update", TaskController.updateTask);
taskRouter.put("/:id", TaskController.updateTask);
taskRouter.post("/newTask", TaskController.createTask);
taskRouter.get("/categories", TaskController.getCategories);
taskRouter.delete("/:id", TaskController.deleteTask);

module.exports = taskRouter;
