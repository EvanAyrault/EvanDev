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

const features = [
  {
    id: 1,
    title: 'Serveurs Discord Personnalisés',
    description: 'Création de serveurs Discord sur mesure avec une structure optimisée, des rôles personnalisés et une identité visuelle unique.',
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    stats: ['100%', 'Personnalisé'],
    color: 'from-violet-500 to-purple-500',
    badgeColor: 'bg-violet-500/20 text-violet-300 border-violet-500/30'
  },
  {
    id: 2,
    title: 'Bots Discord Avancés',
    description: 'Développement de bots Discord sur mesure avec des fonctionnalités avancées pour modération, engagement et automatisation.',
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    stats: ['24/7', 'En ligne'],
    color: 'from-purple-500 to-fuchsia-500',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30'
  },
  {
    id: 3,
    title: 'Sites Web Modernes',
    description: 'Création de sites web vitrines et applications avec les dernières technologies (React, Next.js) pour une expérience utilisateur exceptionnelle.',
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    stats: ['100%', 'Responsive'],
    color: 'from-fuchsia-500 to-pink-500',
    badgeColor: 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30'
  },
  {
    id: 4,
    title: 'Intégration & Automatisation',
    description: 'Solutions d\'intégration entre Discord et votre site web pour une expérience utilisateur unifiée et des workflows automatisés.',
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
    stats: ['100%', 'Connecté'],
    color: 'from-pink-500 to-violet-500',
    badgeColor: 'bg-pink-500/20 text-pink-300 border-pink-500/30'
  }
];

const processSteps = [
  {
    step: '01',
    title: 'Découverte & Analyse',
    description: "J'analyse vos besoins, objectifs et contraintes pour créer une stratégie personnalisée.",
    icon: '🔍'
  },
  {
    step: '02',
    title: 'Design & Prototypage',
    description: "Je crée des maquettes et prototypes interactifs pour valider l'expérience utilisateur.",
    icon: '🎨'
  },
  {
    step: '03',
    title: 'Développement',
    description: "Développement agile avec des technologies modernes et des bonnes pratiques.",
    icon: '⚡'
  },
  {
    step: '04',
    title: 'Tests & Optimisation',
    description: "Tests approfondis et optimisations pour garantir performance et qualité.",
    icon: '✅'
  },
  {
    step: '05',
    title: 'Déploiement',
    description: "Mise en ligne sécurisée et configuration des outils de monitoring.",
    icon: '🚀'
  },
  {
    step: '06',
    title: 'Support & Maintenance',
    description: "Accompagnement continu et maintenance pour assurer la pérennité de votre projet.",
    icon: '🛠️'
  }
];

export default function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Effets de parallaxe
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const featuresY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const processY = useTransform(scrollYProgress, [0, 1], [0, -20]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-[hsl(var(--brand-bg))] to-black relative overflow-hidden" id='features'>
      {/* Background elements with parallaxe */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-violet-500 rounded-full mix-blend-lighten filter blur-2xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-lighten filter blur-2xl opacity-30 animate-blob animation-delay-2000"></div>
      </motion.div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Section Title with parallaxe */}
        <ScrollAnimation direction="up" delay={0.1}>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
            Mes Services Spécialisés
          </h2>
        </ScrollAnimation>

        {/* Features Grid with parallaxe */}
        <ScrollAnimation direction="up" delay={0.2}>
          <motion.div 
            style={{ y: featuresY }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20"
          >
            {features.map((feature, index) => (
              <ParallaxSection
                key={feature.id}
                speed={0.1 + index * 0.02}
                direction="up"
                offset={20}
              >
                <ScrollAnimation direction="up" delay={0.2 + index * 0.1}>
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    whileHover={{ y: -10 }}
                    className="group relative"
                  >
                    <Card className="relative glass-effect bg-gradient-to-br from-violet-900/60 to-purple-900/60 backdrop-blur-2xl border border-violet-700/40 rounded-2xl p-8 h-full transition-all duration-300 hover:scale-105 hover:border-violet-400/70 hover:shadow-2xl hover:shadow-violet-500/30 overflow-hidden">
                      {/* Gradient overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
                      
                      <CardHeader className="relative z-10 p-0 mb-6">
                        {/* Icon */}
                        <div className={`inline-flex p-4 bg-gradient-to-r ${feature.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                          <div className="text-white">
                            {feature.icon}
                          </div>
                        </div>

                        {/* Title */}
                        <CardTitle className="text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors duration-300">
                          {feature.title}
                        </CardTitle>
                      </CardHeader>

                      <CardContent className="relative z-10 p-0">
                        <p className="text-slate-300 mb-6 leading-relaxed">
                          {feature.description}
                        </p>

                        <Separator className="mb-6 bg-slate-700/50" />

                        {/* Stats */}
                        <div className="flex items-center space-x-4">
                          {feature.stats.map((stat, statIndex) => (
                            <motion.div 
                              key={statIndex} 
                              className="text-center"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={isInView ? { opacity: 1, scale: 1 } : {}}
                              transition={{ duration: 0.5, delay: index * 0.1 + statIndex * 0.1 }}
                            >
                              <Badge variant="outline" className={feature.badgeColor}>
                                {stat}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </ScrollAnimation>
              </ParallaxSection>
            ))}
          </motion.div>
        </ScrollAnimation>

        {/* Process Section with parallaxe */}
        <ParallaxSection speed={0.05} direction="up" className="text-center mb-16">
          <ScrollAnimation direction="up" delay={0.4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Mon{' '}
                <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                  Processus
                </span>
              </h3>
              <p className="text-xl text-violet-200 max-w-3xl mx-auto">
                Une méthodologie éprouvée pour garantir le succès de votre projet Discord ou Web
              </p>
            </motion.div>
          </ScrollAnimation>
        </ParallaxSection>

        {/* Process Steps with parallaxe */}
        <ScrollAnimation direction="up" delay={0.6}>
          <motion.div 
            style={{ y: processY }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {processSteps.map((step, index) => (
              <ParallaxSection
                key={step.step}
                speed={0.08 + index * 0.01}
                direction="up"
                offset={15}
              >
                <ScrollAnimation direction="up" delay={0.6 + index * 0.1}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="group relative"
                  >
                    <Card className="relative bg-gradient-to-br from-[hsl(var(--brand-bg))]/50 to-black/50 backdrop-blur-xl border border-violet-700/50 rounded-2xl p-8 h-full transition-all duration-300 hover:scale-105 hover:border-violet-500/50 hover:shadow-2xl hover:shadow-violet-500/10 overflow-hidden">
                      {/* Step number */}
                      <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                        {step.step}
                      </div>

                      <CardHeader className="relative z-10 p-0 mb-6">
                        {/* Icon */}
                        <div className="text-4xl mb-6 mt-4">{step.icon}</div>

                        {/* Title */}
                        <CardTitle className="text-xl font-bold text-white mb-4 group-hover:text-violet-300 transition-colors duration-300">
                          {step.title}
                        </CardTitle>
                      </CardHeader>

                      <CardContent className="relative z-10 p-0">
                        <p className="text-slate-300 leading-relaxed">
                          {step.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </ScrollAnimation>
              </ParallaxSection>
            ))}
          </motion.div>
        </ScrollAnimation>

        {/* CTA Section with parallaxe */}
        <ParallaxSection speed={0.03} direction="up" className="text-center mt-20">
          <ScrollAnimation direction="up" delay={1.2}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <Card className="bg-gradient-to-r from-violet-600/20 to-purple-600/20 backdrop-blur-xl border border-violet-500/20 rounded-2xl p-12">
                <CardContent className="p-0">
                  <h3 className="text-3xl font-bold text-white mb-4">
                    Prêt à commencer votre projet ?
                  </h3>
                  <p className="text-violet-200 mb-8 max-w-2xl mx-auto">
                    Transformez votre communauté Discord ou votre présence web avec mon expertise et mon accompagnement personnalisé.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      size="lg"
                      onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                      className="px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-violet-500/25"
                    >
                      Me contacter
                    </Button>
                    <Button 
                      variant="outline"
                      size="lg"
                      onClick={() => document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' })}
                      className="px-8 py-4 border-2 border-violet-400 text-violet-400 font-semibold rounded-xl transition-all duration-300 hover:bg-violet-400 hover:text-white hover:scale-105"
                    >
                      Voir mes projets
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