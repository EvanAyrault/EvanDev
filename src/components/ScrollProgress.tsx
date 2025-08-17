'use client';

import { useState, useEffect } from 'react';

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[100]">
      <div
        className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 transition-all duration-300 shadow-lg"
        style={{ 
          width: `${scrollProgress * 100}%`,
          backgroundSize: '200% 100%',
          animation: 'gradient-shift 5s ease infinite'
        }}
      />
    </div>
  );
} 