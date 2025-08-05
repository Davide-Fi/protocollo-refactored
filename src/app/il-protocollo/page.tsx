import { Award, Target, Activity, CheckCircle } from "lucide-react";
import Navigation from "@/components/navigation";

export default function IlProtocolloPage() {
  return (
    <div className="min-h-screen bg-navy-charcoal text-white">
      <Navigation />
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-steel-blue/30 rounded-sm mb-6">
            <Award className="text-performance-green mr-2 h-4 w-4" />
            <span className="text-sm font-medium">Metodo Scientifico Avanzato</span>
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-black leading-tight mb-6">
            Il <span className="text-scientific-blue">Protocollo</span>
          </h1>
          
          <p className="text-xl text-slate-300 mb-12 leading-relaxed">
            Le leggi fondamentali della scienza della longevità. Il 20% degli sforzi che produce l&apos;80% dei benefici.
          </p>
        </div>
      </section>

      {/* What is the Protocol */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-steel-blue/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-center">
            Cos&apos;è il <span className="text-scientific-blue">Protocollo</span>?
          </h2>
          
          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-lg text-slate-300 mb-6">
              Consiste in protocolli di longevità basati sull&apos;evidenza scientifica per dieta, esercizio fisico, 
              sonno, cura della pelle e molto altro.
            </p>
            
            <p className="text-lg text-slate-300 mb-6">
              Abbiamo dedicato anni alla compilazione delle evidenze e allo sviluppo del protocollo attraverso 
              sperimentazione diretta. Abbiamo misurato l&apos;età biologica di oltre 70 organi e poi implementato 
              i protocolli per osservare gli effetti.
            </p>
            
            <p className="text-lg text-slate-300 mb-8">
              Abbiamo ripetuto questo processo più e più volte fino a diventare la persona più misurata nella storia. 
              È esattamente quello che facciamo ogni giorno e ci ha permesso di ottenere biomarcatori che si 
              classificano tra i migliori al mondo.
            </p>
          </div>
        </div>
      </section>

      {/* What's Different */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center">
            Cosa Rende <span className="text-scientific-blue">Diverso</span> il Nostro Protocollo?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-scientific-blue/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Target className="text-scientific-blue h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Revisione Scientifica Completa</h3>
                  <p className="text-slate-300">
                    Abbiamo esaminato tutta la scienza della longevità e classificato le strategie più potenti.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-performance-green/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Activity className="text-performance-green h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Misurazione Biologica di Base</h3>
                  <p className="text-slate-300">
                    Abbiamo effettuato misurazioni baseline dell&apos;età biologica degli organi.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="text-yellow-500 h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Implementazione Diretta</h3>
                  <p className="text-slate-300">
                    Abbiamo implementato la scienza attraverso sperimentazione personale diretta.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-scientific-blue/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Activity className="text-scientific-blue h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Misurazione Continua</h3>
                  <p className="text-slate-300">
                    Abbiamo misurato gli organi ripetutamente fino a diventare la persona più misurata nella storia.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-performance-green/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Award className="text-performance-green h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Risultati Top 1%</h3>
                  <p className="text-slate-300">
                    Abbiamo raggiunto risultati ottimali nel top 1% nei marcatori di salute completi.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="text-yellow-500 h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Accesso Libero</h3>
                  <p className="text-slate-300">
                    Abbiamo reso tutte queste informazioni gratuite e accessibili a tutti.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Created */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-steel-blue/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center">
            Perché Abbiamo <span className="text-scientific-blue">Creato</span> il Protocollo?
          </h2>
          
          <div className="space-y-8">
            <div className="bg-navy-charcoal p-8 rounded-lg border border-steel-blue/30">
              <h3 className="text-2xl font-semibold mb-4 text-performance-green">
                Per Risolvere i Nostri Problemi di Salute
              </h3>
              <p className="text-lg text-slate-300">
                Il viaggio è iniziato dalla necessità personale di affrontare e correggere 
                specifici problemi di salute attraverso un approccio scientifico rigoroso.
              </p>
            </div>
            
            <div className="bg-navy-charcoal p-8 rounded-lg border border-steel-blue/30">
              <h3 className="text-2xl font-semibold mb-4 text-scientific-blue">
                Per Fornire una Guida Chiara
              </h3>
              <p className="text-lg text-slate-300">
                Nel campo della salute tutti sono in disaccordo con tutti su tutto, rendendo 
                difficile sapere cosa fare. Volevamo creare una guida basata sull&apos;evidenza 
                che tutti potessero seguire con fiducia.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}