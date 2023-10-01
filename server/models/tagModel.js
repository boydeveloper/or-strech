module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define(
    "tag",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      createdAt: {
        field: "create_timestamp",
        type: DataTypes.DATE,
      },
      updatedAt: {
        field: "update_timestamp",
        type: DataTypes.DATE,
      },
      baseline: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    { freezeTableName: true, tableName: "tags" }
  );
  return Tag;
};
