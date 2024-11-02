import React from 'react';
import { Wallet, Menu } from 'lucide-react';

interface NavbarProps {
  connected: boolean;
  setConnected: (connected: boolean) => void;
}

function Navbar({ connected, setConnected }: NavbarProps) {
  return (
    <nav className="border-b border-slate-800 backdrop-blur-xl bg-slate-900/75">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center">
              <Wallet className="w-8 h-8 text-violet-400" />
              <span className="ml-2 text-xl font-bold">CryptoSwap</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Swap</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Pools</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Charts</a>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setConnected(!connected)}
              className="py-2 px-4 bg-violet-600 hover:bg-violet-700 rounded-xl font-medium transition-colors"
            >
              {connected ? '0x1234...5678' : 'Connect Wallet'}
            </button>
            
            <button className="md:hidden p-2 hover:bg-slate-800 rounded-lg">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;