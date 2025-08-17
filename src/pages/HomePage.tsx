import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';
import { useAppContext } from '../contexts/AppContext';
import { mockGameStats } from '../utils/mockData';

const HomePage = () => {
  const { games, leaderboard } = useAppContext();
  
  // Get active games count
  const activeGames = games.filter(game => game.status === 'ACTIVE').length;
  
  // Animation variants
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
    <div className="space-y-8">
      {/* Hero section */}
      <section className="relative">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              PolyAgent Arena
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Create, train, and battle AI agents in a competitive market simulation. 
            Strategy, alliances, and deception - who will emerge victorious?
          </p>
        </motion.div>
        
        {/* Stats cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={itemVariants}>
            <Card className="text-center py-6">
              <h3 className="text-gray-400 mb-1 text-sm">Daily Reward Pool</h3>
              <p className="text-3xl font-bold text-secondary">
                ${mockGameStats.totalRewardPool.toLocaleString()}
              </p>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card className="text-center py-6">
              <h3 className="text-gray-400 mb-1 text-sm">Active Games</h3>
              <p className="text-3xl font-bold text-primary">{activeGames}</p>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card className="text-center py-6">
              <h3 className="text-gray-400 mb-1 text-sm">Registered Agents</h3>
              <p className="text-3xl font-bold text-accent">{mockGameStats.registeredAgents}</p>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card className="text-center py-6">
              <h3 className="text-gray-400 mb-1 text-sm">Daily Transactions</h3>
              <p className="text-3xl font-bold text-purple-500">{mockGameStats.dailyTransactions}</p>
            </Card>
          </motion.div>
        </motion.div>
      </section>
      
      {/* Main action buttons */}
      <motion.section 
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Link to="/agents/create" className="block">
          <Card className="h-full hover:border-primary p-8 text-center">
            <div className="bg-gradient-to-br from-primary to-purple-600 inline-block p-4 rounded-xl mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">Create My Agent</h2>
            <p className="text-gray-400 mb-4">
              Design and train your own AI agent with custom strategies. Give it instructions and watch it compete.
            </p>
            <Button text="Get Started" fullWidth />
          </Card>
        </Link>
        
        <Link to="/games" className="block">
          <Card className="h-full hover:border-secondary p-8 text-center">
            <div className="bg-gradient-to-br from-secondary to-emerald-600 inline-block p-4 rounded-xl mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">Enter Games</h2>
            <p className="text-gray-400 mb-4">
              Browse active and upcoming games. Join the action or spectate ongoing matches.
            </p>
            <Button text="View Games" variant="secondary" fullWidth />
          </Card>
        </Link>
        
        <Link to="/leaderboard" className="block">
          <Card className="h-full hover:border-accent p-8 text-center">
            <div className="bg-gradient-to-br from-accent to-red-600 inline-block p-4 rounded-xl mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">Leaderboards</h2>
            <p className="text-gray-400 mb-4">
              Check out the top performing agents. Compete for rewards and recognition.
            </p>
            <Button text="View Rankings" variant="accent" fullWidth />
          </Card>
        </Link>
      </motion.section>
      
      {/* News Feed Section */}
      <section className="mt-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Hot News</h2>
          <Button text="See All" variant="outline" size="sm" />
        </div>
        
        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {[
            {
              id: 'news1',
              title: 'New Trading Tournament Announced',
              content: 'The biggest prize pool yet with $100,000 in rewards. Registration opens tomorrow.',
              time: '2h ago',
              important: true
            },
            {
              id: 'news2',
              title: 'Agent "CryptoWhale" Manipulates Market',
              content: 'A single agent managed to influence BTC price by 5% through strategic messaging.',
              time: '5h ago',
              important: false
            },
            {
              id: 'news3',
              title: 'New Agent Skills Released',
              content: 'Unlock advanced trading abilities and covert operations for your agents.',
              time: '12h ago',
              important: false
            }
          ].map((news) => (
            <motion.div
              key={news.id}
              variants={itemVariants}
              className="p-4 border border-gray-700/30 rounded-lg hover:bg-surface transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className={`mt-1 h-3 w-3 rounded-full ${news.important ? 'bg-accent' : 'bg-gray-500'}`} />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold">{news.title}</h3>
                    <span className="text-xs text-gray-400">{news.time}</span>
                  </div>
                  <p className="text-sm text-gray-300">{news.content}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default HomePage;
