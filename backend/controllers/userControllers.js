const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const fs = require("fs");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ error: "Failed to retrieve users" });
  }
};

// exports.deleteUser = async (req, res) => {
//   const userId = req.parmas.id;
//   try {
//     const user = await User.findByPk(userId);

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // Delete user's images
//     if (user.imageUrl) {
//       const filename = user.imageUrl.split("/images/")[1];
//       fs.unlink("images/" + filename, (err) => {
//         if (err) {
//           console.error("Error deleting user image:", err);
//         }
//       });
//     }

//     // Delete the user
//     await user.destroy();

//     return res
//       .status(200)
//       .json({ message: "User and associated images deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting user:", error);
//     res.status(500).json({ error: "Failed to delete user" });
//   }
// };

//TODO: start working on modify user <---
// example

// User.update(
//   {
//     arrayField: sequelize.literal(`array_append(arrayField, 'New Value')`),
//   },
//   { where: { id: req.params.id } }
// )
//   .then(() => {
//     res.status(200).json({
//       message: "Value added to array successfully",
//     });
//   })
//   .catch((error) => {
//     res.status(400).json({
//       error: error,
//     });
//   });

// might not be needed.
exports.modifyUser = async (req, res) => {};
