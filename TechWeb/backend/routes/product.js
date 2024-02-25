const express = require("express");
const router = express.Router();
const productController = require('../controllers/productController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });



// Other product routes (GET, PUT, etc.)
router.get("/", productController.product_all);


module.exports = router;
