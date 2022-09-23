const { assert } = require("chai");

const VehicleRegistration = artifacts.require('./VehicleRegistration');

require('chai')
    .use(require('chai-as-promised'))
    .should();

contract('VehicleRegistration', (accounts) => {
    let contract;

    before(async () => {
        contract = await VehicleRegistration.deployed()
    })

    describe("deployemnt", async () => {
        it('deploys successfully', async () => {
            const address = contract.address;
            assert.notEqual(address, '');
            assert.notEqual(address, null);
            assert.notEqual(address, undefined);
            assert.notEqual(address, 0x0);
        })
        it('name matches', async () => {
            const name = await contract.name();
            assert.equal(name, 'VehicleRegistration');
        })
        it('symbol matches', async () => {
            const symbol = await contract.symbol();
            assert.equal(symbol, 'VRNNFT');
        })
    })

    describe("minting", async () => {
        it('minted presidential token', async () => {
            const totalSupply = await contract.totalSupply();
            assert.equal(totalSupply, 1); 
        })
        it('mint a new token', async () => {
            const result = await contract.mint(12, 4343);
            const totalSupply = await contract.totalSupply();
            assert.equal(totalSupply, 2);

            const event = await result.logs[0].args;
            assert.equal(event.from, '0x0000000000000000000000000000000000000000', 'from is the contract');
            assert.equal(event.to, accounts[0], 'to is msg.sender');

            await contract.mint(12, 4343).should.be.rejected;
            assert.equal(totalSupply, 2);
        });
        it('restrict mint for invalid state code', async () => {
            const result = await contract.mint(22, 1234).should.be.rejected;
            const totalSupply = await contract.totalSupply();
            assert.equal(totalSupply, 2);
        });
    })
})