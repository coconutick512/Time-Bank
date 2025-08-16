const TaskController = require("../controllers/task.controller");

const taskRouter = require("express").Router();

taskRouter.get("/:id", TaskController.getTask);
taskRouter.get("/", TaskController.getAllTasks);

module.exports = taskRouter;