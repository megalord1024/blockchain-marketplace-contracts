pragma solidity ^0.8.0;

import "./Product.sol";

contract Marketplace {
    mapping(uint256 => Product) public products;
    uint256 public productIndex;

    event ProductAdded(uint256 productId, string name, uint32 price, uint8 quantity, address seller, string sellerUuid);
    event ProductPurchased(uint256 productId, address buyer, string buyerUuid, uint8 quantity);
    event ProductRemoved(uint256 productId);

    function addProduct(
        string memory _name,
        uint32 _price,
        uint8 _quantity,
        string memory _sellerUuid
    ) external {
        require(_price > 0, "Price must be greater than zero");
        require(_quantity > 0, "Quantity must be greater than zero");

        Product newProduct = new Product(_name, _price, _quantity, msg.sender, _sellerUuid);
        products[productIndex] = newProduct;

        emit ProductAdded(productIndex, _name, _price, _quantity, msg.sender, _sellerUuid);

        productIndex++;
    }

    function purchaseProduct(uint256 _productId, uint8 _quantity, string memory _buyerUuid) external payable {
        require(_productId < productIndex, "Invalid product ID");

        Product product = products[_productId];
        require(address(product) != address(0), "Product does not exist");

        product.purchase(_quantity, _buyerUuid);

        emit ProductPurchased(_productId, msg.sender, _buyerUuid, _quantity);
    }

    function removeProduct(uint256 _productId) external {
        require(_productId < productIndex, "Invalid product ID");

        Product product = products[_productId];
        require(address(product) != address(0), "Product does not exist");

        delete products[_productId];

        emit ProductRemoved(_productId);
    }

}