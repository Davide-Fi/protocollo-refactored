import { ArrowRight, Award, Target, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function ProtocolloSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-steel-blue/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-scientific-blue/30 rounded-sm mb-6">
            <Award className="text-performance-green mr-2 h-4 w-4" />
            <span className="text-sm font-medium">Metodologia Scientifica</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-black leading-tight mb-6">
            Scopri <span className="text-scientific-blue">Il Protocollo</span>
          </h2>
          
          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Le leggi fondamentali della scienza della longevità. Il 20% degli sforzi 
            che produce l'80% dei benefici basati su evidenze scientifiche.
          </p>
        </div>

        <div className="bg-navy-charcoal rounded-lg border-2 border-scientific-blue/30 p-8 lg:p-12 relative overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-scientific-blue/10 to-performance-green/10 rounded-lg"></div>
          
          <div className="relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-6 text-white">
                  La Metodologia Più Avanzata
                </h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-scientific-blue/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Target className="text-scientific-blue h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-slate-300">
                        <span className="font-semibold text-white">Revisione Scientifica Completa:</span> Esaminata 
                        tutta la scienza della longevità per identificare le strategie più potenti.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-performance-green/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Activity className="text-performance-green h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-slate-300">
                        <span className="font-semibold text-white">Misurazione Continua:</span> Oltre 70 organi 
                        misurati ripetutamente per ottimizzare ogni aspetto della salute.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Award className="text-yellow-500 h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-slate-300">
                        <span className="font-semibold text-white">Risultati Top 1%:</span> Biomarcatori che si 
                        classificano tra i migliori al mondo attraverso implementazione scientifica.
                      </p>
                    </div>
                  </div>
                </div>
                
                <Link href="/il-protocollo">
                  <Button 
                    size="lg" 
                    className="bg-scientific-blue hover:bg-scientific-blue/80 text-white font-semibold group"
                  >
                    Scopri Il Protocollo Completo
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
              
              <div className="bg-steel-blue/30 rounded-lg p-8 border border-steel-blue/50">
                <h4 className="text-2xl font-bold mb-6 text-center text-scientific-blue">
                  Cosa Include
                </h4>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-navy-charcoal/50 rounded-lg border border-steel-blue/30">
                    <span className="font-medium text-white">Protocolli Nutrizionali</span>
                    <span className="text-performance-green font-bold">✓</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-navy-charcoal/50 rounded-lg border border-steel-blue/30">
                    <span className="font-medium text-white">Strategie di Integrazione</span>
                    <span className="text-performance-green font-bold">✓</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-navy-charcoal/50 rounded-lg border border-steel-blue/30">
                    <span className="font-medium text-white">Protocolli di Prevenzione</span>
                    <span className="text-performance-green font-bold">✓</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-navy-charcoal/50 rounded-lg border border-steel-blue/30">
                    <span className="font-medium text-white">Metodologia Scientifica</span>
                    <span className="text-performance-green font-bold">✓</span>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <p className="text-sm text-slate-400">
                    Accesso gratuito a tutte le informazioni
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}