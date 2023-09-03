// Import necessary modules and create an Express application
const express = require("express");
const app = express();
const User = require("./models/user"); // Import the User model
const cors = require("cors"); // Middleware for handling Cross-Origin Resource Sharing (CORS)

// Middleware configuration
app.use(express.json()); // Parse JSON requests
// app.use(cors({ origin: true, credentials: true })); // Enable CORS (you can customize origin and credentials settings)

// CORS Configuration
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Replace "*" with your allowed origins
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Specify allowed methods
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  ); // Specify allowed headers

  // Allow credentials if needed
  res.header("Access-Control-Allow-Credentials", "true");

  // Handle preflight requests (OPTIONS method)
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Load environment variables from a .env file (if available)
require("dotenv").config();

// Connect to the database using Sequelize
const { sequelize } = require("./db");
sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });

// Define routes for different parts of the application
const authRoutes = require("./routes/auth"); // Authentication routes
const userRoutes = require("./routes/userRoutes"); // User-related routes
const postRoutes = require("./routes/postRoutes"); // Post-related routes

// Set up route handlers
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/images", express.static("images")); // Serve images statically

// Define the port the server will listen on
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
