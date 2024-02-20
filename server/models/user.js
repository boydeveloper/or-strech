module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
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
        defaultValue: 1,
      },
      createdAt: {
        type: DataTypes.DATE,
        field: "create_timestamp",
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: "update_timestamp",
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
        defaultValue: 0,
      },
      main_user_id: {
        type: DataTypes.INTEGER,
      },
      baseline_survey_id: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      user_type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      // is_verified: {
      //   type: DataTypes.BOOLEAN,
      //   defaultValue: false,
      //   allowNull: false,
      // },
    },
    { freezeTableName: true, tableName: "user" }
  );
  return User;
};
