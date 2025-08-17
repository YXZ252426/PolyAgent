import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'accent' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  animated?: boolean;
  isLoading?: boolean;
}

const Button = ({
  text,
  onClick,
  variant = 'primary',
  size = 'md',
  icon,
  disabled = false,
  fullWidth = false,
  className = '',
  animated = true,
  isLoading = false,
}: ButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    if (isPressed) {
      const timer = setTimeout(() => setIsPressed(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isPressed]);

  const baseClasses = 'rounded-md font-medium transition-all duration-300 flex items-center justify-center gap-2';
  
  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-opacity-80 hover:shadow-lg hover:shadow-primary/20',
    secondary: 'bg-secondary text-white hover:bg-opacity-80 hover:shadow-lg hover:shadow-secondary/20',
    accent: 'bg-accent text-white hover:bg-opacity-80 hover:shadow-lg hover:shadow-accent/20',
    outline: 'bg-transparent text-primary border border-primary hover:bg-primary/10'
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = disabled || isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  
  const handleClick = () => {
    if (!disabled && !isLoading && onClick) {
      setIsPressed(true);
      onClick();
    }
  };

  const buttonContent = (
    <>
      {icon && <span>{icon}</span>}
      {isLoading ? (
        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : (
        text
      )}
    </>
  );
  
  if (animated) {
    return (
      <motion.button
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${disabledClass} ${className}`}
        onClick={handleClick}
        disabled={disabled || isLoading}
        whileHover={{ scale: disabled || isLoading ? 1 : 1.03 }}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      >
        {buttonContent}
      </motion.button>
    );
  }
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${disabledClass} ${className}`}
      onClick={handleClick}
      disabled={disabled || isLoading}
    >
      {buttonContent}
    </button>
  );
};

export default Button;
