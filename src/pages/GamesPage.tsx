import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';
import GameCard from '../components/GameCard';
import { useAppContext } from '../contexts/AppContext';
import { GameStatus } from '../types';

const GamesPage = () => {
  const { games, user, joinGame } = useAppContext();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('active');
  
  const activeGames = games.filter(game => game.status === GameStatus.ACTIVE);
  const upcomingGames = games.filter(game => game.status === GameStatus.UPCOMING);
  const completedGames = games.filter(game => game.status === GameStatus.COMPLETED);
  
  // For the join game modal
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [selectedGameId, setSelectedGameId] = useState('');
  const [selectedAgentId, setSelectedAgentId] = useState(user?.agents[0]?.id || '');
  
  const handleJoinGame = (gameId: string) => {
    setSelectedGameId(gameId);
    setIsJoinModalOpen(true);
  };
  
  const handleWatchGame = (gameId: string) => {
    navigate(`/games/${gameId}`);
  };
  
  const handleConfirmJoin = () => {
    if (selectedGameId && selectedAgentId) {
      joinGame(selectedGameId, selectedAgentId);
      setIsJoinModalOpen(false);
    }
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Game Lobby</h1>
        <Button
          text="Create Game"
          variant="primary"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          }
        />
      </div>
      
      {/* Tabs */}
      <div className="flex border-b border-gray-700 mb-6">
        <button
          className={`px-6 py-3 font-medium text-sm ${
            activeTab === 'active'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-400 hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('active')}
        >
          Active Games
        </button>
        <button
          className={`px-6 py-3 font-medium text-sm ${
            activeTab === 'upcoming'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-400 hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming Games
        </button>
        <button
          className={`px-6 py-3 font-medium text-sm ${
            activeTab === 'completed'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-400 hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('completed')}
        >
          Completed Games
        </button>
      </div>
      
      {/* Game lists */}
      {activeTab === 'active' && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {activeGames.length > 0 ? (
            activeGames.map(game => (
              <motion.div key={game.id} variants={itemVariants}>
                <GameCard
                  game={game}
                  onWatch={handleWatchGame}
                />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              <p className="text-gray-400 mb-4">No active games at the moment</p>
              <Button text="Check Upcoming Games" variant="primary" onClick={() => setActiveTab('upcoming')} />
            </div>
          )}
        </motion.div>
      )}
      
      {activeTab === 'upcoming' && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {upcomingGames.length > 0 ? (
            upcomingGames.map(game => (
              <motion.div key={game.id} variants={itemVariants}>
                <GameCard
                  game={game}
                  onJoin={handleJoinGame}
                />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gray-400">No upcoming games scheduled</p>
            </div>
          )}
        </motion.div>
      )}
      
      {activeTab === 'completed' && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {completedGames.length > 0 ? (
            completedGames.map(game => (
              <motion.div key={game.id} variants={itemVariants}>
                <GameCard
                  game={game}
                  onWatch={handleWatchGame}
                />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p className="text-gray-400">No game history found</p>
            </div>
          )}
        </motion.div>
      )}
      
      {/* Join Game Modal */}
      {isJoinModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <motion.div
            className="w-full max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Join Game</h2>
                <button
                  onClick={() => setIsJoinModalOpen(false)}
                  className="text-gray-500 hover:text-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <p className="text-gray-400 mb-4">
                Select an agent to deploy in this game. Entry fee will be deducted from your balance.
              </p>
              
              <div className="mb-4">
                <label className="block text-gray-300 mb-2 font-medium">
                  Select Agent
                </label>
                {user?.agents.length ? (
                  <div className="space-y-3">
                    {user.agents.map(agent => (
                      <div
                        key={agent.id}
                        className={`p-3 rounded-lg border cursor-pointer ${
                          selectedAgentId === agent.id
                            ? 'border-primary bg-primary/10'
                            : 'border-gray-700 hover:border-gray-600'
                        }`}
                        onClick={() => setSelectedAgentId(agent.id)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-gray-800 overflow-hidden">
                            <img 
                              src={agent.avatar} 
                              alt={agent.name}
                              onError={(e) => {
                                e.currentTarget.src = 'https://via.placeholder.com/40x40?text=AI';
                              }}
                            />
                          </div>
                          <div>
                            <h3 className="font-medium">{agent.name}</h3>
                            <p className="text-xs text-gray-400">Balance: ${agent.balance}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No agents available. Please create an agent first.</p>
                )}
              </div>
              
              <div className="bg-gray-800/50 p-4 rounded-lg mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Entry Fee:</span>
                  <span className="font-medium">$100</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Starting Capital:</span>
                  <span className="font-medium">$1,000</span>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button
                  text="Cancel"
                  variant="outline"
                  onClick={() => setIsJoinModalOpen(false)}
                  fullWidth
                />
                <Button
                  text="Confirm & Join"
                  variant="primary"
                  onClick={handleConfirmJoin}
                  fullWidth
                />
              </div>
            </Card>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default GamesPage;
