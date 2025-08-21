'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('reviews', [
      // === Иван Петров (получает отзывы) ===
      {
        authorId: 2, // Анна → Иван
        targetUserId: 1,
        taskId: 1, // Разработать сайт
        rating: 5,
        comment: 'Иван сделал сайт быстрее дедлайна, отличный результат!',
        created_at: new Date(),
      },
      {
        authorId: 3, // Дмитрий → Иван
        targetUserId: 1,
        taskId: 1,
        rating: 4,
        comment: 'Хорошая работа, но пришлось чуть доработать адаптивность.',
        created_at: new Date(),
      },

      // === Анна Смирнова (получает отзывы) ===
      {
        authorId: 1, // Иван → Анна
        targetUserId: 2,
        taskId: 2, // Создать логотип
        rating: 5,
        comment: 'Очень красивый логотип, стильный и современный!',
        created_at: new Date(),
      },
      {
        authorId: 4, // Екатерина → Анна
        targetUserId: 2,
        taskId: 2,
        rating: 4,
        comment: 'Дизайн хороший, но хотелось бы больше вариантов.',
        created_at: new Date(),
      },

      // === Дмитрий Кузнецов (получает отзывы) ===
      {
        authorId: 1, // Иван → Дмитрий
        targetUserId: 3,
        taskId: 4, // Подготовить презентацию
        rating: 5,
        comment: 'Отличное продвижение, аудитория выросла заметно.',
        created_at: new Date(),
      },
      {
        authorId: 2, // Анна → Дмитрий
        targetUserId: 3,
        taskId: 4,
        rating: 5,
        comment: 'Маркетинг-кампания очень креативная и эффективная!',
        created_at: new Date(),
      },

      // === Екатерина Волкова (получает отзывы) ===
      {
        authorId: 3, // Дмитрий → Екатерина
        targetUserId: 4,
        taskId: 4,
        rating: 5,
        comment: 'Екатерина написала потрясающий текст, цепляет с первых строк!',
        created_at: new Date(),
      },
      {
        authorId: 2, // Анна → Екатерина
        targetUserId: 4,
        taskId: 2,
        rating: 4,
        comment: 'Хорошие статьи, но иногда немного длинновато.',
        created_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('reviews', null, {});
  }
};
