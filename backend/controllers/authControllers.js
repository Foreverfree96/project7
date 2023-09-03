const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user"); // Import the User model

// Controller function for user registration
exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body; // Extract user data from the request body

  try {
    // Check if the user already exists in the database
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the user's password for security
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user record in the database
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Respond with a success message when registration is successful
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function for user login
exports.loginUser = async (req, res) => {
  const { username, password } = req.body; // Extract login credentials from the request body

  try {
    // Check if the user with the provided username exists
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ error: "User not found!" });
    }

    // Compare the provided password with the hashed password stored in the database
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Incorrect password!" });
    }

    // Generate a JSON Web Token (JWT) for user authentication
    const token = jwt.sign({ userId: user.id }, "RANDOM_TOKEN_SECRET", {
      expiresIn: "24h", // Token expires in 24 hours
    });

    // Respond with user ID and the generated token on successful login
    res.status(200).json({
      userId: user.id,
      token: token,
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
