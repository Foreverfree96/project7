// Import necessary modules from Sequelize library
const { Model, DataTypes } = require("sequelize");

// Import the Sequelize instance (sequelize) configured for the database
const { sequelize } = require("../db");

// Define a class for the 'Post' model that extends the Sequelize Model class
class Post extends Model {}

// Initialize the 'Post' model with its attributes and configuration
Post.init(
  {
    // Define the 'id' attribute as an auto-incrementing integer primary key
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    // Define the 'title' attribute as a non-null string
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Define the 'createdAt' attribute as a non-null date with a default value of the current timestamp
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: "createdAt", // Specify the field name in the database
    },
    // Define the 'updatedAt' attribute as a non-null date with a default value of the current timestamp
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    // Define the 'content' attribute as a non-null text
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // Define the 'imageUrl' attribute as a non-null string
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Define the 'posts' attribute as a nullable JSON data type
    posts: {
      type: DataTypes.JSON, // Use DataTypes.JSONB for PostgreSQL
      allowNull: true, // Set to false if you want it to be mandatory
    },
    // Define the 'userId' attribute as a non-null integer that references the 'employees' table
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
    sequelize, // Pass the Sequelize instance for this model
    modelName: "Post", // Define the model name
    tableName: "postTable", // Define the table name in the database
  }
);

// Export the 'Post' model for use in other parts of the application
module.exports = Post;
