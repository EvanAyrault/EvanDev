'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import ParallaxSection from './ParallaxSection';

const contactInfo = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Email',
    value: 'contact@votreentreprise.com',
    description: 'Réponse sous 24h'
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    title: 'Téléphone',
    value: '+33 1 23 45 67 89',
    description: 'Lun-Ven 9h-18h'
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Adresse',
    value: 'Paris, France',
    description: 'Bureau principal'
  }
];

const serviceTypes = [
  { value: 'discord_server', label: 'Serveur Discord' },
  { value: 'discord_bot', label: 'Bot Discord' },
  { value: 'web', label: 'Site Web Vitrine' },
  { value: 'app', label: 'Application Web' },
  { value: 'ecommerce', label: 'E-commerce' },
  { value: 'maintenance', label: 'Maintenance & Support' },
  { value: 'other', label: 'Autre' }
];

export default function ContactForm() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Effets de parallaxe
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const formY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const contactY = useTransform(scrollYProgress, [0, 1], [0, -20]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simuler l'envoi du formulaire
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset après 3 secondes
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-[hsl(var(--brand-bg))] to-black relative overflow-hidden" id="contact">
      {/* Background elements with parallaxe */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-fuchsia-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
      </motion.div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Section Title with parallaxe */}
        <motion.div
          style={{ y: titleY }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Parlons de votre{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Projet
            </span>
          </h2>
          <p className="text-xl text-purple-200 max-w-3xl mx-auto">
            Prêt à transformer votre vision en réalité ? Contactez-moi pour discuter de votre projet !
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form with parallaxe */}
          <ParallaxSection speed={0.1} direction="up" offset={30}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8">
                <CardHeader className="p-0 mb-8">
                  <CardTitle className="text-2xl font-bold text-white mb-2">
                    Envoyez-moi un message
                  </CardTitle>
                  <p className="text-slate-300">
                    Remplissez le formulaire ci-dessous et je vous recontacterai rapidement
                  </p>
                </CardHeader>

                <CardContent className="p-0">
                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">Message envoyé !</h3>
                      <p className="text-slate-300">Je vous recontacterai dans les plus brefs délais.</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">
                            Prénom *
                          </label>
                          <Input
                            type="text"
                            required
                            className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-purple-500"
                            placeholder="Votre prénom"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">
                            Nom *
                          </label>
                          <Input
                            type="text"
                            required
                            className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-purple-500"
                            placeholder="Votre nom"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Email *
                        </label>
                        <Input
                          type="email"
                          required
                          className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-purple-500"
                          placeholder="votre@email.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Téléphone
                        </label>
                        <Input
                          type="tel"
                          className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-purple-500"
                          placeholder="+33 1 23 45 67 89"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Type de service *
                        </label>
                        <Select>
                          <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                            <SelectValue placeholder="Sélectionnez un service" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-slate-700">
                            {serviceTypes.map((service) => (
                              <SelectItem key={service.value} value={service.value}>
                                {service.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Budget estimé
                        </label>
                        <Select>
                          <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                            <SelectValue placeholder="Sélectionnez un budget" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-slate-700">
                            <SelectItem value="small">2K - 5K €</SelectItem>
                            <SelectItem value="medium">5K - 15K €</SelectItem>
                            <SelectItem value="large">15K - 50K €</SelectItem>
                            <SelectItem value="enterprise">50K+ €</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Message *
                        </label>
                        <Textarea
                          required
                          rows={6}
                          className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-purple-500 resize-none"
                          placeholder="Décrivez votre projet, vos besoins et vos objectifs..."
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center justify-center">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            Envoi en cours...
                          </div>
                        ) : (
                          'Envoyer le message'
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </ParallaxSection>

          {/* Contact Info with parallaxe */}
          <ParallaxSection speed={0.08} direction="up" offset={20}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              {/* Contact Info Cards */}
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                    <CardContent className="p-0">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white">
                          {info.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white mb-1">{info.title}</h3>
                          <p className="text-purple-300 font-medium mb-1">{info.value}</p>
                          <p className="text-slate-400 text-sm">{info.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}

              <Separator className="bg-slate-700/50" />

              {/* Additional Info */}
              <Card className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-8">
                <CardContent className="p-0">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Pourquoi me choisir ?
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span className="text-slate-300">Réponse sous 24h</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span className="text-slate-300">Devis gratuit et personnalisé</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span className="text-slate-300">Accompagnement complet</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span className="text-slate-300">Support technique 24/7</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Links */}
              <div className="text-center">
                <p className="text-slate-300 mb-4">Retrouvez-moi sur les réseaux sociaux</p>
                <div className="flex justify-center space-x-4">
                  {['Discord', 'LinkedIn', 'GitHub', 'Twitter'].map((social) => (
                    <Button
                      key={social}
                      variant="outline"
                      size="sm"
                      className="w-12 h-12 rounded-full border-slate-600 text-slate-300 hover:border-purple-500 hover:text-purple-400"
                    >
                      <span className="sr-only">{social}</span>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-2 15l-5-5 1.414-1.414L10 14.172l7.586-7.586L19 8l-9 9z"/>
                      </svg>
                    </Button>
                  ))}
                </div>
              </div>
            </motion.div>
          </ParallaxSection>
        </div>
      </div>
    </section>
  );
}