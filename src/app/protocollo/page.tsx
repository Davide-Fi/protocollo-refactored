"use client";

import { useState, useEffect } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";

interface ProtocolTab {
  id: string;
  tabIndex: number;
  concernName: string;
  tabTitle: string;
  emoji: string;
  imageUrl?: string;
  contentHtml: string;
}

export default function ProtocolloPage() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [protocolTabs, setProtocolTabs] = useState<ProtocolTab[]>([]);
  const [selectedConcerns, setSelectedConcerns] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProtocolTabs();
  }, []);

  const fetchProtocolTabs = async () => {
    try {
      const response = await fetch('/api/protocol-tabs');
      const data = await response.json();
      setProtocolTabs(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching protocol tabs:', error);
      setLoading(false);
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const toggleConcern = (tabIndex: number) => {
    const newSelected = new Set(selectedConcerns);
    if (newSelected.has(tabIndex)) {
      newSelected.delete(tabIndex);
    } else {
      newSelected.add(tabIndex);
    }
    setSelectedConcerns(newSelected);
  };

  const filteredTabs = protocolTabs.filter(tab => 
    selectedConcerns.size === 0 || selectedConcerns.has(tab.tabIndex)
  );

  return (
    <div className="min-h-screen bg-navy-charcoal text-slate-100">
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-radial from-scientific-blue/10 via-transparent to-transparent animate-pulse-slow" />
          
          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-scientific-blue/20 text-scientific-blue border-scientific-blue">
                <FlaskConical className="w-3 h-3 mr-1" />
                Protocollo di Longevità
              </Badge>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-scientific-blue to-performance-green bg-clip-text text-transparent">
                Il Protocollo
              </h1>
              
              <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Sistema completo di ottimizzazione della salute basato su evidenze scientifiche.
                Personalizza il tuo percorso verso la longevità ottimale.
              </p>
            </div>

            {/* Concern Selection */}
            <div className="bg-navy-dark/50 backdrop-blur-md border border-scientific-blue/20 rounded-xl p-8 mb-12">
              <h2 className="text-2xl font-bold mb-6 text-center">
                Seleziona le tue Priorità di Salute
              </h2>
              <p className="text-slate-300 text-center mb-8">
                Scegli le aree che vuoi ottimizzare per costruire il tuo protocollo personalizzato
              </p>

              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-scientific-blue mx-auto"></div>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {protocolTabs.map((tab) => (
                    <label
                      key={tab.id}
                      className={`
                        flex items-center space-x-3 p-4 rounded-lg border cursor-pointer
                        transition-all duration-200 hover:scale-105
                        ${selectedConcerns.has(tab.tabIndex) 
                          ? 'bg-scientific-blue/20 border-scientific-blue' 
                          : 'bg-navy-charcoal/50 border-slate-700 hover:border-scientific-blue/50'
                        }
                      `}
                    >
                      <Checkbox
                        checked={selectedConcerns.has(tab.tabIndex)}
                        onCheckedChange={() => toggleConcern(tab.tabIndex)}
                        className="border-scientific-blue"
                      />
                      <div className="flex items-center space-x-2 flex-1">
                        <span className="text-2xl">{tab.emoji}</span>
                        <span className="text-sm font-medium">{tab.concernName}</span>
                      </div>
                    </label>
                  ))}
                </div>
              )}

              {selectedConcerns.size > 0 && (
                <div className="mt-6 text-center">
                  <Badge className="bg-performance-green/20 text-performance-green border-performance-green">
                    {selectedConcerns.size} {selectedConcerns.size === 1 ? 'area' : 'aree'} selezionate
                  </Badge>
                </div>
              )}
            </div>

            {/* Dynamic Protocol Builder */}
            {filteredTabs.length > 0 && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-center mb-8">
                  Il Tuo Protocollo Personalizzato
                </h2>
                
                {filteredTabs.map((tab) => (
                  <Card key={tab.id} className="bg-navy-dark/50 backdrop-blur-md border-scientific-blue/20 overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <span className="text-4xl">{tab.emoji}</span>
                          <div>
                            <h3 className="text-2xl font-bold text-white">
                              {tab.tabTitle}
                            </h3>
                            <p className="text-slate-400 mt-1">{tab.concernName}</p>
                          </div>
                        </div>
                        <Badge className="bg-scientific-blue/20 text-scientific-blue border-scientific-blue">
                          Tab {tab.tabIndex}
                        </Badge>
                      </div>
                      
                      <div 
                        className="prose prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: tab.contentHtml }}
                      />
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Original Content - Moved Below */}
        <section className="py-20 px-4 bg-navy-dark/30">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12">
              Panoramica Completa del Protocollo
            </h2>

            <Tabs defaultValue="sleep" className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-6 gap-2 bg-navy-dark/50 p-2 h-auto">
                <TabsTrigger value="sleep" className="data-[state=active]:bg-scientific-blue data-[state=active]:text-white">
                  <Moon className="w-4 h-4 mr-2" />
                  Sonno
                </TabsTrigger>
                <TabsTrigger value="diet" className="data-[state=active]:bg-scientific-blue data-[state=active]:text-white">
                  <Apple className="w-4 h-4 mr-2" />
                  Dieta
                </TabsTrigger>
                <TabsTrigger value="exercise" className="data-[state=active]:bg-scientific-blue data-[state=active]:text-white">
                  <Dumbbell className="w-4 h-4 mr-2" />
                  Esercizio
                </TabsTrigger>
                <TabsTrigger value="supplements" className="data-[state=active]:bg-scientific-blue data-[state=active]:text-white">
                  <Pill className="w-4 h-4 mr-2" />
                  Integratori
                </TabsTrigger>
                <TabsTrigger value="routine" className="data-[state=active]:bg-scientific-blue data-[state=active]:text-white">
                  <Clock className="w-4 h-4 mr-2" />
                  Routine
                </TabsTrigger>
                <TabsTrigger value="measurements" className="data-[state=active]:bg-scientific-blue data-[state=active]:text-white">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Misurazioni
                </TabsTrigger>
              </TabsList>

              {/* Sleep Tab */}
              <TabsContent value="sleep" className="mt-8">
                <Card className="bg-navy-dark/50 backdrop-blur-md border-scientific-blue/20 p-8">
                  <div className="flex items-center mb-6">
                    <Moon className="w-8 h-8 text-scientific-blue mr-4" />
                    <h3 className="text-2xl font-bold">Protocollo del Sonno</h3>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-scientific-blue">Routine Serale</h4>
                      <ul className="space-y-2 text-slate-300">
                        <li className="flex items-start">
                          <Clock className="w-4 h-4 text-performance-green mr-2 mt-1 flex-shrink-0" />
                          <span>Ultima assunzione di cibo: ore 20:30</span>
                        </li>
                        <li className="flex items-start">
                          <Timer className="w-4 h-4 text-performance-green mr-2 mt-1 flex-shrink-0" />
                          <span>Integratori per il sonno: 30-60 minuti prima di dormire</span>
                        </li>
                        <li className="flex items-start">
                          <Moon className="w-4 h-4 text-performance-green mr-2 mt-1 flex-shrink-0" />
                          <span>Luci soffuse e niente schermi: 1+ ora prima di dormire</span>
                        </li>
                        <li className="flex items-start">
                          <Bed className="w-4 h-4 text-performance-green mr-2 mt-1 flex-shrink-0" />
                          <span>A letto alle 22:00 ogni sera</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-scientific-blue">Integratori per il Sonno</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-navy-charcoal/50 p-4 rounded-lg">
                          <p className="font-medium text-white">Magnesio Glicinato</p>
                          <p className="text-sm text-slate-400">500 mg</p>
                        </div>
                        <div className="bg-navy-charcoal/50 p-4 rounded-lg">
                          <p className="font-medium text-white">L-teanina</p>
                          <p className="text-sm text-slate-400">200 mg</p>
                        </div>
                        <div className="bg-navy-charcoal/50 p-4 rounded-lg">
                          <p className="font-medium text-white">Glicina</p>
                          <p className="text-sm text-slate-400">2-3 g</p>
                        </div>
                        <div className="bg-navy-charcoal/50 p-4 rounded-lg">
                          <p className="font-medium text-white">Ashwagandha</p>
                          <p className="text-sm text-slate-400">600 mg (occasionale)</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-scientific-blue">Ambiente Ottimale</h4>
                      <ul className="space-y-2 text-slate-300">
                        <li>• Temperatura: 15-20°C</li>
                        <li>• Oscurità totale con tende oscuranti</li>
                        <li>• Rumore bianco o tappi per le orecchie</li>
                        <li>• Materasso e cuscini di qualità</li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* Diet Tab */}
              <TabsContent value="diet" className="mt-8">
                <Card className="bg-navy-dark/50 backdrop-blur-md border-scientific-blue/20 p-8">
                  <div className="flex items-center mb-6">
                    <Apple className="w-8 h-8 text-scientific-blue mr-4" />
                    <h3 className="text-2xl font-bold">Protocollo Nutrizionale</h3>
                  </div>

                  <div className="space-y-6">
                    {/* Meal 1 */}
                    <div 
                      className="border border-scientific-blue/20 rounded-lg overflow-hidden cursor-pointer"
                      onClick={() => toggleSection('meal1')}
                    >
                      <div className="bg-navy-charcoal/50 p-4 flex justify-between items-center">
                        <div className="flex items-center">
                          <Coffee className="w-5 h-5 text-performance-green mr-3" />
                          <h4 className="text-lg font-semibold">Primo Pasto - 11:00</h4>
                          <Badge className="ml-3 bg-scientific-blue/20 text-scientific-blue">900 cal</Badge>
                        </div>
                        {expandedSection === 'meal1' ? <ChevronUp /> : <ChevronDown />}
                      </div>
                      {expandedSection === 'meal1' && (
                        <div className="p-4 space-y-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-white">Super Veggie</p>
                              <p className="text-sm text-slate-400">Broccoli, cavolfiore, verdure a foglia verde, aglio, zenzero, lime, cumino, aceto di mele, semi di canapa</p>
                            </div>
                            <Badge className="bg-performance-green/20 text-performance-green">450 cal</Badge>
                          </div>
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-white">Nutty Pudding</p>
                              <p className="text-sm text-slate-400">Latte di macadamia, noci macinate, semi di lino, semi di chia, cannella, frutti di bosco, succo di melograno</p>
                            </div>
                            <Badge className="bg-performance-green/20 text-performance-green">330 cal</Badge>
                          </div>
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-white">Olio d'oliva extra vergine</p>
                              <p className="text-sm text-slate-400">1 cucchiaio</p>
                            </div>
                            <Badge className="bg-performance-green/20 text-performance-green">120 cal</Badge>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Meal 2 */}
                    <div 
                      className="border border-scientific-blue/20 rounded-lg overflow-hidden cursor-pointer"
                      onClick={() => toggleSection('meal2')}
                    >
                      <div className="bg-navy-charcoal/50 p-4 flex justify-between items-center">
                        <div className="flex items-center">
                          <Salad className="w-5 h-5 text-performance-green mr-3" />
                          <h4 className="text-lg font-semibold">Secondo Pasto - 17:00</h4>
                          <Badge className="ml-3 bg-scientific-blue/20 text-scientific-blue">1140 cal</Badge>
                        </div>
                        {expandedSection === 'meal2' ? <ChevronUp /> : <ChevronDown />}
                      </div>
                      {expandedSection === 'meal2' && (
                        <div className="p-4 space-y-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-white">Super Veggie</p>
                              <p className="text-sm text-slate-400">Porzione completa di verdure miste</p>
                            </div>
                            <Badge className="bg-performance-green/20 text-performance-green">450 cal</Badge>
                          </div>
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-white">Nutty Pudding</p>
                              <p className="text-sm text-slate-400">Porzione completa</p>
                            </div>
                            <Badge className="bg-performance-green/20 text-performance-green">330 cal</Badge>
                          </div>
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-white">Insalate Miste</p>
                              <p className="text-sm text-slate-400">Insalata di finocchio e arancia, avocado con erbe, insalata di barbabietole</p>
                            </div>
                            <Badge className="bg-performance-green/20 text-performance-green">240 cal</Badge>
                          </div>
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-white">Olio d'oliva extra vergine</p>
                              <p className="text-sm text-slate-400">1 cucchiaio</p>
                            </div>
                            <Badge className="bg-performance-green/20 text-performance-green">120 cal</Badge>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Meal 3 */}
                    <div 
                      className="border border-scientific-blue/20 rounded-lg overflow-hidden cursor-pointer"
                      onClick={() => toggleSection('meal3')}
                    >
                      <div className="bg-navy-charcoal/50 p-4 flex justify-between items-center">
                        <div className="flex items-center">
                          <ChefHat className="w-5 h-5 text-performance-green mr-3" />
                          <h4 className="text-lg font-semibold">Terzo Pasto - 18:00</h4>
                          <Badge className="ml-3 bg-scientific-blue/20 text-scientific-blue">500 cal</Badge>
                        </div>
                        {expandedSection === 'meal3' ? <ChevronUp /> : <ChevronDown />}
                      </div>
                      {expandedSection === 'meal3' && (
                        <div className="p-4">
                          <p className="text-slate-300">
                            Varietà di verdure, frutti di bosco, noci, semi e legumi.
                            Esempio: patata dolce ripiena con lenticchie nere, verdure e tahini.
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="bg-scientific-blue/10 p-4 rounded-lg">
                      <p className="text-center">
                        <span className="font-bold text-xl text-scientific-blue">Totale Giornaliero: 2,540 calorie</span>
                      </p>
                      <p className="text-center text-slate-400 mt-2">
                        Proteine: 75g+ | Finestra alimentare: 8 ore | Niente cibo dopo le 20:30
                      </p>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* Exercise Tab */}
              <TabsContent value="exercise" className="mt-8">
                <Card className="bg-navy-dark/50 backdrop-blur-md border-scientific-blue/20 p-8">
                  <div className="flex items-center mb-6">
                    <Dumbbell className="w-8 h-8 text-scientific-blue mr-4" />
                    <h3 className="text-2xl font-bold">Protocollo di Esercizio</h3>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-scientific-blue/10 p-4 rounded-lg">
                      <p className="text-center font-semibold">
                        7 giorni a settimana | 60-90 minuti | Media ~70 minuti
                      </p>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-scientific-blue">Routine Giornaliera</h4>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <Badge className="bg-performance-green/20 text-performance-green mr-3 mt-1">10 min</Badge>
                          <div>
                            <p className="font-medium">Riscaldamento Moderato</p>
                            <p className="text-sm text-slate-400">Attivazione muscolare e mobilità</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Badge className="bg-performance-green/20 text-performance-green mr-3 mt-1">10 min</Badge>
                          <div>
                            <p className="font-medium">HIIT - Intervalli ad Alta Intensità</p>
                            <p className="text-sm text-slate-400">3x/settimana: bici (2 min riscaldamento + 4 min 85%+ VO₂ max)</p>
                            <p className="text-sm text-slate-400">4x/settimana: altri esercizi ad alta intensità</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Badge className="bg-performance-green/20 text-performance-green mr-3 mt-1">40+ min</Badge>
                          <div>
                            <p className="font-medium">Forza e Cardio</p>
                            <p className="text-sm text-slate-400">Pesi 3x/settimana (~12 min), rotazione con cardio</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-scientific-blue">Protocollo Pesi (3x/settimana)</h4>
                      <div className="grid md:grid-cols-2 gap-2 text-sm">
                        <div className="bg-navy-charcoal/50 p-3 rounded">Leg press (1 set, 8-15 reps)</div>
                        <div className="bg-navy-charcoal/50 p-3 rounded">Bench press (1 set, 8-15 reps)</div>
                        <div className="bg-navy-charcoal/50 p-3 rounded">Leg curls (1 set, 8-15 reps)</div>
                        <div className="bg-navy-charcoal/50 p-3 rounded">Pull-ups (1 set, 8-15 reps)</div>
                        <div className="bg-navy-charcoal/50 p-3 rounded">Overhead press (1 set, 8-15 reps)</div>
                        <div className="bg-navy-charcoal/50 p-3 rounded">Back extensions (1 set, 8-15 reps)</div>
                        <div className="bg-navy-charcoal/50 p-3 rounded">Chest fly (1 set, 8-15 reps)</div>
                        <div className="bg-navy-charcoal/50 p-3 rounded">Obliques (1 set, 8-15 reps)</div>
                      </div>
                    </div>

                    <div className="bg-performance-green/10 p-4 rounded-lg">
                      <h4 className="text-lg font-semibold mb-2 text-performance-green">Record Personali</h4>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-2xl font-bold text-white">100+</p>
                          <p className="text-sm text-slate-400">Push-up consecutivi</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-white">60+</p>
                          <p className="text-sm text-slate-400">Pull-up consecutivi</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-white">240 lb</p>
                          <p className="text-sm text-slate-400">Bench press (1 rep)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* Supplements Tab */}
              <TabsContent value="supplements" className="mt-8">
                <Card className="bg-navy-dark/50 backdrop-blur-md border-scientific-blue/20 p-8">
                  <div className="flex items-center mb-6">
                    <Pill className="w-8 h-8 text-scientific-blue mr-4" />
                    <h3 className="text-2xl font-bold">Protocollo Integratori</h3>
                  </div>

                  <div className="space-y-6">
                    {/* Morning Supplements */}
                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-scientific-blue flex items-center">
                        <Sun className="w-5 h-5 mr-2" />
                        Mattina (5:45)
                      </h4>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div className="bg-navy-charcoal/50 p-3 rounded-lg flex justify-between items-center">
                          <span>Vitamina D3</span>
                          <Badge className="bg-scientific-blue/20 text-scientific-blue">2000 IU</Badge>
                        </div>
                        <div className="bg-navy-charcoal/50 p-3 rounded-lg flex justify-between items-center">
                          <span>Vitamina K2</span>
                          <Badge className="bg-scientific-blue/20 text-scientific-blue">100 mcg</Badge>
                        </div>
                        <div className="bg-navy-charcoal/50 p-3 rounded-lg flex justify-between items-center">
                          <span>Omega-3 (EPA/DHA)</span>
                          <Badge className="bg-scientific-blue/20 text-scientific-blue">2 g</Badge>
                        </div>
                        <div className="bg-navy-charcoal/50 p-3 rounded-lg flex justify-between items-center">
                          <span>NMN</span>
                          <Badge className="bg-scientific-blue/20 text-scientific-blue">1000 mg</Badge>
                        </div>
                      </div>
                    </div>

                    {/* Midday Supplements */}
                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-scientific-blue flex items-center">
                        <Activity className="w-5 h-5 mr-2" />
                        Mezzogiorno (11:30)
                      </h4>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div className="bg-navy-charcoal/50 p-3 rounded-lg flex justify-between items-center">
                          <span>Complesso B</span>
                          <Badge className="bg-scientific-blue/20 text-scientific-blue">1 dose</Badge>
                        </div>
                        <div className="bg-navy-charcoal/50 p-3 rounded-lg flex justify-between items-center">
                          <span>Vitamina C</span>
                          <Badge className="bg-scientific-blue/20 text-scientific-blue">1000 mg</Badge>
                        </div>
                        <div className="bg-navy-charcoal/50 p-3 rounded-lg flex justify-between items-center">
                          <span>NAC</span>
                          <Badge className="bg-scientific-blue/20 text-scientific-blue">600 mg</Badge>
                        </div>
                        <div className="bg-navy-charcoal/50 p-3 rounded-lg flex justify-between items-center">
                          <span>Zinco</span>
                          <Badge className="bg-scientific-blue/20 text-scientific-blue">15 mg</Badge>
                        </div>
                      </div>
                    </div>

                    {/* Evening Supplements */}
                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-scientific-blue flex items-center">
                        <Moon className="w-5 h-5 mr-2" />
                        Sera (21:00)
                      </h4>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div className="bg-navy-charcoal/50 p-3 rounded-lg flex justify-between items-center">
                          <span>Magnesio Glicinato</span>
                          <Badge className="bg-scientific-blue/20 text-scientific-blue">500 mg</Badge>
                        </div>
                        <div className="bg-navy-charcoal/50 p-3 rounded-lg flex justify-between items-center">
                          <span>L-teanina</span>
                          <Badge className="bg-scientific-blue/20 text-scientific-blue">200 mg</Badge>
                        </div>
                        <div className="bg-navy-charcoal/50 p-3 rounded-lg flex justify-between items-center">
                          <span>Glicina</span>
                          <Badge className="bg-scientific-blue/20 text-scientific-blue">3 g</Badge>
                        </div>
                        <div className="bg-navy-charcoal/50 p-3 rounded-lg flex justify-between items-center">
                          <span>Ashwagandha</span>
                          <Badge className="bg-scientific-blue/20 text-scientific-blue">600 mg</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="bg-scientific-blue/10 p-4 rounded-lg">
                      <p className="text-sm text-slate-300">
                        <strong>Nota:</strong> Tutti gli integratori sono selezionati basandosi su evidenze scientifiche. 
                        Consulta sempre un professionista sanitario prima di iniziare nuovi integratori.
                      </p>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* Routine Tab */}
              <TabsContent value="routine" className="mt-8">
                <Card className="bg-navy-dark/50 backdrop-blur-md border-scientific-blue/20 p-8">
                  <div className="flex items-center mb-6">
                    <Clock className="w-8 h-8 text-scientific-blue mr-4" />
                    <h3 className="text-2xl font-bold">Routine Giornaliera di Bryan</h3>
                  </div>

                  <div className="space-y-4">
                    {/* Timeline */}
                    <div className="relative">
                      {/* Morning */}
                      <div className="mb-8">
                        <h4 className="text-lg font-semibold mb-3 text-scientific-blue flex items-center">
                          <Sun className="w-5 h-5 mr-2" />
                          Mattina (5:00 - 9:00)
                        </h4>
                        <div className="space-y-2 pl-7">
                          <div className="flex items-center text-slate-300">
                            <span className="text-performance-green font-mono mr-3">05:00</span>
                            Sveglia naturale (senza sveglia)
                          </div>
                          <div className="flex items-center text-slate-300">
                            <span className="text-performance-green font-mono mr-3">05:10</span>
                            Misurazioni mattutine (peso, temperatura, glucosio)
                          </div>
                          <div className="flex items-center text-slate-300">
                            <span className="text-performance-green font-mono mr-3">05:30</span>
                            Terapia della luce (10.000 lux per 10-15 min)
                          </div>
                          <div className="flex items-center text-slate-300">
                            <span className="text-performance-green font-mono mr-3">05:45</span>
                            Integratori mattutini
                          </div>
                          <div className="flex items-center text-slate-300">
                            <span className="text-performance-green font-mono mr-3">06:00</span>
                            Esercizio (60-90 minuti)
                          </div>
                          <div className="flex items-center text-slate-300">
                            <span className="text-performance-green font-mono mr-3">07:30</span>
                            Integratori post-allenamento
                          </div>
                          <div className="flex items-center text-slate-300">
                            <span className="text-performance-green font-mono mr-3">08:00</span>
                            Terapia a luce rossa
                          </div>
                          <div className="flex items-center text-slate-300">
                            <span className="text-performance-green font-mono mr-3">08:30</span>
                            Doccia e routine skincare
                          </div>
                        </div>
                      </div>

                      {/* Midday */}
                      <div className="mb-8">
                        <h4 className="text-lg font-semibold mb-3 text-scientific-blue flex items-center">
                          <Activity className="w-5 h-5 mr-2" />
                          Mezzogiorno (9:00 - 14:00)
                        </h4>
                        <div className="space-y-2 pl-7">
                          <div className="flex items-center text-slate-300">
                            <span className="text-performance-green font-mono mr-3">09:00</span>
                            Sessione di lavoro profondo #1
                          </div>
                          <div className="flex items-center text-slate-300">
                            <span className="text-performance-green font-mono mr-3">11:00</span>
                            Primo pasto (Super Veggie + Nutty Pudding)
                          </div>
                          <div className="flex items-center text-slate-300">
                            <span className="text-performance-green font-mono mr-3">11:30</span>
                            Integratori di mezzogiorno
                          </div>
                          <div className="flex items-center text-slate-300">
                            <span className="text-performance-green font-mono mr-3">12:00</span>
                            Camminata o attività leggera
                          </div>
                          <div className="flex items-center text-slate-300">
                            <span className="text-performance-green font-mono mr-3">13:00</span>
                            Sessione di lavoro profondo #2
                          </div>
                        </div>
                      </div>

                      {/* Afternoon */}
                      <div className="mb-8">
                        <h4 className="text-lg font-semibold mb-3 text-scientific-blue flex items-center">
                          <Coffee className="w-5 h-5 mr-2" />
                          Pomeriggio (14:00 - 18:00)
                        </h4>
                        <div className="space-y-2 pl-7">
                          <div className="flex items-center text-slate-300">
                            <span className="text-performance-green font-mono mr-3">14:00</span>
                            HRV training/meditazione
                          </div>
                          <div className="flex items-center text-slate-300">
                            <span className="text-performance-green font-mono mr-3">15:00</span>
                            Sessione di lavoro profondo #3
                          </div>
                          <div className="flex items-center text-slate-300">
                            <span className="text-performance-green font-mono mr-3">17:00</span>
                            Secondo pasto
                          </div>
                          <div className="flex items-center text-slate-300">
                            <span className="text-performance-green font-mono mr-3">17:30</span>
                            Integratori serali
                          </div>
                        </div>
                      </div>

                      {/* Evening */}
                      <div>
                        <h4 className="text-lg font-semibold mb-3 text-scientific-blue flex items-center">
                          <Moon className="w-5 h-5 mr-2" />
                          Sera (18:00 - 22:00)
                        </h4>
                        <div className="space-y-2 pl-7">
                          <div className="flex items-center text-slate-300">
                            <span className="text-performance-green font-mono mr-3">18:00</span>
                            Terzo pasto (opzionale)
                          </div>
                          <div className="flex items-center text-slate-300">
                            <span className="text-performance-green font-mono mr-3">18:30</span>
                            Tempo famiglia/attività sociali
                          </div>
                          <div className="flex items-center text-slate-300">
                            <span className="text-performance-green font-mono mr-3">19:30</span>
                            Snack opzionale (noci e frutti di bosco)
                          </div>
                          <div className="flex items-center text-slate-300">
                            <span className="text-performance-green font-mono mr-3">20:00</span>
                            Preparazione per domani
                          </div>
                          <div className="flex items-center text-slate-300">
                            <span className="text-performance-green font-mono mr-3">20:30</span>
                            Inizio routine serale (niente cibo)
                          </div>
                          <div className="flex items-center text-slate-300">
                            <span className="text-performance-green font-mono mr-3">21:00</span>
                            Integratori per il sonno
                          </div>
                          <div className="flex items-center text-slate-300">
                            <span className="text-performance-green font-mono mr-3">21:30</span>
                            Wind-down (niente schermi, luci soffuse)
                          </div>
                          <div className="flex items-center text-slate-300">
                            <span className="text-performance-green font-mono mr-3">22:00</span>
                            A letto, luci spente
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-scientific-blue/10 p-4 rounded-lg">
                      <p className="text-center font-semibold">
                        Stessa routine ogni giorno, 365 giorni all'anno
                      </p>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* Measurements Tab */}
              <TabsContent value="measurements" className="mt-8">
                <Card className="bg-navy-dark/50 backdrop-blur-md border-scientific-blue/20 p-8">
                  <div className="flex items-center mb-6">
                    <BarChart3 className="w-8 h-8 text-scientific-blue mr-4" />
                    <h3 className="text-2xl font-bold">Protocollo di Misurazione</h3>
                  </div>

                  <div className="space-y-6">
                    {/* Daily Measurements */}
                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-scientific-blue">Misurazioni Giornaliere</h4>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div className="bg-navy-charcoal/50 p-3 rounded-lg">
                          <p className="font-medium text-white">Peso corporeo</p>
                          <p className="text-sm text-slate-400">Stessa ora, dopo il bagno, prima di mangiare</p>
                        </div>
                        <div className="bg-navy-charcoal/50 p-3 rounded-lg">
                          <p className="font-medium text-white">Variabilità cardiaca (HRV)</p>
                          <p className="text-sm text-slate-400">Via Oura ring</p>
                        </div>
                        <div className="bg-navy-charcoal/50 p-3 rounded-lg">
                          <p className="font-medium text-white">Frequenza cardiaca a riposo</p>
                          <p className="text-sm text-slate-400">Al risveglio</p>
                        </div>
                        <div className="bg-navy-charcoal/50 p-3 rounded-lg">
                          <p className="font-medium text-white">Glucosio nel sangue</p>
                          <p className="text-sm text-slate-400">Monitor continuo o puntura del dito</p>
                        </div>
                      </div>
                    </div>

                    {/* Monthly Blood Work */}
                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-scientific-blue">Esami del Sangue Mensili</h4>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div className="bg-navy-charcoal/50 p-3 rounded-lg">
                          <p className="font-medium text-white">Emocromo completo (CBC)</p>
                        </div>
                        <div className="bg-navy-charcoal/50 p-3 rounded-lg">
                          <p className="font-medium text-white">Pannello metabolico completo</p>
                        </div>
                        <div className="bg-navy-charcoal/50 p-3 rounded-lg">
                          <p className="font-medium text-white">Profilo lipidico + ApoB</p>
                        </div>
                        <div className="bg-navy-charcoal/50 p-3 rounded-lg">
                          <p className="font-medium text-white">Ormoni (testosterone, DHEA-S)</p>
                        </div>
                        <div className="bg-navy-charcoal/50 p-3 rounded-lg">
                          <p className="font-medium text-white">Tiroide (TSH, T3 libero, T4 libero)</p>
                        </div>
                        <div className="bg-navy-charcoal/50 p-3 rounded-lg">
                          <p className="font-medium text-white">Infiammazione (hs-CRP, omocisteina)</p>
                        </div>
                      </div>
                    </div>

                    {/* Target Ranges */}
                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-scientific-blue">Obiettivi Target (Maschio)</h4>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div className="bg-navy-charcoal/50 p-3 rounded-lg flex justify-between">
                          <span>Frequenza cardiaca a riposo</span>
                          <Badge className="bg-performance-green/20 text-performance-green">&lt; 50 bpm</Badge>
                        </div>
                        <div className="bg-navy-charcoal/50 p-3 rounded-lg flex justify-between">
                          <span>HRV</span>
                          <Badge className="bg-performance-green/20 text-performance-green">&gt; 50ms</Badge>
                        </div>
                        <div className="bg-navy-charcoal/50 p-3 rounded-lg flex justify-between">
                          <span>Pressione sanguigna</span>
                          <Badge className="bg-performance-green/20 text-performance-green">&lt; 120/80</Badge>
                        </div>
                        <div className="bg-navy-charcoal/50 p-3 rounded-lg flex justify-between">
                          <span>Glucosio a digiuno</span>
                          <Badge className="bg-performance-green/20 text-performance-green">70-85 mg/dL</Badge>
                        </div>
                        <div className="bg-navy-charcoal/50 p-3 rounded-lg flex justify-between">
                          <span>HbA1c</span>
                          <Badge className="bg-performance-green/20 text-performance-green">&lt; 5.0%</Badge>
                        </div>
                        <div className="bg-navy-charcoal/50 p-3 rounded-lg flex justify-between">
                          <span>ApoB</span>
                          <Badge className="bg-performance-green/20 text-performance-green">&lt; 60 mg/dL</Badge>
                        </div>
                      </div>
                    </div>

                    {/* Advanced Tests */}
                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-scientific-blue">Test Avanzati Annuali</h4>
                      <div className="space-y-2 text-slate-300">
                        <div className="flex items-start">
                          <Shield className="w-4 h-4 text-performance-green mr-2 mt-1" />
                          <span>MRI corpo completo (screening tumori)</span>
                        </div>
                        <div className="flex items-start">
                          <Heart className="w-4 h-4 text-performance-green mr-2 mt-1" />
                          <span>Punteggio calcio coronarico</span>
                        </div>
                        <div className="flex items-start">
                          <Brain className="w-4 h-4 text-performance-green mr-2 mt-1" />
                          <span>Test età epigenetica</span>
                        </div>
                        <div className="flex items-start">
                          <Beaker className="w-4 h-4 text-performance-green mr-2 mt-1" />
                          <span>Analisi del microbioma</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">Inizia il Tuo Viaggio verso la Longevità</h2>
            <p className="text-xl text-slate-300 mb-8">
              Unisciti a migliaia di persone che stanno ottimizzando la loro salute con il Protocollo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-scientific-blue hover:bg-scientific-blue/80"
                onClick={() => window.location.href = '/consultation'}
              >
                <Brain className="w-5 h-5 mr-2" />
                Richiedi Consulenza
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-scientific-blue text-scientific-blue hover:bg-scientific-blue/10"
                onClick={() => window.location.href = '/newsletter'}
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Iscriviti alla Newsletter
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}