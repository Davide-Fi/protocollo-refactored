import { Apple, Sprout, Leaf, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NutrizioneSection() {
  const nutritionProtocols = [
    {
      icon: Apple,
      title: "Colazione Energetica",
      description: "Lenticchie, broccoli, cavolfiore e funghi per un inizio potente",
      timing: "Entro le 11:00"
    },
    {
      icon: Sprout,
      title: "Nutty Pudding",
      description: "Noci macadamia, semi e frutti per energia sostenuta",
      timing: "Spuntino perfetto"
    },
    {
      icon: Leaf,
      title: "Cena Vegetale",
      description: "Mix di verdure stagionali con spezie ottimizzate",
      timing: "Entro le 18:00"
    }
  ];

  return (
    <section id="nutrizione" className="py-20 bg-steel-blue/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-scientific-blue/20 rounded-sm mb-4">
            <span className="text-scientific-blue font-semibold text-sm">PRIORITÀ #1</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-black mb-6">
            Protocolli di <span className="text-scientific-blue">Nutrizione</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Alimentazione scientificamente ottimizzata per massimizzare energia, prestazioni cognitive e longevità.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img 
              src="/attached_assets/generated_images/Italian_man_eating_healthy_nutrition_meal_b9e3d4f2.png" 
              alt="Uomo italiano che mangia pasto nutritivo e salutare" 
              className="w-full h-auto rounded-lg shadow-xl"
            />
          </div>
          
          <div>
            <h3 className="text-3xl font-bold mb-6">Sistema Nutrizionale Autonomo</h3>
            <p className="text-slate-300 mb-8 text-lg">
              Il tuo corpo detta le regole. Protocolli basati su dati scientifici per ottimizzare ogni aspetto 
              della tua alimentazione, dal timing dei pasti alla composizione dei macronutrienti.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-performance-green h-5 w-5" />
                <span>Finestra alimentare ottimizzata (8 ore)</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-performance-green h-5 w-5" />
                <span>Target: 35+ kg di verdure al mese</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-performance-green h-5 w-5" />
                <span>Proteine vegetali ad alto valore biologico</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-performance-green h-5 w-5" />
                <span>Micronutrienti essenziali bilanciati</span>
              </div>
            </div>
            
            <Button className="bg-scientific-blue hover:bg-scientific-blue/80 text-white px-8 py-3 font-semibold">
              Accedi ai Piani Nutrizionali
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {nutritionProtocols.map((protocol, index) => (
            <div key={index} className="bg-navy-charcoal border border-steel-blue/30 p-6 rounded-lg hover:border-scientific-blue/50 transition-colors">
              <div className="w-12 h-12 bg-scientific-blue/20 rounded-lg flex items-center justify-center mb-4">
                <protocol.icon className="text-scientific-blue h-6 w-6" />
              </div>
              <h4 className="text-xl font-bold mb-3">{protocol.title}</h4>
              <p className="text-slate-400 mb-4">{protocol.description}</p>
              <div className="text-sm text-performance-green font-semibold">{protocol.timing}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
