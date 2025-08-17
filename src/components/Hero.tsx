'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ParallaxSection from './ParallaxSection';

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();
  
  // Effets de parallaxe pour différents éléments
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const subtitleY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const buttonsY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const statsY = useTransform(scrollYProgress, [0, 1], [0, -20]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const logoY = useTransform(scrollYProgress, [0, 1], [0, -10]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const stats = [
    { value: '50+', label: 'Serveurs Discord créés' },
    { value: '100+', label: 'Sites web développés' },
    { value: '24/7', label: 'Support disponible' }
  ];

  return (
    <section 
      ref={heroRef}
      id="home"
      className="relative min-h-[calc(100vh+60px)] flex items-center justify-center overflow-hidden bg-[hsl(var(--brand-bg))] pt-32 pb-20 transition-colors duration-500"
      style={{
        background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, hsl(var(--brand-violet-light),0.15), transparent 40%)`
      }}
    >
      {/* Animated background elements with parallaxe */}
      <motion.div 
        className="absolute inset-0 overflow-hidden"
        initial={{ y: 0 }}
        animate={{ y: 0 }}
      >
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[hsl(var(--brand-violet))] via-[hsl(var(--brand-pink))] to-[hsl(var(--brand-blue))] rounded-full mix-blend-lighten filter blur-2xl opacity-40 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-[hsl(var(--brand-blue))] via-[hsl(var(--brand-violet))] to-[hsl(var(--brand-pink))] rounded-full mix-blend-lighten filter blur-2xl opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-gradient-to-br from-[hsl(var(--brand-pink))] via-[hsl(var(--brand-blue))] to-[hsl(var(--brand-violet))] rounded-full mix-blend-lighten filter blur-2xl opacity-40 animate-blob animation-delay-4000"></div>
      </motion.div>

      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        {/* Title with parallaxe */}
        <motion.div
          style={{ y: titleY }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 leading-tight flex flex-col items-center md:flex-row md:justify-center md:items-end gap-2">
            <span className="relative">
              <span className="bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent font-bold drop-shadow-[0_0_16px_rgba(139,92,246,0.7)]">Je suis</span>
            </span>
            <span className="text-white font-extrabold ml-3">EvanDev</span>
          </h1>
          <span className="block text-2xl md:text-4xl font-semibold text-violet-300 mt-2 mb-4 md:ml-2">
            Développeur Discord & Web freelance
          </span>
        </motion.div>

        {/* Subtitle with parallaxe */}
        <motion.p
          style={{ y: subtitleY }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-xl md:text-2xl text-violet-300 mb-12 max-w-4xl mx-auto leading-relaxed"
        >
          Spécialiste en développement de serveurs Discord et sites web, je crée des solutions personnalisées, modernes et performantes. Je vous accompagne de la conception à la mise en ligne avec un suivi réactif et professionnel pour tous vos projets digitaux.
        </motion.p>

        {/* Buttons with parallaxe */}
        <motion.div
          style={{ y: buttonsY }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <Button 
            size="lg"
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative px-8 py-6 bg-gradient-to-r from-[hsl(var(--brand-violet))] to-[hsl(var(--brand-blue))] text-white font-semibold rounded-full text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[hsl(var(--brand-violet-light))/25] shimmer"
          >
            <span className="relative z-10">Discutons de votre projet</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--brand-violet-light))] to-[hsl(var(--brand-blue-light))] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Button>
          
          <Button 
            variant="outline"
            size="lg"
            onClick={() => document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' })}
            className="group px-8 py-6 border-2 border-[hsl(var(--brand-violet))] text-[hsl(var(--brand-violet))] font-semibold rounded-full text-lg transition-all duration-300 hover:bg-[hsl(var(--brand-violet-light))] hover:text-white hover:scale-105"
          >
            Voir mes réalisations
          </Button>
        </motion.div>

        {/* Stats with parallaxe */}
        <motion.div
          style={{ y: statsY }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-20 flex flex-col items-center relative"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <Card className="bg-[hsl(var(--brand-card))] border-[hsl(var(--brand-border))] backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-600 to-blue-500 mb-2">
                      {stat.value}
                    </div>
                    <div className="text-purple-400">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          {/* Scroll indicator positionné en absolu */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-[-70px]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2 }}
            >
              <div className="w-6 h-10 border-2 border-purple-600 rounded-full flex justify-center bg-[hsl(var(--brand-card))] backdrop-blur-sm">
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-1 h-3 bg-purple-600 rounded-full mt-2"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Floating elements with parallaxe */}
      <ParallaxSection speed={0.1} direction="up" className="absolute top-20 left-10 opacity-20">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-20 h-20 border border-[hsl(var(--brand-violet))] rounded-full"
        />
      </ParallaxSection>

      <ParallaxSection speed={0.15} direction="down" className="absolute top-40 right-20 opacity-20">
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border border-[hsl(var(--brand-blue))] rounded-full"
        />
      </ParallaxSection>

      <ParallaxSection speed={0.08} direction="left" className="absolute bottom-40 left-20 opacity-20">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border border-[hsl(var(--brand-pink))] rounded-full"
        />
      </ParallaxSection>
    </section>
  );
}