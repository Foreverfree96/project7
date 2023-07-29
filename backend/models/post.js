const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../db");

class Post extends Model {}

Post.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Add foreign key to associate a post with a user
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User", // Refers to the User model
        key: "id", // Refers to the primary key of the User model
      },
    },
  },
  {
    sequelize,
    modelName: "Post",
    tableName: "posts", // Name of the table in the database
  }
);

module.exports = Post;
