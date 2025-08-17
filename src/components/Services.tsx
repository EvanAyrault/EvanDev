'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import ParallaxSection from './ParallaxSection';
import ScrollAnimation from './ScrollAnimation';

const services = [
  {
    id: 1,
    title: 'Serveurs Discord',
    subtitle: 'Création et configuration complète',
    description: 'Création de serveurs Discord professionnels avec configuration des rôles, salons, permissions et identité visuelle personnalisée.',
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    features: ['Structure optimisée', 'Identité visuelle', 'Sécurité renforcée', 'Expérience utilisateur'],
    color: 'from-violet-500 to-purple-500',
    badgeColor: 'bg-violet-500/20 text-violet-300 border-violet-500/30'
  },
  {
    id: 2,
    title: 'Bots Discord',
    subtitle: 'Automatisation sur mesure',
    description: 'Développement de bots Discord personnalisés pour automatiser vos serveurs, modérer votre communauté et offrir des fonctionnalités uniques.',
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    features: ['Modération automatique', 'Commandes personnalisées', 'Intégrations API', 'Dashboard admin'],
    color: 'from-purple-500 to-fuchsia-500',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30'
  },
  {
    id: 3,
    title: 'Sites Web Vitrines',
    subtitle: 'Présence web professionnelle',
    description: 'Création de sites web modernes et responsives avec les dernières technologies (React, Next.js, TypeScript) pour présenter votre activité.',
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    features: ['Design responsive', 'Performance optimisée', 'SEO friendly', 'Maintenance continue'],
    color: 'from-indigo-500 to-blue-500',
    badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
  },
  {
    id: 4,
    title: 'Applications Web',
    subtitle: 'Solutions interactives',
    description: 'Développement d\'applications web complexes avec des fonctionnalités avancées, une architecture scalable et une expérience utilisateur optimale.',
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    features: ['Architecture moderne', 'API RESTful', 'Base de données', 'Authentification'],
    color: 'from-blue-500 to-cyan-500',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30'
  },
  {
    id: 5,
    title: 'E-commerce',
    subtitle: 'Boutiques en ligne performantes',
    description: 'Création de plateformes e-commerce complètes avec gestion des paiements, stocks et expérience client optimisée pour maximiser vos ventes.',
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
    features: ['Paiements sécurisés', 'Gestion des stocks', 'Analytics avancés', 'Mobile-first'],
    color: 'from-cyan-500 to-teal-500',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
  },
  {
    id: 6,
    title: 'Maintenance & Support',
    subtitle: 'Accompagnement continu',
    description: 'Services de maintenance, mises à jour et support technique pour garantir la performance et la sécurité de tous vos projets Discord et Web.',
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    features: ['Support 24/7', 'Sauvegardes automatiques', 'Mises à jour', 'Sécurité renforcée'],
    color: 'from-fuchsia-500 to-pink-500',
    badgeColor: 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30'
  }
];

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Effets de parallaxe
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const cardsY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden" id='services'>
      {/* Background elements with parallaxe */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-lighten filter blur-2xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-lighten filter blur-2xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-purple-700 rounded-full mix-blend-lighten filter blur-2xl opacity-20 animate-blob animation-delay-4000"></div>
      </motion.div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Section Title with parallaxe */}
        <ScrollAnimation direction="up" delay={0.1}>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gradient">
            Mes Services
          </h2>
        </ScrollAnimation>

        {/* Services Grid with parallaxe */}
        <ScrollAnimation direction="up" delay={0.2}>
          <motion.div 
            style={{ y: cardsY }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service, index) => (
              <ParallaxSection
                key={service.id}
                speed={0.1 + index * 0.02}
                direction="up"
                offset={20}
              >
                <ScrollAnimation direction="up" delay={0.2 + index * 0.1}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    whileHover={{ y: -10 }}
                    className="group relative"
                  >
                    <Card className="relative glass-effect bg-gradient-to-br from-purple-900/60 to-blue-900/60 backdrop-blur-2xl border border-purple-700/40 rounded-2xl p-8 h-full transition-all duration-300 hover:scale-105 hover:border-purple-400/70 hover:shadow-2xl hover:shadow-purple-500/30 overflow-hidden">
                      {/* Gradient overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
                      
                      <CardHeader className="relative z-10 p-0 mb-6">
                        {/* Icon */}
                        <div className={`inline-flex p-4 bg-gradient-to-r ${service.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                          <div className="text-white">
                            {service.icon}
                          </div>
                        </div>

                        {/* Title and Subtitle */}
                        <CardTitle className="text-2xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
                          {service.title}
                        </CardTitle>
                        <Badge variant="outline" className={service.badgeColor}>
                          {service.subtitle}
                        </Badge>
                      </CardHeader>

                      <CardContent className="relative z-10 p-0">
                        <p className="text-slate-300 mb-6 leading-relaxed">
                          {service.description}
                        </p>

                        <Separator className="mb-6 bg-slate-700/50" />

                        {/* Features */}
                        <ul className="space-y-2 mb-6">
                          {service.features.map((feature, featureIndex) => (
                            <motion.li 
                              key={featureIndex} 
                              className="flex items-center text-slate-300"
                              initial={{ opacity: 0, x: -20 }}
                              animate={isInView ? { opacity: 1, x: 0 } : {}}
                              transition={{ duration: 0.5, delay: index * 0.1 + featureIndex * 0.1 }}
                            >
                              <svg className="w-4 h-4 text-purple-400 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              {feature}
                            </motion.li>
                          ))}
                        </ul>

                        {/* CTA Button */}
                        <Button 
                          onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
                        >
                          En savoir plus
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                </ScrollAnimation>
              </ParallaxSection>
            ))}
          </motion.div>
        </ScrollAnimation>

        {/* CTA Section with parallaxe */}
        <ParallaxSection speed={0.05} direction="up" className="text-center mt-16">
          <ScrollAnimation direction="up" delay={0.6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Card className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-12">
                <CardContent className="p-0">
                  <h3 className="text-3xl font-bold text-white mb-4">
                    Prêt à transformer votre vision ?
                  </h3>
                  <p className="text-purple-200 mb-8 max-w-2xl mx-auto">
                    Discutons de votre projet et voyons comment je peux créer pour vous quelque chose d&apos;extraordinaire.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      size="lg"
                      onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                      className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
                    >
                      Démarrer un projet
                    </Button>
                    <Button 
                      variant="outline"
                      size="lg"
                      onClick={() => document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' })}
                      className="px-8 py-4 border-2 border-purple-400 text-purple-400 font-semibold rounded-xl transition-all duration-300 hover:bg-purple-400 hover:text-white hover:scale-105"
                    >
                      Voir mes réalisations
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </ScrollAnimation>
        </ParallaxSection>
      </div>
    </section>
  );
}