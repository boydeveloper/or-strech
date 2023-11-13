module.exports = (sequelize, DataTypes) => {
  const UsageEvent = sequelize.define(
    "usage_event",
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
      timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      event_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      value: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      session_id: {
        type: DataTypes.STRING,
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
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      freezeTableName: true,
      tableName: "usage_event",
    }
  );
  UsageEvent.associate = (models) => {
    UsageEvent.belongsTo(models.user, {
      foreignKey: "userid",
      as: "user",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return UsageEvent;
};
