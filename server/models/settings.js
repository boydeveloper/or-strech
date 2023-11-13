module.exports = (sequelize, DataTypes) => {
  const Settings = sequelize.define(
    "settings",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unsigned: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      value: {
        type: DataTypes.TINYINT,
        allowNull: true,
      },
    },
    {
      freezeTableName: true,
      tableName: "settings",
    }
  );

  return Settings;
};
