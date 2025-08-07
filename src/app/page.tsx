import Navigation from "@/components/navigation";
import HeroSection from "@/components/sections/hero-section";
import ProtocolloSection from "@/components/sections/protocollo-section";
import NutrizioneSection from "@/components/sections/nutrizione-section";
import IntegrazioneSection from "@/components/sections/integrazione-section";
import PreventioneSection from "@/components/sections/prevenzione-section";
import DashboardSection from "@/components/dashboard-section";
import ResearchSection from "@/components/sections/research-section";
import ContactSection from "@/components/sections/contact-section";
import Footer from "@/components/sections/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-navy-charcoal text-slate-100">
      <Navigation />
      <main>
        <HeroSection />
        <ProtocolloSection />
        <NutrizioneSection />
        <IntegrazioneSection />
        <PreventioneSection />
        <DashboardSection />
        <ResearchSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}