const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer-config");
const postController = require("../controllers/postController");

// Route for submitting images and text
router.post("/submitData", multer, postController.submitData);

// Route for fetching the data to display on the home page
// router.get("/getUsers", postController.getData);

module.exports = router;
