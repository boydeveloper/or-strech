module.exports = (sequelize, DataTypes) => {
  const EndOfDaySurvey = sequelize.define(
    "endofday_survey",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      day: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      mentaly_demanding_surgeries: {
        type: DataTypes.TINYINT,
        allowNull: true,
      },
      physically_demanding_surgeries: {
        type: DataTypes.TINYINT,
        allowNull: true,
      },
      complex_surgeries: {
        type: DataTypes.TINYINT,
        allowNull: true,
      },
      difficult_surgeries: {
        type: DataTypes.TINYINT,
        allowNull: true,
      },
      impact_physical: {
        type: DataTypes.TINYINT,
        allowNull: true,
      },
      impact_mental: {
        type: DataTypes.TINYINT,
        allowNull: true,
      },
      impact_pain: {
        type: DataTypes.TINYINT,
        allowNull: true,
      },
      impact_fatigue: {
        type: DataTypes.TINYINT,
        allowNull: true,
      },
      distracting: {
        type: DataTypes.TINYINT,
        allowNull: true,
      },
      flow_impact: {
        type: DataTypes.TINYINT,
        allowNull: true,
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      create_timestamp: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      update_timestamp: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      freezeTableName: true,
    }
  );

  EndOfDaySurvey.associate = (models) => {
    EndOfDaySurvey.belongsTo(models.user, {
      foreignKey: "userid",
      as: "user",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return EndOfDaySurvey;
};
