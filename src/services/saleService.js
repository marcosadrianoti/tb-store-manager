const saleModel = require('../models/saleModel');

// const getAllProducts = async () => {
//   const products = await productModel.getAllProducts();

//   return products;
// };

// const getById = async (id) => {
//   const product = await productModel.getById(id);

//   return product;
// };

const insertNewSale = async (sale) => {
  const newSale = await saleModel.insertNewSale(sale);

  return { type: null, message: newSale };
};

module.exports = { insertNewSale };
