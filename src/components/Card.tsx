import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  onClick?: () => void;
  animated?: boolean;
}

const Card = ({ children, className = '', glow = false, onClick, animated = true }: CardProps) => {
  const baseClasses = 'bg-surface rounded-xl p-6 shadow-lg border border-gray-700/30 backdrop-blur-sm';
  const hoverClasses = onClick ? 'cursor-pointer hover:shadow-xl transition-all duration-300' : '';
  const glowClass = glow ? 'glow' : '';
  
  if (animated) {
    return (
      <motion.div
        className={`${baseClasses} ${hoverClasses} ${glowClass} ${className}`}
        onClick={onClick}
        whileHover={onClick ? { scale: 1.02, y: -5 } : {}}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {children}
      </motion.div>
    );
  }
  
  return (
    <div className={`${baseClasses} ${hoverClasses} ${glowClass} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};

export default Card;
