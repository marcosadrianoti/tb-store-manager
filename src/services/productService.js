const productModel = require('../models/productModel');

const getAllProducts = async () => {
  const products = await productModel.getAllProducts();

  return products;
};

const getById = async (id) => {
  const product = await productModel.getById(id);
  if (!product) {
    return { type: 404, message: 'Product not found' };
  }
  return { type: null, message: product };
};

const insertNewProduct = async (product) => {
  const newProduct = await productModel.insertNewProduct(product);

  return { type: null, message: newProduct };
};

const updateProduct = async (newValue, id) => {
  const message = await productModel.updateProduct(newValue, id);

  return message;
};

const deleteProduct = async (id) => {
  const message = await productModel.deleteProduct(id);

  return message;
};

module.exports = { getAllProducts, getById, insertNewProduct, updateProduct, deleteProduct };
