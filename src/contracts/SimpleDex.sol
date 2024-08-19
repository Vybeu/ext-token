// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract SimpleDex is Ownable {
    IERC20 public token;
    uint256 public constant TOKEN_PRICE = 0.0001 ether; // Price per token in Ether

    constructor(address tokenAddress) Ownable(msg.sender) {
        token = IERC20(tokenAddress);
    }

    // Function to exchange Ether for tokens
    function exchangeEtherForTokens() external payable {
        require(msg.value > 0, "Send ETH to exchange for tokens");

        // Calculate the number of tokens to send based on the amount of ETH sent
        uint256 tokensToBuy = (msg.value * 10 ** 18) / TOKEN_PRICE;

        // Ensure the contract has enough tokens to send
        require(token.balanceOf(address(this)) >= tokensToBuy, "Not enough tokens in reserve");

        // Transfer tokens to the sender
        token.transfer(msg.sender, tokensToBuy);
    }

    // Function to withdraw Ether from the contract (only owner)
    function withdrawEther(uint256 amount) external onlyOwner {
        require(address(this).balance >= amount, "Insufficient contract ether balance");
        payable(owner()).transfer(amount);
    }

    // Function to withdraw tokens from the contract (only owner)
    function withdrawTokens(uint256 amount) external onlyOwner {
        require(token.balanceOf(address(this)) >= amount, "Insufficient contract token balance");
        token.transfer(owner(), amount);
    }

    // Receive Ether
    receive() external payable {}
}