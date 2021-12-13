const HibernationCalculator = artifacts.require("HibernationCalculator");

module.exports = function (deployer) {
  deployer.deploy(HibernationCalculator);
};
