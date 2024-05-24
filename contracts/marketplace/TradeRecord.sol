pragma solidity ^0.8.0;

import "../utils/RandomNumberGenerator.sol";

contract TradeRecord {
    struct Transaction {
        uint256 timestamp;
        uint32 quantity;
        uint256 price;
        address buyer;
        address seller;
        string buyerUuid;
        string sellerUuid;
        uint256 recordUuid;
        string name;
        string metaUuid;
    }

    mapping(uint256 => Transaction) public transactions;
    mapping(address => uint256[]) private buyerToTransactionIndexes;
    mapping(address => uint256[]) private sellerToTransactionIndexes;
    uint256 public transactionIndex;

    RandomNumberGenerator randomGenerator;

    constructor(address _randomNumberContractAddress) {
        randomGenerator = RandomNumberGenerator(_randomNumberContractAddress);
    }

    function addTradeRecord(
        uint256 _timestamp,
        uint32 _quantity,
        uint256 _price,
        address _buyer,
        address _seller,
        string memory _buyerUuid,
        string memory _sellerUuid,
        string memory _metaUuid,
        string memory _productName
    ) external {
        uint256 uuid = randomGenerator.generateNumber(_timestamp + transactionIndex);

        Transaction memory newTransactionRecord = Transaction(
            _timestamp,
            _quantity,
            _price,
            _buyer,
            _seller,
            _buyerUuid,
            _sellerUuid,
            uuid,
            _productName,
            _metaUuid
        );
        transactions[transactionIndex] = newTransactionRecord;

        buyerToTransactionIndexes[_buyer].push(transactionIndex);
        sellerToTransactionIndexes[_seller].push(transactionIndex);

        transactionIndex++;
    }

    function getTransactionByBuyer(address _buyer) external view returns (Transaction[] memory) {
        uint256[] memory indexes = buyerToTransactionIndexes[_buyer];
        Transaction[] memory buyerTransactions = new Transaction[](indexes.length);
    
        for (uint256 i = 0; i < indexes.length; i++) {
            uint256 index = indexes[i];
            buyerTransactions[i] = transactions[index];
        }

        return buyerTransactions;
    }

    function getTransactionBySeller(address _seller) external view returns (Transaction[] memory) {
        uint256[] memory indexes = sellerToTransactionIndexes[_seller];
        Transaction[] memory sellerTransactions = new Transaction[](indexes.length);
    
        for (uint256 i = 0; i < indexes.length; i++) {
            uint256 index = indexes[i];
            sellerTransactions[i] = transactions[index];
        }

        return sellerTransactions;
    }
}