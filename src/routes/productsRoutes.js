const express = require('express');
const productController = require('../controllers/productController');

const route = express.Router();

route.get('/', productController.getAllProducts);

route.get('/:id', productController.getById);

route.post('/', productController.insertNewProduct);

route.put('/:id', productController.updateProduct);

route.delete('/:id', productController.deleteProduct);

module.exports = route;
