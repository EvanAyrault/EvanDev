"use client";

import { useEffect, useRef } from 'react';
// Supprimer l'import de useTheme

export default function AnimatedBackground() {
  const gradientRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLCanvasElement>(null);
  // SUPPRIMER : const { theme } = useTheme();

  // Animation du gradient
  useEffect(() => {
    let frame = 0;
    let raf: number;
    const animate = () => {
      if (gradientRef.current) {
        gradientRef.current.style.background = `linear-gradient(120deg, rgba(60,0,120,0.95) ${(50 + 20 * Math.sin(frame/100))}%, rgba(30,0,60,0.95) 100%)`;
      }
      frame++;
      raf = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(raf);
  }, []);

  // Effet stars
  useEffect(() => {
    const canvas = starsRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.2 + 0.2,
      o: Math.random() * 0.5 + 0.5,
    }));
    ctx.clearRect(0, 0, w, h);
    stars.forEach(star => {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI);
      ctx.fillStyle = `rgba(255,255,255,${star.o})`;
      ctx.shadowColor = '#fff';
      ctx.shadowBlur = 8;
      ctx.fill();
    });
  }, []);

  return (
    <div
      ref={gradientRef}
      className="fixed inset-0 -z-10 animate-gradient-move"
      style={{
        background: 'linear-gradient(120deg, rgba(60,0,120,0.95) 60%, rgba(30,0,60,0.95) 100%)',
        transition: 'background 1s',
      }}
    >
      <canvas
        ref={starsRef}
        className="fixed inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: -1 }}
      />
    </div>
  );
} 