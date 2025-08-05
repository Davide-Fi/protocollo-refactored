'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Apple, Clock, Target, TrendingUp, Utensils, Zap } from "lucide-react";

export default function NutrizioneSection() {
  const nutritionPillars = [
    {
      icon: Target,
      title: "Personalizzazione Genetica",
      description: "Protocolli nutrizionali basati su SNPs specifici per metabolismo dei macronutrienti",
      features: ["Test genetici nutrizionali", "Protocolli su misura", "Ottimizzazione assorbimento"],
      color: "text-orange-400"
    },
    {
      icon: Clock,
      title: "Timing Nutrizionale",
      description: "Ottimizzazione dei tempi di assunzione basata su cronobiologia e ritmi circadiani",
      features: ["Finestre anaboliche", "Sincronizzazione ormonale", "Performance periodica"],
      color: "text-green-400"
    },
    {
      icon: TrendingUp,
      title: "Tracking Biomarker",
      description: "Monitoraggio continuo dell'impatto nutrizionale sui parametri ematici chiave",
      features: ["Analisi periodiche", "Aggiustamenti real-time", "Risultati misurabili"],
      color: "text-blue-400"
    }
  ];

  const protocols = [
    {
      name: "Ottimizzazione Testosterone",
      description: "Protocollo nutrizionale per massimizzare la produzione endogena di testosterone",
      keyFoods: ["Grassi saturi", "Zinco", "Vitamina D", "Colesterolo"],
      results: "+35% testosterone in 12 settimane",
      difficulty: "Intermedio"
    },
    {
      name: "Anti-Inflammatory Protocol",
      description: "Riduzione dell'infiammazione sistemica attraverso nutrienti specifici",
      keyFoods: ["Omega-3", "Curcumina", "Resveratrolo", "Verdure crucifere"],
      results: "-40% PCR in 8 settimane",
      difficulty: "Facile"
    },
    {
      name: "Cognitive Enhancement",
      description: "Nutrienti nootropici per ottimizzare funzione cerebrale e neuroplasticità",
      keyFoods: ["DHA", "Bacopa", "Lion's Mane", "Fosfatidilserina"],
      results: "+28% performance cognitiva",
      difficulty: "Avanzato"
    }
  ];

  const macroStrategies = [
    {
      strategy: "Protein Cycling",
      description: "Alternanza strategica dell'intake proteico per ottimizzare mTOR e autofagia",
      ratio: "1.6-2.2g/kg",
      timing: "Post-workout + sera",
      benefits: ["Sintesi proteica", "Recupero muscolare", "Longevità cellulare"]
    },
    {
      strategy: "Carb Periodization",
      description: "Modulazione dei carboidrati basata su training, sonno e sensibilità insulinica",
      ratio: "2-6g/kg variabile",
      timing: "Pre/post allenamento",
      benefits: ["Performance", "Composizione corporea", "Metabolic flexibility"]
    },
    {
      strategy: "Fat Optimization",
      description: "Selezione di lipidi per ottimizzare profilo ormonale e infiammatorio",
      ratio: "1-1.5g/kg",
      timing: "Lontano da training",
      benefits: ["Testosterone", "Assorbimento vitamine", "Sazietà"]
    }
  ];

  return (
    <section id="nutrizione" className="py-20 bg-gradient-to-br from-background to-orange-500/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium mb-6">
            <Apple className="w-4 h-4 mr-2" />
            Nutrizione Scientifica
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Nutrizione di Precisione per
            <span className="text-orange-400"> Massime Performance</span>
          </h2>
          
          <p className="text-xl text-muted-foreground leading-relaxed">
            La nutrizione non è una taglia unica. I nostri protocolli sono calibrati sulla tua 
            genetica, biomarker e obiettivi specifici per risultati ottimali e sostenibili.
          </p>
        </div>

        {/* Nutrition Pillars */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {nutritionPillars.map((pillar, index) => (
            <Card key={index} className="bg-card/50 border-border hover:bg-card/70 transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className={`p-3 rounded-xl bg-background/50 w-fit mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <pillar.icon className={`w-6 h-6 ${pillar.color}`} />
                </div>
                <CardTitle className="text-xl text-white">{pillar.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground mb-4 leading-relaxed">
                  {pillar.description}
                </CardDescription>
                
                <div className="space-y-2">
                  {pillar.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-sm">
                      <Zap className={`w-3 h-3 ${pillar.color} mr-2 flex-shrink-0`} />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Specialized Protocols */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-white text-center mb-12">
            Protocolli Nutrizionali Specializzati
          </h3>
          
          <div className="grid lg:grid-cols-3 gap-6">
            {protocols.map((protocol, index) => (
              <div key={index} className="bg-gradient-to-br from-card/30 to-orange-500/10 rounded-xl p-6 border border-border hover:from-card/50 hover:to-orange-500/20 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-white">{protocol.name}</h4>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    protocol.difficulty === 'Facile' ? 'bg-green-500/20 text-green-400' :
                    protocol.difficulty === 'Intermedio' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {protocol.difficulty}
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {protocol.description}
                </p>
                
                <div className="space-y-3">
                  <div>
                    <div className="text-xs font-semibold text-orange-400 mb-2">Nutrienti Chiave</div>
                    <div className="flex flex-wrap gap-2">
                      {protocol.keyFoods.map((food, foodIndex) => (
                        <span key={foodIndex} className="bg-background/50 px-2 py-1 rounded text-xs text-white">
                          {food}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-performance-green/10 rounded-lg p-3">
                    <div className="text-xs font-semibold text-performance-green mb-1">Risultato Atteso</div>
                    <div className="text-sm text-white">{protocol.results}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Macro Strategies */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-white text-center mb-12">
            Strategie Macronutrienti
          </h3>
          
          <div className="grid lg:grid-cols-3 gap-6">
            {macroStrategies.map((macro, index) => (
              <div key={index} className="bg-gradient-to-br from-scientific-blue/10 to-performance-green/10 rounded-xl p-6 border border-border">
                <h4 className="font-semibold text-white mb-2">{macro.strategy}</h4>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {macro.description}
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-background/30 rounded-lg p-3">
                    <div className="text-xs text-muted-foreground mb-1">Quantità</div>
                    <div className="text-sm font-semibold text-white">{macro.ratio}</div>
                  </div>
                  <div className="bg-background/30 rounded-lg p-3">
                    <div className="text-xs text-muted-foreground mb-1">Timing</div>
                    <div className="text-sm font-semibold text-white">{macro.timing}</div>
                  </div>
                </div>
                
                <div>
                  <div className="text-xs font-semibold text-scientific-blue mb-2">Benefici</div>
                  <div className="space-y-1">
                    {macro.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center text-xs text-muted-foreground">
                        <div className="w-1 h-1 bg-performance-green rounded-full mr-2" />
                        {benefit}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nutrition Results */}
        <div className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 rounded-2xl p-8 border border-border mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">Risultati Nutrizionali</h3>
            <p className="text-muted-foreground">Miglioramenti medi dei nostri clienti</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-orange-400 mb-2">+35%</div>
              <div className="text-sm text-muted-foreground">Testosterone</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400 mb-2">-25%</div>
              <div className="text-sm text-muted-foreground">Grasso Corporeo</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-2">+40%</div>
              <div className="text-sm text-muted-foreground">Energia</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400 mb-2">-40%</div>
              <div className="text-sm text-muted-foreground">Infiammazione</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Ottimizza la Tua Nutrizione Oggi
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Ricevi un piano nutrizionale personalizzato basato sui tuoi biomarker, 
            genetica e obiettivi specifici.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="scientific" 
              size="lg"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Utensils className="w-5 h-5 mr-2" />
              Piano Nutrizionale Personalizzato
            </Button>
            <Button variant="outline" size="lg">
              Scarica Guida Gratuita
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}