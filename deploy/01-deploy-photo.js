const { parse } = require("dotenv");
const { network, ethers } = require("hardhat");
const { int, string } = require("hardhat/internal/core/params/argumentTypes");
const path = require("path");

module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;
  var finalHash = [];
  console.log("deploying");
  var factory = await deploy("PhotographFactory", {
    from: deployer,
    log: true,
    args: [],
  });

  console.log("factory deployed");
};
