const saleService = require('../services/saleService');

const insertNewSale = async (req, res) => {
  const newSale = req.body;
  const result = await saleService.insertNewSale(newSale);

  return res.status(201).json(result.message);
};

module.exports = { insertNewSale };
