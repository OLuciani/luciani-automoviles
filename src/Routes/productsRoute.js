const express = require("express");
const path = require("path");
const router = express.Router();
const multer = require("multer");

//Multer Configuration

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(__dirname, "../../public/IMG/imgProducts"));
    },
    filename: (req, file, callback) => {
        callback(null, "file-" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({storage: storage});

const productsController = require("../controllers/productsController");

router.get("/", productsController.list);
router.get("/detail/:id", productsController.detail);
router.get("/edit/:id", productsController.edit);
router.put("/edit/:id", upload.single("image"), productsController.modify);
router.get("/create", productsController.create);
router.post("/create", upload.single("image"), productsController.save);
router.delete("/delete/:id", productsController.delete);

module.exports = router;