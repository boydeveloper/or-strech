module.exports = (sequelize, DataTypes) => {
  const Gdpr = sequelize.define(
    "gdpr",
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      createdAt: {
        field: "accept_date",
        type: DataTypes.DATE,
      },
    },
    { updatedAt: false, freezeTableName: true, tableName: "gdpr" }
  );
  return Gdpr;
};
