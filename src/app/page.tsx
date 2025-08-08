'use client';

import HeroSection from '@/components/sections/hero-section';
import ProtocolloSection from '@/components/sections/protocollo-section';
import ResearchSection from '@/components/sections/research-section';
import PrevenzionSection from '@/components/sections/prevenzione-section';
import NutrizioneSection from '@/components/sections/nutrizione-section';
import IntegrazioneSection from '@/components/sections/integrazione-section';
import ContactSection from '@/components/sections/contact-section';
import Footer from '@/components/sections/footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-navy-charcoal text-slate-100">
      <HeroSection />
      <ProtocolloSection />
      <ResearchSection />
      <PrevenzionSection />
      <NutrizioneSection />
      <IntegrazioneSection />
      <ContactSection />
      <Footer />
    </div>
  );
}