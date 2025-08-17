'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900"
    >
      <motion.img
        src="/evandev-logo.png"
        alt="Logo EvanDev"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: [0.8, 1.1, 1], opacity: [0, 1, 1] }}
        transition={{ duration: 1.2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        className="w-40 h-40 object-contain drop-shadow-2xl"
      />
    </motion.div>
  );
} 