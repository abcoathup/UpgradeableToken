// Based on https://docs.openzeppelin.com/sdk/2.5/testing

const { TestHelper } = require('@openzeppelin/cli');
const { Contracts, ZWeb3 } = require('@openzeppelin/upgrades');

ZWeb3.initialize(web3.currentProvider);

const SimpleToken = Contracts.getFromLocal('SimpleToken');

require('chai').should();

contract('SimpleToken', function ([holder, other]) {

  beforeEach(async function () {
    this.project = await TestHelper();
    this.proxy = await this.project.createProxy(SimpleToken, { initMethod: 'initialize', initArgs: [holder]});
  })

  it('should have a name', async function () {
    const result = await this.proxy.methods.name().call();
    result.should.eq('Token');
  })

  it('should transfer amount', async function () {
    await this.proxy.methods.transfer(other, 1000).send();
    const result = await this.proxy.methods.balanceOf(other).call();
    result.should.eq('1000');
  })
})