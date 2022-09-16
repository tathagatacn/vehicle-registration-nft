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
})