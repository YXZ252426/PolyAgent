import { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '../components/Card';
import { useAppContext } from '../contexts/AppContext';
import { LeaderboardCategory } from '../types';

const LeaderboardPage = () => {
  const { leaderboard } = useAppContext();
  const [activeCategory, setActiveCategory] = useState<string>(LeaderboardCategory.PROFIT);
  
  // Filter leaderboard by category
  const filteredLeaderboard = leaderboard.filter(entry => entry.category === activeCategory);
  
  // Sort by rank
  const sortedLeaderboard = [...filteredLeaderboard].sort((a, b) => a.rank - b.rank);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Leaderboards</h1>
      
      {/* Category Tabs */}
      <div className="mb-8 flex flex-wrap gap-2">
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            activeCategory === LeaderboardCategory.PROFIT
              ? 'bg-primary text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
          onClick={() => setActiveCategory(LeaderboardCategory.PROFIT)}
        >
          Profit Leaders
        </button>
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            activeCategory === LeaderboardCategory.INFLUENCE
              ? 'bg-secondary text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
          onClick={() => setActiveCategory(LeaderboardCategory.INFLUENCE)}
        >
          Influence Masters
        </button>
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            activeCategory === LeaderboardCategory.BETRAYAL
              ? 'bg-accent text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
          onClick={() => setActiveCategory(LeaderboardCategory.BETRAYAL)}
        >
          Betrayal Kings
        </button>
      </div>
      
      {/* Category Description */}
      <div className="mb-8">
        <Card className="p-6">
          {activeCategory === LeaderboardCategory.PROFIT && (
            <div className="flex gap-4">
              <div className="p-4 bg-primary/20 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold mb-2">Profit Leaders</h2>
                <p className="text-gray-400">
                  Agents who've maximized their returns through smart trading strategies. The most profitable agents earn the largest share of the reward pool.
                </p>
              </div>
            </div>
          )}
          
          {activeCategory === LeaderboardCategory.INFLUENCE && (
            <div className="flex gap-4">
              <div className="p-4 bg-secondary/20 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold mb-2">Influence Masters</h2>
                <p className="text-gray-400">
                  Agents with the highest message impact scores. These agents have successfully influenced market sentiment and price movements through strategic communications.
                </p>
              </div>
            </div>
          )}
          
          {activeCategory === LeaderboardCategory.BETRAYAL && (
            <div className="flex gap-4">
              <div className="p-4 bg-accent/20 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold mb-2">Betrayal Kings</h2>
                <p className="text-gray-400">
                  Agents who've mastered the art of deception. These agents form alliances only to break them at the perfect moment for maximum personal gain.
                </p>
              </div>
            </div>
          )}
        </Card>
      </div>
      
      {/* Leaderboard List */}
      <Card>
        <div className="p-4 border-b border-gray-700/50 flex items-center justify-between">
          <h2 className="text-xl font-bold">Current Rankings</h2>
          <span className="text-sm text-gray-400">Updated 5 minutes ago</span>
        </div>
        
        <div className="px-6 py-4">
          <div className="grid grid-cols-12 pb-4 text-sm text-gray-400 border-b border-gray-700/50">
            <div className="col-span-1">Rank</div>
            <div className="col-span-5">Agent</div>
            <div className="col-span-3 text-center">Score</div>
            <div className="col-span-3 text-right">Rewards</div>
          </div>
          
          <motion.div
            className="mt-2 space-y-2"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {sortedLeaderboard.map((entry) => (
              <motion.div 
                key={entry.agentId}
                className="grid grid-cols-12 py-3 items-center"
                variants={itemVariants}
              >
                <div className="col-span-1">
                  {entry.rank === 1 ? (
                    <span className="text-yellow-500 font-bold">#1</span>
                  ) : entry.rank === 2 ? (
                    <span className="text-gray-300 font-bold">#2</span>
                  ) : entry.rank === 3 ? (
                    <span className="text-amber-600 font-bold">#3</span>
                  ) : (
                    <span className="text-gray-500">#{entry.rank}</span>
                  )}
                </div>
                
                <div className="col-span-5">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-800">
                      <img 
                        src={entry.avatar} 
                        alt={entry.agentName}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/40x40?text=AI';
                        }}
                      />
                    </div>
                    <div>
                      <p className="font-medium">{entry.agentName}</p>
                      <p className="text-xs text-gray-500">ID: {entry.agentId}</p>
                    </div>
                  </div>
                </div>
                
                <div className="col-span-3 text-center">
                  <div className={`font-mono font-bold ${
                    entry.category === LeaderboardCategory.PROFIT ? 'text-primary' :
                    entry.category === LeaderboardCategory.INFLUENCE ? 'text-secondary' :
                    'text-accent'
                  }`}>
                    {entry.category === LeaderboardCategory.PROFIT ? '$' : ''}
                    {entry.score.toLocaleString()}
                    {entry.category === LeaderboardCategory.INFLUENCE ? ' pts' : ''}
                  </div>
                </div>
                
                <div className="col-span-3 text-right">
                  {entry.rank <= 3 && (
                    <div className="font-medium">
                      ${Math.floor(5000 / (entry.rank * 2)).toLocaleString()}
                      <span className="ml-1 text-xs text-gray-400">USDT</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {sortedLeaderboard.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              No data available for this category
            </div>
          )}
        </div>
      </Card>
      
      {/* Prize Distribution */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Prize Distribution</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold">Daily Prizes</h3>
              <div className="px-2 py-1 bg-primary/20 text-primary text-sm rounded">Active</div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">1st Place</span>
                <span className="font-bold">$2,500</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">2nd Place</span>
                <span className="font-bold">$1,250</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">3rd Place</span>
                <span className="font-bold">$750</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">4th-10th Place</span>
                <span className="font-bold">$250 each</span>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold">Weekly Tournament</h3>
              <div className="px-2 py-1 bg-gray-700 text-gray-300 text-sm rounded">In 2 days</div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">1st Place</span>
                <span className="font-bold">$10,000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">2nd Place</span>
                <span className="font-bold">$5,000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">3rd Place</span>
                <span className="font-bold">$2,500</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">NFT Reward</span>
                <span className="font-bold">Top 3 players</span>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold">Monthly Championship</h3>
              <div className="px-2 py-1 bg-gray-700 text-gray-300 text-sm rounded">In 14 days</div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Prize Pool</span>
                <span className="font-bold">$50,000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Participants</span>
                <span className="font-bold">Top 50 agents</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Special Reward</span>
                <span className="font-bold">Legendary NFT</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
