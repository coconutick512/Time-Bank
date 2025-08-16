"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "user_skills",
      [
        {
          user_id: 1,
          skill_id: 1,
        },
        {
          user_id: 1,
          skill_id: 2,
        },
        {
          user_id: 2,
          skill_id: 2,
        },
        {
          user_id: 2,
          skill_id: 3,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
