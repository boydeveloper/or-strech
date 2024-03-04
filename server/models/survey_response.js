module.exports = (sequelize, DataTypes) => {
  const SurveyResponse = sequelize.define("survey_responses", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    externalReferenceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    A1: {
      type: DataTypes.STRING,
    },
    A2: {
      type: DataTypes.STRING,
    },
    A3: {
      type: DataTypes.STRING,
    },
    A4: {
      type: DataTypes.STRING,
    },
    A5: {
      type: DataTypes.STRING,
    },
    A6: {
      type: DataTypes.STRING,
    },
    A7: {
      type: DataTypes.STRING,
    },
    A8: {
      type: DataTypes.STRING,
    },
    A9: {
      type: DataTypes.STRING,
    },
    A10: {
      type: DataTypes.STRING,
    },
    A11: {
      type: DataTypes.STRING,
    },
    A12: {
      type: DataTypes.STRING,
    },
    A13: {
      type: DataTypes.STRING,
    },
    A14: {
      type: DataTypes.STRING,
    },
    A15: {
      type: DataTypes.STRING,
    },
    A16: {
      type: DataTypes.STRING,
    },
    A17: {
      type: DataTypes.STRING,
    },
    A18: {
      type: DataTypes.STRING,
    },
    A19: {
      type: DataTypes.STRING,
    },
    A20: {
      type: DataTypes.STRING,
    },
    A21: {
      type: DataTypes.STRING,
    },
    A22: {
      type: DataTypes.STRING,
    },
    A23: {
      type: DataTypes.STRING,
    },
    A24: {
      type: DataTypes.STRING,
    },
    A25: {
      type: DataTypes.STRING,
    },
    A26: {
      type: DataTypes.STRING,
    },
    A27: {
      type: DataTypes.STRING,
    },
    A28: {
      type: DataTypes.STRING,
    },
    A29: {
      type: DataTypes.STRING,
    },
    A30: {
      type: DataTypes.STRING,
    },
  });
  return SurveyResponse;
};
