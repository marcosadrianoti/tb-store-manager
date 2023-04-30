const connection = require('./connection');

const getAllProducts = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM StoreManager.products;',
  );
  return products;
};

const getById = async (id) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE products.id = ?;', [id],
  );
  return product;
};

const insertNewProduct = async (product) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?);',
    [product.name],
  );

  return { id: insertId, name: product.name };
};

const updateProduct = async (newValue, id) => {
  const [message] = await connection.execute(
    'UPDATE StoreManager.products SET name = (?) WHERE id = (?);',
    [newValue, id],
  );

  return message;
};

module.exports = { getAllProducts, getById, insertNewProduct, updateProduct };
