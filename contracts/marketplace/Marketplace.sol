pragma solidity ^0.8.0;

contract Marketplace {
    struct Product {
        string metaUuid;
        string name;
        uint32 price;
        uint8 quantity;
        address seller;
        string sellerUuid;
    }

    mapping(uint256 => Product) public products;
    uint256 public productIndex;

    event ProductAdded(string metaUuid, uint256 productId, string name, uint32 price, uint8 quantity, address seller, string sellerUuid);
    event ProductPurchased(uint256 productId, address buyer, string buyerUuid, uint8 quantity);
    event ProductRemoved(uint256 productId);

    function addProduct(
        string memory _metaUuid,
        string memory _name,
        uint32 _price,
        uint8 _quantity,
        string memory _sellerUuid
    ) external {
        require(_price > 0, "Price must be greater than zero");
        require(_quantity > 0, "Quantity must be greater than zero");

        Product memory newProduct = Product(_metaUuid, _name, _price, _quantity, msg.sender, _sellerUuid);
        products[productIndex] = newProduct;

        emit ProductAdded(_metaUuid, productIndex, _name, _price, _quantity, msg.sender, _sellerUuid);

        productIndex++;
    }

    function purchaseProduct(uint256 _productId, uint8 _quantity, string memory _buyerUuid) external payable {
        require(_productId < productIndex, "Invalid product ID");

        Product memory product = products[_productId];
        require(product.seller != address(0), "Product does not exist");

        uint256 totalPrice = uint256(product.price) * uint256(_quantity);
        require(msg.value >= totalPrice, "Insufficient funds");

        product.quantity -= _quantity;

        payable(product.seller).transfer(totalPrice);

        emit ProductPurchased(_productId, msg.sender, _buyerUuid, _quantity);
    }

    function removeProduct(uint256 _productId) external {
        require(_productId < productIndex, "Invalid product ID");

        delete products[_productId];

        emit ProductRemoved(_productId);
    }

}