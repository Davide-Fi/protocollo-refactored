'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pill, FlaskConical, Target, AlertCircle, TrendingUp } from "lucide-react";

export default function IntegrazioneSection() {
  const supplementCategories = [
    {
      icon: TrendingUp,
      title: "Performance & Energia",
      description: "Supplementi per ottimizzare energia, focus e performance fisica e mentale",
      supplements: [
        { name: "Creatina Monoidrato", dosage: "5g/die", timing: "Post-workout", evidence: "A++" },
        { name: "Caffeina + L-Teanina", dosage: "200mg + 100mg", timing: "Mattina", evidence: "A+" },
        { name: "Beta-Alanina", dosage: "3-5g/die", timing: "Pre-workout", evidence: "A" },
        { name: "Citrullina Malato", dosage: "6-8g", timing: "30min pre-workout", evidence: "A" }
      ],
      color: "text-green-400"
    },
    {
      icon: FlaskConical,
      title: "Longevità & Anti-Aging",
      description: "Composti evidence-based per rallentare l'invecchiamento cellulare",
      supplements: [
        { name: "NMN", dosage: "500-1000mg", timing: "Mattina a digiuno", evidence: "B+" },
        { name: "Resveratrolo", dosage: "250-500mg", timing: "Con grassi", evidence: "B" },
        { name: "Spermidina", dosage: "10-30mg", timing: "Mattina", evidence: "B+" },
        { name: "Fisetin", dosage: "100mg", timing: "2-3x/settimana", evidence: "B" }
      ],
      color: "text-blue-400"
    },
    {
      icon: Target,
      title: "Ottimizzazione Ormonale",
      description: "Supporto naturale per ottimizzare il profilo ormonale maschile",
      supplements: [
        { name: "Vitamina D3+K2", dosage: "4000UI + 100mcg", timing: "Con grassi", evidence: "A++" },
        { name: "Zinco", dosage: "15-30mg", timing: "Stomaco vuoto", evidence: "A+" },
        { name: "Magnesio Glicinato", dosage: "400-600mg", timing: "Sera", evidence: "A+" },
        { name: "Ashwagandha KSM-66", dosage: "600mg", timing: "Sera", evidence: "A" }
      ],
      color: "text-purple-400"
    }
  ];

  const protocols = [
    {
      name: "Stack Testosterone",
      description: "Protocollo completo per ottimizzazione naturale del testosterone",
      duration: "12 settimane",
      supplements: ["Vitamina D3+K2", "Zinco", "Magnesio", "Ashwagandha", "Boron"],
      expectedIncrease: "+25-35%",
      costPerMonth: "€89"
    },
    {
      name: "Stack Longevità",
      description: "Combinazione sinergica di composti anti-aging evidence-based",
      duration: "Continuo",
      supplements: ["NMN", "Resveratrolo", "Spermidina", "Omega-3", "Curcumina"],
      expectedIncrease: "Età biologica -3-5 anni",
      costPerMonth: "€145"
    },
    {
      name: "Stack Performance",
      description: "Ottimizzazione di energia, focus e performance atletica",
      duration: "Ciclico 8 settimane",
      supplements: ["Creatina", "Beta-Alanina", "Citrullina", "Rhodiola", "CoQ10"],
      expectedIncrease: "+20-30% performance",
      costPerMonth: "€67"
    }
  ];

  const qualityStandards = [
    {
      standard: "Third-Party Testing",
      description: "Tutti i prodotti testati da laboratori indipendenti per purezza e potenza",
      importance: "Critico"
    },
    {
      standard: "GMP Certification",
      description: "Produzione in facilities certificate Good Manufacturing Practice",
      importance: "Essenziale"
    },
    {
      standard: "COA Availability",
      description: "Certificate of Analysis disponibili per ogni lotto di produzione",
      importance: "Importante"
    },
    {
      standard: "Bioavailability",
      description: "Forme più biodisponibili e assorbibili dei nutrienti",
      importance: "Critico"
    }
  ];

  const getEvidenceColor = (evidence: string) => {
    switch (evidence) {
      case 'A++': return 'text-emerald-400 bg-emerald-400/10';
      case 'A+': return 'text-green-400 bg-green-400/10';
      case 'A': return 'text-blue-400 bg-blue-400/10';
      case 'B+': return 'text-yellow-400 bg-yellow-400/10';
      case 'B': return 'text-orange-400 bg-orange-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  return (
    <section id="integrazione" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-6">
            <Pill className="w-4 h-4 mr-2" />
            Integrazione Scientifica
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Supplementazione di Precisione per
            <span className="text-purple-400"> Risultati Ottimali</span>
          </h2>
          
          <p className="text-xl text-muted-foreground leading-relaxed">
            Non tutti i supplementi sono creati uguali. I nostri protocolli utilizzano solo 
            composti evidence-based, nelle forme più biodisponibili e ai dosaggi clinicamente validati.
          </p>
        </div>

        {/* Supplement Categories */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {supplementCategories.map((category, index) => (
            <Card key={index} className="bg-card/50 border-border hover:bg-card/70 transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className={`p-3 rounded-xl bg-background/50 w-fit mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className={`w-6 h-6 ${category.color}`} />
                </div>
                <CardTitle className="text-xl text-white">{category.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground mb-4 leading-relaxed">
                  {category.description}
                </CardDescription>
                
                <div className="space-y-3">
                  {category.supplements.map((supplement, suppIndex) => (
                    <div key={suppIndex} className="bg-background/30 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-white">{supplement.name}</span>
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${getEvidenceColor(supplement.evidence)}`}>
                          {supplement.evidence}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                        <div>
                          <span className="font-medium">Dose:</span> {supplement.dosage}
                        </div>
                        <div>
                          <span className="font-medium">Timing:</span> {supplement.timing}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Supplement Protocols */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-white text-center mb-12">
            Stack Protocolli Personalizzati
          </h3>
          
          <div className="grid lg:grid-cols-3 gap-6">
            {protocols.map((protocol, index) => (
              <div key={index} className="bg-gradient-to-br from-card/30 to-purple-500/10 rounded-xl p-6 border border-border hover:from-card/50 hover:to-purple-500/20 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-white">{protocol.name}</h4>
                  <div className="text-right">
                    <div className="text-sm font-bold text-performance-green">{protocol.costPerMonth}</div>
                    <div className="text-xs text-muted-foreground">al mese</div>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {protocol.description}
                </p>
                
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-background/30 rounded-lg p-2">
                      <div className="text-xs text-muted-foreground mb-1">Durata</div>
                      <div className="text-sm font-semibold text-white">{protocol.duration}</div>
                    </div>
                    <div className="bg-performance-green/10 rounded-lg p-2">
                      <div className="text-xs text-performance-green mb-1">Risultato</div>
                      <div className="text-sm font-semibold text-white">{protocol.expectedIncrease}</div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-xs font-semibold text-purple-400 mb-2">Supplementi Inclusi</div>
                    <div className="flex flex-wrap gap-1">
                      {protocol.supplements.map((supp, suppIndex) => (
                        <span key={suppIndex} className="bg-background/50 px-2 py-1 rounded text-xs text-white">
                          {supp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quality Standards */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-white text-center mb-12">
            Standard di Qualità
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {qualityStandards.map((standard, index) => (
              <div key={index} className="bg-gradient-to-br from-scientific-blue/10 to-performance-green/10 rounded-xl p-6 border border-border">
                <div className="flex items-center justify-between mb-3">
                  <FlaskConical className="w-5 h-5 text-scientific-blue" />
                  <div className={`px-2 py-1 rounded text-xs font-semibold ${
                    standard.importance === 'Critico' ? 'bg-red-500/20 text-red-400' :
                    standard.importance === 'Essenziale' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {standard.importance}
                  </div>
                </div>
                
                <h4 className="font-semibold text-white mb-2">{standard.standard}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{standard.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Warning Box */}
        <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl p-6 border border-yellow-500/20 mb-16">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-yellow-400 mb-2">Importante: Personalizzazione Necessaria</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Questi protocolli sono esempi generali. L&apos;integrazione ottimale deve essere sempre personalizzata 
                sui tuoi biomarker, genetica, farmaci e condizioni di salute specifiche. 
                Una consulenza professionale è essenziale per sicurezza ed efficacia.
              </p>
            </div>
          </div>
        </div>

        {/* Results Stats */}
        <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl p-8 border border-border mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">Risultati dell&apos;Integrazione</h3>
            <p className="text-muted-foreground">Miglioramenti medi con i nostri protocolli</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">+28%</div>
              <div className="text-sm text-muted-foreground">Testosterone</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-2">+35%</div>
              <div className="text-sm text-muted-foreground">Energia</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400 mb-2">+22%</div>
              <div className="text-sm text-muted-foreground">Performance</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400 mb-2">-4.2</div>
              <div className="text-sm text-muted-foreground">Anni Biologici</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Ottimizza la Tua Integrazione
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Ricevi un protocollo di integrazione personalizzato basato sui tuoi biomarker, 
            obiettivi e budget specifici.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="scientific" 
              size="lg"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Pill className="w-5 h-5 mr-2" />
              Protocollo Personalizzato
            </Button>
            <Button variant="outline" size="lg">
              Scarica Guida Supplementi
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}