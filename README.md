# Hardhat and Node.js blockchain Project

This project demonstrates a basic Hardhat use case with blockchain marketplace. It comes with a three smart contracts and a Node.js backend server with mongoDb for saving the item metadata and user information.



## Related

Here is the frontend for this project. It establish the user metamask connection, marketplace interaction, and the contract calling.

[blockchain-marketplace-frontend](https://github.com/PeterTikCheung/blockchain-marketplace-frontend)


## Setup

1. Setup mongodb with a database

2. Auto setup the mongodb schema by running the command:
```shell
node src/database/DbSchema.js
```
3. Please read the config.js and set the env variable:
```shell
//replace all variable with your own specific value
const MONGODB_URI = process.env.MONGODB_URI;
// Your ethereum network endpoint url
const ENDPOINT_URL = process.env.ENDPOINT_URL;
// Your ethereum account private key for contract deployment, we use sepolia testnet for this project
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
```

you can also configure your own contract address in the config.js.

4. Compile the contract and deploy to sepolia testnet:
```shell
npx hardhat Compile
npx hardhat run --network sepolia scripts/deploy.js
```

## Run the backend server locally
Install dependencies

```bash
  npm install
```

Start the server

```bash
  node src/app.js
```


## Running Tests

To run hardhat test, run the following command, you can establish you own test in the test file

```bash
  npm run contract-test
```

