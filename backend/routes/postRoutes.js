const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer-config");
const postController = require("../controllers/postController");
const auth = require("../middleware/auth");

// Routes for handling posts:
// POST request to "/" for submitting images and text (protected by authentication and handles file uploads).
router.post("/", auth, upload, postController.submitData);

// DELETE request to "/:id" for deleting a post by ID (protected by authentication).
router.delete("/:id", auth, postController.deletePost);

// GET request to "/:id" for fetching a post by ID (protected by authentication).
router.get("/:id", auth, postController.getPostById);

// GET request to "/" for fetching all posts (protected by authentication).
router.get("/", auth, postController.getPosts);

module.exports = router;
