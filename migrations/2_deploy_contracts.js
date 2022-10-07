const VehicleRegistration = artifacts.require("VehicleRegistration");
const MOTToken = artifacts.require("MOTToken");

module.exports = function(deployer) {
    deployer.deploy(VehicleRegistration);
    deployer.deploy(MOTToken);
};