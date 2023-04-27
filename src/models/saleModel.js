// const { date } = require('joi');
const connection = require('./connection');

// const getAllProducts = async () => {
//   const [products] = await connection.execute(
//     'SELECT * FROM StoreManager.products;',
//   );
//   return products;
// };

// const getById = async (id) => {
//   const [[product]] = await connection.execute(
//     'SELECT * FROM StoreManager.products WHERE products.id = ?;', [id],
//   );
//   return product;
// };
// [
//   {
//     "productId": 1,
//     "quantity": 1
//   },
//   {
//     "productId": 2,
//     "quantity": 5
//   }
// ]
// {
//   "id": 3,
  // "itemsSold": [
  //   {
  //     "productId": 1,
  //     "quantity": 1
  //   },
  //   {
  //     "productId": 2,
  //     "quantity": 5
  //   }
  // ]
// }
const insertNewSale = async (sales) => {
  const dateNow = new Date();
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (?);',
    [dateNow],
  );
  const saleId = insertId;

  sales.forEach(async (sale) => {
    await connection.execute(
      'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?,?,?);',
      [saleId, sale.productId, sale.quantity],
    );
  });

  return { id: insertId, itemsSold: sales };
};

module.exports = { insertNewSale };
