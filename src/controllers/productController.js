const productService = require('../services/productService');

const getAllProducts = async (req, res) => {
  const products = await productService.getAllProducts();

  return res.status(200).json(products);
};

module.exports = { getAllProducts };
