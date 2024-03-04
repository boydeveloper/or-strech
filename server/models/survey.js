module.exports = (sequelize, DataTypes) => {
  const Survey = sequelize.define("survey", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    endpointLink: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surveyLink: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "disabled",
      allowNull: false,
    },
    Q1: {
      type: DataTypes.STRING,
    },
    Q2: {
      type: DataTypes.STRING,
    },
    Q3: {
      type: DataTypes.STRING,
    },
    Q4: {
      type: DataTypes.STRING,
    },
    Q5: {
      type: DataTypes.STRING,
    },
    Q6: {
      type: DataTypes.STRING,
    },
    Q7: {
      type: DataTypes.STRING,
    },
    Q8: {
      type: DataTypes.STRING,
    },
    Q9: {
      type: DataTypes.STRING,
    },
    Q10: {
      type: DataTypes.STRING,
    },
    Q11: {
      type: DataTypes.STRING,
    },
    Q12: {
      type: DataTypes.STRING,
    },
    Q13: {
      type: DataTypes.STRING,
    },
    Q14: {
      type: DataTypes.STRING,
    },
    Q15: {
      type: DataTypes.STRING,
    },
    Q16: {
      type: DataTypes.STRING,
    },
    Q17: {
      type: DataTypes.STRING,
    },
    Q18: {
      type: DataTypes.STRING,
    },
    Q19: {
      type: DataTypes.STRING,
    },
    Q20: {
      type: DataTypes.STRING,
    },
    Q21: {
      type: DataTypes.STRING,
    },
    Q22: {
      type: DataTypes.STRING,
    },
    Q23: {
      type: DataTypes.STRING,
    },
    Q24: {
      type: DataTypes.STRING,
    },
    Q25: {
      type: DataTypes.STRING,
    },
    Q26: {
      type: DataTypes.STRING,
    },
    Q27: {
      type: DataTypes.STRING,
    },
    Q28: {
      type: DataTypes.STRING,
    },
    Q29: {
      type: DataTypes.STRING,
    },
    Q30: {
      type: DataTypes.STRING,
    },
  });
  return Survey;
};
