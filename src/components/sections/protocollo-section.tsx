'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Brain, Heart, Shield, Target, TrendingUp } from "lucide-react";

export default function ProtocolloSection() {
  const principles = [
    {
      icon: Brain,
      title: "Analisi Scientifica",
      description: "Valutiamo i tuoi biomarker attraverso analisi complete per identificare aree di ottimizzazione specifiche.",
      color: "text-scientific-blue"
    },
    {
      icon: Target,
      title: "Protocolli Personalizzati",
      description: "Creiamo strategie su misura basate sui tuoi obiettivi, genetica e stile di vita unici.",
      color: "text-performance-green"
    },
    {
      icon: TrendingUp,
      title: "Monitoraggio Continuo",
      description: "Tracciamo i progressi attraverso metriche oggettive e aggiustiamo i protocolli per risultati ottimali.",
      color: "text-scientific-blue"
    }
  ];

  const benefits = [
    {
      icon: Heart,
      title: "Salute Cardiovascolare",
      description: "Ottimizzazione della pressione arteriosa, colesterolo e funzione cardiaca"
    },
    {
      icon: Activity,
      title: "Performance Fisica",
      description: "Aumento di energia, forza e resistenza attraverso protocolli evidence-based"
    },
    {
      icon: Brain,
      title: "Funzione Cognitiva",
      description: "Miglioramento di memoria, focus e chiarezza mentale"
    },
    {
      icon: Shield,
      title: "Sistema Immunitario",
      description: "Rafforzamento delle difese naturali e riduzione dell'infiammazione"
    }
  ];

  return (
    <section id="protocollo" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-scientific-blue/10 border border-scientific-blue/20 text-scientific-blue text-sm font-medium mb-6">
            <Target className="w-4 h-4 mr-2" />
            La Metodologia Protocollo
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Il Metodo Scientifico per la
            <span className="text-scientific-blue"> Longevità Ottimale</span>
          </h2>
          
          <p className="text-xl text-muted-foreground leading-relaxed">
            Il nostro approccio si basa su tre pilastri fondamentali: analisi approfondita, 
            personalizzazione scientifica e monitoraggio continuo per garantire risultati duraturi.
          </p>
        </div>

        {/* Principles Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {principles.map((principle, index) => (
            <Card key={index} className="bg-card/50 border-border hover:bg-card/70 transition-all duration-300 group">
              <CardHeader className="text-center pb-4">
                <div className={`inline-flex p-4 rounded-2xl bg-background/50 w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <principle.icon className={`w-8 h-8 ${principle.color}`} />
                </div>
                <CardTitle className="text-xl text-white">{principle.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {principle.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Process Steps */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-white text-center mb-12">
            Il Tuo Percorso di Ottimizzazione
          </h3>
          
          <div className="grid lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Valutazione Iniziale",
                description: "Analisi completa di biomarker, storia medica e obiettivi personali"
              },
              {
                step: "02", 
                title: "Protocollo Personalizzato",
                description: "Creazione di un piano su misura per nutrizione, integrazione e lifestyle"
              },
              {
                step: "03",
                title: "Implementazione",
                description: "Supporto continuo nell'applicazione del protocollo nella vita quotidiana"
              },
              {
                step: "04",
                title: "Ottimizzazione",
                description: "Monitoraggio dei risultati e aggiustamenti per massimizzare i benefici"
              }
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-gradient-to-br from-scientific-blue/20 to-performance-green/20 rounded-2xl p-6 h-full border border-border">
                  <div className="text-4xl font-bold text-scientific-blue/30 mb-4">{item.step}</div>
                  <h4 className="text-lg font-semibold text-white mb-2">{item.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                </div>
                
                {/* Connector Line */}
                {index < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-scientific-blue to-performance-green" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-white text-center mb-12">
            Risultati che Puoi Aspettarti
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-card/30 rounded-xl p-6 border border-border hover:bg-card/50 transition-all duration-300 group">
                <div className="bg-scientific-blue/10 p-3 rounded-lg w-fit mb-4 group-hover:bg-scientific-blue/20 transition-colors">
                  <benefit.icon className="w-6 h-6 text-scientific-blue" />
                </div>
                <h4 className="font-semibold text-white mb-2">{benefit.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-scientific-blue/10 to-performance-green/10 rounded-2xl p-8 border border-border">
            <h3 className="text-2xl font-bold text-white mb-4">
              Pronto a Iniziare il Tuo Percorso?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Prenota una consultazione gratuita per scoprire come i nostri protocolli scientifici 
              possono trasformare la tua salute e longevità.
            </p>
            <Button 
              variant="scientific" 
              size="lg"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Prenota Consultazione Gratuita
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}