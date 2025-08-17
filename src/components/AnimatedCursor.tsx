'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
// Supprimer l'import de useTheme

export default function AnimatedCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  // SUPPRIMER : const { theme } = useTheme();

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Ajouter les événements pour les éléments interactifs
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea, select');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Curseur principal */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[9999] mix-blend-difference bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          scale: isHovering ? 2 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      />
      
      {/* Anneau externe */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border-2 border-purple-600/30 rounded-full pointer-events-none z-[9998]"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.8 : 0.3,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          mass: 0.8,
        }}
      />
      
      {/* Particules flottantes */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9997] bg-blue-500"
        animate={{
          x: mousePosition.x - 4 + Math.sin(Date.now() * 0.001) * 20,
          y: mousePosition.y - 4 + Math.cos(Date.now() * 0.001) * 20,
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 rounded-full pointer-events-none z-[9997] bg-purple-500"
        animate={{
          x: mousePosition.x - 2 + Math.cos(Date.now() * 0.002) * 15,
          y: mousePosition.y - 2 + Math.sin(Date.now() * 0.002) * 15,
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
    </>
  );
} 