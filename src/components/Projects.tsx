'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import ParallaxSection from './ParallaxSection';
import ScrollAnimation from './ScrollAnimation';

const projects = [
  {
    id: 1,
    title: 'Serveur Discord Gaming',
    category: 'Discord',
    description: 'Serveur Discord complet pour une communauté gaming avec rôles personnalisés, salons thématiques et intégrations.',
    image: '/api/placeholder/600/400',
    technologies: ['Discord API', 'Webhooks', 'Intégrations', 'Rôles personnalisés'],
    stats: {
      engagement: '+85%',
      performance: '99/100',
      membres: '5K+'
    },
    color: 'from-violet-500 to-purple-500',
    badgeColor: 'bg-violet-500/20 text-violet-300 border-violet-500/30'
  },
  {
    id: 2,
    title: 'Bot Discord Modération',
    category: 'Discord',
    description: 'Bot Discord avancé avec système de modération, tickets, niveaux et commandes personnalisées.',
    image: '/api/placeholder/600/400',
    technologies: ['Discord.js', 'Node.js', 'MongoDB', 'Redis'],
    stats: {
      efficacité: '+90%',
      performance: '99/100',
      commandes: '50+'
    },
    color: 'from-purple-500 to-fuchsia-500',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30'
  },
  {
    id: 3,
    title: 'Site Vitrine Créatif',
    category: 'Web',
    description: 'Site vitrine élégant avec animations fluides, design moderne et optimisé pour les moteurs de recherche.',
    image: '/api/placeholder/600/400',
    technologies: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    stats: {
      conversion: '+45%',
      performance: '100/100',
      visiteurs: '15K+'
    },
    color: 'from-fuchsia-500 to-pink-500',
    badgeColor: 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30'
  },
  {
    id: 4,
    title: 'Bot Discord E-commerce',
    category: 'Discord',
    description: 'Bot Discord intégré à une plateforme e-commerce permettant la gestion des commandes et du support client.',
    image: '/api/placeholder/600/400',
    technologies: ['Discord.js', 'API REST', 'Stripe', 'Webhooks'],
    stats: {
      ventes: '+75%',
      performance: '98/100',
      utilisateurs: '3K+'
    },
    color: 'from-pink-500 to-violet-500',
    badgeColor: 'bg-pink-500/20 text-pink-300 border-pink-500/30'
  },
  {
    id: 5,
    title: 'Dashboard Discord',
    category: 'Web',
    description: 'Dashboard web pour la gestion de serveurs Discord avec statistiques, configuration de bots et outils d\'administration.',
    image: '/api/placeholder/600/400',
    technologies: ['React', 'Discord OAuth', 'Node.js', 'Chart.js'],
    stats: {
      efficacité: '+80%',
      performance: '97/100',
      serveurs: '100+'
    },
    color: 'from-violet-500 to-purple-500',
    badgeColor: 'bg-violet-500/20 text-violet-300 border-violet-500/30'
  },
  {
    id: 6,
    title: 'Application Web Progressive',
    category: 'Web',
    description: 'Application web progressive avec fonctionnalités offline et expérience utilisateur optimisée sur tous les appareils.',
    image: '/api/placeholder/600/400',
    technologies: ['React', 'PWA', 'Service Workers', 'Responsive Design'],
    stats: {
      rétention: '+65%',
      performance: '96/100',
      utilisateurs: '8K+'
    },
    color: 'from-purple-500 to-fuchsia-500',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30'
  }
];

const categories = ['Tous', 'Discord', 'Web', 'Intégration'];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Effets de parallaxe
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const filtersY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const projectsY = useTransform(scrollYProgress, [0, 1], [0, -20]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const filteredProjects = selectedCategory === 'Tous' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-black to-[hsl(var(--brand-bg))] relative overflow-hidden">
      {/* Background elements with parallaxe */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-violet-500 rounded-full mix-blend-lighten filter blur-2xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-purple-500 rounded-full mix-blend-lighten filter blur-2xl opacity-20 animate-blob animation-delay-2000"></div>
      </motion.div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Section Title with parallaxe */}
        <ScrollAnimation direction="up" delay={0.1}>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Mes{' '}
            <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
              Réalisations
            </span>
          </h2>
        </ScrollAnimation>
        <p className="text-xl text-violet-200 max-w-3xl mx-auto">
          Découvrez mes projets Discord et Web les plus récents et les résultats exceptionnels obtenus pour mes clients
        </p>

        {/* Category Filter with parallaxe */}
        <ScrollAnimation direction="up" delay={0.2}>
          <motion.div
            style={{ y: filtersY }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/25'
                    : 'bg-[hsl(var(--brand-bg))]/50 text-slate-300 hover:bg-[hsl(var(--brand-bg))]/70 hover:text-white border border-violet-700/50'
                }`}
              >
                {category}
              </Button>
            ))}
          </motion.div>
        </ScrollAnimation>

        {/* Projects Grid with parallaxe */}
        <ScrollAnimation direction="up" delay={0.3}>
          <motion.div 
            style={{ y: projectsY }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <ParallaxSection
                key={project.id}
                speed={0.1 + index * 0.02}
                direction="up"
                offset={20}
              >
                <ScrollAnimation direction="up" delay={0.4 + index * 0.1}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                    whileHover={{ y: -10 }}
                    className="group relative"
                    onClick={() => setSelectedProject(project)}
                  >
                    <Card className="relative glass-effect bg-gradient-to-br from-violet-900/60 to-purple-900/60 backdrop-blur-2xl border border-violet-700/40 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:border-violet-400/70 hover:shadow-2xl hover:shadow-violet-500/30 cursor-pointer">
                      {/* Project Image */}
                      <div className="relative h-48 overflow-hidden">
                        <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20`}></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                        <div className="absolute top-4 left-4">
                          <Badge variant="outline" className={project.badgeColor}>
                            {project.category}
                          </Badge>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <CardTitle className="text-xl font-bold text-white mb-2">{project.title}</CardTitle>
                        </div>
                      </div>

                      {/* Project Content */}
                      <CardContent className="p-6">
                        <p className="text-violet-100 mb-6 leading-relaxed">
                          {project.description}
                        </p>

                        <Separator className="mb-6 bg-violet-700/50" />

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.technologies.map((tech) => (
                            <Badge
                              key={tech}
                              variant="secondary"
                              className="px-3 py-1 bg-violet-700/50 text-violet-300 text-sm rounded-full"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 mb-6">
                          <div className="text-center">
                            <div className="text-lg font-bold text-white">{project.stats.engagement || project.stats.efficacité || project.stats.conversion || project.stats.ventes || project.stats.rétention}</div>
                            <div className="text-xs text-violet-400">{Object.keys(project.stats)[0]}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-white">{project.stats.performance}</div>
                            <div className="text-xs text-violet-400">Performance</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-white">{project.stats.membres || project.stats.commandes || project.stats.visiteurs || project.stats.utilisateurs || project.stats.serveurs}</div>
                            <div className="text-xs text-violet-400">{Object.keys(project.stats)[2]}</div>
                          </div>
                        </div>

                        {/* CTA Button */}
                        <Button 
                          className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-violet-500/25"
                        >
                          Voir le projet
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
        <ParallaxSection speed={0.05} direction="up" className="text-center mt-20">
          <ScrollAnimation direction="up" delay={1}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <Card className="bg-gradient-to-r from-violet-600/20 to-purple-600/20 backdrop-blur-xl border border-violet-500/20 rounded-2xl p-12">
                <CardContent className="p-0">
                  <h3 className="text-3xl font-bold text-white mb-4">
                    Prêt à créer votre projet ?
                  </h3>
                  <p className="text-violet-200 mb-8 max-w-2xl mx-auto">
                    Transformez votre communauté Discord ou votre présence web avec mon expertise et mon accompagnement personnalisé.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      size="lg"
                      className="px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-violet-500/25"
                    >
                      Me contacter
                    </Button>
                    <Button 
                      variant="outline"
                      size="lg"
                      className="px-8 py-4 border-2 border-violet-400 text-violet-400 font-semibold rounded-xl transition-all duration-300 hover:bg-violet-400 hover:text-white hover:scale-105"
                    >
                      Voir tous mes projets
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </ScrollAnimation>
        </ParallaxSection>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="relative">
              {/* Close Button */}
              <Button
                onClick={() => setSelectedProject(null)}
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-slate-700/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-slate-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </Button>

              {/* Project Image */}
              <div className="relative h-64 overflow-hidden rounded-t-2xl">
                <div className={`absolute inset-0 bg-gradient-to-br ${selectedProject.color} opacity-30`}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <Badge variant="outline" className={selectedProject.badgeColor}>
                    {selectedProject.category}
                  </Badge>
                  <h2 className="text-3xl font-bold text-white mt-2">{selectedProject.title}</h2>
                </div>
              </div>

              {/* Project Details */}
              <div className="p-8">
                <p className="text-slate-300 mb-8 text-lg leading-relaxed">
                  {selectedProject.description}
                </p>

                <Separator className="mb-8 bg-slate-700/50" />

                {/* Technologies */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-white mb-4">Technologies utilisées</h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="px-4 py-2 bg-slate-700/50 text-slate-300 rounded-full"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 mb-8">
                  <Card className="text-center p-4 bg-slate-700/30">
                    <CardContent className="p-0">
                      <div className="text-2xl font-bold text-white mb-1">{selectedProject.stats.conversion}</div>
                      <div className="text-sm text-slate-400">Taux de conversion</div>
                    </CardContent>
                  </Card>
                  <Card className="text-center p-4 bg-slate-700/30">
                    <CardContent className="p-0">
                      <div className="text-2xl font-bold text-white mb-1">{selectedProject.stats.performance}</div>
                      <div className="text-sm text-slate-400">Score performance</div>
                    </CardContent>
                  </Card>
                  <Card className="text-center p-4 bg-slate-700/30">
                    <CardContent className="p-0">
                      <div className="text-2xl font-bold text-white mb-1">{selectedProject.stats.users}</div>
                      <div className="text-sm text-slate-400">Utilisateurs actifs</div>
                    </CardContent>
                  </Card>
                </div>

                {/* CTA */}
                <div className="flex gap-4">
                  <Button className="flex-1 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25">
                    Voir le projet live
                  </Button>
                  <Button 
                    variant="outline"
                    className="flex-1 py-4 border-2 border-purple-400 text-purple-400 font-semibold rounded-xl transition-all duration-300 hover:bg-purple-400 hover:text-white"
                  >
                    Demander un devis
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}