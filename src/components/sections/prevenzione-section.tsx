'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, AlertTriangle, Heart, Brain, Activity, CheckCircle2 } from "lucide-react";

export default function PrevenzionSection() {
  const preventionAreas = [
    {
      icon: Heart,
      title: "Salute Cardiovascolare",
      description: "Prevenzione di malattie cardiache attraverso ottimizzazione di lipidi, pressione e funzione endoteliale",
      risk: "Riduzione rischio del 65%",
      tests: ["Lipidogramma avanzato", "Proteina C-reattiva", "Omocisteina", "Calcio coronarico"],
      color: "text-red-400"
    },
    {
      icon: Brain,
      title: "Funzione Neurocognitiva",
      description: "Protezione del declino cognitivo e prevenzione di disturbi neurodegenerativi",
      risk: "Riduzione rischio del 45%",
      tests: ["BDNF", "Tau protein", "Beta-amiloide", "Test cognitivi"],
      color: "text-blue-400"
    },
    {
      icon: Activity,
      title: "Metabolismo e Diabete",
      description: "Prevenzione del diabete tipo 2 e ottimizzazione della sensibilità insulinica",
      risk: "Riduzione rischio del 78%",
      tests: ["HbA1c", "HOMA-IR", "Peptide C", "Glicemia continua"],
      color: "text-green-400"
    }
  ];

  const riskFactors = [
    {
      category: "Fattori Cardiovascolari",
      factors: [
        { name: "Ipertensione", prevalence: "35% uomini >40 anni", preventable: true },
        { name: "Colesterolo elevato", prevalence: "28% popolazione", preventable: true },
        { name: "Sindrome metabolica", prevalence: "25% uomini adulti", preventable: true }
      ]
    },
    {
      category: "Fattori Metabolici",
      factors: [
        { name: "Resistenza insulinica", prevalence: "30% uomini >35 anni", preventable: true },
        { name: "Obesità addominale", prevalence: "42% popolazione", preventable: true },
        { name: "Infiammazione cronica", prevalence: "38% uomini", preventable: true }
      ]
    },
    {
      category: "Fattori Ormonali",
      factors: [
        { name: "Testosterone basso", prevalence: "25% uomini >40 anni", preventable: true },
        { name: "Cortisolo elevato", prevalence: "22% professionisti", preventable: true },
        { name: "Disruption circadiano", prevalence: "45% popolazione", preventable: true }
      ]
    }
  ];

  const protocols = [
    {
      title: "Screening Biomarker Completo",
      description: "Valutazione di 150+ parametri per identificare precocemente fattori di rischio",
      frequency: "Ogni 6 mesi",
      icon: Shield
    },
    {
      title: "Ottimizzazione Nutrizionale",
      description: "Protocolli alimentari personalizzati per la prevenzione di malattie croniche",
      frequency: "Aggiornamento mensile",
      icon: Heart
    },
    {
      title: "Monitoraggio Continuo",
      description: "Tracking 24/7 di metriche chiave attraverso dispositivi wearable avanzati",
      frequency: "Tempo reale",
      icon: Activity
    }
  ];

  return (
    <section id="prevenzione" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium mb-6">
            <Shield className="w-4 h-4 mr-2" />
            Medicina Preventiva
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Prevenire è Meglio che
            <span className="text-red-400"> Curare</span>
          </h2>
          
          <p className="text-xl text-muted-foreground leading-relaxed">
            Il nostro approccio preventivo identifica e neutralizza i fattori di rischio prima 
            che si trasformino in patologie, garantendo una longevità sana e attiva.
          </p>
        </div>

        {/* Prevention Areas */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {preventionAreas.map((area, index) => (
            <Card key={index} className="bg-card/50 border-border hover:bg-card/70 transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-background/50 group-hover:scale-110 transition-transform duration-300`}>
                    <area.icon className={`w-6 h-6 ${area.color}`} />
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-semibold ${area.color}`}>{area.risk}</div>
                    <div className="text-xs text-muted-foreground">rischio</div>
                  </div>
                </div>
                <CardTitle className="text-xl text-white">{area.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground mb-4 leading-relaxed">
                  {area.description}
                </CardDescription>
                
                <div className="space-y-2">
                  <div className="text-sm font-medium text-white mb-2">Test Chiave:</div>
                  {area.tests.map((test, testIndex) => (
                    <div key={testIndex} className="flex items-center text-sm text-muted-foreground">
                      <CheckCircle2 className="w-3 h-3 text-performance-green mr-2 flex-shrink-0" />
                      {test}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Risk Factors Grid */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-white text-center mb-12">
            Fattori di Rischio Modificabili
          </h3>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {riskFactors.map((category, index) => (
              <div key={index} className="bg-gradient-to-br from-card/30 to-steel-blue/10 rounded-xl p-6 border border-border">
                <h4 className="font-semibold text-white mb-4 text-center">{category.category}</h4>
                <div className="space-y-3">
                  {category.factors.map((factor, factorIndex) => (
                    <div key={factorIndex} className="bg-background/30 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-white">{factor.name}</span>
                        {factor.preventable && (
                          <AlertTriangle className="w-4 h-4 text-yellow-500" />
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">{factor.prevalence}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Prevention Protocols */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-white text-center mb-12">
            I Nostri Protocolli Preventivi
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {protocols.map((protocol, index) => (
              <div key={index} className="bg-gradient-to-br from-scientific-blue/10 to-performance-green/10 rounded-xl p-6 border border-border hover:from-scientific-blue/20 hover:to-performance-green/20 transition-all duration-300">
                <div className="bg-background/50 p-3 rounded-lg w-fit mb-4">
                  <protocol.icon className="w-6 h-6 text-scientific-blue" />
                </div>
                
                <h4 className="font-semibold text-white mb-2">{protocol.title}</h4>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{protocol.description}</p>
                
                <div className="bg-performance-green/10 rounded-lg p-3">
                  <div className="text-xs font-semibold text-performance-green mb-1">Frequenza</div>
                  <div className="text-sm text-white">{protocol.frequency}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Prevention Stats */}
        <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-2xl p-8 border border-border mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">Impatto della Prevenzione</h3>
            <p className="text-muted-foreground">Risultati ottenuti dai nostri clienti</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-red-400 mb-2">-65%</div>
              <div className="text-sm text-muted-foreground">Rischio Cardiovascolare</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-2">-45%</div>
              <div className="text-sm text-muted-foreground">Declino Cognitivo</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400 mb-2">-78%</div>
              <div className="text-sm text-muted-foreground">Rischio Diabete</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400 mb-2">+12</div>
              <div className="text-sm text-muted-foreground">Anni di Vita Sana</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Inizia la Tua Prevenzione Oggi
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Non aspettare che sia troppo tardi. Un check-up preventivo completo può 
            identificare e neutralizzare i fattori di rischio prima che diventino problemi.
          </p>
          <Button 
            variant="scientific" 
            size="lg"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <Shield className="w-5 h-5 mr-2" />
            Prenota Check-up Preventivo
          </Button>
        </div>
      </div>
    </section>
  );
}