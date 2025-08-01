import { Brain, Heart, Dumbbell, Shield, Battery, Moon, Leaf, Rocket, Crown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function IntegrazioneSection() {
  const benefits = [
    { icon: Brain, label: "Funzione Cognitiva" },
    { icon: Heart, label: "Salute Cardiovascolare" },
    { icon: Dumbbell, label: "Prestazioni Fisiche" },
    { icon: Shield, label: "Sistema Immunitario" },
    { icon: Battery, label: "Energia Sostenuta" },
    { icon: Moon, label: "Qualità del Sonno" }
  ];

  const stacks = [
    {
      name: "Stack Fondazione",
      description: "Essenziali per iniziare",
      icon: Leaf,
      price: 89,
      features: ["Longevity Mix", "Capsule Essenziali", "Olio Extra Vergine"],
      color: "performance-green",
      popular: false
    },
    {
      name: "Stack Performance",
      description: "Massima ottimizzazione",
      icon: Rocket,
      price: 149,
      features: ["Tutto dello Stack Fondazione", "Antiossidanti Avanzati", "Adattogeni Premium", "Nootropi Cognitivi"],
      color: "scientific-blue",
      popular: true
    },
    {
      name: "Stack Ultimate",
      description: "Protocollo completo",
      icon: Crown,
      price: 299,
      features: ["Tutto dello Stack Performance", "Test Biomarcatori", "Consulenza Personalizzata"],
      color: "yellow-500",
      popular: false
    }
  ];

  return (
    <section id="integrazione" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-performance-green/20 rounded-sm mb-4">
            <span className="text-performance-green font-semibold text-sm">PRIORITÀ #2</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-black mb-6">
            Stack di <span className="text-performance-green">Integrazione</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Integratori scientificamente dosati per ottimizzare prestazioni, recupero e longevità cellulare.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-3xl font-bold mb-6">Stack Ultimate Longevità</h3>
            <p className="text-slate-300 mb-8 text-lg">
              Combinazione precisa di 40+ composti bioattivi, dosati con precisione scientifica per 
              massimizzare l'assorbimento e l'efficacia. Ogni ingrediente è testato per purezza e potenza.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <benefit.icon className="text-scientific-blue h-5 w-5" />
                  <span className="text-sm">{benefit.label}</span>
                </div>
              ))}
            </div>
            
            <Button className="bg-performance-green hover:bg-performance-green/80 text-white px-8 py-3 font-semibold">
              Visualizza Stack Completo
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <img 
              src="https://images.unsplash.com/photo-1534368420009-621bfab424a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=500" 
              alt="Athletic man doing floor exercises at the gym" 
              className="w-full h-auto rounded-lg shadow-xl"
            />
            <img 
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=500" 
              alt="Athletic man drinking protein shake for fitness" 
              className="w-full h-auto rounded-lg shadow-xl mt-8"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {stacks.map((stack, index) => (
            <div 
              key={index} 
              className={`bg-steel-blue/20 border p-8 rounded-lg transition-colors relative ${
                stack.popular 
                  ? 'border-2 border-scientific-blue bg-scientific-blue/10' 
                  : 'border-steel-blue/30 hover:border-scientific-blue/50'
              }`}
            >
              {stack.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-scientific-blue text-white px-4 py-1 text-sm font-bold rounded-sm">
                    PIÙ POPOLARE
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <div className={`w-16 h-16 bg-${stack.color}/20 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <stack.icon className={`text-${stack.color} h-8 w-8`} />
                </div>
                <h4 className="text-2xl font-bold mb-2">{stack.name}</h4>
                <p className="text-slate-400">{stack.description}</p>
              </div>
              
              <ul className="space-y-3 mb-8 text-sm">
                {stack.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-3">
                    <Check className={`text-${stack.color} h-4 w-4`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">
                  €{stack.price}<span className="text-lg text-slate-400">/mese</span>
                </div>
                <Button 
                  className={`w-full ${
                    stack.popular 
                      ? 'bg-scientific-blue hover:bg-scientific-blue/80' 
                      : stack.color === 'performance-green'
                        ? 'bg-performance-green hover:bg-performance-green/80'
                        : 'bg-yellow-500 hover:bg-yellow-600 text-black'
                  } font-semibold`}
                >
                  {stack.popular ? 'Scegli Performance' : 
                   stack.color === 'performance-green' ? 'Inizia Stack' : 'Protocollo Ultimate'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
