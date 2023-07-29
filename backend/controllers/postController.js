const multer = require("multer");
const path = require("path");
const Post = require("../models/Post");

// Multer configuration to handle file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); // The destination directory for uploaded files
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // File name with unique timestamp and original extension
  },
});

const upload = multer({ storage });

// Controller for handling image and text submissions
const postController = {
  submitData: async (req, res) => {
    try {
      // Create a new Post model instance with the image and text data
      const newPost = new Post({
        image: req.file.path, // Assuming you are using multer to handle file uploads
        textData: req.body.textData,
      });

      // Save the new post in the database
      await newPost.save();

      // Respond with a success message
      res.status(201).json({ message: "Post submitted successfully" });
    } catch (error) {
      // Handle errors
      console.error("Error submitting post", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = postController;
