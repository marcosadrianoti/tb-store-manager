const saleModel = require('../models/saleModel');

const getAllSales = async () => {
  const sales = await saleModel.getAllSales();

  return sales;
};

const getById = async (id) => {
  const sale = await saleModel.getById(id);
  if (sale.length === 0) {
    return { type: null, message: 'Sale not found' };
  }

  return { type: 200, message: sale };
};

const insertNewSale = async (sale) => {
  const newSale = await saleModel.insertNewSale(sale);

  return { type: null, message: newSale };
};

module.exports = { insertNewSale, getAllSales, getById };
