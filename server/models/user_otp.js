module.exports = (sequelize, DataTypes) => {
  const UserOtp = sequelize.define("user_otps", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    otp: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    expiresAt: {
      type: DataTypes.DATE,
    },
  });
  return UserOtp;
};
