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

  static async createTask(req, res) {
    try {

      const { title, description, hours, deadline, categories ,creatorId} = req.body;
      const task = await TaskService.createTask(
        title,
        description,
        hours,
        deadline,
        categories,
        creatorId
      );
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({
        error: "Ошибка при создании задачи в контроллере",
      });
    }
  }

  static async getCategories(req, res) {  
    try {
      const categories = await TaskService.allCategories();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({
        error: "Ошибка при получении категорий в контроллере",
      });
    }
  }

  static async deleteTask(req, res) {
    try {
      const { id } = req.params;
      const task = await TaskService.deleteTask(id);
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({
        error: "Ошибка при удалении задачи в контроллере",
      });
    }
  }
}

module.exports = TaskController;
