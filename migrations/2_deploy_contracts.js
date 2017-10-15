var Shippable = artifacts.require("./Shippable.sol");

module.exports = function(deployer) {
  deployer.deploy(Shippable, 2, 'Home');
  deployer.deploy(Shippable, 3, 'Office');
  deployer.deploy(Shippable, 4, 'University');
  deployer.deploy(Shippable, 5, 'Beach');
};
