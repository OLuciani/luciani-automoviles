const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");

//Multer Configuration

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(__dirname, "../../public/IMG/imgUsers"));
    },
    filename: (req, file, callback) => {
        callback(null, "file-" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({storage: storage});

const usersController = require("../controllers/usersControllers");

router.get("/list", usersController.usersList);
router.get("/register", usersController.register);
router.post("/register", upload.single("avatar"), usersController.processRegister); 
router.get("/login", usersController.login);
router.post("/login", usersController.loginProcess); 


module.exports = router;