import { useState } from 'react';
import { motion } from 'framer-motion';
import Card from './Card';
import Button from './Button';
import GameWaitingLobby from './GameWaitingLobby';
import type { Game } from '../types';
import { GameStatus } from '../types';

interface GameCardProps {
  game: Game;
  onJoin?: (gameId: string) => void;
  onWatch?: (gameId: string) => void;
}

const GameCard = ({ game, onJoin, onWatch }: GameCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showWaitingLobby, setShowWaitingLobby] = useState(false);
  
  // Format dates
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      day: 'numeric',
      month: 'short'
    });
  };
  
  // Calculate time remaining
  const getTimeRemaining = (endTime: string) => {
    const end = new Date(endTime).getTime();
    const now = new Date().getTime();
    const diff = end - now;
    
    if (diff <= 0) return 'Ended';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  };
  
  const handleEnterGame = () => {
    setShowWaitingLobby(true);
  };

  const handleGameStart = () => {
    setShowWaitingLobby(false);
    if (onWatch) {
      onWatch(game.id);
    }
  };

  const handleCancelWaiting = () => {
    setShowWaitingLobby(false);
  };

  const statusColors = {
    [GameStatus.UPCOMING]: 'bg-secondary',
    [GameStatus.ACTIVE]: 'bg-accent',
    [GameStatus.COMPLETED]: 'bg-gray-500'
  };
  
  return (
    <>
      <Card className="overflow-hidden">
        <div 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className={`${statusColors[game.status]} h-2 w-2 rounded-full`}></span>
                <span className="text-xs tracking-wide text-gray-300 uppercase">{game.status}</span>
              </div>
              <h3 className="text-lg font-bold">{game.name}</h3>
            </div>
            
            <div className="text-right">
              <p className="text-xs text-gray-400">Prize Pool</p>
              <p className="text-lg font-bold text-secondary">${game.prize.toLocaleString()}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
            <div>
              <p className="text-gray-400">Participants</p>
              <p className="font-medium">{game.participants}/{game.maxParticipants}</p>
            </div>
            <div>
              <p className="text-gray-400">
                {game.status === GameStatus.ACTIVE ? 'Ends In' : 
                 game.status === GameStatus.UPCOMING ? 'Starts In' : 'Duration'}
              </p>
              <p className="font-medium">
                {game.status === GameStatus.COMPLETED ? 
                  `${game.duration / 60}h` : 
                  getTimeRemaining(game.status === GameStatus.ACTIVE ? game.endTime : game.startTime)
                }
              </p>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>Start: {formatDate(game.startTime)}</span>
              <span>End: {formatDate(game.endTime)}</span>
            </div>
          </div>
          
          <motion.div 
            className="flex gap-2 mt-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.2 }}
          >
            {game.status === GameStatus.UPCOMING && onJoin && (
              <Button 
                text="Join Game" 
                variant="primary" 
                fullWidth
                onClick={() => onJoin(game.id)}
              />
            )}
            
            {game.status === GameStatus.ACTIVE && (
              <Button 
                text="Enter Game" 
                variant="accent" 
                fullWidth
                onClick={handleEnterGame}
              />
            )}
            
            {game.status === GameStatus.COMPLETED && onWatch && (
              <Button 
                text="View Results" 
                variant="secondary" 
                fullWidth
                onClick={() => onWatch(game.id)}
              />
            )}
          </motion.div>
        </div>
      </Card>
      
      {/* Waiting Lobby Modal */}
      {showWaitingLobby && (
        <GameWaitingLobby
          game={game}
          onCancel={handleCancelWaiting}
          onGameStart={handleGameStart}
        />
      )}
    </>
  );
};

export default GameCard;
