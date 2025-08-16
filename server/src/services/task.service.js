const { Task, User, Transaction, Review, Category } = require("../../db/models");

class TaskService {
  static async getTask(id) {
    try {
      const task = await Task.findByPk(id, {
        include: [
          {
            model: User,
            as: "creator",
            attributes: ["name"],
            required: true,
          },
          {
            model: User,
            as: "executor",
            attributes: ["name"],
            required: true,
          },
          {
            model: Transaction,
            as: "transaction",
            attributes: ["amount"],
            required: true,
          },
          {
            model: Review,
            as: "review",
            attributes: ["rating"],
            required: true,
          },
          {
            model: Category,
            as: "categories",
            attributes: ["name"],
            required: true,
          },
        ],
      });
      
      return task;
    } catch (error) {
      console.error("Error fetching task:", error);
      throw error;
    }
  }
  
  static async getAllTasks() {
    try {
      const tasks = await Task.findAll({
        include: [{
            model: User,
            as: "creator",
            attributes: ["name"],
            required: true,
          },
          {
            model: Category,
            as: "categories",   
            attributes: ["name"],
            required: true,
          },
        ]
      });
      console.log(tasks,'---------------');   
      return tasks;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  }
}

module.exports = TaskService;
          