const { Task, User, Transaction, Review, Category ,TaskCategory} = require("../../db/models");

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
          // {
          //   model: User,
          //   as: "executor",
          //   attributes: ["name"],
          //   required: true,
          // },
          // {
          //   model: Transaction,
          //   as: "transaction",
          //   attributes: ["amount"],
          //   required: true,
          // },
          // {
          //   model: Review,
          //   as: "review",
          //   attributes: ["rating"],
          //   required: true,
          // },
          {
            model: Category,
            as: "categories",
            attributes: ["name","id"],
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
            attributes: ["name" , "id"],
            required: true,
          },
        ]
      });
      return tasks;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  }

  static async updateTask(id, title, description, hours, status, deadline, categories) {
    try {
      const task = await Task.update(
        {
          title,
          description,
          hours,
          status,
          deadline,
          categories,
        },
        {
          where: { id },
        }
      );
      
      return task;
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  }


  static async createTask(title, description, hours, deadline, categories, creatorId) {
    try {
      const task = await Task.create({
        title,
        description,
        hours,
        status: "open",
        deadline,
        creatorId
      });



       for (const category of categories) {
        await TaskCategory.create({
          taskId: task.id,
          categoryId: category,
        });
      }
      

      const res = await Task.findByPk(task.id,{
        include: [
          {
            model: User,
            as: "creator",
            attributes: ["name"],
            required: true,
          },
          {
            model: Category,
            as: "categories",
            attributes: ["name","id"],
            required: true,
          },
        ],
      });

      return res;
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  }


  static async allCategories() {
    try {
      const categories = await Category.findAll({
        attributes: ["name","id"],
      }
      );
      return categories;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  }

  static async deleteTask(id) {
    try {
      const task = await Task.destroy({
        where: { id },
      });
      return task;
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  }
}

module.exports = TaskService;
          