
const NGOrganization = artifacts.require("NGOrganization");
const Donatee = artifacts.require("Donatee");

module.exports = function (deployer) {
  deployer.deploy(NGOrganization, "admin");
};
module.exports = function (deployer) {
  deployer.deploy(Donatee);
};

