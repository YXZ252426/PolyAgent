import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User, Agent, Game, MarketData, LeaderboardEntry } from '../types';

// Mock data for demo purposes
import { mockUser, mockGames, mockMarketData, mockLeaderboard } from '../utils/mockData';

interface AppContextType {
  user: User | null;
  games: Game[];
  activeGame: Game | null;
  marketData: MarketData[];
  leaderboard: LeaderboardEntry[];
  setActiveGame: (game: Game | null) => void;
  createAgent: (agent: Omit<Agent, 'id'>) => void;
  updateAgentPrompt: (agentId: string, prompt: string) => void;
  joinGame: (gameId: string, agentId: string) => void;
  claimReward: (rewardId: string) => void;
  isLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(mockUser);
  const [games, setGames] = useState<Game[]>(mockGames);
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const [marketData, setMarketData] = useState<MarketData[]>(mockMarketData);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(mockLeaderboard);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Create a new agent
  const createAgent = (agent: Omit<Agent, 'id'>) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (user) {
        const newAgent: Agent = {
          ...agent,
          id: `agent-${Date.now()}`
        };
        
        setUser({
          ...user,
          agents: [...user.agents, newAgent]
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  // Update agent prompt
  const updateAgentPrompt = (agentId: string, prompt: string) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (user) {
        const updatedAgents = user.agents.map(agent => 
          agent.id === agentId ? { ...agent, prompt } : agent
        );
        
        setUser({
          ...user,
          agents: updatedAgents
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  // Join a game
  const joinGame = (gameId: string, agentId: string) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const game = games.find(g => g.id === gameId);
      if (game) {
        setActiveGame(game);
      }
      setIsLoading(false);
    }, 1500);
  };

  // Claim a reward
  const claimReward = (rewardId: string) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (user) {
        const updatedRewards = user.rewards.map(reward => 
          reward.id === rewardId ? { ...reward, claimed: true } : reward
        );
        
        setUser({
          ...user,
          rewards: updatedRewards
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  // Mock market data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData(prevData => 
        prevData.map(data => ({
          ...data,
          price: data.price * (1 + (Math.random() * 0.02 - 0.01)),
          change: (Math.random() * 4 - 2),
          timestamp: new Date().toISOString()
        }))
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        games,
        activeGame,
        marketData,
        leaderboard,
        setActiveGame,
        createAgent,
        updateAgentPrompt,
        joinGame,
        claimReward,
        isLoading
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  
  return context;
};
