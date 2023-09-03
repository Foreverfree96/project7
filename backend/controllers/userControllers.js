const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const fs = require("fs");

// Controller for retrieving all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ error: "Failed to retrieve users" });
  }
};

// Controller for retrieving a user by their ID
exports.getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ error: "Failed to fetch user details" });
  }
};

// Controller for deleting a user by their ID
exports.deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Delete user's images
    if (user.imageUrl) {
      const filename = user.imageUrl.split("/images/")[1];
      const imagePath = "images/" + filename;
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Error deleting user image:", err);
          return res.status(500).json({ error: "Failed to delete user image" });
        }

        // Delete the user after the image is successfully deleted
        user
          .destroy()
          .then(() => {
            return res.status(200).json({
              message: "User and associated images deleted successfully",
            });
          })
          .catch((error) => {
            console.error("Error deleting user:", error);
            return res.status(500).json({ error: "Failed to delete user" });
          });
      });
    } else {
      // If the user doesn't have an image, directly delete the user
      user
        .destroy()
        .then(() => {
          return res.status(200).json({ message: "User deleted successfully" });
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
          return res.status(500).json({ error: "Failed to delete user" });
        });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
};
