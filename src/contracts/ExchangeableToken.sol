// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ExchangeableToken is ERC20, Ownable {
    uint256 public constant INITIAL_SUPPLY = 300_000_000 * 10 ** 18; // 300 million tokens

    constructor() ERC20("ExchangeableToken", "EXT") Ownable(msg.sender) {
        // Mint the total supply to the deployer's wallet
        _mint(msg.sender, INITIAL_SUPPLY);
    }

    // Function to withdraw Ether from the contract (only owner)
    function withdrawEther(uint256 amount) external onlyOwner {
        require(address(this).balance >= amount, "Insufficient Ether balance");
        payable(owner()).transfer(amount);
    }

    // Function to withdraw tokens from the contract (only owner)
    function withdrawTokens(uint256 amount) external onlyOwner {
        require(balanceOf(address(this)) >= amount, "Insufficient token balance");
        _transfer(address(this), owner(), amount);
    }

    // Receive Ether
    receive() external payable {}
}