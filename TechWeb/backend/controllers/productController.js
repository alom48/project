const Product = require("../model/Product");

// Get All products
const product_all = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.json({ message: error });
  }
};

// Single product
const product_details = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    res.json(product);
  } catch (error) {
    res.json({ message: error });
  }
};

// Add New product
const product_create = async (req, res) => {
  const product = new Product({
    title: req.body.title,
    price: req.body.price,
    category: req.body.category,
    image: req.body.image,
    details: req.body.details
  });

  try {
    const savedProduct = await product.save();
    res.send(savedProduct);
  } catch (error) {
    res.status(400).send(error);
  }
};








module.exports = {
  product_all,
  product_details,
  product_create,

}