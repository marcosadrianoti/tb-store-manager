const { expect } = require('chai');
const sinon = require('sinon');

const saleService = require('../../../src/services/saleService');
const saleModel = require('../../../src/models/saleModel');
const connection = require('../../../src/models/connection');
// const { allProducts, productById } = require('../mock/product.mock');

const allSales = [
  {
    "saleId": 1,
    "date": "2023-04-29T13:48:16.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "saleId": 1,
    "date": "2023-04-29T13:48:16.000Z",
    "productId": 2,
    "quantity": 10
  },
  {
    "saleId": 2,
    "date": "2023-04-29T13:48:16.000Z",
    "productId": 3,
    "quantity": 15
  }
]

const saleById = [
  {
    "date": "2023-04-29T13:48:16.000Z",
    "productId": 3,
    "quantity": 15
  }
]

describe('Sale service test', () => {
  afterEach(() => sinon.restore());
  it('Get all sales', async () => {
    sinon.stub(saleModel, 'getAllSales').resolves([allSales]);

    const result = await saleService.getAllSales();
    expect(result).to.be.an('array');
    expect(result[0]).to.have.length(3);
  });
  it('Get sales by Id', async () => {
    sinon.stub(saleModel, 'getById').resolves(saleById);
    const result = await saleService.getById(2);

    expect(result).to.be.an('object');
    expect(result).to.be.deep.equal({ type: 200, message: saleById });
  });
  it('Get sales by Id - Sale not found', async () => {
    sinon.stub(saleModel, 'getById').resolves([]);
    const result = await saleService.getById(8);
    expect(result).to.be.an('object');
    expect(result.message).to.be.deep.equal('Sale not found');
  });
  it('insert New Sale', async () => {
    sinon.stub(saleModel, 'insertNewSale').resolves([{ productId: 1, quantity: 100 }, { productId: 2, quantity: 500 }]);
    const result = await saleService.insertNewSale({ name: 'Novo Produto' });
    expect(result).to.be.an('object');
    expect(result.message).to.be.deep.equal([{ productId: 1, quantity: 100 }, { productId: 2, quantity: 500 }]);
  });
});