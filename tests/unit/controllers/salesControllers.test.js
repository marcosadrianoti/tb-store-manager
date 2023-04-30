const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { expect } = chai;

chai.use(sinonChai);


const saleController = require('../../../src/controllers/saleController');
const saleService = require('../../../src/services/saleService');
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

const newSale = [
  {
    "productId": 1,
    "quantity": 100
  },
  {
    "productId": 2,
    "quantity": 500
  }
]

describe('Sale controller test', () => {
  afterEach(() => sinon.restore());
  it('Get all sales', async () => {
    sinon.stub(saleService, 'getAllSales').resolves(allSales);

    const req = {};
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await saleController.getAllSales(req,res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allSales);
  });
  it('Get sales by Id', async () => {
    const mock = {
      type: 200,
      message:
        [
          {
            "date": "2023-04-29T13:48:16.000Z",
            "productId": 1,
            "quantity": 5
          },
          {
            "date": "2023-04-29T13:48:16.000Z",
            "productId": 2,
            "quantity": 10
          }
        ],
    }; 

    sinon.stub(saleService, 'getById').resolves(mock);

    const req = {};
    req.params = sinon.stub().returns({ id: 1 });
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await saleController.getById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mock.message);
  });
  it('Get sales by Id failed', async () => {
    sinon.stub(saleService, 'getById').resolves(
      { type: null, message: 'Sale not found' }
    );

    const req = {};
    req.params = sinon.stub().returns({ id: 50 });
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await saleController.getById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
  });
  it('Insert new sale', async () => {
    sinon.stub(saleService, 'insertNewSale')
      .resolves({ type: null, message: { id: 8, itemsSold: newSale } });

    const req = {
      body: newSale,
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    await saleController.insertNewSale(req, res);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith({ id: 8, itemsSold: newSale });
  });
  // it('Insert new product - name is required', async () => {
  //   sinon.stub(productService, 'insertNewProduct')
  //     .resolves({type: 400, message: '"name" is required' });

  //   const req = {
  //     body: {},
  //   };
  //   const res = {};
  //   res.status = sinon.stub().returns(res);
  //   res.json = sinon.stub().returns();
  //   await productController.insertNewProduct(req, res);
  //   expect(res.status).to.have.been.calledWith(400);
  //   expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
  // });
  // it('Insert new product - name is >= 5', async () => {
  //   sinon.stub(productService, 'insertNewProduct')
  //     .resolves({ type: 422, message: '"name" length must be at least 5 characters long' });

  //   const req = {
  //     body: {
  //       "name": "1234"
  //     },
  //   };
  //   const res = {};
  //   res.status = sinon.stub().returns(res);
  //   res.json = sinon.stub().returns();
  //   await productController.insertNewProduct(req, res);
  //   expect(res.status).to.have.been.calledWith(422);
  //   expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
  // });
});