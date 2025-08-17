'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

const navItems = [
  { name: 'Accueil', href: '#home' },
  { name: 'Services', href: '#services' },
  { name: 'Discord', href: '#features' },
  { name: 'Web', href: '#stack' },
  { name: 'Projets', href: '#projects' },
  { name: 'Contact', href: '#contact' }
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { scrollY } = useScroll();

  // Effet de parallaxe pour le background
  const backgroundY = useTransform(scrollY, [0, 100], [0, -50]);
  const logoY = useTransform(scrollY, [0, 100], [0, -10]);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (currentScrollY <= 0) {
            setIsVisible(true);
          } else if (currentScrollY > lastScrollY) {
            // Scroll vers le bas
            setIsVisible(false);
          } else if (currentScrollY < lastScrollY) {
            // Scroll vers le haut
            setIsVisible(true);
          }
          setLastScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[hsl(var(--brand-bg))]/95 shadow-lg"
      animate={{ 
        y: isVisible ? 0 : '-110%',
        opacity: isVisible ? 1 : 0
      }}
      transition={{ 
        duration: 0.3,
        ease: 'easeInOut'
      }}
    >
      {/* Overlay blur pur et semi-transparent */}
      <div className="absolute inset-0 w-full h-full pointer-events-none backdrop-blur-xl bg-[hsl(var(--brand-bg))]/90" />
      <div className="relative container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo personnalisé */}
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center overflow-hidden">
            <Image
              src="/evandev-logo.png"
              alt="Logo EvanDev"
              width={40}
              height={40}
              className="object-contain w-full h-full"
              priority
              onError={(e) => { e.currentTarget.src = '/vercel.svg'; }}
            />
          </div>
          <div className='mr-10'>
            <h1 className="text-xl font-bold text-white">EvanDev</h1>
            <Badge variant="outline" className="text-xs bg-violet-900/40 text-violet-300 border-violet-700/40">
              Discord & Web Developer
            </Badge>
          </div>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-white hover:text-purple-400 font-medium transition-colors duration-300 relative group cursor-pointer"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                {item.name}
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300 group-hover:w-full"></div>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="hidden md:flex items-center space-x-4"
          >
            <Button 
              onClick={() => scrollToSection('#contact')}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold px-6 py-2 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
            >
              Démarrer un projet
            </Button>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 bg-muted/50 backdrop-blur-sm rounded-xl flex items-center justify-center text-foreground hover:bg-muted transition-colors"
            whileTap={{ scale: 0.95 }}
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isMobileMenuOpen ? 1 : 0,
            height: isMobileMenuOpen ? 'auto' : 0
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-4 border-t border-border">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left text-white hover:text-purple-400 font-medium py-2 px-4 rounded-lg hover:bg-purple-900/30 transition-all duration-300"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {item.name}
              </motion.button>
            ))}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: navItems.length * 0.1 }}
              className="pt-4 border-t border-border"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-muted-foreground text-sm">Thème</span>
              </div>
              <Button 
                onClick={() => scrollToSection('#contact')}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
              >
                Démarrer un projet
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Floating elements with parallaxe */}
      <motion.div
        className="absolute top-4 left-1/4 w-2 h-2 bg-purple-400 rounded-full opacity-60"
        animate={{ 
          y: [0, -10, 0],
          opacity: [0.6, 1, 0.6]
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ y: useTransform(scrollY, [0, 100], [0, -20]) }}
      />
      
      <motion.div
        className="absolute top-8 right-1/3 w-1 h-1 bg-blue-400 rounded-full opacity-40"
        animate={{ 
          y: [0, -8, 0],
          opacity: [0.4, 0.8, 0.4]
        }}
        transition={{ 
          duration: 2.5, 
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
        style={{ y: useTransform(scrollY, [0, 100], [0, -15]) }}
      />
      
      <motion.div
        className="absolute top-12 left-1/2 w-1.5 h-1.5 bg-pink-400 rounded-full opacity-50"
        animate={{ 
          y: [0, -12, 0],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        style={{ y: useTransform(scrollY, [0, 100], [0, -25]) }}
      />
    </motion.nav>
  );
}