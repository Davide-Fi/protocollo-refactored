import { Award, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center px-4 py-2 bg-steel-blue/30 rounded-sm mb-6">
              <Award className="text-performance-green mr-2 h-4 w-4" />
              <span className="text-sm font-medium">I migliori biomarcatori al mondo</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-black leading-tight mb-6">
              Il Protocollo <span className="text-scientific-blue">Definitivo</span> per la Longevità Maschile
            </h1>
            
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Ottimizza la tua prestazione fisica e mentale con protocolli scientificamente provati. 
              Unisciti a migliaia di uomini che stanno rivoluzionando la loro salute.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button 
                onClick={() => scrollToSection('nutrizione')}
                className="bg-scientific-blue hover:bg-scientific-blue/80 text-white px-8 py-4 font-bold text-lg"
              >
                Accedi ai Protocolli
              </Button>
              <Button 
                variant="outline"
                className="border-2 border-slate-600 hover:border-scientific-blue text-slate-300 hover:text-scientific-blue px-8 py-4 font-semibold bg-transparent"
              >
                <Play className="mr-2 h-4 w-4" />
                Guarda Demo
              </Button>
            </div>
            
            {/* Key Metrics */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-performance-green">15K+</div>
                <div className="text-sm text-slate-400">Utenti Attivi</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-performance-green">89%</div>
                <div className="text-sm text-slate-400">Miglioramento</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-performance-green">200+</div>
                <div className="text-sm text-slate-400">Protocolli</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src="/attached_assets/generated_images/Professional_athletic_man_portrait_3cf99d85.png" 
              alt="Professional man representing health optimization" 
              className="w-full h-auto rounded-lg shadow-2xl"
            />
            
            {/* Performance Overlay */}
            <div className="absolute top-6 right-6 bg-navy-charcoal/90 backdrop-blur-sm p-4 rounded-lg border border-steel-blue/30">
              <div className="text-sm text-slate-400 mb-1">Età Biologica</div>
              <div className="text-2xl font-bold text-performance-green">23 anni</div>
              <div className="text-xs text-slate-500">vs 45 cronologica</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
