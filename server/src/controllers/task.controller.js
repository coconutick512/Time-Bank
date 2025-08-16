const TaskService = require("../services/task.service");

class TaskController {
  static async getTask(req, res) {
    try {
      const { id } = req.params;
      const task = await TaskService.getTask(id);
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({
        error: "Ошибка при получении задачи в контроллере",
      });
    }
  }

  static async getAllTasks(req, res) {
    try {
      const tasks = await TaskService.getAllTasks();
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({
        error: "Ошибка при получении задач в контроллере",
      });
    }
  }
}

module.exports = TaskController;