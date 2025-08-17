import { motion } from 'framer-motion';
import Card from './Card';
import type { Agent } from '../types';

interface AgentCardProps {
  agent: Agent;
  onClick?: () => void;
  selected?: boolean;
}

const AgentCard = ({ agent, onClick, selected = false }: AgentCardProps) => {
  const totalBalance = agent.balance + 
    agent.holdings.reduce((sum, holding) => sum + holding.amount * holding.price, 0);

  // Calculate win rate percentage
  const winRatePercent = (agent.winRate * 100).toFixed(1);
  
  return (
    <Card 
      className={`${selected ? 'border-2 border-primary' : ''}`}
      onClick={onClick}
      glow={selected}
    >
      <div className="flex items-center gap-4">
        <motion.div 
          className="relative"
          whileHover={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 0.5 }}
        >
          <div className="h-16 w-16 rounded-full overflow-hidden bg-gradient-to-br from-primary/50 to-accent/50">
            <img 
              src={agent.avatar} 
              alt={agent.name} 
              className="h-full w-full object-cover"
              onError={(e) => {
                // Fallback for missing avatars
                e.currentTarget.src = 'https://via.placeholder.com/64x64?text=AI';
              }} 
            />
          </div>
          {agent.nftId && (
            <div className="absolute -bottom-1 -right-1 bg-accent text-xs text-white px-1 rounded-md">
              NFT
            </div>
          )}
        </motion.div>
        
        <div className="flex-1">
          <h3 className="text-lg font-bold font-sans mb-1">{agent.name}</h3>
          <div className="flex justify-between text-sm">
            <span className="text-gray-300">Level {agent.level}</span>
            <span className="text-secondary">{winRatePercent}% WR</span>
          </div>
        </div>
      </div>

      <div className="mt-4 border-t border-gray-700/50 pt-3">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-gray-400">Balance</p>
            <p className="font-mono font-medium">${agent.balance.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-400">Total Assets</p>
            <p className="font-mono font-medium">${totalBalance.toLocaleString()}</p>
          </div>
        </div>
      </div>
      
      {agent.holdings.length > 0 && (
        <div className="mt-3">
          <p className="text-xs text-gray-400 mb-1">Holdings</p>
          <div className="flex gap-2 flex-wrap">
            {agent.holdings.map(holding => (
              <span key={holding.symbol} className="text-xs px-2 py-1 rounded-full bg-surface border border-gray-700/50">
                {holding.symbol}: {holding.amount}
              </span>
            ))}
          </div>
        </div>
      )}
      
      <div className="mt-3">
        <p className="text-xs text-gray-400 mb-1">Prompt Preview</p>
        <p className="text-xs text-gray-300 line-clamp-2">{agent.prompt}</p>
      </div>
    </Card>
  );
};

export default AgentCard;
