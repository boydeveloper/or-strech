module.exports = (sequelize, DataTypes) => {
  const Link = sequelize.define(
    "link",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { freezeTableName: true, tableName: "link", timestamps: false }
  );
  return Link;
};
