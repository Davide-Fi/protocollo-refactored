import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import ProtocolloSection from "@/components/protocollo-section";
import NutrizioneSection from "@/components/nutrizione-section";
import IntegrazioneSection from "@/components/integrazione-section";
import PreventioneSection from "@/components/prevenzione-section";
import DashboardSection from "@/components/dashboard-section";
import ResearchSection from "@/components/research-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";

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