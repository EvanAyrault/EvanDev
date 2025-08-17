'use client';

import { ReactNode } from 'react';

interface SmoothScrollProps {
  children: ReactNode;
  targetId: string;
  className?: string;
  onClick?: () => void;
}

export default function SmoothScroll({ children, targetId, className = '', onClick }: SmoothScrollProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const headerOffset = 80; // Hauteur de la navbar
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
    onClick?.();
  };

  return (
    <a href={`#${targetId}`} onClick={handleClick} className={className}>
      {children}
    </a>
  );
} 