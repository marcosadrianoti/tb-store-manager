// const { date } = require('joi');
const camelize = require('camelize');
const connection = require('./connection');

const getAllSales = async () => {
  const [sales] = await connection.execute(
    `SELECT sale_id, date, product_id, quantity
    FROM StoreManager.sales_products, StoreManager.sales
    WHERE StoreManager.sales_products.sale_id = StoreManager.sales.id
    ORDER BY sale_id ASC , product_id ASC;`,
  );
  return camelize(sales);
};

const getById = async (id) => {
  const [sale] = await connection.execute(
    `SELECT date, product_id, quantity
    FROM StoreManager.sales_products, StoreManager.sales
    WHERE StoreManager.sales_products.sale_id = StoreManager.sales.id
    AND StoreManager.sales_products.sale_id = (?);`, [id],
  );
  return camelize(sale);
};

const isThereSaleId = async (id) => {
  const [[sale]] = await connection.execute(
    `SELECT *
    FROM StoreManager.sales
    WHERE StoreManager.sales.id = (?); `, [id],
  );
  return sale;
};

const insertNewSale = async (sales) => {
  const dateNow = new Date();
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (?);',
    [dateNow],
  );
  const saleId = insertId;

  const promises = sales.map(async (sale) => {
    await connection.execute(
      'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?,?,?);',
      [saleId, sale.productId, sale.quantity],
    );
  });
  await Promise.all(promises);
  return { id: insertId, itemsSold: sales };
};

module.exports = { insertNewSale, getAllSales, getById, isThereSaleId };
