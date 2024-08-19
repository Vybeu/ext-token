import React from 'react';

const Navbar = ({ balance }) => {
    return (
        <nav className="bg-gray-800 p-4 text-white">
            <div className="container mx-auto">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl">EXT Trader!</h1>
                    <div>
                        {/* <p>Ether: {balance.ether}</p> */}
                        {/* <p>Tokens: {balance.tokens}</p> */}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
