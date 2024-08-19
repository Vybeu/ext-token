# SimpleDex and ExchangeableToken Smart Contracts

This project consists of two Solidity smart contracts: `ExchangeableToken` and `SimpleDex`. Together, they form a decentralized exchange (DEX) that allows users to swap Ether for a custom ERC20 token named "ExchangeableToken (EXT)".

## Overview

- **ExchangeableToken (EXT):** An ERC20 token with a fixed supply of 300 million tokens. The entire token supply is minted to the deployer's wallet upon contract creation.
- **SimpleDex:** A decentralized exchange that allows users to exchange Ether for EXT tokens. The contract owner can deposit tokens into the DEX, and users can trade their Ether for tokens at a fixed exchange rate.

## Project Structure

- `contracts/`
  - `ExchangeableToken.sol`: The ERC20 token contract.
  - `SimpleDex.sol`: The DEX contract for trading Ether for EXT tokens.

## How It Works

1. **Token Deployment:**

   - When the `ExchangeableToken` contract is deployed, the total token supply (300 million tokens) is minted to the deployer's wallet.

2. **DEX Deployment:**

   - The `SimpleDex` contract is deployed with the address of the `ExchangeableToken` contract passed to its constructor. The deployer (contract owner) can then deposit tokens into the DEX to make them available for trading.

3. **Token Trading:**

   - Users send Ether to the `SimpleDex` contract in exchange for EXT tokens at a fixed rate (e.g., 0.0001 ETH per token).

4. **Admin Controls:**
   - The contract owner can withdraw Ether or tokens from the DEX as needed.

## Setup and Deployment

### Prerequisites

- Node.js (for running scripts)
- MetaMask (for deploying and interacting with the contracts)
- Remix IDE (for deploying and testing the contracts)

### Steps to Deploy

1. **Deploy `ExchangeableToken`:**

   Deploy the `ExchangeableToken` contract using Remix or any Ethereum development environment. The full token supply will be minted to the deployer's wallet.

2. **Deploy `SimpleDex`:**

   Deploy the `SimpleDex` contract by passing the address of the `ExchangeableToken` contract to the constructor.

3. **Transfer Tokens to `SimpleDex`:**

   Once both contracts are deployed, transfer a portion of the EXT tokens from your wallet to the `SimpleDex` contract using the `transfer` function in `ExchangeableToken`.

   ```solidity
   // Example: Transfer 100,000 tokens to SimpleDex
   transfer("address_of_SimpleDex_contract", 100000 * 10**18);
   ```
