// Import Sequelize and configure the database connection
const { Sequelize } = require("sequelize");

// Load environment variables from a .env file
require("dotenv").config();

// Retrieve the database password from environment variables
let pass = process.env.PASS;

// Create a new Sequelize instance and set up the connection to the PostgreSQL database
const sequelize = new Sequelize("postgres", "postgres", pass, {
  host: "localhost", // Replace with your database host if needed
  port: 5432, // Replace with your database port if needed
  dialect: "postgres", // Specify the database dialect
});

// Function to connect to the database
function connect() {
  sequelize
    .authenticate()
    .then(() => {
      console.log("Connected to the database");
    })
    .catch((err) => {
      console.error("Error connecting to the database:", err);
    });
}

// Export the Sequelize instance and the connect function for use in other parts of the application
module.exports = {
  sequelize,
  connect,
};
