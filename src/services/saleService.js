const saleModel = require('../models/saleModel');

const getAllSales = async () => {
  const sales = await saleModel.getAllSales();

  return sales;
};

// const getById = async (id) => {
//   const product = await productModel.getById(id);

//   return product;
// };

const insertNewSale = async (sale) => {
  const newSale = await saleModel.insertNewSale(sale);

  return { type: null, message: newSale };
};

module.exports = { insertNewSale, getAllSales };
