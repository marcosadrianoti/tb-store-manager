const { expect } = require('chai');
const sinon = require('sinon');

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
    "id": 4,
    "name": "Capa do Batman"
  }
]

const thereIsId = { id: 2, date: '2023-04-29T19:48:30.000Z' }

describe('Sale model test', () => {
  afterEach(() => sinon.restore());
  it('Get all sales', async () => {
    sinon.stub(connection, 'execute').resolves([allSales]);

    const result = await saleModel.getAllSales();

    expect(result).to.be.an('array');
    expect(result).to.have.length(3);
  });
  it('Get sale by Id', async () => {
    sinon.stub(connection, 'execute').resolves([saleById]);
    
    const result = await saleModel.getById(4);
    expect(result).to.be.an('array');
    expect(result).to.be.deep.equal(saleById);
  });
  // it('Is there sale ID?', async () => {
  //   sinon.stub(connection, 'execute').resolves([[thereIsId]]);

  //   const result = await saleModel.isThereSaleId(2);
  //   expect(result).to.be.an('object');
  //   expect(result).to.be.deep.equal(thereIsId);
  // });
  it('Insert new sale', async () => {
    sinon.stub(connection, 'execute')
      .resolves([{insertId: 4}]);

    const body = [
      {
        "productId": 1,
        "quantity": 100
      },
      {
        "productId": 2,
        "quantity": 500
      }
    ];
    const result = await saleModel.insertNewSale(body);
    expect(result).to.be.deep.equal({ id: 4, itemsSold: body });
  });
});

