import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from './Card';
import Button from './Button';
import type { Game } from '../types';

interface GameWaitingLobbyProps {
  game: Game;
  onCancel: () => void;
  onGameStart: () => void;
}

const GameWaitingLobby = ({ game, onCancel, onGameStart }: GameWaitingLobbyProps) => {
  const [currentParticipants, setCurrentParticipants] = useState(game.participants);
  const [isGameStarting, setIsGameStarting] = useState(false);
  const [timeToStart, setTimeToStart] = useState(5);
  
  // Simulate player joining
  useEffect(() => {
    if (currentParticipants >= game.maxParticipants) {
      // Game is full, start countdown
      setIsGameStarting(true);
      const countdownInterval = setInterval(() => {
        setTimeToStart(prev => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            onGameStart();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(countdownInterval);
    } else {
      // Simulate players joining every 2-5 seconds
      const interval = setInterval(() => {
        setCurrentParticipants(prev => {
          const newCount = Math.min(prev + Math.floor(Math.random() * 3) + 1, game.maxParticipants);
          return newCount;
        });
      }, Math.random() * 3000 + 2000);
      
      return () => clearInterval(interval);
    }
  }, [currentParticipants, game.maxParticipants, onGameStart]);
  
  const progressPercentage = (currentParticipants / game.maxParticipants) * 100;
  
  // Mock recent joiners for visual effect
  const [recentJoiners] = useState([
    { id: 'p1', name: 'CryptoKing', avatar: '/avatars/bull.png', joinedAt: Date.now() - 5000 },
    { id: 'p2', name: 'DiamondHands', avatar: '/avatars/conservative.png', joinedAt: Date.now() - 12000 },
    { id: 'p3', name: 'MoonShot', avatar: '/avatars/chaotic.png', joinedAt: Date.now() - 18000 },
    { id: 'p4', name: 'BearSlayer', avatar: '/avatars/bear.png', joinedAt: Date.now() - 25000 },
  ]);
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-2xl mx-4"
      >
        <Card className="p-8">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-3xl font-bold">{game.name}</h2>
            <p className="text-gray-400">Waiting for players to join...</p>
          </div>
          
          {/* Main waiting counter */}
          <div className="mb-8 text-center">
            <motion.div
              key={currentParticipants}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="mb-4 text-6xl font-bold"
            >
              {isGameStarting ? (
                <motion.span
                  key={timeToStart}
                  initial={{ scale: 1.2, color: '#ef4444' }}
                  animate={{ scale: 1, color: '#10b981' }}
                  className="text-accent"
                >
                  {timeToStart > 0 ? timeToStart : 'GAME START!'}
                </motion.span>
              ) : (
                <span className="text-primary">
                  {currentParticipants}/{game.maxParticipants}
                </span>
              )}
            </motion.div>
            
            <div className="mb-6 text-lg text-gray-300">
              {isGameStarting ? (
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-semibold text-accent"
                >
                  Game Starting in {timeToStart} seconds...
                </motion.span>
              ) : (
                `Waiting to enter: ${currentParticipants}/${game.maxParticipants}`
              )}
            </div>
            
            {/* Progress bar */}
            <div className="w-full h-3 mb-6 bg-gray-700 rounded-full">
              <motion.div
                className={`h-3 rounded-full ${
                  isGameStarting ? 'bg-accent' : 'bg-primary'
                }`}
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              />
            </div>
            
            {progressPercentage === 100 && !isGameStarting && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 text-lg font-semibold text-accent"
              >
                🎉 Lobby Full! Preparing to start...
              </motion.div>
            )}
          </div>
          
          {/* Game info */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary">${game.prize.toLocaleString()}</div>
              <div className="text-sm text-gray-400">Prize Pool</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">{game.duration / 60}h</div>
              <div className="text-sm text-gray-400">Duration</div>
            </div>
          </div>
          
          {/* Recent joiners */}
          <div className="mb-8">
            <h3 className="mb-4 text-lg font-semibold">Recent Players</h3>
            <div className="flex flex-wrap gap-3">
              <AnimatePresence>
                {recentJoiners.slice(0, Math.min(8, currentParticipants)).map((player, index) => (
                  <motion.div
                    key={player.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800/50"
                  >
                    <div className="flex items-center justify-center w-8 h-8 text-xs font-bold rounded-full bg-gradient-to-br from-primary/50 to-accent/50">
                      {player.name.charAt(0)}
                    </div>
                    <span className="text-sm">{player.name}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
          
          {/* Status messages */}
          <div className="mb-8">
            <div className="p-4 rounded-lg bg-gray-800/30">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="w-4 h-4 border-2 rounded-full border-primary border-t-transparent"
                />
                {isGameStarting ? (
                  'Initializing game environment...'
                ) : currentParticipants < game.maxParticipants * 0.5 ? (
                  'Looking for more players...'
                ) : currentParticipants < game.maxParticipants * 0.8 ? (
                  'Almost ready to start!'
                ) : (
                  'Final players joining...'
                )}
              </div>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex gap-4">
            <Button
              text="Leave Lobby"
              variant="secondary"
              fullWidth
              onClick={onCancel}
              disabled={isGameStarting}
            />
            <Button
              text={isGameStarting ? 'Starting...' : 'Ready'}
              variant="primary"
              fullWidth
              disabled={true}
              icon={isGameStarting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-4 h-4 border-2 border-white rounded-full border-t-transparent"
                />
              ) : undefined}
            />
          </div>
          
          {/* Tips */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              💡 Tip: Your agent will start trading automatically once the game begins
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default GameWaitingLobby;
