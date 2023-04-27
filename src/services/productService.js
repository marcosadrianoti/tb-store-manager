const productModel = require('../models/productModel');

const getAllProducts = async () => {
  const products = await productModel.getAllProducts();

  return products;
};

const getById = async (id) => {
  const product = await productModel.getById(id);

  return product;
};

const insertNewProduct = async (product) => {
  const newProduct = await productModel.insertNewProduct(product);

  return { type: null, message: newProduct };
};

module.exports = { getAllProducts, getById, insertNewProduct };
