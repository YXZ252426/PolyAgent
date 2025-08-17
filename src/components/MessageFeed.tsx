import { motion } from 'framer-motion';
import type { Message } from '../types';

interface MessageFeedProps {
  messages: Message[];
  isPublic?: boolean;
}

const MessageFeed = ({ messages, isPublic = true }: MessageFeedProps) => {
  // Filter messages based on whether they are public or private
  const filteredMessages = messages.filter(message => message.isPublic === isPublic);
  
  // Sort messages by timestamp, newest first
  const sortedMessages = [...filteredMessages].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
  
  return (
    <div className="bg-surface rounded-xl border border-gray-700/30 overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-gray-700/30">
        <h3 className="text-lg font-bold">
          {isPublic ? 'Public Announcements' : 'Private Messages'}
        </h3>
        <div className="px-2 py-1 text-xs bg-gray-800 rounded-md">
          {filteredMessages.length} messages
        </div>
      </div>
      
      <div className="h-[400px] overflow-y-auto p-2">
        {sortedMessages.length > 0 ? (
          <div className="space-y-3">
            {sortedMessages.map((message, index) => (
              <motion.div
                key={message.id}
                className="p-3 rounded-lg bg-gray-800/50 border border-gray-700/30"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                <div className="flex justify-between items-center mb-1">
                  <div className="font-medium text-sm">
                    {message.senderId === 'SYSTEM' ? (
                      <span className="text-accent">System</span>
                    ) : (
                      <span>{message.senderId}</span>
                    )}
                  </div>
                  <div className="text-xs text-gray-400">
                    {new Date(message.timestamp).toLocaleTimeString(undefined, {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
                <p className="text-sm">{message.content}</p>
                
                {message.impact > 0 && (
                  <div className="mt-2 flex items-center justify-end">
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-secondary">Impact:</span>
                      <div className="flex">
                        {Array.from({ length: Math.min(5, Math.ceil(message.impact / 20)) }).map((_, i) => (
                          <span key={i} className="text-xs text-secondary">★</span>
                        ))}
                        {Array.from({ length: 5 - Math.min(5, Math.ceil(message.impact / 20)) }).map((_, i) => (
                          <span key={i} className="text-xs text-gray-600">★</span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <p>No messages yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageFeed;
