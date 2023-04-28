const productModel = require('../models/productModel');

const haveProductId = (req, res, next) => {
  const sales = req.body;
  let isProductIdHere = true;
  sales.forEach((sale) => {
    if (Object.keys(sale).includes('productId') === false) {
      isProductIdHere = false;
    }
  });
  if (!isProductIdHere) {
    return res.status(400).json({ message: '"productId" is required' });
  }

  next();
};

const haveQuantity = (req, res, next) => {
  const sales = req.body;
  let isQuantityHere = true;
  sales.forEach((sale) => {
    if (Object.keys(sale).includes('quantity') === false) {
      isQuantityHere = false;
    }
  });
  if (!isQuantityHere) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  next();
};

const qtIsGreaterThanZero = (req, res, next) => {
  const sales = req.body;
  let greaterThanZero = true;
  sales.forEach((sale) => {
    if (sale.quantity <= 0) {
      greaterThanZero = false;
    }
  });
  if (!greaterThanZero) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  next();
};

const isThereProductId = async (req, res, next) => {
  const sales = req.body;
  const allProducts = await productModel.getAllProducts();
  let thereIs = true;
  sales.forEach((sale) => {
    thereIs = allProducts.some((product) => product.id === sale.productId);
  });
  if (!thereIs) {
    return res.status(404).json({ message: 'Product not found' });
  }

  next();
};

module.exports = { haveProductId, haveQuantity, qtIsGreaterThanZero, isThereProductId };
