'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('task_categories', [
      { taskId: 1, categoryId: 1 }, // Разработать сайт -> Программирование
      { taskId: 1, categoryId: 2 }, // Разработать сайт -> Дизайн
      { taskId: 2, categoryId: 2 }, // Создать логотип -> Дизайн
      { taskId: 2, categoryId: 4 }, // Создать логотип -> Маркетинг
      { taskId: 3, categoryId: 8 }, // Приготовить ужин -> Образование (или можно добавить "Кулинария")
      { taskId: 4, categoryId: 7 }, // Пробежать 10 км -> Спорт
      { taskId: 5, categoryId: 5 }, // Сфотографировать мероприятие -> Фотография
      { taskId: 6, categoryId: 6 }, // Выучить песню на гитаре -> Музыка
      { taskId: 7, categoryId: 8 }, // Посадить цветы -> Образование (или можно "Природа")
      { taskId: 8, categoryId: 1 }, // Подготовить презентацию -> Программирование (или "Маркетинг")
      { taskId: 8, categoryId: 4 }, // Подготовить презентацию -> Маркетинг
    ]);
  },

  async down(queryInterface, Sequelize) {
    // Если в БД snake_case, используй так:
    await queryInterface.bulkDelete('task_categories', {
      task_id: { [Sequelize.Op.in]: [1, 2, 3, 4, 5, 6, 7, 8] }
    });
  }
};
