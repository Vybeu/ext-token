import React, { useState } from 'react';
import { ethers } from 'ethers';

const CreateAccount = ({ onAccountCreated }) => {
    const [publicKey, setPublicKey] = useState('');
    const [mnemonicPhrase, setMnemonicPhrase] = useState('');

    const generateAccount = () => {
        const wallet = ethers.Wallet.createRandom();
        setPublicKey(wallet.address);
        setMnemonicPhrase(wallet.mnemonic.phrase);
        onAccountCreated(wallet.address, wallet.privateKey, wallet.mnemonic.phrase);
    };

    return (
        <div className="p-4">
            <button
                onClick={generateAccount}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Create Account
            </button>
            {publicKey && (
                <div className="mt-4">
                    <p>Public Key: {publicKey}</p>
                    <p>Mnemonic Phrase: {mnemonicPhrase}</p>
                </div>
            )}
        </div>
    );
};

export default CreateAccount;
