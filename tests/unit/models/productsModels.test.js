const { expect } = require('chai');
const sinon = require('sinon');

const productModel = require('../../../src/models/productModel');
const connection = require('../../../src/models/connection');
const { allProducts, productById } = require('../mock/product.mock');

describe('Product model test', () => {
  afterEach(() => sinon.restore());
  it('Get all products', async () => {
    sinon.stub(connection, 'execute').resolves([allProducts]);

    const result = await productModel.getAllProducts();

    expect(result).to.be.an('array');
    expect(result).to.have.length(4);
  });
  it('Get products by Id', async () => {
    sinon.stub(connection, 'execute').resolves([productById]);
    
    const result = await productModel.getById(4);
    expect(result).to.be.an('object');
    expect(result.id).to.be.equal(4);
  });
});

