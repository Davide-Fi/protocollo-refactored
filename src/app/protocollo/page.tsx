"use client";

import { useState } from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { 
  Clock, 
  Sun, 
  Activity, 
  Coffee, 
  Pill, 
  Moon,
  Heart,
  Brain,
  Dumbbell,
  Apple,
  ChevronDown,
  ChevronUp,
  Timer,
  Zap,
  Shield,
  Target,
  Award,
  TrendingUp,
  Beaker,
  Salad,
  ChefHat,
  Bed,
  BarChart3,
  FlaskConical,
  BookOpen,
  Calculator
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ProtocolloPage() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-navy-charcoal text-slate-100">
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-gradient-to-br from-scientific-blue/20 via-transparent to-performance-green/20"></div>
          
          <div className="relative max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-6 bg-scientific-blue/30 text-scientific-blue border-scientific-blue">
                <Beaker className="w-4 h-4 mr-2" />
                Blueprint Protocol - Versione Italiana Completa
              </Badge>
              
              <h1 className="text-5xl lg:text-6xl font-black mb-6">
                Il <span className="text-scientific-blue">Protocollo</span> Blueprint
              </h1>
              
              <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
                La routine quotidiana completa di Bryan Johnson per l'ottimizzazione della longevità.
                Ogni dettaglio del protocollo originale fedelmente riportato.
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="bg-steel-blue/30 px-6 py-3 rounded-lg">
                  <p className="text-sm text-slate-400">Velocità di invecchiamento</p>
                  <p className="text-2xl font-bold text-performance-green">0.53</p>
                </div>
                <div className="bg-steel-blue/30 px-6 py-3 rounded-lg">
                  <p className="text-sm text-slate-400">Biomarker ottimali</p>
                  <p className="text-2xl font-bold text-scientific-blue">20+</p>
                </div>
                <div className="bg-steel-blue/30 px-6 py-3 rounded-lg">
                  <p className="text-sm text-slate-400">Supplementi giornalieri</p>
                  <p className="text-2xl font-bold text-yellow-500">100+</p>
                </div>
                <div className="bg-steel-blue/30 px-6 py-3 rounded-lg">
                  <p className="text-sm text-slate-400">Ore di sonno perfetto</p>
                  <p className="text-2xl font-bold text-purple-500">100%</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Protocol Tabs */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <Tabs defaultValue="sleep" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-6 bg-steel-blue/20 p-1 rounded-lg">
                <TabsTrigger value="sleep" className="data-[state=active]:bg-scientific-blue">
                  <Bed className="w-4 h-4 mr-2" />
                  Sonno
                </TabsTrigger>
                <TabsTrigger value="diet" className="data-[state=active]:bg-scientific-blue">
                  <Apple className="w-4 h-4 mr-2" />
                  Dieta
                </TabsTrigger>
                <TabsTrigger value="exercise" className="data-[state=active]:bg-scientific-blue">
                  <Dumbbell className="w-4 h-4 mr-2" />
                  Esercizio
                </TabsTrigger>
                <TabsTrigger value="supplements" className="data-[state=active]:bg-scientific-blue">
                  <Pill className="w-4 h-4 mr-2" />
                  Supplementi
                </TabsTrigger>
                <TabsTrigger value="routine" className="data-[state=active]:bg-scientific-blue">
                  <Clock className="w-4 h-4 mr-2" />
                  Routine
                </TabsTrigger>
                <TabsTrigger value="measurements" className="data-[state=active]:bg-scientific-blue">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Misurazioni
                </TabsTrigger>
              </TabsList>

              {/* SLEEP TAB */}
              <TabsContent value="sleep" className="mt-8">
                <Card className="bg-navy-charcoal/50 border-steel-blue/30 p-8">
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold mb-4 text-scientific-blue flex items-center">
                      <Moon className="mr-3" />
                      Protocollo del Sonno
                    </h2>
                    <p className="text-lg text-slate-300 mb-6">
                      Il sonno di alta qualità è la pietra angolare della salute e della longevità. 
                      Bryan Johnson ha raggiunto 8 mesi di sonno perfetto al 100%, che per quanto ne sa è "il migliore al mondo".
                    </p>
                  </div>

                  <div className="space-y-6">
                    {/* Bedtime Routine */}
                    <div className="bg-steel-blue/20 rounded-lg p-6">
                      <h3 className="text-xl font-bold mb-4 text-performance-green">
                        Routine Serale (Inizia alle 19:30)
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <span className="text-scientific-blue font-bold mr-3">19:30</span>
                          <div>
                            <p className="font-semibold">Inizio Wind-Down</p>
                            <p className="text-sm text-slate-400">Imposta un allarme per iniziare il rilassamento. 30-60 minuti di attività rilassanti come lettura, bagno caldo o mindfulness</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <span className="text-scientific-blue font-bold mr-3">20:00</span>
                          <div>
                            <p className="font-semibold">Gestione della Luce</p>
                            <p className="text-sm text-slate-400">Abbassa le luci 1-2 ore prima di dormire. Usa illuminazione calda o rossa. Installa filtri luce blu sui dispositivi (f.lux)</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <span className="text-scientific-blue font-bold mr-3">20:30</span>
                          <div>
                            <p className="font-semibold">Stop Schermi</p>
                            <p className="text-sm text-slate-400">Niente dispositivi elettronici almeno 1 ora prima di dormire. Considera occhiali che bloccano la luce blu se necessario</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <span className="text-scientific-blue font-bold mr-3">21:00</span>
                          <div>
                            <p className="font-semibold">Supplementi Serali</p>
                            <p className="text-sm text-slate-400">Magnesio, melatonina (dose fisiologica), CBD o olio di canapa (5 minuti prima di dormire, alcune volte a settimana)</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <span className="text-scientific-blue font-bold mr-3">21:30</span>
                          <div>
                            <p className="font-semibold">A Letto</p>
                            <p className="text-sm text-slate-400">Stessa ora ogni giorno, anche nei weekend. 7-9 ore di sonno. Si sveglia naturalmente alle 5:00 senza sveglia</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Sleep Environment */}
                    <div className="bg-steel-blue/20 rounded-lg p-6">
                      <h3 className="text-xl font-bold mb-4 text-performance-green">
                        Ottimizzazione Ambientale
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold mb-2 text-scientific-blue">Temperatura</h4>
                          <ul className="space-y-1 text-sm text-slate-300">
                            <li>• Mantieni la camera tra 15-19°C (60-67°F)</li>
                            <li>• Scegli biancheria traspirante e pigiami leggeri</li>
                            <li>• Usa ventilatori o dispositivi di raffreddamento</li>
                            <li>• Considera un bagno caldo prima di dormire</li>
                            <li>• Ventila la stanza o usa un materasso termoregolato</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2 text-scientific-blue">Oscurità</h4>
                          <ul className="space-y-1 text-sm text-slate-300">
                            <li>• Finestre completamente oscurate (tende blackout)</li>
                            <li>• Ambiente buio con meno luce possibile</li>
                            <li>• Nessun LED o luce di standby visibile</li>
                            <li>• Maschera per gli occhi se necessario</li>
                            <li>• Zero inquinamento luminoso</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Sleep Principles */}
                    <div className="bg-steel-blue/20 rounded-lg p-6">
                      <h3 className="text-xl font-bold mb-4 text-performance-green">
                        Principi Chiave del Sonno
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <Target className="text-yellow-500 mr-3 mt-1" />
                          <div>
                            <p className="font-semibold">Diventa un "Dormitore Professionista"</p>
                            <p className="text-sm text-slate-400">Rendi il sonno la tua priorità assoluta. Pianifica la giornata intorno ad esso come faresti per qualsiasi appuntamento vitale</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Brain className="text-scientific-blue mr-3 mt-1" />
                          <div>
                            <p className="font-semibold">Monitoraggio Continuo</p>
                            <p className="text-sm text-slate-400">Usa Whoop e Oura Ring per monitorare fasi del sonno, frequenza cardiaca e temperatura corporea. 6 mesi consecutivi con performance del sonno al 100%</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Shield className="text-performance-green mr-3 mt-1" />
                          <div>
                            <p className="font-semibold">Compromessi Sociali</p>
                            <p className="text-sm text-slate-400">Lascia eventi presto e declina opportunità di intrattenimento per mantenere la routine. I benefici superano qualsiasi FOMO</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Morning Light */}
                    <div className="bg-yellow-500/10 rounded-lg p-6 border border-yellow-500/30">
                      <h3 className="text-xl font-bold mb-4 text-yellow-500">
                        Luce Mattutina
                      </h3>
                      <p className="text-sm text-yellow-200">
                        Esponiti alla luce mattutina entro 15-30 minuti dal risveglio per impostare il ritmo circadiano 
                        e migliorare l'umore. Questa esposizione è cruciale per la qualità del sonno della notte successiva.
                      </p>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* DIET TAB */}
              <TabsContent value="diet" className="mt-8">
                <Card className="bg-navy-charcoal/50 border-steel-blue/30 p-8">
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold mb-4 text-scientific-blue flex items-center">
                      <Apple className="mr-3" />
                      Protocollo Nutrizionale
                    </h2>
                    <p className="text-lg text-slate-300 mb-6">
                      Dieta plant-based di 2.250 calorie al giorno. Ogni pasto è metodicamente creato basandosi 
                      su evidenze scientifiche gold standard per nutrizione ottimale. Oltre 60 libbre di verdure, 
                      bacche e noci al mese.
                    </p>
                  </div>

                  <div className="space-y-6">
                    {/* Daily Structure */}
                    <div className="bg-steel-blue/20 rounded-lg p-6">
                      <h3 className="text-xl font-bold mb-4 text-performance-green">
                        Struttura Giornaliera dei Pasti
                      </h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-navy-charcoal/50 p-4 rounded-lg">
                          <h4 className="font-semibold text-scientific-blue mb-2">6:00 AM - Green Giant</h4>
                          <p className="text-sm text-slate-300">Succo verde mattutino con pillole</p>
                        </div>
                        <div className="bg-navy-charcoal/50 p-4 rounded-lg">
                          <h4 className="font-semibold text-scientific-blue mb-2">7:00 AM - Super Veggie</h4>
                          <p className="text-sm text-slate-300">Pasto a base di verdure</p>
                        </div>
                        <div className="bg-navy-charcoal/50 p-4 rounded-lg">
                          <h4 className="font-semibold text-scientific-blue mb-2">11:00 AM - Nutty Pudding</h4>
                          <p className="text-sm text-slate-300">Pudding nutriente + Terzo pasto variabile</p>
                        </div>
                      </div>
                      <div className="mt-4 p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
                        <p className="text-sm text-yellow-200">
                          <strong>Finestra alimentare:</strong> Solo 5 ore (6:00-11:00 AM) seguite da 19 ore di digiuno intermittente
                        </p>
                      </div>
                    </div>

                    {/* Recipes */}
                    <div className="space-y-4">
                      {/* Super Veggie Recipe */}
                      <div className="bg-steel-blue/20 rounded-lg p-6">
                        <h3 className="text-xl font-bold mb-4 text-performance-green">
                          Ricetta Super Veggie
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-scientific-blue mb-3">Ingredienti:</h4>
                            <ul className="space-y-1 text-sm text-slate-300">
                              <li>• Broccoli: 250g</li>
                              <li>• Cavolfiore: 150g</li>
                              <li>• Funghi Shiitake/Maitake: 50g</li>
                              <li>• Spinaci: 50g</li>
                              <li>• Carote: 30g</li>
                              <li>• Aglio: 1 spicchio</li>
                              <li>• Radice di zenzero: 3g</li>
                              <li>• Succo di lime</li>
                              <li>• Aceto di mele: 1 cucchiaio</li>
                              <li>• Lenticchie nere: 300g (cotte)</li>
                              <li>• Semi di canapa: 1 cucchiaio</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-scientific-blue mb-3">Preparazione:</h4>
                            <ol className="space-y-2 text-sm text-slate-300">
                              <li>1. Pesa e cuoci al vapore o lessa le verdure</li>
                              <li>2. Cuoci le lenticchie secondo le istruzioni</li>
                              <li>3. Frulla verdure e lenticchie con aglio, zenzero, lime, cumino e aceto</li>
                              <li>4. Oppure servi intero</li>
                              <li>5. Guarnisci con semi di canapa e olio d'oliva</li>
                            </ol>
                          </div>
                        </div>
                      </div>

                      {/* Nutty Pudding Recipe */}
                      <div className="bg-steel-blue/20 rounded-lg p-6">
                        <h3 className="text-xl font-bold mb-4 text-performance-green">
                          Ricetta Nutty Pudding
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-scientific-blue mb-3">Ingredienti:</h4>
                            <ul className="space-y-1 text-sm text-slate-300">
                              <li>• Latte di macadamia: 50-100ml</li>
                              <li>• Noci macadamia macinate: 3 cucchiai</li>
                              <li>• Noci macinate: 2 cucchiaini</li>
                              <li>• Semi di chia: 2 cucchiai</li>
                              <li>• Semi di lino macinati: 1 cucchiaino</li>
                              <li>• Cacao Blueprint: 6g</li>
                              <li>• Lecitina di girasole: 1 cucchiaino</li>
                              <li>• Cannella di Ceylon: 1/2 cucchiaino</li>
                              <li>• Mirtilli/lamponi/fragole: 1/2 tazza</li>
                              <li>• Ciliegie: 3</li>
                              <li>• Succo di melograno: 60ml</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-scientific-blue mb-3">Preparazione:</h4>
                            <ol className="space-y-2 text-sm text-slate-300">
                              <li>1. Aggiungi tutti gli ingredienti nel frullatore</li>
                              <li>2. Conserva metà delle bacche per guarnire</li>
                              <li>3. Opzionale: aggiungi 30-60g di proteine in polvere (piselli)</li>
                              <li>4. Frulla fino a consistenza cremosa</li>
                              <li>5. Guarnisci con le bacche rimanenti</li>
                            </ol>
                            <p className="text-xs text-slate-400 mt-3">
                              Nota: La noce del Brasile (1/4) è stata rimossa a maggio 2024
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Implementation Timeline */}
                    <div className="bg-steel-blue/20 rounded-lg p-6">
                      <h3 className="text-xl font-bold mb-4 text-performance-green">
                        Timeline di Implementazione
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <div className="bg-scientific-blue text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4">1</div>
                          <div>
                            <p className="font-semibold">Settimana 1: Green Giant (GG)</p>
                            <p className="text-sm text-slate-400">Inizia con il succo verde quotidiano</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="bg-scientific-blue text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4">2</div>
                          <div>
                            <p className="font-semibold">Settimana 2: GG + Super Veggie (SV)</p>
                            <p className="text-sm text-slate-400">Aggiungi il pasto di verdure</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="bg-scientific-blue text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4">3</div>
                          <div>
                            <p className="font-semibold">Settimana 3: GG + SV + Nutty Pudding (NP)</p>
                            <p className="text-sm text-slate-400">Aggiungi il pudding nutriente</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="bg-scientific-blue text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4">4</div>
                          <div>
                            <p className="font-semibold">Settimana 4: GG + SV + NP + Supplementi</p>
                            <p className="text-sm text-slate-400">Integra lo stack di supplementi</p>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-slate-400 mt-4">
                        Gli esperti raccomandano di iniziare lentamente e incorporare un pasto alla volta a causa dell'alto contenuto 
                        di fibre, che può causare disturbi gastrointestinali se adottato troppo rapidamente.
                      </p>
                    </div>

                    {/* Key Features */}
                    <div className="bg-performance-green/10 rounded-lg p-6 border border-performance-green/30">
                      <h3 className="text-xl font-bold mb-4 text-performance-green">
                        Caratteristiche Chiave
                      </h3>
                      <ul className="space-y-2 text-sm">
                        <li>• Evita sale, zucchero aggiunto e cereali raffinati</li>
                        <li>• Enfasi su varietà di cibi integrali: verdure diverse, legumi e noci</li>
                        <li>• Aromatici, spezie, erbe e agrumi per il sapore</li>
                        <li>• I pasti vengono modificati all'introduzione di nuove evidenze scientifiche</li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* EXERCISE TAB */}
              <TabsContent value="exercise" className="mt-8">
                <Card className="bg-navy-charcoal/50 border-steel-blue/30 p-8">
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold mb-4 text-scientific-blue flex items-center">
                      <Dumbbell className="mr-3" />
                      Protocollo di Esercizio
                    </h2>
                    <p className="text-lg text-slate-300 mb-6">
                      7 allenamenti full body per forza e mobilità + 3 sessioni HIIT da 10 minuti + escursione nel weekend.
                      60-90 minuti di allenamento alle 5:30 AM, focalizzato su equilibrio, flessibilità, forza e cardio.
                    </p>
                  </div>

                  <div className="space-y-6">
                    {/* Daily Structure */}
                    <div className="bg-steel-blue/20 rounded-lg p-6">
                      <h3 className="text-xl font-bold mb-4 text-performance-green">
                        Struttura Giornaliera (5:30 AM)
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-scientific-blue mb-3">Routine Mattutina:</h4>
                          <ul className="space-y-2 text-sm text-slate-300">
                            <li>• Durata: 60-90 minuti ogni giorno</li>
                            <li>• Circuito di 25-35 esercizi</li>
                            <li>• "Tutto quello che facciamo, lo misuriamo"</li>
                            <li>• Focus su prevenzione infortuni</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-scientific-blue mb-3">Distribuzione Muscolare:</h4>
                          <ul className="space-y-2 text-sm text-slate-300">
                            <li>• Gambe: 70% (12 esercizi)</li>
                            <li>• Petto: 20% (4 esercizi)</li>
                            <li>• Schiena: 10% (2 esercizi)</li>
                            <li>• Focus su corpo completo</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Specific Exercises */}
                    <div className="bg-steel-blue/20 rounded-lg p-6">
                      <h3 className="text-xl font-bold mb-4 text-performance-green">
                        Esercizi Specifici
                      </h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <h4 className="font-semibold text-scientific-blue mb-2">Riscaldamento e Postura:</h4>
                          <ul className="space-y-1 text-xs text-slate-300">
                            <li>• Backward sled pulls</li>
                            <li>• Affondi con torsione</li>
                            <li>• Lateral shuffles</li>
                            <li>• Band pull-aparts</li>
                            <li>• Rotazioni esterne</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-scientific-blue mb-2">Forza:</h4>
                          <ul className="space-y-1 text-xs text-slate-300">
                            <li>• Tricep kickbacks (1 sec hold)</li>
                            <li>• Face pulls</li>
                            <li>• Banded chest flyes (15 reps)</li>
                            <li>• Nordic hamstring curls</li>
                            <li>• Pull-ups e chin-ups</li>
                            <li>• Barbell bicep curls (45lb + 20lb)</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-scientific-blue mb-2">Mobilità:</h4>
                          <ul className="space-y-1 text-xs text-slate-300">
                            <li>• Tibialis raises (15 reps)</li>
                            <li>• Isotib ankle rotations (15)</li>
                            <li>• Stretching dinamico</li>
                            <li>• Mobilità articolare</li>
                            <li>• Esercizi propriocettivi</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Cardio Protocol */}
                    <div className="bg-steel-blue/20 rounded-lg p-6">
                      <h3 className="text-xl font-bold mb-4 text-performance-green">
                        Protocollo Cardiovascolare
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-scientific-blue mb-3">Cardio a Bassa Intensità (4x/settimana):</h4>
                          <ul className="space-y-2 text-sm text-slate-300">
                            <li>• Ciclismo, ellittica, vogatore</li>
                            <li>• Frequenza cardiaca: 130-140 bpm</li>
                            <li>• Durata: 5-10 minuti pre-HIIT</li>
                            <li>• Zona 2-4 per 4.5 ore/settimana</li>
                            <li>• Conversazione facile durante l'esercizio</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-scientific-blue mb-3">HIIT (3x/settimana):</h4>
                          <ul className="space-y-2 text-sm text-slate-300">
                            <li>• Brevi scatti di attività intensa</li>
                            <li>• 4 minuti esercizio + 4 minuti riposo</li>
                            <li>• Ripetuto più volte</li>
                            <li>• Zona 5 per 1.5 ore/settimana</li>
                            <li>• Parlare è difficile durante l'esercizio</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Weekly Goals */}
                    <div className="bg-steel-blue/20 rounded-lg p-6">
                      <h3 className="text-xl font-bold mb-4 text-performance-green">
                        Obiettivi Settimanali
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-navy-charcoal/50 rounded-lg">
                          <span>Allenamenti totali</span>
                          <span className="font-bold text-scientific-blue">6 giorni/settimana</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-navy-charcoal/50 rounded-lg">
                          <span>Forza</span>
                          <span className="font-bold text-performance-green">3 giorni</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-navy-charcoal/50 rounded-lg">
                          <span>Cardio</span>
                          <span className="font-bold text-performance-green">3 giorni</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-navy-charcoal/50 rounded-lg">
                          <span>Esercizio moderato (Zona 2-4)</span>
                          <span className="font-bold text-yellow-500">150 minuti</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-navy-charcoal/50 rounded-lg">
                          <span>Alta intensità (Zona 5)</span>
                          <span className="font-bold text-yellow-500">75 minuti</span>
                        </div>
                      </div>
                    </div>

                    {/* Movement Throughout Day */}
                    <div className="bg-steel-blue/20 rounded-lg p-6">
                      <h3 className="text-xl font-bold mb-4 text-performance-green">
                        Movimento Durante il Giorno
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <Timer className="text-scientific-blue mr-3 mt-1" />
                          <div>
                            <p className="font-semibold">Ogni 30 minuti</p>
                            <p className="text-sm text-slate-400">5 minuti di attività leggera: camminata, esercizi a corpo libero, stretching, attività domestiche leggere o ballo</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Apple className="text-performance-green mr-3 mt-1" />
                          <div>
                            <p className="font-semibold">Dopo ogni pasto</p>
                            <p className="text-sm text-slate-400">Sii attivo per 5-10 minuti per aiutare la digestione e il controllo glicemico</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Sun className="text-yellow-500 mr-3 mt-1" />
                          <div>
                            <p className="font-semibold">Weekend</p>
                            <p className="text-sm text-slate-400">Escursioni, pickleball, bicicletta, arrampicata - porta il fitness all'aperto</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Key Principles */}
                    <div className="bg-yellow-500/10 rounded-lg p-6 border border-yellow-500/30">
                      <h3 className="text-xl font-bold mb-4 text-yellow-500">
                        Principi Chiave dell'Allenamento
                      </h3>
                      <ol className="space-y-3 text-sm">
                        <li>
                          <strong>1. Evita infortuni:</strong> Gli infortuni possono creare limitazioni serie, squilibri corporei e complicazioni a lungo termine. Vale la pena essere cauti anche se significa non fare certe cose.
                        </li>
                        <li>
                          <strong>2. Crea un'abitudine:</strong> Fallo ogni giorno, non importa cosa (a meno che tu non sia infortunato o sotto ordini medici). Non pensarci nemmeno. Succede per abitudine. Non darti l'opzione di decidere.
                        </li>
                        <li>
                          <strong>3. Lavora su tutto:</strong> Allenamento di forza, cardio, equilibrio e flessibilità.
                        </li>
                        <li>
                          <strong>4. Sovraccarico progressivo:</strong> Mira ad aumentare gradualmente la difficoltà nel tempo, specialmente per l'allenamento di forza.
                        </li>
                      </ol>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* SUPPLEMENTS TAB */}
              <TabsContent value="supplements" className="mt-8">
                <Card className="bg-navy-charcoal/50 border-steel-blue/30 p-8">
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold mb-4 text-scientific-blue flex items-center">
                      <Pill className="mr-3" />
                      Protocollo Supplementi
                    </h2>
                    <p className="text-lg text-slate-300 mb-6">
                      Oltre 100 composti assunti come polveri, compresse e capsule. Blueprint Stack contiene 74 composti 
                      in 7 prodotti multivitaminici e multiminerali. Costo: $361/mese per lo stack base.
                    </p>
                  </div>

                  <div className="space-y-6">
                    {/* Core Stack */}
                    <div className="bg-steel-blue/20 rounded-lg p-6">
                      <h3 className="text-xl font-bold mb-4 text-performance-green">
                        Blueprint Stack Core
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-scientific-blue mb-3">Longevity Mix (14 ingredienti):</h4>
                          <ul className="space-y-1 text-xs text-slate-300">
                            <li>• CaAKG (Calcio Alfa-Chetoglutarato): 1000mg</li>
                            <li>• Creatina Monoidrato: 2500mg</li>
                            <li>• Glicina: 2000mg</li>
                            <li>• L-Teanina: 200mg</li>
                            <li>• Glutatione ridotto: 250mg</li>
                            <li>• Sodio Ialuronato</li>
                            <li>• Vitamina C (Acido Ascorbico): 500mg</li>
                            <li>• Lisina: 1000mg</li>
                            <li>• Taurina: 2000mg</li>
                            <li>• Calcio (come Citrato): 300mg</li>
                            <li>• Magnesio (come Citrato): 400mg</li>
                            <li>• Ashwagandha: 600mg</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-scientific-blue mb-3">Essential Capsules (26 nutrienti):</h4>
                          <ul className="space-y-1 text-xs text-slate-300">
                            <li>• Complesso Vitamine B complete</li>
                            <li>• Vitamina D3: 2000 IU</li>
                            <li>• Vitamina E</li>
                            <li>• Vitamina K1 e K2</li>
                            <li>• Boro</li>
                            <li>• Manganese</li>
                            <li>• Zinco: 15mg</li>
                            <li>• CoQ10 (Ubiquinolo): 100mg</li>
                            <li>• Probiotici: 50 miliardi CFU</li>
                            <li>• Litio Orotato: 1mg</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Daily Protocol */}
                    <div className="bg-steel-blue/20 rounded-lg p-6">
                      <h3 className="text-xl font-bold mb-4 text-performance-green">
                        Protocollo Giornaliero Completo
                      </h3>
                      <div className="space-y-4">
                        <div className="bg-navy-charcoal/50 p-4 rounded-lg">
                          <h4 className="font-semibold text-scientific-blue mb-2">Mattina (5:25 AM):</h4>
                          <ul className="space-y-1 text-sm text-slate-300">
                            <li>• 1 misurino Longevity Mix</li>
                            <li>• Ferro eme: 10mg</li>
                            <li>• Vitamina C extra: 250mg</li>
                            <li>• NMN: 500mg</li>
                            <li>• Resveratrolo: 1000mg</li>
                            <li>• Fisetina: 100mg</li>
                          </ul>
                        </div>
                        <div className="bg-navy-charcoal/50 p-4 rounded-lg">
                          <h4 className="font-semibold text-scientific-blue mb-2">Con Colazione (7:00 AM):</h4>
                          <ul className="space-y-1 text-sm text-slate-300">
                            <li>• 2 Essential Capsules</li>
                            <li>• 1 Essential Softgel</li>
                            <li>• EVOO (olio d'oliva): 15ml</li>
                            <li>• Proteine vegetali: 26g</li>
                            <li>• Peptidi collagene: 11g</li>
                            <li>• Enzimi digestivi</li>
                          </ul>
                        </div>
                        <div className="bg-navy-charcoal/50 p-4 rounded-lg">
                          <h4 className="font-semibold text-scientific-blue mb-2">Con "Cena" (11:00 AM):</h4>
                          <ul className="space-y-1 text-sm text-slate-300">
                            <li>• 1 Red Yeast Rice + Aglio inodore</li>
                            <li>• 3 NAC + Zenzero + Curcuma</li>
                            <li>• Berberina: 500mg</li>
                            <li>• Omega-3 EPA/DHA: 2000mg</li>
                            <li>• Acido alfa-lipoico: 300mg</li>
                          </ul>
                        </div>
                        <div className="bg-navy-charcoal/50 p-4 rounded-lg">
                          <h4 className="font-semibold text-scientific-blue mb-2">Sera (8:30 PM):</h4>
                          <ul className="space-y-1 text-sm text-slate-300">
                            <li>• Melatonina: 0.5mg (dose fisiologica)</li>
                            <li>• Magnesio glicinato: 200mg</li>
                            <li>• L-triptofano: 500mg</li>
                            <li>• Camomilla estratto: 200mg</li>
                            <li>• Valeriana: 300mg</li>
                            <li>• CBD/olio di canapa (occasionale)</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Additional Supplements */}
                    <div className="bg-steel-blue/20 rounded-lg p-6">
                      <h3 className="text-xl font-bold mb-4 text-performance-green">
                        Supplementi Aggiuntivi
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-scientific-blue mb-2">Antiossidanti e Longevità:</h4>
                          <ul className="space-y-1 text-xs text-slate-300">
                            <li>• Luteina e Zeaxantina (vista)</li>
                            <li>• Licopene (salute cardiovascolare)</li>
                            <li>• Astaxantina (anti-infiammatorio)</li>
                            <li>• Lion's Mane: 1000mg (cognitivo)</li>
                            <li>• NAC: 600mg (detox epatico)</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-scientific-blue mb-2">Supporto Metabolico:</h4>
                          <ul className="space-y-1 text-xs text-slate-300">
                            <li>• Berberina (controllo glicemico)</li>
                            <li>• Red Yeast Rice (colesterolo)</li>
                            <li>• Aglio inodore (cardiovascolare)</li>
                            <li>• Curcuma (anti-infiammatorio)</li>
                            <li>• Zenzero (digestione)</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Cost Breakdown */}
                    <div className="bg-steel-blue/20 rounded-lg p-6">
                      <h3 className="text-xl font-bold mb-4 text-yellow-500">
                        Analisi dei Costi
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between p-3 bg-navy-charcoal/50 rounded-lg">
                          <span>Blueprint Stack base</span>
                          <span className="font-bold">$361/mese</span>
                        </div>
                        <div className="flex justify-between p-3 bg-navy-charcoal/50 rounded-lg">
                          <span>14 supplementi aggiuntivi</span>
                          <span className="font-bold">~$300/mese</span>
                        </div>
                        <div className="flex justify-between p-3 bg-navy-charcoal/50 rounded-lg">
                          <span>Totale supplementi</span>
                          <span className="font-bold text-yellow-500">~$661/mese</span>
                        </div>
                        <div className="flex justify-between p-3 bg-navy-charcoal/50 rounded-lg">
                          <span>Costo giornaliero</span>
                          <span className="font-bold text-scientific-blue">~$22/giorno</span>
                        </div>
                      </div>
                    </div>

                    {/* Benefits */}
                    <div className="bg-performance-green/10 rounded-lg p-6 border border-performance-green/30">
                      <h3 className="text-xl font-bold mb-4 text-performance-green">
                        Benefici Principali
                      </h3>
                      <p className="text-sm mb-3">
                        Il protocollo fornisce 380 calorie e 70+ attivi giornalieri per vitalità ottimale:
                      </p>
                      <ul className="space-y-2 text-sm">
                        <li>• Supporto per sonno, recupero muscolare e longevità</li>
                        <li>• Riduzione stress e miglioramento del sonno (ashwagandha, L-teanina)</li>
                        <li>• Benefici per muscoli, energia, cognizione, anti-aging e cuore (creatina)</li>
                        <li>• Combatte stress ossidativo e supporta salute epatica</li>
                        <li>• Supporto cardiovascolare, visione e benessere generale</li>
                      </ul>
                    </div>

                    {/* Warning */}
                    <div className="bg-red-500/10 rounded-lg p-6 border border-red-500/30">
                      <h3 className="text-xl font-bold mb-4 text-red-400">
                        Avvertenze Importanti
                      </h3>
                      <ul className="space-y-2 text-sm text-red-200">
                        <li>• La ricerca clinica supporta molti elementi, ma è basata su test personali di Johnson</li>
                        <li>• Ci sono rischi di effetti collaterali combinando così tanti supplementi</li>
                        <li>• Necessaria supervisione medica per implementare questo protocollo</li>
                        <li>• I risultati possono non applicarsi a tutti gli individui</li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* ROUTINE TAB */}
              <TabsContent value="routine" className="mt-8">
                <Card className="bg-navy-charcoal/50 border-steel-blue/30 p-8">
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold mb-4 text-scientific-blue flex items-center">
                      <Clock className="mr-3" />
                      Routine Giornaliera Completa
                    </h2>
                    <p className="text-lg text-slate-300 mb-6">
                      La giornata di Bryan Johnson è meticolosamente pianificata per ottimizzare ogni aspetto 
                      della salute e longevità. Ogni attività ha uno scopo specifico basato su evidenze scientifiche.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* Morning Routine */}
                    <div className="bg-steel-blue/20 rounded-lg p-6">
                      <h3 className="text-xl font-bold mb-4 text-performance-green flex items-center">
                        <Sun className="mr-2" />
                        Routine Mattutina (5:00 - 8:00 AM)
                      </h3>
                      <div className="space-y-3">
                        <div className="flex">
                          <span className="text-scientific-blue font-mono font-bold mr-4 min-w-[80px]">5:00 AM</span>
                          <div className="flex-1">
                            <p className="font-semibold">Risveglio Naturale</p>
                            <p className="text-sm text-slate-400">Si sveglia naturalmente senza sveglia dopo 7-9 ore di sonno</p>
                          </div>
                        </div>
                        <div className="flex">
                          <span className="text-scientific-blue font-mono font-bold mr-4 min-w-[80px]">5:05 AM</span>
                          <div className="flex-1">
                            <p className="font-semibold">Misurazione Temperatura Corporea</p>
                            <p className="text-sm text-slate-400">Controllo sicurezza ed efficacia per varie terapie</p>
                          </div>
                        </div>
                        <div className="flex">
                          <span className="text-scientific-blue font-mono font-bold mr-4 min-w-[80px]">5:10 AM</span>
                          <div className="flex-1">
                            <p className="font-semibold">Esposizione Luce UV</p>
                            <p className="text-sm text-slate-400">Diversi minuti davanti a dispositivo UV per impostare ritmo circadiano</p>
                          </div>
                        </div>
                        <div className="flex">
                          <span className="text-scientific-blue font-mono font-bold mr-4 min-w-[80px]">5:15 AM</span>
                          <div className="flex-1">
                            <p className="font-semibold">Terapia Capelli</p>
                            <p className="text-sm text-slate-400">Applica siero Rx per capelli e usa cappello luce rossa per 6 minuti</p>
                          </div>
                        </div>
                        <div className="flex">
                          <span className="text-scientific-blue font-mono font-bold mr-4 min-w-[80px]">5:25 AM</span>
                          <div className="flex-1">
                            <p className="font-semibold">Primo Stack Supplementi</p>
                            <p className="text-sm text-slate-400">Bevanda da 8oz con Longevity Mix + 54 supplementi iniziali</p>
                          </div>
                        </div>
                        <div className="flex">
                          <span className="text-scientific-blue font-mono font-bold mr-4 min-w-[80px]">5:30 AM</span>
                          <div className="flex-1">
                            <p className="font-semibold">Allenamento</p>
                            <p className="text-sm text-slate-400">60-90 minuti di esercizio (forza, cardio, flessibilità, equilibrio)</p>
                          </div>
                        </div>
                        <div className="flex">
                          <span className="text-scientific-blue font-mono font-bold mr-4 min-w-[80px]">6:45 AM</span>
                          <div className="flex-1">
                            <p className="font-semibold">Colazione</p>
                            <p className="text-sm text-slate-400">Green Giant + Super Veggie con proteine, grassi sani e antiossidanti</p>
                          </div>
                        </div>
                        <div className="flex">
                          <span className="text-scientific-blue font-mono font-bold mr-4 min-w-[80px]">7:15 AM</span>
                          <div className="flex-1">
                            <p className="font-semibold">Skincare e Igiene</p>
                            <p className="text-sm text-slate-400">Pulizia viso, sieri (barriera, vitamina C), idratante con SPF</p>
                          </div>
                        </div>
                        <div className="flex">
                          <span className="text-scientific-blue font-mono font-bold mr-4 min-w-[80px]">7:45 AM</span>
                          <div className="flex-1">
                            <p className="font-semibold">Inizio Lavoro</p>
                            <p className="text-sm text-slate-400">Picco di produttività mentale per compiti creativi e pensiero profondo</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Midday */}
                    <div className="bg-steel-blue/20 rounded-lg p-6">
                      <h3 className="text-xl font-bold mb-4 text-performance-green flex items-center">
                        <Coffee className="mr-2" />
                        Metà Giornata (11:00 AM - 2:00 PM)
                      </h3>
                      <div className="space-y-3">
                        <div className="flex">
                          <span className="text-scientific-blue font-mono font-bold mr-4 min-w-[80px]">11:00 AM</span>
                          <div className="flex-1">
                            <p className="font-semibold">Ultimo Pasto ("Cena")</p>
                            <p className="text-sm text-slate-400">Nutty Pudding + verdure, legumi, noci. Fine finestra alimentare di 5 ore</p>
                          </div>
                        </div>
                        <div className="flex">
                          <span className="text-scientific-blue font-mono font-bold mr-4 min-w-[80px]">11:30 AM</span>
                          <div className="flex-1">
                            <p className="font-semibold">Camminata Post-Prandiale</p>
                            <p className="text-sm text-slate-400">5-10 minuti di attività leggera per digestione e controllo glicemico</p>
                          </div>
                        </div>
                        <div className="flex">
                          <span className="text-scientific-blue font-mono font-bold mr-4 min-w-[80px]">12:00 PM</span>
                          <div className="flex-1">
                            <p className="font-semibold">Inizio Digiuno Intermittente</p>
                            <p className="text-sm text-slate-400">19 ore di digiuno fino alla colazione del giorno successivo</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Afternoon */}
                    <div className="bg-steel-blue/20 rounded-lg p-6">
                      <h3 className="text-xl font-bold mb-4 text-performance-green flex items-center">
                        <Activity className="mr-2" />
                        Pomeriggio (2:00 - 6:00 PM)
                      </h3>
                      <div className="space-y-3">
                        <div className="flex">
                          <span className="text-scientific-blue font-mono font-bold mr-4 min-w-[80px]">Ogni 30m</span>
                          <div className="flex-1">
                            <p className="font-semibold">Pause Attive</p>
                            <p className="text-sm text-slate-400">5 minuti di movimento: camminata, stretching, esercizi a corpo libero</p>
                          </div>
                        </div>
                        <div className="flex">
                          <span className="text-scientific-blue font-mono font-bold mr-4 min-w-[80px]">3:00 PM</span>
                          <div className="flex-1">
                            <p className="font-semibold">Terapia Luce</p>
                            <p className="text-sm text-slate-400">6 minuti luce rossa/infrarossa per salute pelle e riduzione infiammazione</p>
                          </div>
                        </div>
                        <div className="flex">
                          <span className="text-scientific-blue font-mono font-bold mr-4 min-w-[80px]">5:00 PM</span>
                          <div className="flex-1">
                            <p className="font-semibold">Fine Lavoro Intenso</p>
                            <p className="text-sm text-slate-400">Transizione a compiti meno impegnativi cognitivamente</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Evening */}
                    <div className="bg-steel-blue/20 rounded-lg p-6">
                      <h3 className="text-xl font-bold mb-4 text-performance-green flex items-center">
                        <Moon className="mr-2" />
                        Sera (6:00 - 9:30 PM)
                      </h3>
                      <div className="space-y-3">
                        <div className="flex">
                          <span className="text-scientific-blue font-mono font-bold mr-4 min-w-[80px]">6:00 PM</span>
                          <div className="flex-1">
                            <p className="font-semibold">Camminata Serale</p>
                            <p className="text-sm text-slate-400">10 minuti di camminata all'aperto per esposizione luce naturale</p>
                          </div>
                        </div>
                        <div className="flex">
                          <span className="text-scientific-blue font-mono font-bold mr-4 min-w-[80px]">7:00 PM</span>
                          <div className="flex-1">
                            <p className="font-semibold">Stop Luce Blu</p>
                            <p className="text-sm text-slate-400">Evita schermi e luce blu. Usa illuminazione calda/rossa</p>
                          </div>
                        </div>
                        <div className="flex">
                          <span className="text-scientific-blue font-mono font-bold mr-4 min-w-[80px]">7:30 PM</span>
                          <div className="flex-1">
                            <p className="font-semibold">Inizio Wind-Down</p>
                            <p className="text-sm text-slate-400">Attività rilassanti: lettura, meditazione, bagno caldo</p>
                          </div>
                        </div>
                        <div className="flex">
                          <span className="text-scientific-blue font-mono font-bold mr-4 min-w-[80px]">8:30 PM</span>
                          <div className="flex-1">
                            <p className="font-semibold">Routine Pre-Sonno</p>
                            <p className="text-sm text-slate-400">Supplementi serali, respirazione 4-7-8, preparazione camera</p>
                          </div>
                        </div>
                        <div className="flex">
                          <span className="text-scientific-blue font-mono font-bold mr-4 min-w-[80px]">9:00 PM</span>
                          <div className="flex-1">
                            <p className="font-semibold">A Letto</p>
                            <p className="text-sm text-slate-400">Camera 18-19°C, oscurità totale, nessun dispositivo</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Key Habits */}
                    <div className="bg-performance-green/10 rounded-lg p-6 border border-performance-green/30">
                      <h3 className="text-xl font-bold mb-4 text-performance-green">
                        Abitudini Chiave Giornaliere
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold mb-2">Costanza:</h4>
                          <ul className="space-y-1 text-sm">
                            <li>• Stessi orari ogni giorno (anche weekend)</li>
                            <li>• Nessuna eccezione alla routine</li>
                            <li>• Priorità assoluta al protocollo</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Misurazione:</h4>
                          <ul className="space-y-1 text-sm">
                            <li>• Traccia ogni parametro</li>
                            <li>• Dati guidano le decisioni</li>
                            <li>• Aggiustamenti basati su risultati</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* MEASUREMENTS TAB */}
              <TabsContent value="measurements" className="mt-8">
                <Card className="bg-navy-charcoal/50 border-steel-blue/30 p-8">
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold mb-4 text-scientific-blue flex items-center">
                      <BarChart3 className="mr-3" />
                      Misurazioni e Biomarker
                    </h2>
                    <p className="text-lg text-slate-300 mb-6">
                      Bryan Johnson ha i migliori biomarker al mondo dopo 4 anni di Blueprint. 
                      Oltre 70 organi misurati ripetutamente. Ogni decisione guidata dai dati.
                    </p>
                  </div>

                  <div className="space-y-6">
                    {/* Key Metrics */}
                    <div className="bg-steel-blue/20 rounded-lg p-6">
                      <h3 className="text-xl font-bold mb-4 text-performance-green">
                        Metriche Principali
                      </h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-navy-charcoal/50 p-4 rounded-lg text-center">
                          <p className="text-3xl font-bold text-performance-green">0.53</p>
                          <p className="text-sm text-slate-400 mt-2">Velocità di invecchiamento</p>
                          <p className="text-xs text-slate-500 mt-1">#1 Rejuvenation Olympics</p>
                        </div>
                        <div className="bg-navy-charcoal/50 p-4 rounded-lg text-center">
                          <p className="text-3xl font-bold text-scientific-blue">100%</p>
                          <p className="text-sm text-slate-400 mt-2">Performance del sonno</p>
                          <p className="text-xs text-slate-500 mt-1">8 mesi consecutivi</p>
                        </div>
                        <div className="bg-navy-charcoal/50 p-4 rounded-lg text-center">
                          <p className="text-3xl font-bold text-yellow-500">20+</p>
                          <p className="text-sm text-slate-400 mt-2">Biomarker ottimali</p>
                          <p className="text-xs text-slate-500 mt-1">Top 1% globale</p>
                        </div>
                      </div>
                    </div>

                    {/* Daily Monitoring */}
                    <div className="bg-steel-blue/20 rounded-lg p-6">
                      <h3 className="text-xl font-bold mb-4 text-performance-green">
                        Monitoraggio Giornaliero
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-scientific-blue mb-3">Dispositivi Wearable:</h4>
                          <ul className="space-y-2 text-sm text-slate-300">
                            <li>• <strong>Whoop:</strong> Performance sonno e recupero</li>
                            <li>• <strong>Oura Ring:</strong> Fasi sonno, HRV, temperatura</li>
                            <li>• <strong>CGM:</strong> Monitoraggio glucosio continuo</li>
                            <li>• <strong>Smartwatch:</strong> Attività e frequenza cardiaca</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-scientific-blue mb-3">Misurazioni Manuali:</h4>
                          <ul className="space-y-2 text-sm text-slate-300">
                            <li>• Temperatura corporea (mattina)</li>
                            <li>• Peso e composizione corporea</li>
                            <li>• Pressione sanguigna</li>
                            <li>• Saturazione ossigeno</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Laboratory Tests */}
                    <div className="bg-steel-blue/20 rounded-lg p-6">
                      <h3 className="text-xl font-bold mb-4 text-performance-green">
                        Test di Laboratorio
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-scientific-blue mb-2">Mensili:</h4>
                          <div className="grid md:grid-cols-3 gap-3">
                            <ul className="space-y-1 text-xs text-slate-300">
                              <li>• Emocromo completo</li>
                              <li>• Panel metabolico</li>
                              <li>• Profilo lipidico</li>
                              <li>• Ormoni tiroidei</li>
                            </ul>
                            <ul className="space-y-1 text-xs text-slate-300">
                              <li>• Testosterone e ormoni</li>
                              <li>• Vitamina D</li>
                              <li>• B12 e folati</li>
                              <li>• Ferritina</li>
                            </ul>
                            <ul className="space-y-1 text-xs text-slate-300">
                              <li>• hsCRP (infiammazione)</li>
                              <li>• HbA1c (glicemia)</li>
                              <li>• Omocisteina</li>
                              <li>• IGF-1</li>
                            </ul>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-scientific-blue mb-2">Annuali:</h4>
                          <ul className="space-y-1 text-sm text-slate-300">
                            <li>• MRI corpo intero</li>
                            <li>• DEXA scan (densità ossea)</li>
                            <li>• Test età biologica (metilazione DNA)</li>
                            <li>• Colonscopia e gastroscopia</li>
                            <li>• Test cognitivi completi</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Organ Health */}
                    <div className="bg-steel-blue/20 rounded-lg p-6">
                      <h3 className="text-xl font-bold mb-4 text-performance-green">
                        Salute degli Organi (70+ misurati)
                      </h3>
                      <div className="grid md:grid-cols-3 gap-3">
                        <div>
                          <h4 className="font-semibold text-scientific-blue mb-2">Cardiovascolare:</h4>
                          <ul className="space-y-1 text-xs text-slate-300">
                            <li>• Eco-cardiogramma</li>
                            <li>• Test da sforzo</li>
                            <li>• Calcium score coronarico</li>
                            <li>• Velocità onda polso</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-scientific-blue mb-2">Neurologico:</h4>
                          <ul className="space-y-1 text-xs text-slate-300">
                            <li>• MRI cerebrale</li>
                            <li>• Test cognitivi</li>
                            <li>• EEG</li>
                            <li>• Velocità di reazione</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-scientific-blue mb-2">Metabolico:</h4>
                          <ul className="space-y-1 text-xs text-slate-300">
                            <li>• Test tolleranza glucosio</li>
                            <li>• Insulina a digiuno</li>
                            <li>• Profilo acidi grassi</li>
                            <li>• Microbioma intestinale</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Skin & Aging */}
                    <div className="bg-steel-blue/20 rounded-lg p-6">
                      <h3 className="text-xl font-bold mb-4 text-performance-green">
                        Invecchiamento e Pelle
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-scientific-blue mb-2">Marcatori di Invecchiamento:</h4>
                          <ul className="space-y-1 text-sm text-slate-300">
                            <li>• Lunghezza telomeri</li>
                            <li>• Orologio epigenetico (metilazione)</li>
                            <li>• NAD+ livelli</li>
                            <li>• Senescenza cellulare</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-scientific-blue mb-2">Salute della Pelle:</h4>
                          <ul className="space-y-1 text-sm text-slate-300">
                            <li>• Analisi UV danni</li>
                            <li>• Elasticità cutanea</li>
                            <li>• Idratazione</li>
                            <li>• Collagene densità</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Data Philosophy */}
                    <div className="bg-yellow-500/10 rounded-lg p-6 border border-yellow-500/30">
                      <h3 className="text-xl font-bold mb-4 text-yellow-500">
                        Filosofia dei Dati
                      </h3>
                      <p className="text-sm text-yellow-200 mb-3">
                        "Il corpo parla attraverso i dati, non attraverso sensazioni soggettive"
                      </p>
                      <ul className="space-y-2 text-sm">
                        <li>• Ogni decisione è basata su misurazioni oggettive</li>
                        <li>• I protocolli vengono aggiustati in base ai risultati</li>
                        <li>• Nessuna speculazione, solo evidenza scientifica</li>
                        <li>• Monitoraggio continuo per identificare trend</li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-steel-blue/10">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">
              <Brain className="inline-block mr-3 text-yellow-500" />
              Filosofia del Protocollo
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-navy-charcoal/50 border-steel-blue/30 p-6">
                <div className="bg-scientific-blue/20 p-3 rounded-lg w-fit mb-4">
                  <Target className="h-6 w-6 text-scientific-blue" />
                </div>
                <h3 className="text-xl font-bold mb-3">Zeroism</h3>
                <p className="text-sm text-slate-300">
                  Minimizzare la dipendenza dalla forza di volontà creando un sistema che automatizza 
                  le decisioni sulla salute. Il corpo decide, non la mente.
                </p>
              </Card>

              <Card className="bg-navy-charcoal/50 border-steel-blue/30 p-6">
                <div className="bg-performance-green/20 p-3 rounded-lg w-fit mb-4">
                  <Award className="h-6 w-6 text-performance-green" />
                </div>
                <h3 className="text-xl font-bold mb-3">Evidenza Scientifica</h3>
                <p className="text-sm text-slate-300">
                  Ogni elemento del protocollo è supportato da ricerca peer-reviewed. 
                  Esaminata tutta la scienza della longevità per identificare le strategie più potenti.
                </p>
              </Card>

              <Card className="bg-navy-charcoal/50 border-steel-blue/30 p-6">
                <div className="bg-yellow-500/20 p-3 rounded-lg w-fit mb-4">
                  <TrendingUp className="h-6 w-6 text-yellow-500" />
                </div>
                <h3 className="text-xl font-bold mb-3">Miglioramento Continuo</h3>
                <p className="text-sm text-slate-300">
                  Il protocollo evolve con nuove scoperte. I pasti vengono modificati all'introduzione 
                  di nuove evidenze. Costante testing e tweaking basato sui dati.
                </p>
              </Card>
            </div>

            <Card className="bg-navy-charcoal/50 border-scientific-blue/30 p-8 mt-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4 text-scientific-blue">Citazione Fondamentale</h3>
                <div className="bg-yellow-500/10 p-6 rounded-lg border border-yellow-500/30 inline-block">
                  <p className="text-lg text-yellow-200 italic">
                    "Il comportamento autodistruttivo è una forma di follia"
                  </p>
                  <p className="text-sm text-yellow-300 mt-2">- Bryan Johnson</p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Implementation Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">
              <Calculator className="inline-block mr-3 text-scientific-blue" />
              Implementazione e Costi
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-navy-charcoal/50 border-steel-blue/30 p-6">
                <h3 className="text-xl font-bold mb-4 text-yellow-500">Analisi Completa dei Costi</h3>
                <div className="space-y-3">
                  <div className="flex justify-between p-3 bg-steel-blue/20 rounded-lg">
                    <span className="text-slate-300">Blueprint Stack base</span>
                    <span className="font-bold">$361/mese</span>
                  </div>
                  <div className="flex justify-between p-3 bg-steel-blue/20 rounded-lg">
                    <span className="text-slate-300">14 supplementi aggiuntivi</span>
                    <span className="font-bold">~$300/mese</span>
                  </div>
                  <div className="flex justify-between p-3 bg-steel-blue/20 rounded-lg">
                    <span className="text-slate-300">Alimentazione specifica</span>
                    <span className="font-bold">~$600/mese</span>
                  </div>
                  <div className="flex justify-between p-3 bg-steel-blue/20 rounded-lg">
                    <span className="text-slate-300">Test e monitoraggio</span>
                    <span className="font-bold">~$500/mese</span>
                  </div>
                  <div className="flex justify-between p-3 bg-yellow-500/20 rounded-lg border border-yellow-500/30">
                    <span className="font-semibold">Totale mensile</span>
                    <span className="font-bold text-yellow-500">~$1,760</span>
                  </div>
                  <div className="flex justify-between p-3 bg-scientific-blue/20 rounded-lg border border-scientific-blue/30">
                    <span className="font-semibold">Totale annuale</span>
                    <span className="font-bold text-scientific-blue">~$21,120</span>
                  </div>
                </div>
              </Card>

              <Card className="bg-navy-charcoal/50 border-steel-blue/30 p-6">
                <h3 className="text-xl font-bold mb-4 text-performance-green">Come Iniziare</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-steel-blue/20 rounded-lg">
                    <p className="font-semibold text-scientific-blue mb-1">Fase 1: Abitudini Base</p>
                    <p className="text-sm text-slate-300">Sonno consistente, esercizio giornaliero, finestra alimentare</p>
                  </div>
                  <div className="p-3 bg-steel-blue/20 rounded-lg">
                    <p className="font-semibold text-scientific-blue mb-1">Fase 2: Nutrizione</p>
                    <p className="text-sm text-slate-300">Introduci gradualmente i pasti Blueprint</p>
                  </div>
                  <div className="p-3 bg-steel-blue/20 rounded-lg">
                    <p className="font-semibold text-scientific-blue mb-1">Fase 3: Supplementi Base</p>
                    <p className="text-sm text-slate-300">Inizia con vitamine essenziali e omega-3</p>
                  </div>
                  <div className="p-3 bg-steel-blue/20 rounded-lg">
                    <p className="font-semibold text-scientific-blue mb-1">Fase 4: Monitoraggio</p>
                    <p className="text-sm text-slate-300">Aggiungi tracking del sonno e biomarker base</p>
                  </div>
                  <div className="p-3 bg-steel-blue/20 rounded-lg">
                    <p className="font-semibold text-scientific-blue mb-1">Fase 5: Ottimizzazione</p>
                    <p className="text-sm text-slate-300">Espandi supplementi e test basandoti sui risultati</p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="mt-8 p-6 bg-red-500/10 rounded-lg border border-red-500/30">
              <p className="text-center">
                <strong className="text-red-400">Disclaimer Importante:</strong> Questo protocollo è estremamente avanzato 
                e costoso. Non è finanziariamente accessibile per il 99% della popolazione. La ricerca clinica supporta 
                molti elementi ma è basata sui test personali di Johnson. Consulta sempre un medico prima di iniziare 
                qualsiasi regime di supplementazione o cambiamento drastico dello stile di vita.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-scientific-blue/20 to-performance-green/20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Inizia il Tuo Percorso di Ottimizzazione</h2>
            <p className="text-xl text-slate-300 mb-8">
              Adatta il protocollo alle tue esigenze. Inizia con piccoli cambiamenti sostenibili.
              Ricorda: il miglior protocollo è quello che riesci a seguire consistentemente.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-scientific-blue hover:bg-scientific-blue/80"
              >
                Scarica Guida PDF Completa
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-performance-green text-performance-green hover:bg-performance-green/20"
              >
                Consulenza Personalizzata
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}