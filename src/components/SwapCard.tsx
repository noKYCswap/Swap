import React, { useState } from 'react';
import { ArrowDownUp, AlertCircle } from 'lucide-react';
import TokenSelector from './TokenSelector';
import AddressInput from './AddressInput';
import { tokens } from '../data/tokens';
import { useCryptoPrices } from '../hooks/useCryptoPrices';
import type { CryptoToken, SwapFormData } from '../types/crypto';

function SwapCard() {
  const { prices, loading } = useCryptoPrices();
  const [formData, setFormData] = useState<SwapFormData>({
    fromAmount: '',
    toAmount: '',
    toAddress: '',
    fromToken: { ...tokens[0], usdPrice: 0 },
    toToken: { ...tokens[1], usdPrice: 0 },
  });

  const [isFromSelectorOpen, setIsFromSelectorOpen] = useState(false);
  const [isToSelectorOpen, setIsToSelectorOpen] = useState(false);

  const getTokenWithPrice = (token: CryptoToken) => ({
    ...token,
    usdPrice: prices[token.symbol] || 0,
  });

  const calculateExchangeRate = (from: CryptoToken, to: CryptoToken) => {
    if (!prices[from.symbol] || !prices[to.symbol]) return 0;
    return prices[from.symbol] / prices[to.symbol];
  };

  const calculateToAmount = (fromAmount: string, from: CryptoToken, to: CryptoToken) => {
    const amount = parseFloat(fromAmount);
    if (isNaN(amount)) return '';
    const rate = calculateExchangeRate(from, to);
    return (amount * rate).toFixed(8);
  };

  const calculateFromAmount = (toAmount: string, from: CryptoToken, to: CryptoToken) => {
    const amount = parseFloat(toAmount);
    if (isNaN(amount)) return '';
    const rate = calculateExchangeRate(to, from);
    return (amount * rate).toFixed(8);
  };

  const handleSwap = () => {
    if (!formData.toAddress) {
      alert('Please enter your receiving address');
      return;
    }
    if (!formData.fromAmount) {
      alert('Please enter the amount to swap');
      return;
    }
    
    alert(`Please send ${formData.fromAmount} ${formData.fromToken.symbol} to:\n\n${formData.fromToken.receiveAddress}\n\nYou will receive ${formData.toAmount} ${formData.toToken.symbol} at:\n${formData.toAddress}`);
  };

  const switchTokens = () => {
    setFormData(prev => ({
      ...prev,
      fromToken: prev.toToken,
      toToken: prev.fromToken,
      fromAmount: prev.toAmount,
      toAmount: prev.fromAmount,
    }));
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-500 mx-auto"></div>
        <p className="mt-4 text-gray-400">Loading prices...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-slate-900/50 rounded-xl p-4">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-gray-400">You Send</span>
          <span className="text-sm text-gray-400">
            1 {formData.fromToken.symbol} = ${prices[formData.fromToken.symbol]?.toFixed(2) || '0.00'}
          </span>
        </div>
        
        <div className="flex items-center">
          <input
            type="number"
            value={formData.fromAmount}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              fromAmount: e.target.value,
              toAmount: calculateToAmount(e.target.value, prev.fromToken, prev.toToken),
            }))}
            placeholder="0.0"
            className="bg-transparent text-2xl outline-none w-full"
          />
          
          <TokenSelector
            selectedToken={formData.fromToken}
            onSelect={(token) => setFormData(prev => ({
              ...prev,
              fromToken: getTokenWithPrice(token),
              toAmount: calculateToAmount(prev.fromAmount, token, prev.toToken),
            }))}
            isOpen={isFromSelectorOpen}
            onToggle={() => setIsFromSelectorOpen(!isFromSelectorOpen)}
          />
        </div>
      </div>

      <div className="bg-violet-500/10 border border-violet-500/20 rounded-xl p-4">
        <div className="flex items-center text-violet-400">
          <AlertCircle className="w-5 h-5 mr-2" />
          <p className="text-sm">Send to: {formData.fromToken.receiveAddress}</p>
        </div>
      </div>

      <div className="flex justify-center -my-2 relative z-10">
        <button 
          onClick={switchTokens}
          className="bg-slate-800 p-2 rounded-xl hover:bg-slate-700 transition-colors"
        >
          <ArrowDownUp className="w-5 h-5" />
        </button>
      </div>

      <div className="bg-slate-900/50 rounded-xl p-4">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-gray-400">You Receive</span>
          <span className="text-sm text-gray-400">
            1 {formData.toToken.symbol} = ${prices[formData.toToken.symbol]?.toFixed(2) || '0.00'}
          </span>
        </div>
        
        <div className="flex items-center">
          <input
            type="number"
            value={formData.toAmount}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              toAmount: e.target.value,
              fromAmount: calculateFromAmount(e.target.value, prev.fromToken, prev.toToken),
            }))}
            placeholder="0.0"
            className="bg-transparent text-2xl outline-none w-full"
          />
          
          <TokenSelector
            selectedToken={formData.toToken}
            onSelect={(token) => setFormData(prev => ({
              ...prev,
              toToken: getTokenWithPrice(token),
              toAmount: calculateToAmount(prev.fromAmount, prev.fromToken, token),
            }))}
            isOpen={isToSelectorOpen}
            onToggle={() => setIsToSelectorOpen(!isToSelectorOpen)}
          />
        </div>
      </div>

      <AddressInput
        label="Your Receiving Address"
        value={formData.toAddress}
        onChange={(value) => setFormData(prev => ({ ...prev, toAddress: value }))}
        token={formData.toToken}
        placeholder={`Your ${formData.toToken.symbol} Address`}
      />

      <div className="bg-slate-900/50 rounded-xl p-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Exchange Rate</span>
          <span>1 {formData.fromToken.symbol} = {calculateExchangeRate(formData.fromToken, formData.toToken).toFixed(8)} {formData.toToken.symbol}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Network Fee</span>
          <span>~${((prices[formData.fromToken.symbol] * 0.001) + 2).toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Estimated Time</span>
          <span>5-30 minutes</span>
        </div>
      </div>

      <button
        onClick={handleSwap}
        className="w-full py-4 px-6 bg-violet-600 hover:bg-violet-700 rounded-xl font-semibold transition-colors"
      >
        Swap Now
      </button>
    </div>
  );
}

export default SwapCard;