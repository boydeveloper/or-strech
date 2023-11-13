module.exports = (sequelize, DataTypes) => {
  const Link = sequelize.define(
    "link",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
      },
      url: {
        type: DataTypes.STRING(500),
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      tableName: "link",
      timestamps: false,
    }
  );

  return Link;
};
