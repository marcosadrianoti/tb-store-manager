const express = require('express');
const saleController = require('../controllers/saleController');

const route = express.Router();

// route.get('/', productController.getAllProducts);

// route.get('/:id', productController.getById);

route.post('/', saleController.insertNewSale);

module.exports = route;
