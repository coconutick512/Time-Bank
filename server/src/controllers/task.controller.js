const TaskService = require('../services/task.service');

class TaskController {
  static async getTask(req, res) {
    try {
      const { id } = req.params;
      const task = await TaskService.getTask(id);
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({
        error: 'Ошибка при получении задачи в контроллере',
      });
    }
  }

  static async getAllTasks(req, res) {
    try {
      const tasks = await TaskService.getAllTasks();
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({
        error: 'Ошибка при получении задач в контроллере',
      });
    }
  }

  static async updateTask(req, res) {
    try {
      const { id } = req.params;
      const  data  = req.body;
      const task = await TaskService.updateTask(id,
        data
      );
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({
        error: 'Ошибка при обновлении задачи в контроллере',
      });
    }
  }

  static async getUserTasks(req, res) {
    try {
      const { userId } = req.params;
      const tasks = await TaskService.getUserTasks(userId);
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({
        error: 'Ошибка при получении задач в контроллере',
      });
    }
  }

  static async createNewTask(req, res) {
    try {

      const { title, description, hours, deadline, categories ,creatorId} = req.body;
      const task = await TaskService.createNewTask(
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
  
  static async getUserExecutedTasks(req, res) {
    try {
      const { userId } = req.params;
      const tasks = await TaskService.getUserExecutedTasks(userId);
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({
        error: 'Ошибка при получении задач в контроллере',
      });
    }
  }

  static async fetchHours(req, res) {
    try {
      const { userId } = req.params;
      const { date } = req.query;

      console.log('fetchHours called with:', { userId, date });

      if (!date || typeof date !== 'string') {
        return res.status(400).json({ error: 'Date required' });
      }
      if (!userId) {
        return res.status(400).json({ error: 'User ID required' });
      }

      const hours = await TaskService.getAvailableHoursByDate(date, userId);
      return res.json(hours);
    } catch (err) {
      console.error('Error in fetchHours:', err);
      return res.status(500).json({ error: 'Server error' });
    }
  }

  static async createTask(req, res) {
    try {
      console.log('Received data:', req.body);
      console.log('User from token:', req.user);

      const { title, description, deadline, bookedDate, executorId,hours ,creatorId ,categories} =
        req.body;

      console.log('Extracted executorId:', executorId);
      console.log('Extracted creatorId:', creatorId);

      const task = await TaskService.createSpecialTask({
        title,
        description,
        deadline,
        bookedDate,
        creatorId,
        executorId,
        hours,
        categories
      });

      console.log('Created task:', task);

      return res.status(201).json(task);
    } catch (err) {
      console.error('Create task error:', err);
      return res.status(400).json({ error: err.message });
    }
  }
}

module.exports = TaskController;
