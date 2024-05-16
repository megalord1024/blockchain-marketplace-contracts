pragma solidity ^0.8.0;

contract RandomNumberGenerator {
    function generateNumber(uint _number) external view returns (uint) {
        uint randNum = uint (keccak256(abi.encodePacked (msg.sender, block.timestamp, _number)));
        return randNum;
    }
}