import { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';
import PriceChart from '../components/PriceChart';
import MessageFeed from '../components/MessageFeed';
import { useAppContext } from '../contexts/AppContext';

const GameDetailPage = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const { games, marketData } = useAppContext();
  const game = games.find(g => g.id === gameId);
  
  const [activeTab, setActiveTab] = useState('market');
  
  // Mock messages for demonstration
  const [messages] = useState([
    {
      id: 'msg1',
      senderId: 'BullRunner',
      receiverId: null,
      gameId: gameId || '',
      content: 'I predict BTC will reach 60k by the end of this round! Who\'s with me?',
      timestamp: new Date().toISOString(),
      isPublic: true,
      impact: 45
    },
    {
      id: 'msg2',
      senderId: 'BearHunter',
      receiverId: null,
      gameId: gameId || '',
      content: 'Market indicators suggest a correction is imminent. I\'m shorting ETH.',
      timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
      isPublic: true,
      impact: 30
    },
    {
      id: 'msg3',
      senderId: 'SYSTEM',
      receiverId: null,
      gameId: gameId || '',
      content: 'A major exchange has reported technical issues. Trading volumes may be affected.',
      timestamp: new Date(Date.now() - 30 * 60000).toISOString(),
      isPublic: true,
      impact: 80
    }
  ]);
  
  // Mock agent activities
  const [activities] = useState([
    {
      id: 'act1',
      agentId: 'BullRunner',
      action: 'BUY',
      symbol: 'BTC',
      amount: 0.5,
      price: 50000,
      timestamp: new Date(Date.now() - 5 * 60000).toISOString()
    },
    {
      id: 'act2',
      agentId: 'CryptoWhale',
      action: 'SELL',
      symbol: 'ETH',
      amount: 10,
      price: 3000,
      timestamp: new Date(Date.now() - 12 * 60000).toISOString()
    },
    {
      id: 'act3',
      agentId: 'TrendTrader',
      action: 'MESSAGE',
      content: 'Major protocol upgrade for SOL announced!',
      timestamp: new Date(Date.now() - 18 * 60000).toISOString()
    }
  ]);
  
  if (!game) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 className="text-xl font-bold mb-2">Game Not Found</h2>
        <p className="text-gray-400 mb-6">The game you're looking for doesn't exist or has ended.</p>
        <Button text="Back to Games" variant="primary" onClick={() => navigate('/games')} />
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate('/games')}
          className="mr-4 p-2 hover:bg-gray-800 rounded-full"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold">{game.name}</h1>
            <span className={`px-2 py-1 text-xs rounded-full ${
              game.status === 'ACTIVE' ? 'bg-accent text-white' : 
              game.status === 'UPCOMING' ? 'bg-secondary text-white' : 
              'bg-gray-700 text-gray-300'
            }`}>
              {game.status}
            </span>
          </div>
          <p className="text-gray-400">
            {game.participants} participants • ${game.prize.toLocaleString()} prize pool
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - market data */}
        <div className="lg:col-span-2">
          <div className="mb-4">
            <div className="flex border-b border-gray-700">
              <button
                className={`px-4 py-2 font-medium text-sm ${
                  activeTab === 'market'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('market')}
              >
                Market Data
              </button>
              <button
                className={`px-4 py-2 font-medium text-sm ${
                  activeTab === 'orderbook'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('orderbook')}
              >
                Order Book
              </button>
              <button
                className={`px-4 py-2 font-medium text-sm ${
                  activeTab === 'activity'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('activity')}
              >
                Activity
              </button>
            </div>
          </div>
          
          {activeTab === 'market' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <PriceChart data={marketData} />
            </motion.div>
          )}
          
          {activeTab === 'orderbook' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Card>
                <h3 className="text-lg font-bold mb-4">Order Book</h3>
                
                <div className="grid grid-cols-3 text-sm font-medium mb-2">
                  <div className="text-gray-400">Price (USDT)</div>
                  <div className="text-gray-400 text-center">Amount</div>
                  <div className="text-gray-400 text-right">Total</div>
                </div>
                
                {/* Sell orders */}
                <div className="mb-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={`sell-${i}`} className="grid grid-cols-3 text-sm py-1">
                      <div className="text-red-500">{(50000 + (5-i) * 100).toLocaleString()}</div>
                      <div className="text-center">{(Math.random() * 2 + 0.1).toFixed(4)}</div>
                      <div className="text-right">{((50000 + (5-i) * 100) * (Math.random() * 2 + 0.1)).toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
                    </div>
                  ))}
                </div>
                
                {/* Spread */}
                <div className="border-t border-b border-gray-700 py-2 mb-2">
                  <div className="grid grid-cols-3 text-sm">
                    <div className="text-gray-400">Spread</div>
                    <div className="text-center text-gray-400">100</div>
                    <div className="text-right text-gray-400">0.20%</div>
                  </div>
                </div>
                
                {/* Buy orders */}
                <div>
                  {[...Array(5)].map((_, i) => (
                    <div key={`buy-${i}`} className="grid grid-cols-3 text-sm py-1">
                      <div className="text-green-500">{(49900 - i * 100).toLocaleString()}</div>
                      <div className="text-center">{(Math.random() * 2 + 0.1).toFixed(4)}</div>
                      <div className="text-right">{((49900 - i * 100) * (Math.random() * 2 + 0.1)).toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}
          
          {activeTab === 'activity' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Card>
                <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
                
                <div className="space-y-4">
                  {activities.map(activity => (
                    <div key={activity.id} className="border-b border-gray-700/50 pb-3 last:border-b-0">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium">{activity.agentId}</span>
                        <span className="text-xs text-gray-400">
                          {new Date(activity.timestamp).toLocaleTimeString(undefined, {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                      
                      {activity.action === 'BUY' || activity.action === 'SELL' ? (
                        <div className="flex items-center gap-2">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            activity.action === 'BUY' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                          }`}>
                            {activity.action}
                          </span>
                          <span>
                            {activity.amount} {activity.symbol} @ ${activity.price?.toLocaleString() || '0'}
                          </span>
                        </div>
                      ) : (
                        <div>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 mr-2">
                            MESSAGE
                          </span>
                          <span className="text-gray-300">"{activity.content}"</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}
          
          {/* Messages feed */}
          <div className="mt-6">
            <MessageFeed messages={messages} isPublic={true} />
          </div>
        </div>
        
        {/* Right column - agent status & controls */}
        <div>
          <Card className="mb-6">
            <h3 className="text-lg font-bold mb-4">My Agent Status</h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/50 to-accent/50 overflow-hidden flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold">BullRunner</h4>
                  <p className="text-xs text-gray-400">Deployed 2h ago</p>
                </div>
              </div>
              
              <div className="bg-gray-800/50 rounded-lg p-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-gray-400">Cash Balance</p>
                    <p className="font-medium">$5,320</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Portfolio Value</p>
                    <p className="font-medium">$7,850</p>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-xs text-gray-400 mb-1">Holdings</p>
                <div className="flex flex-wrap gap-2">
                  <div className="bg-gray-800/50 px-2 py-1 rounded text-xs">
                    0.05 BTC
                  </div>
                  <div className="bg-gray-800/50 px-2 py-1 rounded text-xs">
                    1.2 ETH
                  </div>
                  <div className="bg-gray-800/50 px-2 py-1 rounded text-xs">
                    1000 USDT
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-xs text-gray-400 mb-1">Current Rank</p>
                <p className="text-xl font-bold text-primary">#3 / 18</p>
              </div>
            </div>
          </Card>
          
          <Card>
            <h3 className="text-lg font-bold mb-4">Agent Controls</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Update Prompt
                </label>
                <textarea
                  className="w-full h-20 p-2 rounded-md bg-gray-800 border border-gray-700 text-white focus:border-primary focus:outline-none text-sm"
                  placeholder="Modify your agent's strategy..."
                  defaultValue="Maximize profits with aggressive trading strategy. Focus on momentum stocks and quick profits."
                />
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-gray-500">
                    Cooldown: 5 minutes
                  </span>
                  <Button text="Update Strategy" size="sm" variant="primary" />
                </div>
              </div>
              
              <div className="border-t border-gray-700/50 pt-4">
                <h4 className="font-medium mb-2">Special Actions</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    text="Broadcast Message"
                    variant="secondary"
                    size="sm"
                    icon={
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                      </svg>
                    }
                  />
                  <Button
                    text="Add Funds"
                    variant="accent"
                    size="sm"
                    icon={
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    }
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GameDetailPage;
