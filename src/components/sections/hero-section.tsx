'use client';

import { Button } from "@/components/ui/button";
import { ArrowRight, Activity, Target, Zap } from "lucide-react";

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-navy-charcoal via-background to-steel-blue/20">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(55,65,81,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(55,65,81,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
      
      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-scientific-blue/10 border border-scientific-blue/20 text-scientific-blue text-sm font-medium">
                <Activity className="w-4 h-4 mr-2" />
                Ottimizzazione Scientifica della Longevità
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                <span className="bg-gradient-to-r from-white via-scientific-blue to-performance-green bg-clip-text text-transparent">
                  Protocollo
                </span>
                <br />
                <span className="text-white">
                  Il Tuo Percorso
                </span>
                <br />
                <span className="text-scientific-blue">
                  Verso la Longevità
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                Massimizza la tua salute, performance e longevità attraverso protocolli scientificamente validati. 
                Un approccio personalizzato basato su ricerca, prevenzione e ottimizzazione biologica.
              </p>
            </div>

            {/* Key Benefits */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2 text-performance-green">
                <Target className="w-5 h-5" />
                <span className="text-sm font-medium">Personalizzato</span>
              </div>
              <div className="flex items-center space-x-2 text-scientific-blue">
                <Zap className="w-5 h-5" />
                <span className="text-sm font-medium">Basato su Evidenze</span>
              </div>
              <div className="flex items-center space-x-2 text-performance-green">
                <Activity className="w-5 h-5" />
                <span className="text-sm font-medium">Risultati Misurabili</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="scientific" 
                size="xl"
                onClick={() => scrollToSection('contact')}
                className="group"
              >
                Inizia la Tua Consultazione
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="xl"
                onClick={() => scrollToSection('protocollo')}
              >
                Scopri il Metodo
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-8 border-t border-border">
              <div className="text-center">
                <div className="text-2xl font-bold text-scientific-blue">500+</div>
                <div className="text-sm text-muted-foreground">Clienti Ottimizzati</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-performance-green">95%</div>
                <div className="text-sm text-muted-foreground">Tasso di Successo</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-scientific-blue">10+</div>
                <div className="text-sm text-muted-foreground">Anni di Esperienza</div>
              </div>
            </div>
          </div>

          {/* Right Column - Image/Visual */}
          <div className="relative lg:pl-8">
            <div className="relative">
              {/* Main Image Container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-scientific-blue/20 to-performance-green/20 p-8">
                {/* Professional Image Placeholder */}
                <div className="aspect-[4/5] bg-gradient-to-br from-steel-blue/40 to-scientific-blue/20 rounded-xl flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-24 h-24 bg-scientific-blue/20 rounded-full flex items-center justify-center mx-auto">
                      <Activity className="w-12 h-12 text-scientific-blue" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-white">Dr. Protocollo</h3>
                      <p className="text-sm text-muted-foreground">Specialista in Longevità</p>
                    </div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 bg-performance-green text-white p-3 rounded-lg shadow-lg">
                  <div className="text-xs font-semibold">Biomarker</div>
                  <div className="text-lg font-bold">+25%</div>
                </div>
                
                <div className="absolute -bottom-4 -left-4 bg-scientific-blue text-white p-3 rounded-lg shadow-lg">
                  <div className="text-xs font-semibold">Energia</div>
                  <div className="text-lg font-bold">+40%</div>
                </div>
              </div>
              
              {/* Background Glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-scientific-blue/20 to-performance-green/20 rounded-3xl blur-xl opacity-50" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
          <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
}