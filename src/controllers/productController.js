const productService = require('../services/productService');

const getAllProducts = async (req, res) => {
  const products = await productService.getAllProducts();

  return res.status(200).json(products);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const product = await productService.getById(id);

  if (!product) return res.status(404).json({ message: 'Product not found' });

  return res.status(200).json(product);
};

const insertNewProduct = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: '"name" is required' });
  }
  const newProduct = req.body;
  if (newProduct.name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }
  const result = await productService.insertNewProduct(newProduct);

  return res.status(201).json(result.message);
};

module.exports = { getAllProducts, getById, insertNewProduct };
