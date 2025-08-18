const TaskService = require("../services/task.service");

class TaskController {
  static async getTask(req, res) {
    try {
      const { id } = req.params;
      console.log(id);
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
  static async updateTask(req, res) {
    try {
      const { id } = req.params;
      const { title, description, hours, status, deadline, categories } =
        req.body;
      const task = await TaskService.updateTask(
        id,
        title,
        description,
        hours,
        status,
        deadline,
        categories
      );
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({
        error: "Ошибка при обновлении задачи в контроллере",
      });
    }
  }
}

module.exports = TaskController;
