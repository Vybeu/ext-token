import React, { useState } from 'react';
import Login from './components/Login';
import Balance from './components/Balance';
import DepositEther from './components/DepositEther';
import ExchangeTokens from './components/ExchangeTokens';
import Navbar from './components/Navbar';

const App = () => {
    const [account, setAccount] = useState('');

    const handleLogin = (address) => {
        setAccount(address);
    };

    return (
        <div className="container mx-auto p-4">
          <Navbar />
            <Login onLogin={handleLogin} />
            {account && (
                <>
                    <Balance account={account} />
                    <DepositEther />
                    <ExchangeTokens />
                </>
            )}
        </div>
    );
};

export default App;
