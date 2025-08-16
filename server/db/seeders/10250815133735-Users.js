"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          id: 1,
          name: "Alice",
          email: "alice@example.com",
          hashpass: "hashed_password_1",
          balance: 100.0,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          name: "Bob",
          email: "bob@example.com",
          hashpass: "hashed_password_2",
          balance: 150.5,
          created_at: new Date(),
          updated_at: new Date(),
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
