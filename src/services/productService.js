const productModel = require('../models/productModel');

const getAllProducts = async () => {
  const products = await productModel.getAllProducts();

  return products;
};

module.exports = { getAllProducts };
