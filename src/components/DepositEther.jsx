import React, { useState } from 'react';
import { ethers } from 'ethers';
// import { simpleDexAddress } from '../contracts/contracts';

const DepositEther = ({ account }) => {
    const [depositAmount, setDepositAmount] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [transactionHash, setTransactionHash] = useState('');

    const simpleDexAbi = [
        {
            "inputs": [],
            "name": "exchangeEtherForTokens",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "tokenAddress",
                    "type": "address"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                }
            ],
            "name": "OwnableInvalidOwner",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "OwnableUnauthorizedAccount",
            "type": "error"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "previousOwner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "OwnershipTransferred",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "renounceOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "transferOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "withdrawEther",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "withdrawTokens",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "stateMutability": "payable",
            "type": "receive"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "token",
            "outputs": [
                {
                    "internalType": "contract IERC20",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "TOKEN_PRICE",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];

    const simpleDexAddress = '0x64FD903d541C5224AcDa073297C3D25b6b22c5a6';

    const handleDeposit = async () => {
        if (!window.ethereum) {
            setErrorMessage('No crypto wallet found. Please install MetaMask.');
            return;
        }

        try {
            // Request account access if needed
            await window.ethereum.request({ method: 'eth_requestAccounts' });

            // Create a new ethers provider and signer
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();

            // Create a new contract instance with the signer
            const simpleDexContract = new ethers.Contract(simpleDexAddress, simpleDexAbi, signer);

            // Convert deposit amount to Wei
            const depositAmountWei = ethers.parseEther(depositAmount);

            // Call the depositEther function
            const tx = await simpleDexContract.depositEther({ value: depositAmountWei });
            setTransactionHash(tx.hash);

            // Wait for the transaction to be confirmed
            await tx.wait();

            setErrorMessage(''); // Clear any previous error message
        } catch (error) {
            console.error('Failed to deposit ether:', error);
            setErrorMessage('An error occurred during the deposit. Please try again.');
        }
    };

    return (
        <div className="p-4">
            <input
                type="text"
                placeholder="Amount in ETH"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                className="mr-2 p-2 border rounded"
            />
            <button
                onClick={handleDeposit}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Deposit Ether
            </button>
            {errorMessage && <p className="mt-4 text-red-500">{errorMessage}</p>}
            {transactionHash && <p className="mt-4">Transaction Hash: <a className="underline text-blue-500 hover:text-blue-800" href={`https://sepolia.etherscan.io/tx/${transactionHash}`}>{transactionHash}</a></p>}
        </div>
    );
};

export default DepositEther;
