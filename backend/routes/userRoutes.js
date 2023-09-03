// Import necessary modules and controllers
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth"); // Authentication middleware
const multer = require("../middleware/multer-config"); // Multer middleware for handling file uploads
const userController = require("../controllers/userControllers"); // User controller handling CRUD operations

// Define routes for User CRUD operations:

// GET request to "/getUsers": Fetches all users (protected by authentication).
router.get("/getUsers", userController.getUsers);

// DELETE request to "/deleteUser/:id": Deletes a user by ID.
router.delete("/deleteUser/:id", userController.deleteUser);

// GET request to "/:id": Fetches a user by ID (protected by authentication).
router.get("/:id", auth, userController.getUserById);

// Export the router for use in the application.
module.exports = router;
