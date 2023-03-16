require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy")
require("hardhat-gas-reporter")

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "hardhat",
  networks:{
    hardhat:{
      chainId: 31337,
      blockConfirmation:1
    }
  },
  namedAccounts:{
    deployer:{
      default:0,
    },
    client:{
      default:1
    }
  }
};
