const express = require('express');
const saleController = require('../controllers/saleController');
const {
  haveProductId,
  haveQuantity,
  qtIsGreaterThanZero,
  isThereProductId,
} = require('../middlewares/salesValidations');

const route = express.Router();

route.post('/',
  haveProductId,
  haveQuantity,
  qtIsGreaterThanZero,
  isThereProductId,
  saleController.insertNewSale);

module.exports = route;
