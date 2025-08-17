'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  offset?: number;
}

export default function ParallaxSection({
  children,
  className = '',
  speed = 0.7, // accentuer le parallax
  direction = 'up',
  offset = 40, // augmenter la distance
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const getTransform = () => {
    switch (direction) {
      case 'up':
        return useTransform(scrollYProgress, [0, 1], [offset, -offset * speed]);
      case 'down':
        return useTransform(scrollYProgress, [0, 1], [offset, offset * speed]);
      case 'left':
        return useTransform(scrollYProgress, [0, 1], [offset, -offset * speed]);
      case 'right':
        return useTransform(scrollYProgress, [0, 1], [offset, offset * speed]);
      default:
        return useTransform(scrollYProgress, [0, 1], [offset, -offset * speed]);
    }
  };

  const y = direction === 'up' || direction === 'down' ? getTransform() : 0;
  const x = direction === 'left' || direction === 'right' ? getTransform() : 0;

  return (
    <motion.div
      ref={ref}
      style={{ y, x }}
      className={className}
      transition={{
        type: 'tween',
        ease: [0.22, 1, 0.36, 1], // ease-out-cubic
        duration: 1.2 // plus lent
      }}
    >
      {children}
    </motion.div>
  );
}

export function ParallaxBackground({
  children,
  className = '',
  speed = 0.3
}: {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100 * speed]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={`absolute inset-0 ${className}`}
    >
      {children}
    </motion.div>
  );
} 