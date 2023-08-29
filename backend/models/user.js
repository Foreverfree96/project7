const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../db");
const Post = require("./post"); // Import the Post model

class User extends Model {}

User.init(
  {
    username: {
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
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true, // Allow null if the user doesn't have an image
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users", // Use "users" as the table name
  }
);

// Define the association here
// User.hasMany(Post, { foreignKey: "userId" });
// Post.belongsTo(User, { foreignKey: "userId" });

module.exports = User;
