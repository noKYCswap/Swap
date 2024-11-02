import React from 'react';
import { Settings2 } from 'lucide-react';
import SwapCard from './components/SwapCard';
import Navbar from './components/Navbar';
import RecentTransactions from './components/RecentTransactions';
import PopularPairs from './components/PopularPairs';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-900 via-slate-900 to-black text-white">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <PopularPairs />
          </div>

          <div className="lg:col-span-1">
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Instant Swap</h2>
                <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
                  <Settings2 className="w-5 h-5" />
                </button>
              </div>
              
              <SwapCard />
            </div>
          </div>

          <div className="lg:col-span-1">
            <RecentTransactions />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;