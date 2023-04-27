const productService = require('../services/productService');

const getAllProducts = async (req, res) => {
  const products = await productService.getAllProducts();

  return res.status(200).json(products);
};

const getById = async (req, res) => {
  const { id } = req.params;
  console.log('teste', id);
  const product = await productService.getById(id);

  if (!product) return res.status(404).json({ message: 'Product not found' });

  return res.status(200).json(product);
};

module.exports = { getAllProducts, getById };
