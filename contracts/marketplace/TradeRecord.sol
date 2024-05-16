pragma solidity ^0.8.0;

import "../utils/RandomNumberGenerator.sol";

contract TradeRecord {
    struct Transaction {
        uint256 timestamp;
        uint32 quantity;
        uint32 price;
        address buyer;
        address seller;
        string buyerUuid;
        string sellerUuid;
        uint256 recordUuid;
    }

    mapping(uint256 => Transaction) public transactions;
    mapping(address => uint256[]) private buyerToTransactionIndexes;
    mapping(address => uint256[]) private sellerToTransactionIndexes;
    uint256 public transactionIndex;

    RandomNumberGenerator randomGenerator;

    event TradeRecordAdded(uint256 tradeRecordId, uint256 timestamp, uint32 quantity, uint32 price, address buyer, address seller, string buyerUuid, string sellerUuid, uint256 recordUuid);

    constructor(address _randomNumberContractAddress) {
        randomGenerator = RandomNumberGenerator(_randomNumberContractAddress);
    }

    function addTradeRecord(
        uint256 _timestamp,
        uint32 _quantity,
        uint32 _price,
        address _buyer,
        address _seller,
        string memory _buyerUuid,
        string memory _sellerUuid
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
            uuid
        );
        transactions[transactionIndex] = newTransactionRecord;

        buyerToTransactionIndexes[_buyer].push(transactionIndex);
        sellerToTransactionIndexes[_seller].push(transactionIndex);

        emit TradeRecordAdded(
            transactionIndex,
            _timestamp,
            _quantity,
            _price,
            _buyer,
            _seller,
            _buyerUuid,
            _sellerUuid,
            uuid
        );

        transactionIndex++;
    }

    function getTransactionIndexesByBuyer(address _buyer) external view returns (uint256[] memory) {
        return buyerToTransactionIndexes[_buyer];
    }

    function getTransactionIndexesBySeller(address _seller) external view returns (uint256[] memory) {
        return sellerToTransactionIndexes[_seller];
    }
}