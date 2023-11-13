// models/user_tags.js

module.exports = (sequelize, DataTypes) => {
  const UserTags = sequelize.define(
    "user_tags",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      tag_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      freezeTableName: true,
      tableName: "user_tags",
    }
  );

  UserTags.associate = (models) => {
    UserTags.belongsTo(models.tags, {
      foreignKey: "tag_id",
      as: "tags",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    UserTags.belongsTo(models.users, {
      foreignKey: "user_id",
      as: "user",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return UserTags;
};
