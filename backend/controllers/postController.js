const multer = require("multer");
const path = require("path");
const Post = require("../models/post");
const fs = require("fs");

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
    console.log("Submitting post...");

    try {
      const url = req.protocol + "://" + req.get("host");
      let imageUrl = "";
      if (req.file) {
        console.log("HAVE A FILE");
        imageUrl = url + "/images/" + req.file.filename;
      }
      // Create a new Post model instance with the image and text data
      const newPost = new Post({
        title: req.body.title,
        content: req.body.content,
        imageUrl: imageUrl,
        userId: req.body.userId,
      });

      console.log(newPost, "NEW POST");

      // Save the new post in the database
      await newPost.save();

      // Respond with success
      res.status(201).json({ message: "Post submitted successfully" });
    } catch (error) {
      console.error("Error submitting post:", error);
      res
        .status(500)
        .json({ error: "An error occurred while submitting the post" });
    }
  },

  deletePost: async (req, res) => {
    console.log("DELETING");
    try {
      const post = await Post.findByPk(req.params.id);
      console.log(post);

      if (!post) {
        console.log("Post not found");
        return res.status(404).json({ error: "Post not found" });
      }

      // Delete post's image
      if (post.imageUrl) {
        const filename = post.imageUrl.split("/images/")[1];
        fs.unlink("images/" + filename, (err) => {
          if (err) {
            console.error("Error deleting post image:", err);
          } else {
            console.log("Image deleted successfully");
          }
        });
      }

      // Delete the post
      await post.destroy();
      console.log("Post deleted successfully");

      return res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
      console.error("Error deleting post:", error);
      res.status(500).json({ error: "Failed to delete post" });
    }
  },

  getPosts: async (req, res, next) => {
    console.log("get post");

    try {
      const posts = await Post.findAll();
      res.status(200).json(posts);
    } catch (error) {
      console.error("Error fetching posts", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

const getPostById = async (req, res) => {
  try {
    const postId = req.params.id;
    // Fetch the post from your database using the postId
    const post = await Post.findByPk(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getPostById,
  ...postController,
};
