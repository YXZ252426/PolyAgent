import { motion } from 'framer-motion';
import { useState } from 'react';
import type { MarketData } from '../types';

interface PriceChartProps {
  data: MarketData[];
}

const PriceChart = ({ data }: PriceChartProps) => {
  const [selectedCoin, setSelectedCoin] = useState(data[0]?.symbol || '');

  // For a real implementation, we would use data points over time
  // This is a simplified version that just shows the current price
  const selectedData = data.find(d => d.symbol === selectedCoin) || data[0];
  
  const priceChangeColor = 
    selectedData?.change > 0 ? 'text-green-500' : 
    selectedData?.change < 0 ? 'text-red-500' : 'text-gray-400';

  return (
    <div className="bg-surface p-4 rounded-xl border border-gray-700/30">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">Market Data</h3>
        <div className="flex gap-2">
          {data.map(coin => (
            <button
              key={coin.symbol}
              className={`px-2 py-1 text-xs rounded-md transition-all ${
                selectedCoin === coin.symbol
                  ? 'bg-primary text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => setSelectedCoin(coin.symbol)}
            >
              {coin.symbol}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-end mb-2">
        <div>
          <p className="text-sm text-gray-400">Current Price</p>
          <p className="text-2xl font-bold">${selectedData?.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-400">24h Change</p>
          <p className={`text-lg font-bold ${priceChangeColor}`}>
            {selectedData?.change > 0 ? '+' : ''}{selectedData?.change.toFixed(2)}%
          </p>
        </div>
      </div>

      {/* Simulated Price Chart - In a real app, use a chart library like recharts */}
      <div className="h-40 w-full mt-4 relative overflow-hidden">
        <div className="absolute inset-0 flex items-end justify-between px-2">
          {Array.from({ length: 20 }).map((_, i) => {
            // Generate a pseudo-random height for the bar
            const height = 30 + Math.sin(i * 0.5) * 20 + Math.cos(i * 0.3) * 15 + Math.random() * 15;
            
            return (
              <motion.div
                key={i}
                className="w-[3%] bg-gradient-to-t from-primary/80 to-primary/20"
                style={{ height: `${height}%` }}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.03, duration: 0.5 }}
              />
            );
          })}
        </div>
        
        {/* Grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
          {[0, 1, 2, 3].map(i => (
            <div key={i} className="border-t border-gray-700/30 w-full" />
          ))}
        </div>
      </div>
      
      <div className="flex justify-between mt-2 text-xs text-gray-500">
        <span>24h ago</span>
        <span>12h ago</span>
        <span>Now</span>
      </div>
      
      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <div className="bg-gray-800/50 rounded-lg p-2">
          <p className="text-xs text-gray-400">Volume (24h)</p>
          <p className="text-sm font-medium">
            ${(selectedData?.volume / 1000000).toFixed(1)}M
          </p>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-2">
          <p className="text-xs text-gray-400">Orders</p>
          <p className="text-sm font-medium">
            {Math.floor(Math.random() * 1000) + 500}
          </p>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-2">
          <p className="text-xs text-gray-400">Volatility</p>
          <p className="text-sm font-medium">
            {Math.abs(selectedData?.change * 1.5).toFixed(1)}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default PriceChart;
