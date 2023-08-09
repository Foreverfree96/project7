const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../db");

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,

      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Update the foreign key to reference the employees table
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "employees", // Refers to the employees table
        key: "id", // Refers to the primary key of the employees table
      },
    },
  },
  {
    sequelize,
    modelName: "Post",
    tableName: "postTable", // Replace "schema_name" with the actual schema name
  }
);

module.exports = Post;
