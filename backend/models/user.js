// Import necessary modules from Sequelize library
const { Model, DataTypes } = require("sequelize");

// Import the Sequelize instance (sequelize) configured for the database
const { sequelize } = require("../db");

// Import the 'Post' model
const Post = require("./post"); // Import the Post model

// Define a class for the 'User' model that extends the Sequelize Model class
class User extends Model {}

// Initialize the 'User' model with its attributes and configuration
User.init(
  {
    // Define the 'username' attribute as a non-null string
    username: {
      type: DataTypes.STRING,
      allowNull: false, // Username is required
    },
    // Define the 'email' attribute as a non-null string with uniqueness constraint
    email: {
      type: DataTypes.STRING,
      allowNull: false, // Email is required
      unique: true, // Ensure email uniqueness
    },
    // Define the 'password' attribute as a non-null string
    password: {
      type: DataTypes.STRING,
      allowNull: false, // Password is required
    },
    // Define the 'imageUrl' attribute as a nullable string (allows null if the user doesn't have an image)
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true, // User can optionally have an image
    },
  },
  {
    sequelize, // Pass the Sequelize instance for this model
    modelName: "User", // Define the model name
    tableName: "users", // Use "users" as the table name in the database
  }
);

// Export the 'User' model for use in other parts of the application
module.exports = User;
