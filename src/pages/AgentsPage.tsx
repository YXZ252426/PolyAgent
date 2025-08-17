import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import Card from '../components/Card';
import AgentCard from '../components/AgentCard';
import { useAppContext } from '../contexts/AppContext';

const AgentsPage = () => {
  const { user, createAgent, updateAgentPrompt } = useAppContext();
  const [selectedAgent, setSelectedAgent] = useState(user?.agents?.[0]?.id || '');
  const [isEditingPrompt, setIsEditingPrompt] = useState(false);
  const [prompt, setPrompt] = useState('');
  
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
  
  const handleEditPrompt = (agentPrompt: string) => {
    setPrompt(agentPrompt);
    setIsEditingPrompt(true);
  };
  
  const handleSavePrompt = () => {
    if (selectedAgent && prompt.trim()) {
      updateAgentPrompt(selectedAgent, prompt);
      setIsEditingPrompt(false);
    }
  };
  
  const selectedAgentData = user?.agents.find(agent => agent.id === selectedAgent);
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Agents</h1>
        <Button
          text="Create New Agent"
          variant="primary"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          }
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card className="p-4">
            <h2 className="text-xl font-bold mb-4">My Agent Collection</h2>
            
            <motion.div 
              className="space-y-3"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {user?.agents.map(agent => (
                <motion.div key={agent.id} variants={itemVariants}>
                  <AgentCard 
                    agent={agent} 
                    selected={agent.id === selectedAgent}
                    onClick={() => setSelectedAgent(agent.id)}
                  />
                </motion.div>
              ))}
            </motion.div>
            
            {user?.agents.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400 mb-4">You don't have any agents yet</p>
                <Button text="Create Your First Agent" variant="primary" />
              </div>
            )}
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          {selectedAgentData ? (
            <div className="space-y-6">
              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">{selectedAgentData.name}</h2>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <span>Level {selectedAgentData.level}</span>
                      <span>•</span>
                      <span>XP: {selectedAgentData.xp}/1000</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      text="Edit" 
                      variant="outline" 
                      size="sm"
                      icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      }
                    />
                    <Button 
                      text="Deploy" 
                      variant="accent" 
                      size="sm"
                      icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      }
                    />
                  </div>
                </div>
                
                {/* Progress bar */}
                <div className="mt-4">
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div 
                      className="bg-gradient-to-r from-primary to-accent h-2.5 rounded-full" 
                      style={{ width: `${(selectedAgentData.xp / 1000) * 100}%` }} 
                    />
                  </div>
                </div>
              </Card>
              
              {/* Agent prompt card */}
              <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Agent Prompt</h3>
                  
                  {!isEditingPrompt ? (
                    <Button 
                      text="Edit Prompt" 
                      variant="secondary" 
                      size="sm"
                      onClick={() => handleEditPrompt(selectedAgentData.prompt)}
                    />
                  ) : (
                    <div className="flex gap-2">
                      <Button 
                        text="Cancel" 
                        variant="outline" 
                        size="sm"
                        onClick={() => setIsEditingPrompt(false)}
                      />
                      <Button 
                        text="Save" 
                        variant="primary" 
                        size="sm"
                        onClick={handleSavePrompt}
                      />
                    </div>
                  )}
                </div>
                
                {!isEditingPrompt ? (
                  <p className="text-gray-300 whitespace-pre-line">{selectedAgentData.prompt}</p>
                ) : (
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="w-full h-40 p-3 rounded-md bg-gray-800 border border-gray-700 text-white focus:border-primary focus:outline-none"
                    placeholder="Enter instructions for your agent..."
                  />
                )}
              </Card>
              
              {/* Skills and Abilities */}
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Skills & Abilities</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedAgentData.skills.map(skill => (
                    <div 
                      key={skill.id} 
                      className={`p-4 rounded-lg border ${
                        skill.unlocked 
                          ? 'border-primary/40 bg-primary/10' 
                          : 'border-gray-700 bg-gray-800/50'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold">{skill.name}</h4>
                        <div 
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            skill.unlocked 
                              ? 'bg-primary/20 text-primary' 
                              : 'bg-gray-700 text-gray-400'
                          }`}
                        >
                          {skill.unlocked ? 'Unlocked' : 'Locked'}
                        </div>
                      </div>
                      <p className="text-sm text-gray-400 mt-1">{skill.description}</p>
                      
                      {!skill.unlocked && (
                        <div className="mt-3 flex justify-between items-center">
                          <span className="text-xs text-gray-400">
                            Cost: {skill.cost} {skill.costType}
                          </span>
                          <Button text="Unlock" size="sm" variant="outline" />
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {/* Locked skill example */}
                  <div className="p-4 rounded-lg border border-gray-700 bg-gray-800/50">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold">Market Manipulation</h4>
                      <div className="text-xs px-2 py-0.5 rounded-full bg-gray-700 text-gray-400">
                        Locked
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">
                      Increase the impact of your public messages on market prices
                    </p>
                    
                    <div className="mt-3 flex justify-between items-center">
                      <span className="text-xs text-gray-400">
                        Cost: 750 XP
                      </span>
                      <Button text="Unlock" size="sm" variant="outline" />
                    </div>
                  </div>
                </div>
              </Card>
              
              {/* Performance Stats */}
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Performance</h3>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                  <div className="bg-surface rounded-lg p-4 border border-gray-700/50">
                    <p className="text-sm text-gray-400">Win Rate</p>
                    <p className="text-xl font-bold">
                      {(selectedAgentData.winRate * 100).toFixed(1)}%
                    </p>
                  </div>
                  
                  <div className="bg-surface rounded-lg p-4 border border-gray-700/50">
                    <p className="text-sm text-gray-400">Balance</p>
                    <p className="text-xl font-bold">${selectedAgentData.balance.toLocaleString()}</p>
                  </div>
                  
                  <div className="bg-surface rounded-lg p-4 border border-gray-700/50">
                    <p className="text-sm text-gray-400">Games Played</p>
                    <p className="text-xl font-bold">32</p>
                  </div>
                </div>
                
                <div className="h-40 w-full bg-gray-800/50 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Performance chart will appear here</p>
                </div>
              </Card>
            </div>
          ) : (
            <Card className="flex flex-col items-center justify-center p-12">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <h3 className="text-xl font-medium mb-2">No Agent Selected</h3>
              <p className="text-gray-400 text-center mb-6">
                Select an agent from the list or create a new one to get started.
              </p>
              <Button text="Create New Agent" variant="primary" />
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgentsPage;
