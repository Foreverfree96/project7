const express = require("express");
const app = express();
const User = require("./models/schema");

// MiddleWare
app.use(express.json());

//LOOK HERE FOR DOTENV STUFF
require("dotenv").config();

// Connect to the database
const { sequelize } = require("./db");
sequelize.authenticate()
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });
// app.use(cors());

// this is the app.use for the headers. see project 6

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/userRoutes");
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
// need app.use for the routes


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});