const { ethers } = require("hardhat");

async function main() {
    const RandomNumberGeneratorContract = await ethers.getContractFactory("RandomNumberGenerator");
    const randomNumberGeneratorInstance = await RandomNumberGeneratorContract.deploy();
  
    console.log("RandomNumberGenerator deployed to:", randomNumberGeneratorInstance.target);
  
    const TradeRecordContract = await ethers.getContractFactory("TradeRecord");
    const tradeRecordInstance = await TradeRecordContract.deploy(randomNumberGeneratorInstance.target);
  
    console.log("TradeRecord deployed to:", tradeRecordInstance.target);
  
    const MarketplaceContract = await ethers.getContractFactory("Marketplace");
    const marketplaceInstance = await MarketplaceContract.deploy(tradeRecordInstance.target);
  
    console.log("Marketplace deployed to:", marketplaceInstance.target);
  }
  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });