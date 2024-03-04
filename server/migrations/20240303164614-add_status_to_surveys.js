"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("surveys", "status", {
      type: Sequelize.STRING,
      defaultValue: "enabled",
      allowNull: false,
      validate: {
        isIn: [["enabled", "disabled"]],
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("surveys", "status");
  },
};
