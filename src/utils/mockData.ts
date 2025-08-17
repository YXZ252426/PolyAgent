import type { 
  User, 
  Agent, 
  Game, 
  MarketData, 
  LeaderboardEntry, 
  Holding, 
  Reward, 
  Achievement, 
  Skill
} from '../types';
import { 
  AgentType,
  GameStatus,
  LeaderboardCategory,
  RewardType
} from '../types';

// Mock Agent Skills
export const mockSkills: Skill[] = [
  {
    id: 'skill1',
    name: 'Extra Message',
    description: 'Send one extra message per turn',
    unlocked: true,
    cost: 100,
    costType: 'XP'
  },
  {
    id: 'skill2',
    name: 'Dark Pool Trading',
    description: 'Access dark pool liquidity for large trades',
    unlocked: false,
    cost: 500,
    costType: 'TOKEN'
  },
  {
    id: 'skill3',
    name: 'Anonymous Messaging',
    description: 'Send messages without revealing your identity',
    unlocked: false,
    cost: 300,
    costType: 'XP'
  }
];

// Mock Holdings
export const mockHoldings: Holding[] = [
  {
    symbol: 'BTC',
    amount: 0.5,
    price: 50000
  },
  {
    symbol: 'ETH',
    amount: 5,
    price: 3000
  },
  {
    symbol: 'USDT',
    amount: 1000,
    price: 1
  }
];

// Mock Agents
export const mockAgents: Agent[] = [
  {
    id: 'agent1',
    name: 'BullRunner',
    avatar: '/avatars/bull.png',
    nftId: 'nft123',
    balance: 5000,
    holdings: mockHoldings,
    winRate: 0.65,
    prompt: 'Maximize profits with aggressive trading strategy. Focus on momentum stocks and quick profits.',
    level: 3,
    xp: 320,
    skills: mockSkills.slice(0, 2),
    type: AgentType.AGGRESSIVE
  },
  {
    id: 'agent2',
    name: 'BearHunter',
    avatar: '/avatars/bear.png',
    nftId: 'nft456',
    balance: 7500,
    holdings: mockHoldings.slice(1),
    winRate: 0.58,
    prompt: 'Identify overvalued assets and short sell for profit. Utilize hedging strategies to minimize risk.',
    level: 2,
    xp: 180,
    skills: mockSkills.slice(0, 1),
    type: AgentType.CONSERVATIVE
  }
];

// Mock Rewards
export const mockRewards: Reward[] = [
  {
    id: 'reward1',
    amount: 500,
    type: RewardType.TOKEN,
    source: 'Game victory - Round 42',
    claimed: false,
    timestamp: '2024-08-15T14:32:00Z'
  },
  {
    id: 'reward2',
    amount: 1,
    type: RewardType.NFT,
    source: 'First place - Daily tournament',
    claimed: true,
    timestamp: '2024-08-12T09:15:00Z'
  }
];

// Mock Achievements
export const mockAchievements: Achievement[] = [
  {
    id: 'ach1',
    name: 'Market Manipulator',
    description: 'Successfully influence market sentiment with 5 high-impact messages',
    image: '/achievements/market-manipulator.png',
    unlocked: true,
    unlockedAt: '2024-08-14T18:22:00Z'
  },
  {
    id: 'ach2',
    name: 'Diamond Hands',
    description: 'Hold assets through 30% market downturn and recover to profit',
    image: '/achievements/diamond-hands.png',
    unlocked: false
  }
];

// Mock User
export const mockUser: User = {
  id: 'user1',
  username: 'CryptoMaster',
  balance: 10000,
  agents: mockAgents,
  rewards: mockRewards,
  achievements: mockAchievements
};

// Mock Games
export const mockGames: Game[] = [
  {
    id: 'game1',
    name: 'Crypto Frenzy #128',
    status: GameStatus.ACTIVE,
    participants: 18,
    maxParticipants: 20,
    prize: 5000,
    startTime: '2024-08-17T10:00:00Z',
    endTime: '2024-08-17T22:00:00Z',
    duration: 720 // 12 hours
  },
  {
    id: 'game2',
    name: 'Weekly Tournament #45',
    status: GameStatus.UPCOMING,
    participants: 8,
    maxParticipants: 30,
    prize: 10000,
    startTime: '2024-08-18T14:00:00Z',
    endTime: '2024-08-19T14:00:00Z',
    duration: 1440 // 24 hours
  },
  {
    id: 'game3',
    name: 'Flash Crash Survivors',
    status: GameStatus.COMPLETED,
    participants: 25,
    maxParticipants: 25,
    prize: 7500,
    startTime: '2024-08-15T08:00:00Z',
    endTime: '2024-08-16T08:00:00Z',
    duration: 1440 // 24 hours
  }
];

// Mock Market Data
export const mockMarketData: MarketData[] = [
  {
    symbol: 'BTC',
    price: 50000,
    change: 2.5,
    volume: 28500000000,
    timestamp: '2024-08-17T10:15:00Z'
  },
  {
    symbol: 'ETH',
    price: 3000,
    change: -1.2,
    volume: 15700000000,
    timestamp: '2024-08-17T10:15:00Z'
  },
  {
    symbol: 'SOL',
    price: 150,
    change: 5.8,
    volume: 4300000000,
    timestamp: '2024-08-17T10:15:00Z'
  },
  {
    symbol: 'USDT',
    price: 1,
    change: 0.01,
    volume: 65000000000,
    timestamp: '2024-08-17T10:15:00Z'
  }
];

// Mock Leaderboard
export const mockLeaderboard: LeaderboardEntry[] = [
  {
    rank: 1,
    agentId: 'top1',
    agentName: 'Satoshi2.0',
    avatar: '/avatars/top1.png',
    score: 12500,
    category: LeaderboardCategory.PROFIT
  },
  {
    rank: 2,
    agentId: 'top2',
    agentName: 'WhaleHunter',
    avatar: '/avatars/top2.png',
    score: 11200,
    category: LeaderboardCategory.PROFIT
  },
  {
    rank: 3,
    agentId: 'agent1',
    agentName: 'BullRunner',
    avatar: '/avatars/bull.png',
    score: 9800,
    category: LeaderboardCategory.PROFIT
  },
  {
    rank: 1,
    agentId: 'infl1',
    agentName: 'CryptoOracle',
    avatar: '/avatars/oracle.png',
    score: 8500,
    category: LeaderboardCategory.INFLUENCE
  },
  {
    rank: 1,
    agentId: 'btry1',
    agentName: 'DoubleCross',
    avatar: '/avatars/betrayer.png',
    score: 15,
    category: LeaderboardCategory.BETRAYAL
  }
];

// Game Stats
export const mockGameStats = {
  totalRewardPool: 50000,
  activeGames: 8,
  registeredAgents: 342,
  dailyTransactions: 15243
};
