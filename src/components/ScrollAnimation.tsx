'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollAnimationProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'left' | 'right' | 'up' | 'down';
  delay?: number;
}

export default function ScrollAnimation({
  children,
  className = '',
  direction = 'up',
  delay = 0,
}: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const getTransform = () => {
    switch (direction) {
      case 'left':
        return useTransform(scrollYProgress, [0, 1], [100, 0]);
      case 'right':
        return useTransform(scrollYProgress, [0, 1], [-100, 0]);
      case 'up':
        return useTransform(scrollYProgress, [0, 1], [100, 0]);
      case 'down':
        return useTransform(scrollYProgress, [0, 1], [-100, 0]);
      default:
        return useTransform(scrollYProgress, [0, 1], [100, 0]);
    }
  };

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.8]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.9]);
  const y = getTransform();

  return (
    <motion.div
      ref={ref}
      style={{
        opacity,
        scale,
        y: direction === 'up' || direction === 'down' ? y : 0,
        x: direction === 'left' || direction === 'right' ? y : 0,
      }}
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ 
        delay,
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1] // ease-out-cubic
      }}
    >
      {children}
    </motion.div>
  );
} 