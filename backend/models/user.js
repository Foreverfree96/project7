const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../db");

class User extends Model {}

User.init(
  {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: { type: DataTypes.STRING, required: true },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "employees",
  }
);

module.exports = User;
