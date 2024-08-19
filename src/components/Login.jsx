import React, { useState } from 'react';
import { ethers } from 'ethers';

const Login = ({ onLogin }) => {
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async () => {
        if (!window.ethereum) {
            setErrorMessage("No crypto wallet found. Please install MetaMask.");
            return;
        }

        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner(); // Note the use of await here
            const address = await signer.getAddress();
            onLogin(address);
            setErrorMessage(''); // Clear any previous error message
        } catch (error) {
            if (error.code === 4001) {
                setErrorMessage("User denied account access.");
            } else {
                setErrorMessage("An error occurred during login. Please try again.");
                console.error("An error occurred during login:", error);
            }
        }
    };

    return (
        <div className="p-4">
            <button
                onClick={handleLogin}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Login with MetaMask
            </button>
            {errorMessage && (
                <p className="mt-4 text-red-500">{errorMessage}</p>
            )}
        </div>
    );
};

export default Login;
