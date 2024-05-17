require("@nomicfoundation/hardhat-toolbox");

const { ENDPOINT_URL, PRIVATE_KEY } = require("./config");

const endpointUrl = ENDPOINT_URL;
const privateKey = PRIVATE_KEY;
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    sepolia: {
      url: endpointUrl,
      accounts: [privateKey],
    },
  },
  solidity: "0.8.24",
};
