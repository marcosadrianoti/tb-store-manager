const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { expect } = chai;

chai.use(sinonChai);


const productController = require('../../../src/controllers/productController');
const productService = require('../../../src/services/productService');
const { allProducts, productById } = require('../mock/product.mock');

describe('Product controller test', () => {
  afterEach(() => sinon.restore());
  it('Get all products', async () => {
    sinon.stub(productService, 'getAllProducts').resolves(allProducts);

    const req = {};
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productController.getAllProducts(req,res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allProducts);
  });
  it('Get products by Id', async () => {
    const mock = {
      type: null,
      message:
      {
        "id": 4,
        "name": "Capa do Batman"
      },
    }; 

    sinon.stub(productService, 'getById').resolves(mock);

    const req = {};
    req.params = sinon.stub().returns({ id: 4 });
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productController.getById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mock.message);
  });
  it('Get products by Id failed', async () => {
    sinon.stub(productService, 'getById').resolves(
      { type: 404, message: 'Product not found' }
    );

    const req = {};
    req.params = sinon.stub().returns({ id: 50 });
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productController.getById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });
  it('Insert new product', async () => {
    sinon.stub(productService, 'insertNewProduct')
      .resolves({ type: null, message: { id: 4, name: 'Novo produto' } });

    const req = {
      body: {
        "name": "Novo produto"
      },
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    await productController.insertNewProduct(req, res);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith({
      "id": 4,
      "name": "Novo produto"
    });
  });
  it('Insert new product - name is required', async () => {
    sinon.stub(productService, 'insertNewProduct')
      .resolves({type: 400, message: '"name" is required' });

    const req = {
      body: {},
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    await productController.insertNewProduct(req, res);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
  });
  it('Insert new product - name is >= 5', async () => {
    sinon.stub(productService, 'insertNewProduct')
      .resolves({ type: 422, message: '"name" length must be at least 5 characters long' });

    const req = {
      body: {
        "name": "1234"
      },
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    await productController.insertNewProduct(req, res);
    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
  });
});