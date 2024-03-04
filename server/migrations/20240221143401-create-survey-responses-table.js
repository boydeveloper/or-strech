"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("survey_responses", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      externalReferenceId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      firstName: {
        type: Sequelize.STRING,
      },
      lastName: {
        type: Sequelize.STRING,
      },
      A1: {
        type: Sequelize.STRING,
      },
      A2: {
        type: Sequelize.STRING,
      },
      A3: {
        type: Sequelize.STRING,
      },
      A4: {
        type: Sequelize.STRING,
      },
      A5: {
        type: Sequelize.STRING,
      },
      A6: {
        type: Sequelize.STRING,
      },
      A7: {
        type: Sequelize.STRING,
      },
      A8: {
        type: Sequelize.STRING,
      },
      A9: {
        type: Sequelize.STRING,
      },
      A10: {
        type: Sequelize.STRING,
      },
      A11: {
        type: Sequelize.STRING,
      },
      A12: {
        type: Sequelize.STRING,
      },
      A13: {
        type: Sequelize.STRING,
      },
      A14: {
        type: Sequelize.STRING,
      },
      A15: {
        type: Sequelize.STRING,
      },
      A16: {
        type: Sequelize.STRING,
      },
      A17: {
        type: Sequelize.STRING,
      },
      A18: {
        type: Sequelize.STRING,
      },
      A19: {
        type: Sequelize.STRING,
      },
      A20: {
        type: Sequelize.STRING,
      },
      A21: {
        type: Sequelize.STRING,
      },
      A22: {
        type: Sequelize.STRING,
      },
      A23: {
        type: Sequelize.STRING,
      },
      A24: {
        type: Sequelize.STRING,
      },
      A25: {
        type: Sequelize.STRING,
      },
      A26: {
        type: Sequelize.STRING,
      },
      A27: {
        type: Sequelize.STRING,
      },
      A28: {
        type: Sequelize.STRING,
      },
      A29: {
        type: Sequelize.STRING,
      },
      A30: {
        type: Sequelize.STRING,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("survey_responses");
  },
};
