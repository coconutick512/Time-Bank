'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('user_skills', [
      // Иван Петров
      { userId: 1, skillId: 1 }, // JavaScript
      { userId: 1, skillId: 2 }, // Node.js
      { userId: 1, skillId: 4 }, // React

      // Анна Смирнова
      { userId: 2, skillId: 5 }, // Рисование
      { userId: 2, skillId: 10 }, // Фотография
      { userId: 2, skillId: 14 }, // Tailwind CSS / Дизайн

      // Дмитрий Кузнецов
      { userId: 3, skillId: 15 }, // Публичные выступления
      { userId: 3, skillId: 8 }, // PostgreSQL / Маркетинг
      { userId: 3, skillId: 3 }, // Sequelize (как аналитика данных)

      // Екатерина Волкова
      { userId: 4, skillId: 11 }, // Пение
      { userId: 4, skillId: 12 }, // Шахматы / креатив
      { userId: 4, skillId: 13 }, // Садоводство (хобби)
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_skills', null, {});
  },
};
