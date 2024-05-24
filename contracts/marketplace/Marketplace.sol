pragma solidity ^0.8.0;

import "./TradeRecord.sol";

contract Marketplace {
    struct Product {
        string metaUuid;
        string name;
        uint256 price;
        uint32 quantity;
        address seller;
        string sellerUuid;
    }

    TradeRecord public tradeRecord;

    mapping(uint256 => Product) public products;
    mapping(string => uint256) public productIdsByMetaUuid; // Mapping to store productIds by metaUuid
    uint256 public productIndex;

    constructor(address _tradeRecordContractAddress) {
        tradeRecord = TradeRecord(_tradeRecordContractAddress);
    }

    function addProduct(
        string memory _metaUuid,
        string memory _name,
        uint256 _price,
        uint32 _quantity,
        string memory _sellerUuid
    ) external {
        require(_price > 0, "Price must be greater than zero");
        require(_quantity > 0, "Quantity must be greater than zero");

        Product memory newProduct = Product(_metaUuid, _name, _price, _quantity, msg.sender, _sellerUuid);
        products[productIndex] = newProduct;

        // Store the productId for the given metaUuid
        productIdsByMetaUuid[_metaUuid] = productIndex;

        productIndex++;
    }

    function getProductByMetaUuid(string memory _metaUuid) public view returns (Product memory) {
        uint256 productId = productIdsByMetaUuid[_metaUuid];

        return products[productId];
    }

    // Function to receive Ether. msg.data must be empty
    receive() external payable {}

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function purchaseProduct(string memory _metaUuid, uint32 _quantity, string memory _buyerUuid) external payable {
        uint256 productId = productIdsByMetaUuid[_metaUuid];

        Product storage product = products[productId];
        require(product.seller != address(0), "Product does not exist");

        uint256 totalPrice = uint256(product.price) * uint256(_quantity);

        product.quantity -= _quantity;
        require(totalPrice <= address(msg.sender).balance, "Insufficient balance");

        payable(product.seller).transfer(totalPrice);

        tradeRecord.addTradeRecord(
            block.timestamp,
            _quantity,
            product.price,
            msg.sender,
            product.seller,
            _buyerUuid,
            product.sellerUuid,
            _metaUuid,
            product.name
        );
    }

    function removeProduct(uint256 _productId) external {
        require(_productId < productIndex, "Invalid product ID");

        delete products[_productId];
    }
}