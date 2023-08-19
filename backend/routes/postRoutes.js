const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer-config");
const postController = require("../controllers/postController");
const auth = require("../middleware/auth");
// const Post = require("../models/Post");

// Route for submitting images and text
// router.post("/", multer, postController.submitData);
// router.post("/", auth, upload, postController.submitData);
router.post("/", auth, upload, postController.submitData);
router.delete("/:id", postController.deletePost);

// Add a route to fetch all posts to display on the home page
router.get("/", postController.getPosts);
console.log(postController.getPosts);

module.exports = router;
