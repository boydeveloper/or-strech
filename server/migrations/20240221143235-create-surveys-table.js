"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("surveys", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      endpointLink: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      surveyLink: {
        type: Sequelize.STRING,
      },
      Q1: {
        type: Sequelize.STRING,
      },
      Q2: {
        type: Sequelize.STRING,
      },
      Q3: {
        type: Sequelize.STRING,
      },
      Q4: {
        type: Sequelize.STRING,
      },
      Q5: {
        type: Sequelize.STRING,
      },
      Q6: {
        type: Sequelize.STRING,
      },
      Q7: {
        type: Sequelize.STRING,
      },
      Q8: {
        type: Sequelize.STRING,
      },
      Q9: {
        type: Sequelize.STRING,
      },
      Q10: {
        type: Sequelize.STRING,
      },
      Q11: {
        type: Sequelize.STRING,
      },
      Q12: {
        type: Sequelize.STRING,
      },
      Q13: {
        type: Sequelize.STRING,
      },
      Q14: {
        type: Sequelize.STRING,
      },
      Q15: {
        type: Sequelize.STRING,
      },
      Q16: {
        type: Sequelize.STRING,
      },
      Q17: {
        type: Sequelize.STRING,
      },
      Q18: {
        type: Sequelize.STRING,
      },
      Q19: {
        type: Sequelize.STRING,
      },
      Q20: {
        type: Sequelize.STRING,
      },
      Q21: {
        type: Sequelize.STRING,
      },
      Q22: {
        type: Sequelize.STRING,
      },
      Q23: {
        type: Sequelize.STRING,
      },
      Q24: {
        type: Sequelize.STRING,
      },
      Q25: {
        type: Sequelize.STRING,
      },
      Q26: {
        type: Sequelize.STRING,
      },
      Q27: {
        type: Sequelize.STRING,
      },
      Q28: {
        type: Sequelize.STRING,
      },
      Q29: {
        type: Sequelize.STRING,
      },
      Q30: {
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
    await queryInterface.dropTable("surveys");
  },
};
