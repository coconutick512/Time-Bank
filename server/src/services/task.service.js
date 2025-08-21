const {
  Task,
  User,
  Transaction,
  Review,
  Category,
  TaskCategory,
} = require("../../db/models");

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
            model: Category,
            as: "categories",
            attributes: ["name", "id"],
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
            attributes: ["name", "id"],
            required: true,
          },
        ],
      });
      return tasks;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  }

  static async updateTask(id, data) {
    try {
      const task = await Task.update(data, {
        where: { id },
      });

    

      const completedTask = await Task.findByPk(id);
      if (data.status === 'completed' && completedTask.status === 'running') {
        const user = await User.findByPk(completedTask.executorId);
        await user.update(
          {
           balance: Number(user.balance) + Number(completedTask.hours),
          },
        );
      }

      return task;
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  }

  static async createNewTask(
    title,
    description,
    created_at,
    hours,
    deadline,
    categories,
    creatorId
  ) {
    try {
      console.log('createNewTask data:', title, description, hours, deadline, categories, creatorId,'----------------------------------');
      const task = await Task.create({
        title,
        description,
        hours,
        status: "open",
        created_at,
        deadline,
        creatorId,
      });

      for (const category of categories) {
        await TaskCategory.create({
          taskId: task.id,
          categoryId: category,
        });
      }

      const res = await Task.findByPk(task.id, {
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
            attributes: ["name", "id"],
            required: true,
          },
        ],
      });

      

      const user = await User.findByPk(res.creatorId);
      await user.update(
        {
          balance: user.balance - res.hours,
        }
      );

      return res;
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  }

  static async allCategories() {
    try {
      const categories = await Category.findAll({
        attributes: ["name", "id"],
      });
      return categories;
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  static async getUserTasks(userId) {
    const tasks = await Task.findAll({
      where: { creatorId: userId },
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
          attributes: ["name", "id"],
          required: false,
        },
      ],
    });
    return tasks;
  }

  static async getUserExecutedTasks(userId) {
    const tasks = await Task.findAll({
      where: { executorId: userId },
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
          attributes: ["name", "id"],
          required: false,
        },
      ],
    });
    return tasks;
  }

  static async getAvailableHoursByDate(dateStr, userId) {
    if (!dateStr) throw new Error("Date required");
    if (!userId) throw new Error("User ID required");

    try {
      const tasks = await Task.findAll({
        where: { executorId: userId },
      });

      const targetDate = new Date(dateStr);
      const booked = [];

      tasks.forEach((task) => {
        if (!task.bookedDates) return;

        let bookedDates;
        try {
          if (typeof task.bookedDates === "string") {
            bookedDates = JSON.parse(task.bookedDates);
          } else {
            bookedDates = task.bookedDates;
          }

          if (!Array.isArray(bookedDates)) {
            bookedDates = [bookedDates];
          }
        } catch {
          bookedDates = [task.bookedDates];
        }

        bookedDates.forEach((d) => {
          const dt = new Date(d);
          const bookedDateStr = dt.toISOString().split("T")[0];
          const targetDateStr = targetDate.toISOString().split("T")[0];

          if (bookedDateStr === targetDateStr) {
            booked.push(dt.getHours());
          }
        });
      });

      const allHours = Array.from({ length: 10 }, (_, i) => i + 9);
      const available = allHours.filter((h) => !booked.includes(h));

      return { booked, available };
    } catch (error) {
      console.error("Database error in getAvailableHoursByDate:", error);
      throw error;
    }
  }

  static async deleteTask(id) {
    try {

      const delTask= await Task.findByPk(id);
      console.log(delTask)
      const task = await Task.destroy({ where: { id } });
      const user = await User.findByPk(delTask.creatorId);
      await user.update(
        {
          balance: Number(user.balance) + Number(delTask.hours),
        }
      );
      return task;
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  }



  static async createSpecialTask({
    title,
    description,
    deadline,
    creatorId,
    executorId,
    categories,
    hours,
    bookedDate,
  }) {
    const newTask = await Task.create({
      title,
      description,
      deadline,
      hours,
      status: "assigned",
      creatorId,
      executorId,
      bookedDates: JSON.stringify([bookedDate]),
    });

    for (const category of categories) {
        await TaskCategory.create({
          taskId: newTask.id,
          categoryId: category.id,
        });
      }

      const result = await Task.findByPk(newTask.id, {
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
            attributes: ["name", "id"],
            required: true,
          },
        ],
      });

      const user = await User.findByPk(result.creatorId);
      await user.update(
        {
          balance: user.balance - result.hours,
        }
      );

      return result;
  }
}

module.exports = TaskService;
