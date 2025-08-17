'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    value: '98',
    suffix: '%',
    label: 'Satisfaction Client',
  },
  {
    value: '150',
    suffix: '+',
    label: 'Projets Réalisés',
  },
  {
    value: '5',
    suffix: 'x',
    label: 'Augmentation des Conversions',
  },
  {
    value: '24',
    suffix: 'h',
    label: 'Support Réactif',
  },
];

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      statsRef.current.forEach((stat, index) => {
        const value = stat.querySelector('.stat-value');
        const targetValue = parseInt(value?.textContent || '0');

        gsap.fromTo(
          value,
          { textContent: 0 },
          {
            textContent: targetValue,
            duration: 2,
            ease: 'power2.out',
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: stat,
              start: 'top bottom-=100',
              toggleActions: 'play none none reverse',
            },
          }
        );

        gsap.fromTo(
          stat,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: index * 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: stat,
              start: 'top bottom-=100',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              ref={el => {
                if (el) statsRef.current[index] = el;
              }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold mb-2 text-gradient">
                <span className="stat-value">{stat.value}</span>
                {stat.suffix}
              </div>
              <p className="text-purple-200">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 