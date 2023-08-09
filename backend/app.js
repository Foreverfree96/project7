const express = require("express");
const app = express();
const User = require("./models/user");
const cors = require("cors");

// MiddleWare
app.use(express.json());
// app.use(cors({ origin: true, credentials: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Replace "*" with your allowed origins
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Specify allowed methods
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  ); // Specify allowed headers

  // Allow credentials if needed
  res.header("Access-Control-Allow-Credentials", "true");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});
//LOOK HERE FOR DOTENV STUFF
require("dotenv").config();

// Connect to the database
const { sequelize } = require("./db");
sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });

// Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/posts", postRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
