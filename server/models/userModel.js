module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      alternate_email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      salt: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      conf_timer: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      active: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        field: "create_timestamp",
        type: DataTypes.DATE,
      },
      updatedAt: {
        field: "update_timestamp",
        type: DataTypes.DATE,
      },
      tags_excel: {
        type: DataTypes.JSON,
      },
      frequency: {
        type: DataTypes.INTEGER,
      },
      surveys_number: {
        type: DataTypes.INTEGER,
      },
      days_number: {
        type: DataTypes.INTEGER,
      },
      current_survey_number: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      last_survey_check: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      deleted: {
        type: DataTypes.INTEGER,
      },
      main_user_id: {
        type: DataTypes.INTEGER,
      },
      baseline_survey: {
        type: DataTypes.INTEGER,
      },
      user_type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    { freezeTableName: true, tableName: "user" }
  );
  return User;
};
