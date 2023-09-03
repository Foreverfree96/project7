// Import the Multer library for handling file uploads
const multer = require("multer");

// Define a map of MIME types to file extensions for image types
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

// Configure storage for uploaded images using Multer
const storage = multer.diskStorage({
  // Define the destination directory for uploaded files
  destination: (req, file, callback) => {
    callback(null, "images"); // Upload images to the "images" folder
  },
  // Define the filename for the uploaded file
  filename: (req, file, callback) => {
    // Remove spaces from the original filename and replace with underscores
    const name = file.originalname.split(" ").join("_");

    // Get the file extension based on the MIME type
    const extension = MIME_TYPES[file.mimetype];

    // Construct a unique filename with a timestamp and extension
    callback(null, name + Date.now() + "." + extension);
  },
});

// Create a Multer middleware with the defined storage configuration for single-image uploads
module.exports = multer({ storage: storage }).single("image");
