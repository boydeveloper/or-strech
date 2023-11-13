module.exports = (sequelize, DataTypes) => {
  const Tags = sequelize.define(
    "tags",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "create_timestamp",
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "update_timestamp",
      },
      baseline: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      freezeTableName: true,
      tableName: "tags",
    }
  );

  Tags.associate = (models) => {
    Tags.belongsTo(models.user_tags, {
      foreignKey: "tag_id",
      as: "user_tags",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Tags;
};
