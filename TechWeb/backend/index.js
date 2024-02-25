const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const productSchema = require("./model/Product");
const productRoutes = require("./routes/product");
const path = require('path');


dotenv.config();

mongoose.connect(
  process.env.DB_CONNECT,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log("connected to db")
);

app.use(express.json());
app.use(cors());

const Product = mongoose.model('Product', productSchema);

app.get("/", async (req, res) => {
  res.send("Success!!!!!!");
});



//for store data nad image
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../src/images/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/upload-image", upload.single("image"), async (req, res) => {
  const { title, price, details, category } = req.body;
  const imageName = req.file.filename;

  try {
    await Product.create({ image: imageName, title, price, details, category });
    res.json({ status: "ok" });
  } catch (error) {
    res.json({ status: error });
  }
});

app.get("/get-image", async (req, res) => {
  try {
    const data = await Product.find({});
    res.send({ status: "ok", data });
  } catch (error) {
    res.json({ status: error });
  }
});

// for user
app.get("/user/get-image", async (req, res) => {
  try {
    const data = await Product.find({});
    res.send({ status: "ok", data });
  } catch (error) {
    res.json({ status: error });
  }
});



app.use('/images', express.static('images'));


//for delete product 
app.delete("/delete-image/:productId", async (req, res) => {
  const productId = req.params.productId;
  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully", deletedProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



//update
app.put('/update-product/:productId', upload.single('image'), async (req, res) => {
  const productId = req.params.productId;
  try {
    // Construct updated product object
    const updatedProduct = {
      title: req.body.title,
      price: req.body.price,
      category: req.body.category,
      details: req.body.details,
      image: req.file ? req.file.filename : product.image, // Use updated image path if available
    };

    // Update the product in the database
    const result = await Product.findByIdAndUpdate(productId, updatedProduct, { new: true });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


//for deflvalue
app.get('/get-product/:productId', async (req, res) => {
  const productId = req.params.productId;
  try {
    const product = await Product.findById(productId);
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


//fetch image from 

app.get('/get-image/:filename', async (req, res) => {
  const filename = req.params.filename;
  try {
    const product = await Product.findOne({ image: filename });
    if (!product || !product.image) {
      return res.status(404).send('Image not found');
    }
    const imagePath = path.join(__dirname, '../src/images', product.image);
    res.sendFile(imagePath);
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).send('Internal Server Error');
  }
});




// productdeatils page
app.get('/get-product/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product details:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});





//for cart 
app.post('/add-to-cart/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;
    // Fetch the product details based on the product ID
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    // You can add the product to the cart logic here
    // For now, return the complete product details along with the response
    res.json({ message: 'Product added to cart successfully', product });
  } catch (error) {
    console.error('Error adding product to cart:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});










app.listen(4000, () => console.log("server up and running on port 4000!"));
