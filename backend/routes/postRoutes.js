const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer-config");
const postController = require("../controllers/postController");
const auth = require("../middleware/auth");

// Route for submitting images and text
router.post("/", auth, upload, postController.submitData);
router.delete("/:id", auth, postController.deletePost);
router.get("/:id", auth, postController.getPostById);

// Add a route to fetch all posts to display on the home page
router.get("/", auth, postController.getPosts);
console.log(postController.getPosts);

module.exports = router;
