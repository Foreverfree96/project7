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

exports.deleteUser = async (req, res) => {
  //TODO: FIX **** FINDONE AND DESTROY BOTH SEND A RESPONSE FROM ONE REQUEST, FIX
  // create a seperate controller to delete the images from database

  // User.findOne({ _id: req.params.id }).then((data) => {
  //   const filename = data.imageUrl ? data.imageUrl.split("/images/")[1] : "";
  //   fs.unlink("images/" + filename, (err) => {
  //     if (err) {
  //       res.status(400).json({
  //         error: err,
  //       });
  //       return;
  //     }
  //   });
  // })
  User.destroy({ where: { id: req.params.id } })
    .then(() => {
      res.status(200).json({
        message: "Deleted!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

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
