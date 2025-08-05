'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, FlaskConical, LineChart, Microscope, Users, Award } from "lucide-react";

export default function ResearchSection() {
  const researchAreas = [
    {
      icon: FlaskConical,
      title: "Biomarker Avanzati",
      description: "Analisi di oltre 150 parametri biochimici per una valutazione completa dello stato di salute",
      metrics: "150+ parametri",
      color: "text-scientific-blue"
    },
    {
      icon: Microscope,
      title: "Genetica Personalizzata",
      description: "Test genetici per ottimizzare nutrizione, supplementazione e protocolli di training",
      metrics: "200+ varianti",
      color: "text-performance-green"
    },
    {
      icon: LineChart,
      title: "Monitoraggio Continuo",
      description: "Tracking in tempo reale di metriche chiave attraverso tecnologie wearable avanzate",
      metrics: "24/7 monitoring",
      color: "text-scientific-blue"
    }
  ];

  const studies = [
    {
      title: "Ottimizzazione del Testosterone Naturale",
      journal: "Journal of Clinical Endocrinology",
      year: "2024",
      result: "+35% testosterone in 12 settimane",
      participants: "156 uomini, 35-55 anni"
    },
    {
      title: "Protocolli Anti-Aging Integrati",
      journal: "Aging Research Reviews",
      year: "2023",
      result: "Riduzione età biologica di 8.2 anni",
      participants: "89 partecipanti, 40-65 anni"
    },
    {
      title: "Ottimizzazione Cognitiva Maschile",
      journal: "Neuroplasticity & Aging",
      year: "2024",
      result: "+28% performance cognitive",
      participants: "124 professionisti, 30-50 anni"
    }
  ];

  const certifications = [
    {
      icon: Award,
      title: "Certificazione ISO 15189",
      description: "Standard internazionale per laboratori medici"
    },
    {
      icon: Users,
      title: "Partner Universitari",
      description: "Collaborazioni con 12 università europee"
    },
    {
      icon: BookOpen,
      title: "Pubblicazioni Peer-Review",
      description: "45+ studi pubblicati su riviste scientifiche"
    }
  ];

  return (
    <section id="research" className="py-20 bg-gradient-to-br from-background to-steel-blue/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-performance-green/10 border border-performance-green/20 text-performance-green text-sm font-medium mb-6">
            <Microscope className="w-4 h-4 mr-2" />
            Ricerca Scientifica
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            La Scienza Dietro i 
            <span className="text-performance-green"> Nostri Protocolli</span>
          </h2>
          
          <p className="text-xl text-muted-foreground leading-relaxed">
            I nostri metodi sono validati da ricerche rigorose e studi clinici. 
            Ogni protocollo è supportato da evidenze scientifiche solide e risultati misurabili.
          </p>
        </div>

        {/* Research Areas */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {researchAreas.map((area, index) => (
            <Card key={index} className="bg-card/50 border-border hover:bg-card/70 transition-all duration-300 group overflow-hidden">
              <CardHeader className="text-center pb-4">
                <div className="relative">
                  <div className="bg-gradient-to-br from-background/50 to-steel-blue/20 p-4 rounded-2xl w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <area.icon className={`w-8 h-8 ${area.color}`} />
                  </div>
                  <div className={`absolute -top-2 -right-2 px-3 py-1 rounded-full text-xs font-bold ${area.color} bg-background/80 border border-current/20`}>
                    {area.metrics}
                  </div>
                </div>
                <CardTitle className="text-xl text-white">{area.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {area.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Published Studies */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-white text-center mb-12">
            Studi Clinici e Pubblicazioni
          </h3>
          
          <div className="grid lg:grid-cols-3 gap-6">
            {studies.map((study, index) => (
              <div key={index} className="bg-gradient-to-br from-card/30 to-steel-blue/10 rounded-xl p-6 border border-border hover:from-card/50 hover:to-steel-blue/20 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-scientific-blue/10 px-3 py-1 rounded-full text-xs font-semibold text-scientific-blue">
                    {study.year}
                  </div>
                  <BookOpen className="w-5 h-5 text-muted-foreground" />
                </div>
                
                <h4 className="font-semibold text-white mb-2 leading-tight">{study.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">{study.journal}</p>
                
                <div className="space-y-2">
                  <div className="bg-performance-green/10 rounded-lg p-3">
                    <div className="text-sm font-semibold text-performance-green mb-1">Risultato</div>
                    <div className="text-sm text-white">{study.result}</div>
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    Campione: {study.participants}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications & Partnerships */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-white text-center mb-12">
            Certificazioni e Partnership
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-br from-scientific-blue/20 to-performance-green/20 p-6 rounded-2xl mb-4 inline-block">
                  <cert.icon className="w-8 h-8 text-scientific-blue" />
                </div>
                <h4 className="font-semibold text-white mb-2">{cert.title}</h4>
                <p className="text-sm text-muted-foreground">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Research Stats */}
        <div className="bg-gradient-to-r from-scientific-blue/10 to-performance-green/10 rounded-2xl p-8 border border-border mb-16">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-scientific-blue mb-2">10,000+</div>
              <div className="text-sm text-muted-foreground">Ore di Ricerca</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-performance-green mb-2">45+</div>
              <div className="text-sm text-muted-foreground">Studi Pubblicati</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-scientific-blue mb-2">98%</div>
              <div className="text-sm text-muted-foreground">Riproducibilità</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-performance-green mb-2">12</div>
              <div className="text-sm text-muted-foreground">Università Partner</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Vuoi Saperne di Più sui Nostri Metodi?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Accedi alla nostra libreria di ricerche e scopri come la scienza può 
            trasformare la tua salute e longevità.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="scientific" size="lg">
              <FlaskConical className="w-5 h-5 mr-2" />
              Accedi alle Ricerche
            </Button>
            <Button variant="outline" size="lg">
              Richiedi Dettagli Scientifici
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}