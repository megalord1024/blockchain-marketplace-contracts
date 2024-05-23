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

// Get the product index
contract.methods
  .productIndex()
  .call()
  .then((index) => {
    console.log(`Total products: ${index}`);

    // Retrieve each product from the mapping
    for (let i = 0; i < index; i++) {
      contract.methods
        .products(i)
        .call()
        .then((product) => {
          console.log(
            `Product ${i + 1}: ID: ${i}, Meta UUID: ${
              product.metaUuid
            }, Name: ${product.name}, Price: ${product.price}, Quantity: ${
              product.quantity
            }, Seller: ${product.seller}, Seller UUID: ${product.sellerUuid}`
          );
        })
        .catch((error) => {
          console.error(`Error retrieving product ${i + 1}:`, error);
        });
    }
  })
  .catch((error) => {
    console.error("Error retrieving product index:", error);
  });
