const dotenv = require("dotenv");
dotenv.config();
//replace all variable with your own specific value
const MONGODB_URI = process.env.MONGODB_URI;
const ENDPOINT_URL = process.env.ENDPOINT_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const RANDOM_NUMBER_CONTRACT_ADDRESS = "0x2ae78CC7d4be1e21C47d2f3b959A998b45a06986";
const TRADE_RECORD_CONTRACT_ADDRESS = "0xdA0ADC14Ecd7E5f485BE690d8835418813f7811a";
const MARKET_PLACE_CONTRACT_ADDRESS = "0x31Fbd69B4872AadE8E25e480A69F1e9CF3b2302d";

module.exports = {
    MONGODB_URI,
    ENDPOINT_URL,
    PRIVATE_KEY,
    JWT_SECRET_KEY
};