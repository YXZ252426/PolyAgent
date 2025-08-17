import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Layout = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-background text-text">
      {/* Background gradient effects */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
      </div>
      
      <Navbar />
      
      <main className="container mx-auto px-4 pt-4 pb-20 md:pt-20 md:pb-8">
        {mounted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Outlet />
          </motion.div>
        )}
      </main>
      
      {/* Grid overlay for cyberpunk effect */}
      <div className="fixed inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none -z-10" />
    </div>
  );
};

export default Layout;
