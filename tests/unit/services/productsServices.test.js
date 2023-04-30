const { expect } = require('chai');
const sinon = require('sinon');

const productService = require('../../../src/services/productService');
const productModel = require('../../../src/models/productModel');
// const connection = require('../../../src/models/connection');
const { allProducts, productById } = require('../mock/product.mock');

describe('Product service test', () => {
  afterEach(() => sinon.restore());
  it('Get all products', async () => {
    sinon.stub(productModel, 'getAllProducts').resolves([allProducts]);

    const result = await productService.getAllProducts();
    expect(result).to.be.an('array');
    expect(result[0]).to.have.length(4);
  });
  it('Get products by Id', async () => {
    sinon.stub(productModel, 'getById').resolves(productById[0]);
    const result = await productService.getById(4);
    expect(result).to.be.an('object');
    expect(result.message.id).to.be.equal(4);
    expect(result.message.name).to.be.equal('Capa do Batman');
  });
  it('Get products by Id - Product not found', async () => {
    sinon.stub(productModel, 'getById').resolves(undefined);
    const result = await productService.getById(8);
    expect(result).to.be.an('object');
    expect(result.message).to.be.deep.equal('Product not found');
  });
  it('insert New Product', async () => {
    sinon.stub(productModel, 'insertNewProduct').resolves({ id: 5, name: 'Novo Produto' });
    const result = await productService.insertNewProduct({ name: 'Novo Produto' });
    expect(result).to.be.an('object');
    expect(result.message).to.be.deep.equal({ id: 5, name: 'Novo Produto' });
  });
});