const saleService = require('../services/saleService');

const getAllSales = async (req, res) => {
  const sales = await saleService.getAllSales();

  return res.status(200).json(sales);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await saleService.getById(id);
  if (result.type === null) {
    return res.status(404).json({ message: result.message });
  }

  return res.status(200).json(result.message);
};

const insertNewSale = async (req, res) => {
  const newSale = req.body;
  const result = await saleService.insertNewSale(newSale);

  return res.status(201).json(result.message);
};

module.exports = { insertNewSale, getAllSales, getById };
