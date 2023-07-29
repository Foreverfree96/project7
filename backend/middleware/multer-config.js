// multer allows you to upload modify or delete images from your database
const multer = require("multer");
// the different file types that are selected - i added webp fromat from learning webp is better SEO for response time.
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

const storage = multer.diskStorage({
  // takes the storge and puts the images you want to store into the images folder
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});

// or

// Multer configuration to handle file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads"); // The destination directory for uploaded files
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, uniqueSuffix + path.extname(file.originalname)); // File name with unique timestamp and original extension
//   },
// });

// const upload = multer({ storage });
// exports a single image
module.exports = multer({ storage: storage }).single("image");
