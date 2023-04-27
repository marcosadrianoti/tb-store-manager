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
  const newProduct = req.body;
  const result = await productService.insertNewProduct(newProduct);

  // if (result.type) return res.status(result.type).json(result.message);
  return res.status(201).json(result.message);
};

module.exports = { getAllProducts, getById, insertNewProduct };
