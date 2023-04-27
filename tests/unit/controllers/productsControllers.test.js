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
    sinon.stub(productService, 'getById').resolves(productById);

    const req = {};
    req.params = sinon.stub().returns(4);
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productController.getById(req, res);
    expect(res.json).to.be.an('function');
    expect(res.status).to.be.an('function');
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productById);
    sinon.restore()
  });
  it('Get products by Id failed', async () => {
    sinon.stub(productService, 'getById').resolves();

    const req = {};
    req.params = sinon.stub().returns({ id: 4 });
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    await productController.getById(req, res);
    console.log(req.params().id);
    expect(res.json).to.be.an('function');
    expect(res.status).to.be.an('function');
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });
});