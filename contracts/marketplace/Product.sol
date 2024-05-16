pragma solidity ^0.8.0;

contract Product {
    string public name;
    uint32 public price;
    uint8 public quantity;
    address public seller;
    string public sellerUuid;

    event ProductPurchased(address buyer, string buyerUuid, uint8 quantity);

    constructor(
        string memory _name,
        uint32 _price,
        uint8 _quantity,
        address _seller,
        string memory _sellerUuid
    ) {
        name = _name;
        price = _price;
        quantity = _quantity;
        seller = _seller;
        sellerUuid = _sellerUuid;
    }

    function purchase(uint8 _quantity, string memory _buyerUuid) external payable {
        require(_quantity > 0, "Quantity must be greater than zero");
        require(_quantity <= quantity, "Insufficient quantity available");
        require(msg.value == price * _quantity, "Incorrect payment amount");

        // Perform the purchase
        quantity -= _quantity;

        // Transfer payment to the seller
        payable(seller).transfer(msg.value);

        // Emit the purchase event
        emit ProductPurchased(msg.sender, _buyerUuid, _quantity);
    }

}