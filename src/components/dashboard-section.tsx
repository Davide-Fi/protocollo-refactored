import { Dna, Heart, Moon, Activity } from "lucide-react";

export default function DashboardSection() {
  const metrics = [
    {
      title: "Target Età Biologica",
      value: "-22 anni",
      subtitle: "Obiettivo vs cronologica",
      icon: Dna,
      color: "performance-green"
    },
    {
      title: "Target VO2 Max",
      value: "55+ ml/kg/min",
      subtitle: "Puntare al top 0.5%",
      icon: Heart,
      color: "scientific-blue"
    },
    {
      title: "Target Sonno",
      value: "92%",
      subtitle: "8h 30m efficienza ideale",
      icon: Moon,
      color: "yellow-500"
    },
    {
      title: "Target HRV",
      value: "75+ ms",
      subtitle: "Recupero ottimale",
      icon: Activity,
      color: "performance-green"
    }
  ];

  const progress = [
    { label: "Target Nutrizione", value: 98, color: "performance-green" },
    { label: "Target Integrazione", value: 95, color: "scientific-blue" },
    { label: "Target Prevenzione", value: 97, color: "yellow-500" },
    { label: "Target Fitness", value: 99, color: "performance-green" }
  ];

  return (
    <section id="dashboard" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-black mb-6">
            Dashboard <span className="text-scientific-blue">Performance</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Traccia ogni aspetto della tua ottimizzazione con metriche scientificamente accurate.
          </p>
        </div>

        <div className="bg-steel-blue/10 border border-steel-blue/30 rounded-lg p-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold mb-6">Metriche Chiave</h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {metrics.map((metric, index) => (
                  <div key={index} className="bg-navy-charcoal p-6 rounded-lg border border-steel-blue/30">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold">{metric.title}</h4>
                      <metric.icon className={`text-${metric.color} h-5 w-5`} />
                    </div>
                    <div className={`text-3xl font-bold text-${metric.color} mb-1`}>{metric.value}</div>
                    <div className="text-sm text-slate-400">{metric.subtitle}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-6">Progresso</h3>
              
              <div className="space-y-6">
                {progress.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold">{item.label}</span>
                      <span className={`text-${item.color} text-sm`}>{item.value}%</span>
                    </div>
                    <div className="w-full bg-steel-blue/30 rounded-full h-2">
                      <div 
                        className={`bg-${item.color} h-2 rounded-full transition-all duration-300`}
                        style={{ width: `${item.value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-4 bg-scientific-blue/10 rounded-lg border border-scientific-blue/30">
                <h4 className="font-semibold mb-2">Target Longevità</h4>
                <div className="text-4xl font-black text-scientific-blue">98/100</div>
                <div className="text-sm text-slate-400">Obiettivo elite</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}