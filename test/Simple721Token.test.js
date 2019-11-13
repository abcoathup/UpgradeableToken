// Based on https://docs.openzeppelin.com/sdk/2.5/testing

const { TestHelper } = require('@openzeppelin/cli');
const { Contracts, ZWeb3 } = require('@openzeppelin/upgrades');

ZWeb3.initialize(web3.currentProvider);

const Simple721Token = Contracts.getFromLocal('Simple721Token');

require('chai').should();

contract('Simple721Token', function ([minter, other]) {

  beforeEach(async function () {
    this.project = await TestHelper();
    this.proxy = await this.project.createProxy(Simple721Token, { initMethod: 'initialize', initArgs: [minter]});
  })

  it('should have a name', async function () {
    const result = await this.proxy.methods.name().call();
    result.should.eq('Simple721Token');
  })
})