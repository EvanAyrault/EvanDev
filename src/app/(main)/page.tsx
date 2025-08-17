import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Features from '@/components/Features';
import Projects from '@/components/Projects';
import ContactForm from '@/components/ContactForm';
import Stack from '@/components/Stack';

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Features />
      <Stack />
      <Projects />
      <ContactForm />
    </main>
  );
} 