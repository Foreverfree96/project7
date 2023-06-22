const express = require("express");
const router = express.Router();
// in this project your authController will be userCtrl - project 6
const authController = require("../controllers/authControllers");

// User sign-up
router.post("/signup", authController.registerUser);

// User login
router.post("/login", authController.loginUser);

module.exports = router;
