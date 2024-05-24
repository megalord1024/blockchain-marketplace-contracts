const { Web3 } = require("web3");
const { ENDPOINT_URL, MARKET_PLACE_CONTRACT_ADDRESS } = require("../config");
const contractArtifact = require("../artifacts/contracts/marketplace/Marketplace.sol/Marketplace.json");
// Create a web3 instance and connect to the Ethereum network
const web3 = new Web3(ENDPOINT_URL);

// Contract variables
const contractAddress = MARKET_PLACE_CONTRACT_ADDRESS; // Replace with your contract's address
const contractABI = contractArtifact.abi; // Replace with your contract's ABI

// Create an instance of the contract
const contract = new web3.eth.Contract(contractABI, contractAddress);


const getContractBalance = async () => {
    try {
      const balance = await contract.methods.getBalance().call();
      console.log('Contract balance:', balance);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  // Call getContractBalance function
  getContractBalance();
