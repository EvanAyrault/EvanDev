'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const technologies = [
  {
    category: 'Frontend',
    items: [
      { name: 'React', icon: '⚛️' },
      { name: 'Next.js', icon: '▲' },
      { name: 'TypeScript', icon: '📘' },
      { name: 'Tailwind CSS', icon: '🎨' },
    ],
  },
  {
    category: 'Discord',
    items: [
      { name: 'Discord.js', icon: '🤖' },
      { name: 'Bot Development', icon: '⚡' },
      { name: 'Server Setup', icon: '🎮' },
      { name: 'Custom Commands', icon: '⚙️' },
    ],
  },
  {
    category: 'Outils',
    items: [
      { name: 'Figma', icon: '🎨' },
      { name: 'Cursor', icon: '💻' },
      { name: 'Git', icon: '📦' },
      { name: 'VS Code', icon: '🔧' },
    ],
  },
];

export default function Stack() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const cards = cardsRef.current;
    
    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 50,
          scale: 0.8,
          rotation: -5,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotation: 0,
          duration: 1,
          delay: index * 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse',
          },
        }
      );

      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          scale: 1.05,
          rotation: 2,
          duration: 0.4,
          ease: 'power2.out',
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          scale: 1,
          rotation: 0,
          duration: 0.4,
          ease: 'power2.out',
        });
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-black to-[hsl(var(--brand-bg))] relative overflow-hidden">
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-violet-500 rounded-full mix-blend-lighten filter blur-2xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-purple-500 rounded-full mix-blend-lighten filter blur-2xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          Ma <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">Stack Technique</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {technologies.map((tech, index) => (
            <div
              key={tech.category}
              ref={el => {
                if (el) cardsRef.current[index] = el;
              }}
              className="card-hover glass-effect rounded-xl p-8 border border-violet-500/20 hover:border-violet-500/40 transition-all duration-300 bg-gradient-to-br from-violet-900/30 to-purple-900/30 backdrop-blur-xl"
            >
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">{tech.category}</h3>
              <div className="grid grid-cols-2 gap-4">
                {tech.items.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center space-x-2 p-3 rounded-lg bg-violet-900/20 hover:bg-violet-900/30 transition-colors duration-200"
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-violet-200">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-violet-200 mb-8 max-w-2xl mx-auto">
            Spécialisé en développement Discord et web, je m'adapte à chaque projet pour créer des expériences uniques et performantes pour vos communautés et votre présence en ligne.
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="https://github.com/votre-username"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-violet-500/25"
            >
              Voir mon GitHub
            </a>
            <a
              href="/#contact"
              className="px-6 py-3 border border-violet-500 text-violet-400 hover:bg-violet-900/20 rounded-lg transition-all duration-300 hover:scale-105"
            >
              Me contacter
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}