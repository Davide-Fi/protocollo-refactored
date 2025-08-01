import { Heart, Brain, Dna, Moon, Activity, Thermometer, Microscope } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PreventioneSection() {
  const preventionAreas = [
    {
      icon: Heart,
      title: "Salute Cardiovascolare",
      description: "Protocolli per mantenere arterie giovani e cuore forte"
    },
    {
      icon: Brain,
      title: "Neuroprotezione",
      description: "Strategie per preservare funzioni cognitive e memoria"
    },
    {
      icon: Dna,
      title: "Salute Cellulare",
      description: "Protocolli anti-aging per rallentare l'invecchiamento"
    }
  ];

  const protocolCategories = [
    {
      icon: Moon,
      title: "Protocollo Sonno",
      description: "8+ ore di sonno ottimizzato per il recupero",
      target: "Obiettivo: 92% efficienza"
    },
    {
      icon: Activity,
      title: "Protocollo Fitness",
      description: "Allenamento quotidiano per forza e resistenza",
      target: "Obiettivo: VO2Max 55+"
    },
    {
      icon: Thermometer,
      title: "Controllo Stress",
      description: "Tecniche per gestire cortisolo e stress cronico",
      target: "Obiettivo: HRV 75+"
    },
    {
      icon: Microscope,
      title: "Monitoraggio",
      description: "Test biomarcatori per tracking continuo",
      target: "Obiettivo: 85+ marcatori"
    }
  ];

  return (
    <section id="prevenzione" className="py-20 bg-steel-blue/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-yellow-500/20 rounded-sm mb-4">
            <span className="text-yellow-500 font-semibold text-sm">PRIORITÀ #3</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-black mb-6">
            Protocolli di <span className="text-yellow-500">Prevenzione</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Strategie avanzate per prevenire l'invecchiamento cellulare e ottimizzare la salute a lungo termine.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img 
              src="/attached_assets/generated_images/Italian_man_focused_health_optimization_prevention_3d851534.png" 
              alt="Uomo atletico italiano concentrato su ottimizzazione salute e prevenzione" 
              className="w-full h-auto rounded-lg shadow-xl"
            />
          </div>
          
          <div>
            <h3 className="text-3xl font-bold mb-6">Prevenzione Scientifica</h3>
            <p className="text-slate-300 mb-8 text-lg">
              Anticipa i problemi prima che si manifestino. Protocolli basati sui più recenti 
              studi scientifici per mantenere il tuo corpo in stato ottimale per decenni.
            </p>
            
            <div className="space-y-6 mb-8">
              {preventionAreas.map((area, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <area.icon className="text-yellow-500 h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">{area.title}</h4>
                    <p className="text-slate-400 text-sm">{area.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3 font-semibold">
              Accedi ai Protocolli
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {protocolCategories.map((category, index) => (
            <div key={index} className="bg-navy-charcoal border border-steel-blue/30 p-6 rounded-lg hover:border-yellow-500/50 transition-colors text-center">
              <category.icon className="text-yellow-500 h-12 w-12 mx-auto mb-4" />
              <h4 className="text-lg font-bold mb-3">{category.title}</h4>
              <p className="text-slate-400 text-sm mb-4">{category.description}</p>
              <div className="text-yellow-500 font-semibold text-sm">{category.target}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
