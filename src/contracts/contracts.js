import { ethers } from 'ethers';
import { SIMPLE_DEX_ADDRESS, EXCHANGEABLE_TOKEN_ADDRESS, SIMPLE_DEX_ABI, EXCHANGEABLE_TOKEN_ABI } from './config';

const provider = new ethers.BrowserProvider(window.ethereum);
const signer = provider.getSigner();

export const simpleDexContract = new ethers.Contract(SIMPLE_DEX_ADDRESS, SIMPLE_DEX_ABI, signer);
export const exchangeableTokenContract = new ethers.Contract(EXCHANGEABLE_TOKEN_ADDRESS, EXCHANGEABLE_TOKEN_ABI, signer);
