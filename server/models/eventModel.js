module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define(
    "event",
    {
      userId: {
        type: DataTypes.INTEGER,
      },
      timestamp: {
        type: DataTypes.DATE,
      },
      event_type: {
        type: DataTypes.STRING,
      },
      value: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      session_id: {
        type: DataTypes.STRING,
      },
      createdAt: {
        field: "create_timestamp",
        type: DataTypes.DATE,
      },
      updatedAt: {
        field: "update_timestamp",
        type: DataTypes.DATE,
      },
      notes: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    { freezeTableName: true, tableName: "usage_event" }
  );
  return Event;
};
