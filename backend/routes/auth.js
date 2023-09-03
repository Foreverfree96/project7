// Import the Express framework and create a router instance
const express = require("express");
const router = express.Router();

// Import the authentication controller (authController) for handling user registration and login
const authController = require("../controllers/authControllers");

// Define routes for user sign-up and login

// Route for user sign-up: When a POST request is made to "/signup",
// the authController's "registerUser" function is invoked to handle user registration.
router.post("/signup", authController.registerUser);

// Route for user login: When a POST request is made to "/login",
// the authController's "loginUser" function is invoked to handle user login.
router.post("/login", authController.loginUser);

// Export the router to be used in other parts of the application.
module.exports = router;
