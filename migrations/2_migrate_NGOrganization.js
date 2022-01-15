
const NGOrganization = artifacts.require("NGOrganization");

module.exports = function (deployer) {
  deployer.deploy(NGOrganization, "admin");
};
