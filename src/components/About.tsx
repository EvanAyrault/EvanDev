"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ParallaxSection from "./ParallaxSection";
import ScrollAnimation from "./ScrollAnimation";

const skills = [
  { name: "React", level: 95, color: "from-blue-500 to-cyan-500" },
  { name: "Next.js", level: 90, color: "from-purple-500 to-pink-500" },
  { name: "TypeScript", level: 88, color: "from-blue-600 to-indigo-600" },
  { name: "Node.js", level: 85, color: "from-green-500 to-emerald-500" },
  { name: "Tailwind CSS", level: 92, color: "from-cyan-500 to-blue-500" },
  { name: "PostgreSQL", level: 80, color: "from-indigo-500 to-purple-500" },
];

const experiences = [
  {
    year: "2023 - Présent",
    title: "Développeur Web Freelance",
    company: "EvanDev",
    description:
      "Développement de sites web et applications sur-mesure pour clients variés.",
    technologies: ["React", "Next.js", "TypeScript", "Node.js"],
  },
  {
    year: "2022 - 2023",
    title: "Développeur Frontend",
    company: "Startup Tech",
    description:
      "Développement d'interfaces utilisateur modernes et responsives.",
    technologies: ["React", "Vue.js", "Sass", "Webpack"],
  },
  {
    year: "2021 - 2022",
    title: "Développeur Full Stack Junior",
    company: "Agence Web",
    description:
      "Création de sites web et maintenance d'applications existantes.",
    technologies: ["JavaScript", "PHP", "MySQL", "WordPress"],
  },
];

const achievements = [
  {
    icon: "🏆",
    title: "25+ Projets Réalisés",
    description: "Une variété de projets web réussis pour différents secteurs",
  },
  {
    icon: "⚡",
    title: "Performance Optimale",
    description: "Sites web rapides avec des scores Lighthouse excellents",
  },
  {
    icon: "🎨",
    title: "Design Moderne",
    description: "Interfaces utilisateur élégantes et intuitives",
  },
  {
    icon: "🔧",
    title: "Support Continu",
    description: "Accompagnement et maintenance post-livraison",
  },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Effets de parallaxe
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section
      ref={ref}
      className="py-20 bg-gradient-to-b from-slate-800 to-slate-900 relative overflow-hidden"
      id="about"
    >
      {/* Background elements with parallaxe */}
      <motion.div className="absolute inset-0" style={{ y: backgroundY }}>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-lighten filter blur-2xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-lighten filter blur-2xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-700 rounded-full mix-blend-lighten filter blur-2xl opacity-20 animate-blob animation-delay-4000"></div>
      </motion.div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Section Title with parallaxe */}
        <ScrollAnimation direction="up" delay={0.1}>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gradient">
            À propos de moi
          </h2>
        </ScrollAnimation>

        {/* Main Content with parallaxe */}
        <motion.div
          style={{ y: contentY }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20"
        >
          {/* Left Column - Story */}
          <ParallaxSection speed={0.05} direction="up" offset={20}>
            <ScrollAnimation direction="up" delay={0.2}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Card className="glass-effect bg-gradient-to-br from-purple-900/60 to-blue-900/60 backdrop-blur-2xl border border-purple-700/40 rounded-2xl p-8 h-full transition-all duration-300 hover:scale-105 hover:border-purple-400/70 hover:shadow-2xl hover:shadow-purple-500/30 overflow-hidden">
                  <CardHeader className="p-0 mb-6">
                    <CardTitle className="text-3xl font-bold text-white mb-4">
                      Mon Histoire
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 space-y-6">
                    <p className="text-slate-300 leading-relaxed">
                      Passionné de technologie depuis mon plus jeune âge,
                      j&aposai découvert ma vocation pour le développement web
                      en créant mes premiers sites. Aujourd&aposhui, je combine
                      créativité et expertise technique pour créer des
                      expériences digitales exceptionnelles.
                    </p>
                    <p className="text-slate-300 leading-relaxed">
                      En tant que développeur freelance, je m&aposengage à
                      offrir un service personnalisé, une grande réactivité et
                      des solutions sur-mesure qui répondent parfaitement aux
                      besoins de mes clients.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge
                        variant="outline"
                        className="bg-purple-500/20 text-purple-300 border-purple-500/30"
                      >
                        Freelance
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-blue-500/20 text-blue-300 border-blue-500/30"
                      >
                        Full Stack
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-green-500/20 text-green-300 border-green-500/30"
                      >
                        React Expert
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </ScrollAnimation>
          </ParallaxSection>

          {/* Right Column - Skills */}
          <ParallaxSection speed={0.05} direction="up" offset={20}>
            <ScrollAnimation direction="up" delay={0.2}>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8">
                  <CardHeader className="p-0 mb-6">
                    <CardTitle className="text-3xl font-bold text-white mb-4">
                      Mes Compétences
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 space-y-6">
                    {skills.map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-slate-300 font-medium">
                            {skill.name}
                          </span>
                          <span className="text-purple-400 font-bold">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="w-full bg-slate-700/50 rounded-full h-2">
                          <motion.div
                            className={`h-2 bg-gradient-to-r ${skill.color} rounded-full`}
                            initial={{ width: 0 }}
                            animate={
                              isInView ? { width: `${skill.level}%` } : {}
                            }
                            transition={{
                              duration: 1,
                              delay: 0.8 + index * 0.1,
                            }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </ScrollAnimation>
          </ParallaxSection>
        </motion.div>

        {/* Experience Timeline */}
        <ParallaxSection speed={0.03} direction="up" className="mb-20">
          <ScrollAnimation direction="up" delay={0.2}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h3 className="text-3xl md:text-5xl font-bold text-white mb-12 text-center">
                Mon{" "}
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Parcours
                </span>
              </h3>

              <div className="space-y-8">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={exp.year}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.8 + index * 0.2 }}
                    className="relative"
                  >
                    <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8">
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                          <div>
                            <h4 className="text-xl font-bold text-white mb-2">
                              {exp.title}
                            </h4>
                            <p className="text-purple-400 font-medium">
                              {exp.company}
                            </p>
                          </div>
                          <Badge
                            variant="outline"
                            className="bg-blue-500/20 text-blue-300 border-blue-500/30 w-fit"
                          >
                            {exp.year}
                          </Badge>
                        </div>
                        <p className="text-slate-300 mb-4 leading-relaxed">
                          {exp.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech) => (
                            <Badge
                              key={tech}
                              variant="outline"
                              className="bg-slate-700/50 text-slate-300 border-slate-600"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </ScrollAnimation>
        </ParallaxSection>

        {/* Achievements Grid */}
        <ParallaxSection speed={0.02} direction="up" className="mb-20">
          <ScrollAnimation direction="up" delay={0.2}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <h3 className="text-3xl md:text-5xl font-bold text-white mb-12 text-center">
                Mes{" "}
                <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                  Réalisations
                </span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 text-center h-full">
                      <CardContent className="p-0">
                        <div className="text-4xl mb-4">{achievement.icon}</div>
                        <h4 className="text-lg font-bold text-white mb-2">
                          {achievement.title}
                        </h4>
                        <p className="text-slate-300 text-sm">
                          {achievement.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </ScrollAnimation>
        </ParallaxSection>

        {/* CTA Section */}
        <ParallaxSection speed={0.01} direction="up" className="text-center">
          <ScrollAnimation direction="up" delay={0.2}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.6 }}
            >
              <Card className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-12">
                <CardContent className="p-0">
                  <h3 className="text-3xl font-bold text-white mb-4">
                    Prêt à collaborer ?
                  </h3>
                  <p className="text-purple-200 mb-8 max-w-2xl mx-auto">
                    Transformons votre vision en réalité digitale. Discutons de
                    votre projet et créons ensemble quelque chose
                    d&aposextraordinaire.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      size="lg"
                      onClick={() =>
                        document
                          .querySelector("#contact")
                          ?.scrollIntoView({ behavior: "smooth" })
                      }
                      className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
                    >
                      Démarrer un projet
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => window.open("/cv.pdf", "_blank")}
                      className="px-8 py-4 border-2 border-purple-400 text-purple-400 font-semibold rounded-xl transition-all duration-300 hover:bg-purple-400 hover:text-white hover:scale-105"
                    >
                      Télécharger mon CV
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
