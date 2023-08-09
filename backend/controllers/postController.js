const multer = require("multer");
const path = require("path");
const Post = require("../models/Post");
const fs = require("fs");
const express = require("express");
const app = express();
const cors = require("cors");
const { post } = require("../routes/auth");

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
  submitData: async (req, res, next) => {
    console.log(postController.submitData, "submit data error");
    console.log("Submitting post...");
    console.log("Post data:", this.postData);

    try {
      const url = req.protocol + "://" + req.get("host");
      if (req.file) {
        console.log("HAVE A FILE");
      }
      // Create a new Post model instance with the image and text data
      const newPost = new Post({
        title: req.body.title,
        content: req.body.content,
        imageUrl: url + "/images/" + req.file.filename, // Use req.file.path to get the path of the uploaded image
        userId: req.body.userId, // Assuming you have the userId available in the request body
      });
      console.log(newPost, "NEW POST");

      // Save the new post in the database
      await newPost.save();

      // Call the test() function to perform the update operation
      // await test();
    } catch (error) {
      console.error("Error submitting post:", error);

      let errorMessage = "An error occurred while submitting the post.";
      if (error.response && error.response.data && error.response.data.error) {
        errorMessage = error.response.data.error;
      }

      // Display the error message to the user (you can use a notification library or a simple alert)
    }
  },

  getPosts: async (req, res, next) => {
    try {
      const posts = await Post.findAll();
      res.status(200).json(posts);
    } catch (error) {
      console.error("Error fetching posts", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = postController;
