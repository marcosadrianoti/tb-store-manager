const productModel = require('../models/productModel');

const getAllProducts = async () => {
  const products = await productModel.getAllProducts();

  return products;
};

const getById = async (id) => {
  const product = await productModel.getById(id);

  return product;
};

module.exports = { getAllProducts, getById };
