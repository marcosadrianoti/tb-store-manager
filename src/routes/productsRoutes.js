const express = require('express');
const productController = require('../controllers/productController');

const route = express.Router();

route.get('/', productController.getAllProducts);

route.get('/:id', productController.getById);

route.post('/', productController.insertNewProduct);

module.exports = route;
