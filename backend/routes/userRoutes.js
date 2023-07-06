// this will be the routeEverything folder reference project 6
// it will be the whole CRUD for the authContoller
// POST, GET, PUT, DELETE,
// will also have multer in here
// auth in the middleware folder as well.
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const userController = require("../controllers/userControllers");

// continue to connect your routes here

router.get("/getUsers", userController.getUsers);
router.delete("/deleteUser/:id", userController.deleteUser);
router.put("/modifyUser/:id", userController.modifyUser);

// let user = {
//     images: [
//         {id: '121203', url: '3498'},
//         {id: '121203', url: '3498'},
//         {id: '121203', url: '3498'},
//     ]
// }

module.exports = router;
