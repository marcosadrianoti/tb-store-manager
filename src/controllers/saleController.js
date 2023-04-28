const saleService = require('../services/saleService');

const insertNewSale = async (req, res) => {
  const newSale = req.body;
  const result = await saleService.insertNewSale(newSale);

  return res.status(201).json(result.message);
};

const getAllSales = async (req, res) => {
  const sales = await saleService.getAllSales();

  return res.status(200).json(sales);
}; 

module.exports = { insertNewSale, getAllSales };
