"use client";

import { useState } from "react";
import { 
  Award, Target, Activity, CheckCircle,
  Clock, Sun, Moon, Heart, Brain, Dumbbell, Apple, Timer, Shield,
  Beaker, Coffee, Pill, Salad, ChefHat, Bed, BarChart3, FlaskConical,
  BookOpen, Sparkles, Zap, TrendingUp, Users, Baby, Calendar,
  Ban, Droplets, ShoppingBag, Scissors, Smile, Stethoscope, Microscope,
  Package, AlertCircle, CheckCircle2, Info, Star, ArrowRight,
  Flame, Waves, Wind, Leaf, Eye, Ear, BrainCircuit
} from "lucide-react";
import Navigation from "@/components/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const protocolSections = [
  {
    id: "eat",
    title: "Nutrizione",
    emoji: "🥗",
    icon: Apple,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/20",
    content: (
      <div className="space-y-8">
        {/* Header Card */}
        <Card className="relative overflow-hidden bg-gradient-to-br from-green-500/15 via-emerald-500/10 to-teal-500/5 border-green-500/30 p-8 shadow-xl shadow-green-500/5">
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-green-500/5" />
          <div className="relative">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-4xl font-bold mb-3 flex items-center gap-3 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  <div className="p-3 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl shadow-lg shadow-green-500/20">
                    <Apple className="h-8 w-8 text-green-400" />
                  </div>
                  Protocollo Nutrizionale Giornaliero
                </h2>
                <p className="text-slate-400 text-lg font-medium">6 giorni a settimana di alimentazione ottimizzata</p>
              </div>
              <Badge className="bg-gradient-to-r from-green-500/30 to-emerald-500/30 text-green-300 border-green-400/50 text-lg px-5 py-2 font-semibold shadow-lg shadow-green-500/20">
                2,540 cal/giorno
              </Badge>
            </div>
            <div className="grid grid-cols-3 gap-5 mt-8">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-transparent rounded-xl blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative text-center p-4 bg-gradient-to-br from-navy-charcoal/80 to-navy-charcoal/40 rounded-xl border border-green-500/20 backdrop-blur-sm">
                  <p className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">75g+</p>
                  <p className="text-sm text-slate-400 font-medium mt-1">Proteine</p>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-xl blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative text-center p-4 bg-gradient-to-br from-navy-charcoal/80 to-navy-charcoal/40 rounded-xl border border-emerald-500/20 backdrop-blur-sm">
                  <p className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">8h</p>
                  <p className="text-sm text-slate-400 font-medium mt-1">Finestra alimentare</p>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-lime-500/20 to-transparent rounded-xl blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative text-center p-4 bg-gradient-to-br from-navy-charcoal/80 to-navy-charcoal/40 rounded-xl border border-lime-500/20 backdrop-blur-sm">
                  <p className="text-3xl font-bold bg-gradient-to-r from-lime-400 to-green-400 bg-clip-text text-transparent">100%</p>
                  <p className="text-sm text-slate-400 font-medium mt-1">Plant-based</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Meal Timeline */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <Clock className="h-6 w-6 text-scientific-blue" />
            Timeline Pasti Giornalieri
          </h3>
          
          {/* First Meal */}
          <Card className="relative border-green-500/30 overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-transparent" />
            <div className="relative bg-gradient-to-r from-green-500/25 via-green-500/15 to-transparent p-5 border-b-2 border-green-500/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-green-500/30 rounded-2xl blur-xl" />
                    <div className="relative w-14 h-14 bg-gradient-to-br from-green-500/30 to-emerald-500/30 rounded-2xl flex items-center justify-center shadow-lg border border-green-500/30">
                      <Coffee className="h-7 w-7 text-green-400" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Primo Pasto</h4>
                    <p className="text-sm text-slate-400 font-medium">11:00 AM</p>
                  </div>
                </div>
                <Badge className="bg-gradient-to-r from-green-500/30 to-emerald-500/30 text-green-300 text-lg px-5 py-2 font-bold shadow-lg border border-green-500/30">
                  900 cal
                </Badge>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="bg-navy-dark/50 border-green-500/10 p-4">
                  <h5 className="font-semibold mb-2 text-green-400">🥦 Super Veggie</h5>
                  <p className="text-sm text-slate-400 mb-3">Broccoli, cavolfiore, verdure a foglia verde, aglio, zenzero, lime, cumino, aceto di mele, semi di canapa</p>
                  <Badge className="bg-green-500/20 text-green-300">450 cal</Badge>
                </Card>
                <Card className="bg-navy-dark/50 border-green-500/10 p-4">
                  <h5 className="font-semibold mb-2 text-emerald-400">🥜 Nutty Pudding</h5>
                  <p className="text-sm text-slate-400 mb-3">Latte di macadamia, noci macinate, semi di lino, semi di chia, cannella, frutti di bosco, succo di melograno</p>
                  <Badge className="bg-emerald-500/20 text-emerald-300">330 cal</Badge>
                </Card>
                <Card className="bg-navy-dark/50 border-green-500/10 p-4">
                  <h5 className="font-semibold mb-2 text-lime-400">🫒 Olio EVO</h5>
                  <p className="text-sm text-slate-400 mb-3">1 cucchiaio di olio extra vergine d&apos;oliva di alta qualità</p>
                  <Badge className="bg-lime-500/20 text-lime-300">120 cal</Badge>
                </Card>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Info className="h-4 w-4" />
                <span>Macronutrienti: Proteine 30g+ | Carboidrati complessi | Grassi sani</span>
              </div>
            </div>
          </Card>

          {/* Second Meal */}
          <Card className="border-emerald-500/20 overflow-hidden hover:shadow-lg hover:shadow-emerald-500/10 transition-all">
            <div className="bg-gradient-to-r from-emerald-500/20 to-transparent p-4 border-b border-emerald-500/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center">
                    <Salad className="h-6 w-6 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold">Secondo Pasto</h4>
                    <p className="text-sm text-slate-400">17:00 PM</p>
                  </div>
                </div>
                <Badge className="bg-emerald-500/20 text-emerald-400 text-lg px-4 py-1">
                  1,140 cal
                </Badge>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-navy-dark/50 rounded-lg">
                    <span className="font-medium">🥦 Super Veggie</span>
                    <Badge className="bg-emerald-500/20 text-emerald-300">450 cal</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-navy-dark/50 rounded-lg">
                    <span className="font-medium">🥜 Nutty Pudding</span>
                    <Badge className="bg-emerald-500/20 text-emerald-300">330 cal</Badge>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-navy-dark/50 rounded-lg">
                    <span className="font-medium">🥗 Insalate Miste</span>
                    <Badge className="bg-emerald-500/20 text-emerald-300">240 cal</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-navy-dark/50 rounded-lg">
                    <span className="font-medium">🫒 Olio EVO</span>
                    <Badge className="bg-emerald-500/20 text-emerald-300">120 cal</Badge>
                  </div>
                </div>
              </div>
              <Card className="bg-emerald-500/10 border-emerald-500/20 p-4">
                <p className="text-sm">
                  <strong>Insalate incluse:</strong> Finocchio e arancia • Avocado con erbe • Barbabietole arrostite
                </p>
              </Card>
            </div>
          </Card>

          {/* Third Meal */}
          <Card className="border-lime-500/20 overflow-hidden hover:shadow-lg hover:shadow-lime-500/10 transition-all">
            <div className="bg-gradient-to-r from-lime-500/20 to-transparent p-4 border-b border-lime-500/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-lime-500/20 rounded-full flex items-center justify-center">
                    <ChefHat className="h-6 w-6 text-lime-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold">Terzo Pasto (Opzionale)</h4>
                    <p className="text-sm text-slate-400">18:00 PM</p>
                  </div>
                </div>
                <Badge className="bg-lime-500/20 text-lime-400 text-lg px-4 py-1">
                  500 cal
                </Badge>
              </div>
            </div>
            <div className="p-6">
              <div className="bg-navy-dark/50 rounded-lg p-4 mb-4">
                <h5 className="font-semibold mb-2 text-lime-400">🍠 Varietà Vegetale</h5>
                <p className="text-slate-400 mb-3">
                  Patata dolce ripiena con lenticchie nere, verdure arrostite, tahini e spezie.
                  Alternativa: Buddha bowl con quinoa, ceci, verdure e semi.
                </p>
              </div>
              <div className="flex items-center gap-2 p-3 bg-lime-500/10 rounded-lg">
                <AlertCircle className="h-4 w-4 text-lime-400" />
                <span className="text-sm">Snack serale (19:30): Noci del Brasile, macadamia e frutti di bosco</span>
              </div>
            </div>
          </Card>

          {/* Cheat Day */}
          <Card className="border-yellow-500/20 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Star className="h-6 w-6 text-yellow-400" />
                <h4 className="text-xl font-bold">Giorno Libero (1 volta/settimana)</h4>
              </div>
              <p className="text-slate-300 mb-4">
                Bryan mangia quello che vuole, con moderazione. I suoi preferiti:
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-yellow-500/20 text-yellow-400 px-3 py-1">🍕 Pizza (senza formaggio)</Badge>
                <Badge className="bg-orange-500/20 text-orange-400 px-3 py-1">🥣 Grape Nuts cereal</Badge>
                <Badge className="bg-red-500/20 text-red-400 px-3 py-1">🍬 Liquirizia Panda</Badge>
              </div>
              <p className="text-sm text-slate-400 mt-4">
                  <p className="text-sm text-slate-400 mb-3">Olio d&apos;oliva, finocchio, avocado, erbe aromatiche, barbabietole</p>
              </p>
            </div>
          </Card>
        </div>
      </div>
    )
  },
  {
    id: "exercise",
    title: "Esercizio",
    emoji: "💪",
    icon: Dumbbell,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
    content: (
      <div className="space-y-8">
        {/* Header Card */}
        <Card className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/20 p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
                <Dumbbell className="h-8 w-8 text-blue-500" />
                Protocollo di Allenamento
              </h2>
              <p className="text-slate-400">Routine quotidiana per ottimizzare forza e longevità</p>
            </div>
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500">
              7 giorni/settimana
            </Badge>
          </div>
          <div className="grid grid-cols-4 gap-4 mt-6">
            <div className="text-center p-3 bg-navy-charcoal/50 rounded-lg">
              <p className="text-2xl font-bold text-blue-400">70</p>
              <p className="text-sm text-slate-400">Min/giorno</p>
            </div>
            <div className="text-center p-3 bg-navy-charcoal/50 rounded-lg">
              <p className="text-2xl font-bold text-cyan-400">100+</p>
              <p className="text-sm text-slate-400">Push-ups</p>
            </div>
            <div className="text-center p-3 bg-navy-charcoal/50 rounded-lg">
              <p className="text-2xl font-bold text-indigo-400">60+</p>
              <p className="text-sm text-slate-400">Pull-ups</p>
            </div>
            <div className="text-center p-3 bg-navy-charcoal/50 rounded-lg">
              <p className="text-2xl font-bold text-purple-400">240lb</p>
              <p className="text-sm text-slate-400">Bench Press</p>
            </div>
          </div>
        </Card>

        {/* Daily Routine Timeline */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <Timer className="h-6 w-6 text-blue-500" />
            Routine Giornaliera
          </h3>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-500/20"></div>
            
            {/* Timeline items */}
            <div className="space-y-6">
              {/* Warm-up */}
              <div className="relative flex items-start gap-4">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center border-2 border-blue-500/40 z-10">
                  <span className="text-blue-400 font-bold">10m</span>
                </div>
                <Card className="flex-1 border-blue-500/20 p-4 hover:shadow-lg hover:shadow-blue-500/10 transition-all">
                  <h4 className="font-bold text-lg mb-2">Riscaldamento Moderato</h4>
                  <p className="text-slate-400 mb-3">Attivazione muscolare e mobilità articolare</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-blue-500/20 text-blue-300">Stretching dinamico</Badge>
                    <Badge className="bg-blue-500/20 text-blue-300">Mobilità</Badge>
                    <Badge className="bg-blue-500/20 text-blue-300">Attivazione core</Badge>
                  </div>
                </Card>
              </div>

              {/* HIIT */}
              <div className="relative flex items-start gap-4">
                <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center border-2 border-cyan-500/40 z-10">
                  <span className="text-cyan-400 font-bold">10m</span>
                </div>
                <Card className="flex-1 border-cyan-500/20 p-4 hover:shadow-lg hover:shadow-cyan-500/10 transition-all">
                  <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <Zap className="h-5 w-5 text-cyan-400" />
                    HIIT - Intervalli Alta Intensità
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4 mt-3">
                    <div className="bg-navy-dark/50 p-3 rounded-lg">
                      <p className="font-medium text-cyan-400 mb-1">3x/settimana - Bici</p>
                      <p className="text-sm text-slate-400">2 min riscaldamento + 4 min @85%+ VO₂ max</p>
                    </div>
                    <div className="bg-navy-dark/50 p-3 rounded-lg">
                      <p className="font-medium text-cyan-400 mb-1">4x/settimana - Vario</p>
                      <p className="text-sm text-slate-400">Burpees, mountain climbers, jump rope</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Strength & Cardio */}
              <div className="relative flex items-start gap-4">
                <div className="w-16 h-16 bg-indigo-500/20 rounded-full flex items-center justify-center border-2 border-indigo-500/40 z-10">
                  <span className="text-indigo-400 font-bold">40m+</span>
                </div>
                <Card className="flex-1 border-indigo-500/20 p-4 hover:shadow-lg hover:shadow-indigo-500/10 transition-all">
                  <h4 className="font-bold text-lg mb-2">Forza e Cardio</h4>
                  <p className="text-slate-400 mb-3">Rotazione tra pesi (3x/settimana) e cardio</p>
                  <div className="w-full bg-navy-charcoal/50 rounded-full h-2 mb-3">
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: '75%'}}></div>
                  </div>
                  <p className="text-sm text-slate-400">Intensità: 75-85% del massimale</p>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Weight Training Protocol */}
        <Card className="border-indigo-500/20 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 p-4 border-b border-indigo-500/20">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Dumbbell className="h-6 w-6 text-indigo-400" />
              Protocollo Pesi (3x/settimana)
            </h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {[
                "Leg press", "Bench press", "Leg curls", "Pull-ups",
                "Overhead press", "Back extensions", "Chest fly", "Obliques",
                "Lateral raises", "Back rows", "Tricep extension", "Face pulls",
                "Bicep curls", "Ab crunches", "Calf raises", "Leg extension"
              ].map((exercise, index) => (
                <div key={index} className="bg-navy-dark/50 p-3 rounded-lg border border-indigo-500/10 hover:border-indigo-500/30 transition-all">
                  <p className="font-medium text-sm">{exercise}</p>
                  <p className="text-xs text-slate-400 mt-1">1 set, 8-15 reps</p>
                </div>
              ))}
            </div>
            <Card className="bg-indigo-500/10 border-indigo-500/20 p-4 mt-4">
              <p className="text-sm flex items-center gap-2">
                <Info className="h-4 w-4 text-indigo-400" />
                <span>Ogni set fino al cedimento o quasi. Focus su intensità e consistenza.</span>
              </p>
            </Card>
          </div>
        </Card>

        {/* Performance Stats */}
        <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20 p-6">
          <h3 className="text-xl font-bold mb-4">Record Personali</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-navy-charcoal/50 rounded-lg border border-purple-500/20">
              <Flame className="h-8 w-8 text-orange-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-orange-400">100+</p>
              <p className="text-sm text-slate-400">Push-ups consecutivi</p>
            </div>
            <div className="text-center p-4 bg-navy-charcoal/50 rounded-lg border border-purple-500/20">
              <TrendingUp className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-400">60+</p>
              <p className="text-sm text-slate-400">Pull-ups consecutivi</p>
            </div>
            <div className="text-center p-4 bg-navy-charcoal/50 rounded-lg border border-purple-500/20">
              <Shield className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-400">240 lb</p>
              <p className="text-sm text-slate-400">Bench press (1 rep)</p>
            </div>
            <div className="text-center p-4 bg-navy-charcoal/50 rounded-lg border border-purple-500/20">
              <Wind className="h-8 w-8 text-cyan-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-cyan-400">Nasale</p>
              <p className="text-sm text-slate-400">Respirazione sempre</p>
            </div>
          </div>
        </Card>
      </div>
    )
  },
  {
    id: "sleep",
    title: "Sonno",
    emoji: "😴",
    icon: Moon,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
    content: (
      <div className="space-y-8">
        {/* Header Card */}
        <Card className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border-purple-500/20 p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
                <Moon className="h-8 w-8 text-purple-500" />
                Protocollo del Sonno
              </h2>
              <p className="text-slate-400">Il sonno di alta qualità è la base su cui si costruisce tutto</p>
            </div>
            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500">
              8+ ore/notte
            </Badge>
          </div>
          <div className="grid grid-cols-5 gap-3 mt-6">
            <div className="text-center p-3 bg-navy-charcoal/50 rounded-lg">
              <p className="text-xl font-bold text-purple-400">8h 17m</p>
              <p className="text-xs text-slate-400">Totale</p>
            </div>
            <div className="text-center p-3 bg-navy-charcoal/50 rounded-lg">
              <p className="text-xl font-bold text-indigo-400">1h 56m</p>
              <p className="text-xs text-slate-400">REM</p>
            </div>
            <div className="text-center p-3 bg-navy-charcoal/50 rounded-lg">
              <p className="text-xl font-bold text-blue-400">2h 39m</p>
              <p className="text-xs text-slate-400">Profondo</p>
            </div>
            <div className="text-center p-3 bg-navy-charcoal/50 rounded-lg">
              <p className="text-xl font-bold text-cyan-400">99.2%</p>
              <p className="text-xs text-slate-400">Efficienza</p>
            </div>
            <div className="text-center p-3 bg-navy-charcoal/50 rounded-lg">
              <p className="text-xl font-bold text-green-400">3 min</p>
              <p className="text-xs text-slate-400">Latenza</p>
            </div>
          </div>
        </Card>

        {/* Evening Routine */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <Moon className="h-6 w-6 text-purple-500" />
            Routine Serale
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-purple-500/20 p-6 hover:shadow-lg hover:shadow-purple-500/10 transition-all">
              <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-purple-400" />
                Timeline Pre-Sonno
              </h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-purple-500/10 rounded-lg">
                  <Badge className="bg-purple-500/20 text-purple-300">20:30</Badge>
                  <span>Ultimo pasto della giornata</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-indigo-500/10 rounded-lg">
                  <Badge className="bg-indigo-500/20 text-indigo-300">21:00</Badge>
                  <span>Integratori per il sonno</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-500/10 rounded-lg">
                  <Badge className="bg-blue-500/20 text-blue-300">21:30</Badge>
                  <span>Luci soffuse, niente schermi</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-navy-dark/50 rounded-lg">
                  <Badge className="bg-slate-500/20 text-slate-300">22:00</Badge>
                  <span>A letto, luci spente</span>
                </div>
              </div>
            </Card>

            <Card className="border-indigo-500/20 p-6 hover:shadow-lg hover:shadow-indigo-500/10 transition-all">
              <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-indigo-400" />
                <span>C&apos;è riduzione del rischio cardiovascolare rispetto ai coetanei</span>
              </h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5" />
                  <span className="text-sm">Stesso orario ogni notte (22:00)</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5" />
                  <span className="text-sm">No luci intense 1+ ora prima</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5" />
                  <span className="text-sm">Evita pasti pesanti, alcol, esercizio intenso 3h prima</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5" />
                  <span className="text-sm">Tisana camomilla 1h prima di dormire</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Supplements */}
        <Card className="border-purple-500/20 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500/20 to-indigo-500/20 p-4 border-b border-purple-500/20">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Pill className="h-6 w-6 text-purple-400" />
              Integratori per il Sonno (30-60 min prima)
            </h3>
          </div>
          <div className="p-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-purple-500/10 border-purple-500/20 p-4 text-center hover:scale-105 transition-transform">
                <Beaker className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                <h5 className="font-bold mb-1">Magnesio Glicinato</h5>
                <Badge className="bg-purple-500/20 text-purple-300">500 mg</Badge>
                <p className="text-xs text-slate-400 mt-2">Rilassamento muscolare</p>
              </Card>
              <Card className="bg-indigo-500/10 border-indigo-500/20 p-4 text-center hover:scale-105 transition-transform">
                <Leaf className="h-8 w-8 text-indigo-400 mx-auto mb-2" />
                <h5 className="font-bold mb-1">L-teanina</h5>
                <Badge className="bg-indigo-500/20 text-indigo-300">200-400 mg</Badge>
                <p className="text-xs text-slate-400 mt-2">Calma mentale</p>
              </Card>
              <Card className="bg-blue-500/10 border-blue-500/20 p-4 text-center hover:scale-105 transition-transform">
                <Sparkles className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <h5 className="font-bold mb-1">Glicina</h5>
                <Badge className="bg-blue-500/20 text-blue-300">2-3 g</Badge>
                <p className="text-xs text-slate-400 mt-2">Qualità del sonno</p>
              </Card>
              <Card className="bg-cyan-500/10 border-cyan-500/20 p-4 text-center hover:scale-105 transition-transform">
                <Shield className="h-8 w-8 text-cyan-400 mx-auto mb-2" />
                <h5 className="font-bold mb-1">Ashwagandha</h5>
                <Badge className="bg-cyan-500/20 text-cyan-300">600 mg</Badge>
                <p className="text-xs text-slate-400 mt-2">Occasionale</p>
              </Card>
            </div>
          </div>
        </Card>

        {/* Bedroom Environment */}
        <Card className="border-blue-500/20 p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Bed className="h-6 w-6 text-blue-400" />
            Ambiente Ottimale
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Waves className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="font-medium">Temperatura</p>
                <p className="text-sm text-slate-400">15-20°C (lato freddo)</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Eye className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <p className="font-medium">Oscurità</p>
                <p className="text-sm text-slate-400">Tende oscuranti totali</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                <Ear className="h-5 w-5 text-indigo-400" />
              </div>
              <div>
                <p className="font-medium">Suono</p>
                <p className="text-sm text-slate-400">Rumore bianco o tappi</p>
              </div>
            </div>
          </div>
          <div className="mt-4 p-4 bg-blue-500/10 rounded-lg">
            <p className="text-sm flex items-center gap-2">
              <Activity className="h-4 w-4 text-blue-400" />
              <span><strong>Tracking:</strong> Oura Ring per feedback giornaliero e ottimizzazione</span>
            </p>
          </div>
        </Card>
      </div>
    )
  },
  {
    id: "females",
    title: "Donne",
    emoji: "👩",
    icon: Users,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    borderColor: "border-pink-500/20",
    content: (
      <div className="space-y-8">
        {/* Header Card */}
        <Card className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 border-pink-500/20 p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
                <Users className="h-8 w-8 text-pink-500" />
                Protocollo per le Donne
              </h2>
              <p className="text-slate-400">Ottimizzazione basata sul ciclo ormonale femminile</p>
            </div>
            <Badge className="bg-pink-500/20 text-pink-400 border-pink-500">
              Ciclo-sincronizzato
            </Badge>
          </div>
        </Card>

        {/* Key Considerations */}
        <Card className="border-pink-500/20 p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Heart className="h-6 w-6 text-pink-400" />
            Considerazioni Chiave
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-pink-500/10 p-4 rounded-lg">
              <h4 className="font-medium mb-2 text-pink-400">Cicli Ormonali</h4>
              <p className="text-sm text-slate-400">Influenzano energia, umore e performance fisica</p>
            </div>
            <div className="bg-purple-500/10 p-4 rounded-lg">
              <h4 className="font-medium mb-2 text-purple-400">Fabbisogno di Ferro</h4>
              <p className="text-sm text-slate-400">Più alto a causa delle mestruazioni</p>
            </div>
            <div className="bg-indigo-500/10 p-4 rounded-lg">
              <h4 className="font-medium mb-2 text-indigo-400">Calcio e Vitamina D</h4>
              <p className="text-sm text-slate-400">Particolarmente importanti per la salute ossea</p>
            </div>
            <div className="bg-blue-500/10 p-4 rounded-lg">
              <h4 className="font-medium mb-2 text-blue-400">Proteine Variabili</h4>
              <p className="text-sm text-slate-400">Il fabbisogno varia durante il ciclo</p>
            </div>
          </div>
        </Card>

        {/* Cycle-Synced Nutrition */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <Apple className="h-6 w-6 text-pink-500" />
            Nutrizione Sincronizzata con il Ciclo
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="border-pink-500/20 p-4 hover:shadow-lg hover:shadow-pink-500/10 transition-all">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-pink-500/20 rounded-full flex items-center justify-center">
                  <span className="text-sm">🌱</span>
                </div>
                <h4 className="font-bold">Fase Follicolare</h4>
              </div>
              <p className="text-sm text-slate-400">Cibi freschi, leggeri e fermentati</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge className="bg-pink-500/20 text-pink-300 text-xs">Yogurt</Badge>
                <Badge className="bg-pink-500/20 text-pink-300 text-xs">Kimchi</Badge>
                <Badge className="bg-pink-500/20 text-pink-300 text-xs">Verdure crude</Badge>
              </div>
            </Card>

            <Card className="border-purple-500/20 p-4 hover:shadow-lg hover:shadow-purple-500/10 transition-all">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <span className="text-sm">🌸</span>
                </div>
                <h4 className="font-bold">Fase Ovulatoria</h4>
              </div>
              <p className="text-sm text-slate-400">Cibi crudi e anti-infiammatori</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge className="bg-purple-500/20 text-purple-300 text-xs">Insalate</Badge>
                <Badge className="bg-purple-500/20 text-purple-300 text-xs">Frutti rossi</Badge>
                <Badge className="bg-purple-500/20 text-purple-300 text-xs">Omega-3</Badge>
              </div>
            </Card>

            <Card className="border-indigo-500/20 p-4 hover:shadow-lg hover:shadow-indigo-500/10 transition-all">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-indigo-500/20 rounded-full flex items-center justify-center">
                  <span className="text-sm">🍂</span>
                </div>
                <h4 className="font-bold">Fase Luteale</h4>
              </div>
              <p className="text-sm text-slate-400">Verdure radice e carboidrati complessi</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge className="bg-indigo-500/20 text-indigo-300 text-xs">Patate dolci</Badge>
                <Badge className="bg-indigo-500/20 text-indigo-300 text-xs">Quinoa</Badge>
                <Badge className="bg-indigo-500/20 text-indigo-300 text-xs">Zucca</Badge>
              </div>
            </Card>

            <Card className="border-blue-500/20 p-4 hover:shadow-lg hover:shadow-blue-500/10 transition-all">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <span className="text-sm">🌙</span>
                </div>
                <h4 className="font-bold">Fase Mestruale</h4>
              </div>
              <p className="text-sm text-slate-400">Cibi caldi e ricchi di ferro</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge className="bg-blue-500/20 text-blue-300 text-xs">Zuppe</Badge>
                <Badge className="bg-blue-500/20 text-blue-300 text-xs">Lenticchie</Badge>
                <Badge className="bg-blue-500/20 text-blue-300 text-xs">Spinaci</Badge>
              </div>
            </Card>
          </div>
        </div>

        {/* Exercise Modifications */}
        <Card className="border-purple-500/20 p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Dumbbell className="h-6 w-6 text-purple-400" />
                <span>Un&apos;organizzazione più efficiente dell&apos;attenzione e della memoria</span>
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-pink-400 rounded-full mt-2"></div>
              <div>
                <p className="font-medium">Alta intensità</p>
                <p className="text-sm text-slate-400">Migliore durante fasi follicolare e ovulatoria</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
              <div>
                <p className="font-medium">Allenamento forza</p>
                <p className="text-sm text-slate-400">Mantenibile durante tutto il ciclo</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2"></div>
              <div>
                <p className="font-medium">Attività dolci</p>
                <span>c&apos;è disagio</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
              <div>
                <p className="font-medium">Flessibilità e recupero</p>
                <p className="text-sm text-slate-400">Focus durante la fase luteale</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Supplements */}
        <Card className="border-pink-500/20 overflow-hidden">
          <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 p-4 border-b border-pink-500/20">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Pill className="h-6 w-6 text-pink-400" />
              Integratori da Considerare
            </h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div className="bg-pink-500/10 p-3 rounded-lg text-center">
                <p className="font-medium text-sm">Ferro</p>
                <p className="text-xs text-slate-400">Se carente</p>
              </div>
              <div className="bg-purple-500/10 p-3 rounded-lg text-center">
                <p className="font-medium text-sm">Complesso B</p>
                <p className="text-xs text-slate-400">Energia</p>
              </div>
              <div className="bg-indigo-500/10 p-3 rounded-lg text-center">
                <p className="font-medium text-sm">Omega-3</p>
                <p className="text-xs text-slate-400">Anti-infiammatorio</p>
              </div>
              <div className="bg-blue-500/10 p-3 rounded-lg text-center">
                <p className="font-medium text-sm">Vitamina D3</p>
                <p className="text-xs text-slate-400">Ossa e umore</p>
              </div>
              <div className="bg-cyan-500/10 p-3 rounded-lg text-center">
                <p className="font-medium text-sm">Calcio</p>
                <p className="text-xs text-slate-400">Salute ossea</p>
              </div>
              <div className="bg-teal-500/10 p-3 rounded-lg text-center">
                <p className="font-medium text-sm">Probiotici</p>
                <p className="text-xs text-slate-400">Equilibrio ormonale</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    )
  },
  {
    id: "pregnancy",
    title: "Gravidanza",
    emoji: "🤰",
    icon: Baby,
    color: "text-rose-500",
    bgColor: "bg-rose-500/10",
    borderColor: "border-rose-500/20",
    content: (
      <div className="space-y-8">
        {/* Header Card */}
        <Card className="bg-gradient-to-r from-rose-500/10 to-pink-500/10 border-rose-500/20 p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
                <Baby className="h-8 w-8 text-rose-500" />
                Protocollo Gravidanza
              </h2>
              <p className="text-slate-400">Linee guida per mantenere la salute durante la gravidanza</p>
            </div>
            <Badge className="bg-rose-500/20 text-rose-400 border-rose-500">
              Consulta sempre il medico
            </Badge>
          </div>
        </Card>

        {/* Trimester Timeline */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <Calendar className="h-6 w-6 text-rose-500" />
            Timeline per Trimestre
          </h3>

          {/* Pre-Conception */}
          <Card className="border-rose-500/20 p-6 hover:shadow-lg hover:shadow-rose-500/10 transition-all">
            <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
              <Star className="h-5 w-5 text-rose-400" />
              Pre-Concepimento
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-400 mt-1" />
                  <p className="text-sm">Acido folico (400-800 mcg) 3 mesi prima</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-400 mt-1" />
                  <p className="text-sm">Ottimizza livelli vitamina D</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-400 mt-1" />
                  <p className="text-sm">Assicura riserve di ferro adeguate</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Ban className="h-4 w-4 text-red-400 mt-1" />
                  <p className="text-sm">Elimina alcol e tabacco</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-400 mt-1" />
                  <p className="text-sm">Mantieni peso corporeo sano</p>
                </div>
              </div>
            </div>
          </Card>

          {/* First Trimester */}
          <Card className="border-pink-500/20 p-6 hover:shadow-lg hover:shadow-pink-500/10 transition-all">
            <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
              <span className="text-pink-400">1°</span>
              Primo Trimestre
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium mb-2 text-pink-400">Nutrizione</h5>
                <ul className="space-y-1 text-sm text-slate-400">
                  <li>• Continua vitamine prenatali</li>
                  <li>• Pasti piccoli e frequenti per nausea</li>
                <span>L&apos;impegno nell&apos;allenamento varia con il ciclo</span>
                </ul>
              </div>
              <div>
                <h5 className="font-medium mb-2 text-pink-400">Attività</h5>
                <ul className="space-y-1 text-sm text-slate-400">
                  <li>• Esercizio dolce (camminata, yoga)</li>
                  <li>• Evita pesce crudo e prodotti non pastorizzati</li>
                  <li>• Riposo quando necessario</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Second Trimester */}
          <Card className="border-purple-500/20 p-6 hover:shadow-lg hover:shadow-purple-500/10 transition-all">
            <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
              <span className="text-purple-400">2°</span>
              Secondo Trimestre
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium mb-2 text-purple-400">Nutrizione</h5>
                <ul className="space-y-1 text-sm text-slate-400">
                  <li>• +340 calorie/giorno</li>
                  <li>• Focus su cibi ricchi di calcio (1000mg)</li>
                  <li>• DHA per sviluppo cerebrale del bambino</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium mb-2 text-purple-400">Monitoraggio</h5>
                <ul className="space-y-1 text-sm text-slate-400">
                  <li>• Aumento peso ~1 lb/settimana</li>
                  <li>• Continua esercizio moderato</li>
                  <li>• Controlla pressione sanguigna</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Third Trimester */}
          <Card className="border-indigo-500/20 p-6 hover:shadow-lg hover:shadow-indigo-500/10 transition-all">
            <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
              <span className="text-indigo-400">3°</span>
              Terzo Trimestre
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium mb-2 text-indigo-400">Nutrizione</h5>
                <ul className="space-y-1 text-sm text-slate-400">
                  <li>• +450 calorie/giorno</li>
                  <li>• Pasti più piccoli e frequenti</li>
                  <li>• Cibi ricchi di ferro per prevenire anemia</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium mb-2 text-indigo-400">Preparazione</h5>
                <ul className="space-y-1 text-sm text-slate-400">
                  <li>• Esercizi pavimento pelvico</li>
                  <li>• Prepara per allattamento</li>
                  <li>• Monitora movimenti fetali</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        {/* Essential Nutrients */}
        <Card className="border-rose-500/20 overflow-hidden">
          <div className="bg-gradient-to-r from-rose-500/20 to-pink-500/20 p-4 border-b border-rose-500/20">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Pill className="h-6 w-6 text-rose-400" />
              Nutrienti Essenziali
            </h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-rose-500/10 rounded-lg">
                <p className="text-2xl font-bold text-rose-400">600-800</p>
                <p className="text-sm font-medium">mcg</p>
                <p className="text-xs text-slate-400 mt-1">Acido Folico</p>
              </div>
              <div className="text-center p-4 bg-pink-500/10 rounded-lg">
                <p className="text-2xl font-bold text-pink-400">27</p>
                <p className="text-sm font-medium">mg</p>
                <p className="text-xs text-slate-400 mt-1">Ferro</p>
              </div>
              <div className="text-center p-4 bg-purple-500/10 rounded-lg">
                <p className="text-2xl font-bold text-purple-400">1000</p>
                <p className="text-sm font-medium">mg</p>
                <p className="text-xs text-slate-400 mt-1">Calcio</p>
              </div>
              <div className="text-center p-4 bg-indigo-500/10 rounded-lg">
                <p className="text-2xl font-bold text-indigo-400">600</p>
                <p className="text-sm font-medium">IU</p>
                <p className="text-xs text-slate-400 mt-1">Vitamina D</p>
              </div>
              <div className="text-center p-4 bg-blue-500/10 rounded-lg">
                <p className="text-2xl font-bold text-blue-400">200-300</p>
                <p className="text-sm font-medium">mg</p>
                <p className="text-xs text-slate-400 mt-1">DHA</p>
              </div>
              <div className="text-center p-4 bg-cyan-500/10 rounded-lg">
                <p className="text-2xl font-bold text-cyan-400">75-100</p>
                <p className="text-sm font-medium">g</p>
                <p className="text-xs text-slate-400 mt-1">Proteine/giorno</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Exercise Guidelines */}
        <Card className="border-purple-500/20 p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Activity className="h-6 w-6 text-purple-400" />
            Esercizio Durante la Gravidanza
          </h3>
          <div className="bg-purple-500/10 p-4 rounded-lg mb-4">
            <p className="font-medium text-purple-400 mb-2">Obiettivo: 150 minuti/settimana</p>
            <p className="text-sm text-slate-400">Esercizio a intensità moderata distribuito nella settimana</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium mb-2 text-green-400">✓ Consigliato</h5>
              <ul className="space-y-1 text-sm text-slate-400">
                <li>• Camminata</li>
                <li>• Nuoto</li>
                <li>• Cyclette</li>
                <li>• Yoga prenatale</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium mb-2 text-red-400">✗ Da Evitare</h5>
              <ul className="space-y-1 text-sm text-slate-400">
                <li>• Sport di contatto</li>
                <li>• Attività con rischio cadute</li>
                <li>• Esercizi supini dopo il 1° trimestre</li>
                <li>• Alta quota senza acclimatazione</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    )
  },
  {
    id: "what-is-protocol",
    title: "Cos'è il Protocollo?",
    emoji: "📋",
    icon: BookOpen,
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/20",
    content: (
      <div className="space-y-8">
        {/* Header Card */}
        <Card className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-cyan-500/20 p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
                <BookOpen className="h-8 w-8 text-cyan-500" />
            Cos&apos;è il Protocollo?
              </h2>
              <p className="text-slate-400">Sistema completo di ottimizzazione della salute basato su ricerca scientifica</p>
            </div>
            <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500">
              Evidence-based
            </Badge>
          </div>
        </Card>

        {/* Core Principles */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <FlaskConical className="h-6 w-6 text-cyan-500" />
            Principi Fondamentali
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="border-cyan-500/20 p-4 hover:scale-105 transition-transform">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-cyan-400" />
                </div>
                <h4 className="font-bold">Misurazione</h4>
              </div>
              <p className="text-sm text-slate-400">Traccia tutto ciò che conta</p>
            </Card>

            <Card className="border-blue-500/20 p-4 hover:scale-105 transition-transform">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Target className="h-5 w-5 text-blue-400" />
                </div>
                <h4 className="font-bold">Consistenza</h4>
              </div>
              <p className="text-sm text-slate-400">Stessa routine ogni giorno</p>
            </Card>

            <Card className="border-indigo-500/20 p-4 hover:scale-105 transition-transform">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                  <Brain className="h-5 w-5 text-indigo-400" />
                </div>
                <h4 className="font-bold">Evidence-based</h4>
              </div>
              <p className="text-sm text-slate-400">Ogni decisione supportata da ricerca</p>
            </Card>

            <Card className="border-purple-500/20 p-4 hover:scale-105 transition-transform">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-purple-400" />
                </div>
                <h4 className="font-bold">Personalizzazione</h4>
              </div>
              <p className="text-sm text-slate-400">Adatta ai tuoi biomarker</p>
            </Card>

            <Card className="border-pink-500/20 p-4 hover:scale-105 transition-transform">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-pink-500/20 rounded-lg flex items-center justify-center">
                  <Heart className="h-5 w-5 text-pink-400" />
                </div>
                <h4 className="font-bold">Focus Longevità</h4>
              </div>
              <p className="text-sm text-slate-400">Ottimizza healthspan</p>
            </Card>

            <Card className="border-green-500/20 p-4 hover:scale-105 transition-transform">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Shield className="h-5 w-5 text-green-400" />
                </div>
                <h4 className="font-bold">Prevenzione</h4>
              </div>
              <p className="text-sm text-slate-400">Evita ciò che uccide prematuramente</p>
            </Card>
          </div>
        </div>

        {/* The Five Pillars */}
        <Card className="border-cyan-500/20 overflow-hidden">
          <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 p-4 border-b border-cyan-500/20">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Star className="h-6 w-6 text-cyan-400" />
              I Cinque Pilastri
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[
                { icon: Moon, color: "text-purple-400", bg: "bg-purple-500/10", title: "Sonno", desc: "La base di tutta la salute" },
                { icon: Apple, color: "text-green-400", bg: "bg-green-500/10", title: "Dieta", desc: "Alimentazione densa di nutrienti" },
                { icon: Dumbbell, color: "text-blue-400", bg: "bg-blue-500/10", title: "Esercizio", desc: "Movimento quotidiano combinato" },
                { icon: Pill, color: "text-pink-400", bg: "bg-pink-500/10", title: "Integratori", desc: "Supplementazione basata su evidenze" },
                { icon: BarChart3, color: "text-cyan-400", bg: "bg-cyan-500/10", title: "Misurazioni", desc: "Test e tracking regolare" }
              ].map((pillar, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${pillar.bg} rounded-lg flex items-center justify-center`}>
                    <pillar.icon className={`h-6 w-6 ${pillar.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-slate-500">{index + 1}</span>
                      <h4 className="font-bold">{pillar.title}</h4>
                    </div>
                    <p className="text-sm text-slate-400">{pillar.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Getting Started */}
        <Card className="border-blue-500/20 p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <ArrowRight className="h-6 w-6 text-blue-400" />
            Come Iniziare
          </h3>
          <div className="space-y-3">
            {[
              "Inizia con l'ottimizzazione del sonno (più facile, maggior impatto)",
              "Gradualmente aggiusta timing e composizione dei pasti",
              "Costruisci abitudini di esercizio consistenti",
              "Aggiungi integratori basati sui test",
              "Traccia progressi con misurazioni regolari"
            ].map((step, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-blue-400">{index + 1}</span>
                </div>
                <p className="text-sm">{step}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Philosophy */}
        <Card className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-cyan-500/20 p-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Filosofia</h3>
            <p className="text-slate-400">
              &quot;Don&apos;t Die&quot; è l&apos;audace missione di invertire
              il processo di invecchiamento e ottimizzare la longevità. Il protocollo Blueprint
              ti offre un approccio scientifico basato sui dati per raggiungere la salute ottimale
              mentre ottimizzi le cose che ti manterranno sano e vibrante il più a lungo possibile.
            </p>
          </div>
        </Card>

        {/* Important Note */}
        <Card className="border-yellow-500/20 bg-yellow-500/10 p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-6 w-6 text-yellow-400 mt-0.5" />
            <div>
              <h4 className="font-bold mb-2">Nota Importante</h4>
              <p className="text-sm text-slate-400">
                Questo protocollo è intenso e richiede impegno significativo. 
                Inizia lentamente, fai cambiamenti graduali, e consulta sempre 
                professionisti sanitari prima di fare cambiamenti maggiori nello stile di vita.
              </p>
            </div>
          </div>
        </Card>
      </div>
    )
  },
  {
    id: "routine",
    title: "Routine Giornaliera",
    emoji: "📅",
    icon: Calendar,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/20",
    content: (
      <div className="space-y-8">
        {/* Header Card */}
        <Card className="relative overflow-hidden bg-gradient-to-br from-amber-500/15 via-orange-500/10 to-yellow-500/5 border-amber-500/30 p-8 shadow-xl shadow-amber-500/5">
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-amber-500/5" />
          <div className="relative">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-4xl font-bold mb-3 flex items-center gap-3 bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                  <div className="p-3 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-2xl shadow-lg shadow-amber-500/20">
                    <Calendar className="h-8 w-8 text-amber-400" />
                  </div>
                  Routine Quotidiana di Bryan
                </h2>
                <p className="text-slate-400 text-lg font-medium">Ogni giorno, stesso programma per risultati ottimali</p>
              </div>
              <Badge className="bg-gradient-to-r from-amber-500/30 to-orange-500/30 text-amber-300 border-amber-400/50 text-lg px-5 py-2 font-semibold shadow-lg shadow-amber-500/20">
                365 giorni/anno
              </Badge>
            </div>
          </div>
        </Card>

        {/* Timeline */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <Clock className="h-6 w-6 text-amber-500" />
            Programma Giornaliero
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Morning */}
            <Card className="relative border-amber-500/30 p-6 group hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent rounded-lg" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gradient-to-br from-amber-500/30 to-orange-500/30 rounded-xl">
                    <Sun className="h-5 w-5 text-amber-400" />
                  </div>
                  <h4 className="text-xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">Mattina (5:00 - 9:00)</h4>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-2 bg-amber-500/10 rounded-lg">
                    <Badge className="bg-amber-500/20 text-amber-300">5:00</Badge>
                    <span className="text-sm">Sveglia naturale</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-orange-500/10 rounded-lg">
                    <Badge className="bg-orange-500/20 text-orange-300">5:30</Badge>
                    <span className="text-sm">Terapia della luce</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-yellow-500/10 rounded-lg">
                    <Badge className="bg-yellow-500/20 text-yellow-300">6:00</Badge>
                    <span className="text-sm">Esercizio (60-90 min)</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Evening */}
            <Card className="relative border-indigo-500/30 p-6 group hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent rounded-lg" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gradient-to-br from-indigo-500/30 to-purple-500/30 rounded-xl">
                    <Moon className="h-5 w-5 text-indigo-400" />
                  </div>
                  <h4 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Sera (18:00 - 22:00)</h4>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-2 bg-indigo-500/10 rounded-lg">
                    <Badge className="bg-indigo-500/20 text-indigo-300">20:30</Badge>
                    <span className="text-sm">Ultimo pasto</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-purple-500/10 rounded-lg">
                    <Badge className="bg-purple-500/20 text-purple-300">21:00</Badge>
                    <span className="text-sm">Integratori sonno</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-violet-500/10 rounded-lg">
                    <Badge className="bg-violet-500/20 text-violet-300">22:00</Badge>
                    <span className="text-sm">A letto, luci spente</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Key Principles */}
        <Card className="border-amber-500/30 p-6 bg-gradient-to-br from-amber-500/5 to-transparent">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Target className="h-6 w-6 text-amber-400" />
            Principi Chiave
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5" />
              <span>Stesso orario ogni giorno (weekend inclusi)</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5" />
              <span>Nessun meeting prima delle 11:00</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5" />
              <span>Tutti i pasti in finestra 6-8 ore</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5" />
              <span>Traccia tutto per ottimizzazione</span>
            </div>
          </div>
        </Card>
      </div>
    )
  },
  {
    id: "habits",
    title: "Cattive Abitudini",
    emoji: "🚫",
    icon: Ban,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/20",
    content: (
      <div className="space-y-8">
        {/* Header Card */}
        <Card className="relative overflow-hidden bg-gradient-to-br from-red-500/15 via-rose-500/10 to-pink-500/5 border-red-500/30 p-8 shadow-xl shadow-red-500/5">
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-red-500/5" />
          <div className="relative">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-4xl font-bold mb-3 flex items-center gap-3 bg-gradient-to-r from-red-400 to-rose-400 bg-clip-text text-transparent">
                  <div className="p-3 bg-gradient-to-br from-red-500/20 to-rose-500/20 rounded-2xl shadow-lg shadow-red-500/20">
                    <Ban className="h-8 w-8 text-red-400" />
                  </div>
                  Eliminare le Cattive Abitudini
                </h2>
                <p className="text-slate-400 text-lg font-medium">Comportamenti che accelerano l&apos;invecchiamento</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Habits to Eliminate */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="relative border-red-500/30 p-6 group hover:shadow-xl hover:shadow-red-500/10 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent rounded-lg" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-500/20 rounded-xl">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                </div>
                <h4 className="text-xl font-bold text-red-400">Alcol</h4>
              </div>
              <p className="text-sm text-slate-400 mb-3">Zero alcol - nessuna eccezione</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <span>Disturba il sonno</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <span>Danneggia il fegato</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <span>Accelera l&apos;invecchiamento</span>
                </li>
              </ul>
            </div>
          </Card>

          <Card className="relative border-rose-500/30 p-6 group hover:shadow-xl hover:shadow-rose-500/10 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-transparent rounded-lg" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-rose-500/20 rounded-xl">
                  <AlertCircle className="h-5 w-5 text-rose-400" />
                </div>
                <h4 className="text-xl font-bold text-rose-400">Cibo Processato</h4>
              </div>
              <p className="text-sm text-slate-400 mb-3">Elimina tutti gli ultra-processati</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400">•</span>
                  <span>No zuccheri raffinati</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400">•</span>
                  <span>Evita oli di semi</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400">•</span>
                  <span>Solo ingredienti naturali</span>
                </li>
              </ul>
            </div>
          </Card>
        </div>

        {/* Breaking Strategy */}
        <Card className="border-red-500/30 p-6 bg-gradient-to-br from-red-500/5 to-transparent">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Target className="h-6 w-6 text-red-400" />
            Strategia per Cambiare
          </h3>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-red-500/10 rounded-xl">
              <p className="text-2xl font-bold text-red-400">1-7</p>
              <p className="text-sm text-slate-400 mt-1">Giorni più difficili</p>
            </div>
            <div className="text-center p-4 bg-rose-500/10 rounded-xl">
              <p className="text-2xl font-bold text-rose-400">8-21</p>
              <p className="text-sm text-slate-400 mt-1">Fase di rottura</p>
            </div>
            <div className="text-center p-4 bg-pink-500/10 rounded-xl">
              <p className="text-2xl font-bold text-pink-400">22-66</p>
              <p className="text-sm text-slate-400 mt-1">Nuova formazione</p>
            </div>
            <div className="text-center p-4 bg-green-500/10 rounded-xl">
              <p className="text-2xl font-bold text-green-400">67+</p>
              <p className="text-sm text-slate-400 mt-1">Automatico</p>
            </div>
          </div>
        </Card>
      </div>
    )
  },
  {
    id: "water",
    title: "Acqua Pulita",
    emoji: "💧",
    icon: Droplets,
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/20",
    content: (
      <div className="space-y-8">
        {/* Header Card */}
        <Card className="relative overflow-hidden bg-gradient-to-br from-cyan-500/15 via-blue-500/10 to-sky-500/5 border-cyan-500/30 p-8 shadow-xl shadow-cyan-500/5">
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-cyan-500/5" />
          <div className="relative">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-4xl font-bold mb-3 flex items-center gap-3 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl shadow-lg shadow-cyan-500/20">
                    <Droplets className="h-8 w-8 text-cyan-400" />
                  </div>
                <p className="text-slate-400 text-lg font-medium">L&apos;acqua pulita è essenziale per la salute ottimale</p>
                </h2>
              <Badge className="bg-gradient-to-r from-cyan-500/30 to-blue-500/30 text-cyan-300 border-cyan-400/50 text-lg px-5 py-2 font-semibold shadow-lg shadow-cyan-500/20">
                3-4L/giorno
              </Badge>
              </div>
              <Badge className="bg-gradient-to-r from-cyan-500/30 to-blue-500/30 text-cyan-300 border-cyan-400/50 text-lg px-5 py-2 font-semibold shadow-lg shadow-cyan-500/20">
                3-4L/giorno
              </Badge>
            </div>
            <div className="grid grid-cols-3 gap-5 mt-8">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-xl blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative text-center p-4 bg-gradient-to-br from-navy-charcoal/80 to-navy-charcoal/40 rounded-xl border border-cyan-500/20 backdrop-blur-sm">
                  <p className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">&lt;50</p>
                  <p className="text-sm text-slate-400 font-medium mt-1">TDS ppm</p>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent rounded-xl blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative text-center p-4 bg-gradient-to-br from-navy-charcoal/80 to-navy-charcoal/40 rounded-xl border border-blue-500/20 backdrop-blur-sm">
                  <p className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-sky-400 bg-clip-text text-transparent">7.0-7.5</p>
                  <p className="text-sm text-slate-400 font-medium mt-1">pH</p>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-sky-500/20 to-transparent rounded-xl blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative text-center p-4 bg-gradient-to-br from-navy-charcoal/80 to-navy-charcoal/40 rounded-xl border border-sky-500/20 backdrop-blur-sm">
                  <p className="text-3xl font-bold bg-gradient-to-r from-sky-400 to-cyan-400 bg-clip-text text-transparent">99%</p>
                  <p className="text-sm text-slate-400 font-medium mt-1">Purezza</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Filtration System */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-cyan-500/30 p-6 hover:shadow-xl hover:shadow-cyan-500/10 transition-all">
            <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-cyan-400" />
              Sistema Casa Intera
            </h4>
            <div className="space-y-3">
              <div className="p-3 bg-cyan-500/10 rounded-lg flex items-center gap-3">
                <Badge className="bg-cyan-500/20 text-cyan-300">Stage 1</Badge>
                <span className="text-sm">Filtro sedimenti (5 micron)</span>
              </div>
              <div className="p-3 bg-blue-500/10 rounded-lg flex items-center gap-3">
                <Badge className="bg-blue-500/20 text-blue-300">Stage 2</Badge>
                <span className="text-sm">Filtro carbone</span>
              </div>
              <div className="p-3 bg-sky-500/10 rounded-lg flex items-center gap-3">
                <Badge className="bg-sky-500/20 text-sky-300">Stage 3</Badge>
                <span className="text-sm">KDF per metalli pesanti</span>
              </div>
              <div className="p-3 bg-indigo-500/10 rounded-lg flex items-center gap-3">
                <Badge className="bg-indigo-500/20 text-indigo-300">Stage 4</Badge>
                <span className="text-sm">Sterilizzazione UV</span>
              </div>
            </div>
          </Card>

          <Card className="border-blue-500/30 p-6 hover:shadow-xl hover:shadow-blue-500/10 transition-all">
            <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Beaker className="h-5 w-5 text-blue-400" />
              Protocollo Giornaliero
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5" />
                <div>
                  <p className="font-medium">500ml al risveglio</p>
                  <p className="text-sm text-slate-400">Attiva il metabolismo</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5" />
                <div>
                  <p className="font-medium">250ml ogni ora</p>
                  <p className="text-sm text-slate-400">Idratazione costante</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5" />
                <div>
                  <p className="font-medium">Temperatura ambiente</p>
                  <p className="text-sm text-slate-400">Non fredda</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5" />
                <div>
                  <p className="font-medium">Sale celtico</p>
                  <p className="text-sm text-slate-400">Per elettroliti</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    )
  },
  {
    id: "food",
    title: "Guida Alimentare",
    emoji: "🍽️",
    icon: ShoppingBag,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20",
    content: (
      <div className="space-y-8">
        {/* Header Card */}
        <Card className="relative overflow-hidden bg-gradient-to-br from-emerald-500/15 via-green-500/10 to-teal-500/5 border-emerald-500/30 p-8 shadow-xl shadow-emerald-500/5">
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-emerald-500/5" />
          <div className="relative">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-4xl font-bold mb-3 flex items-center gap-3 bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                  <div className="p-3 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-2xl shadow-lg shadow-emerald-500/20">
                    <ShoppingBag className="h-8 w-8 text-emerald-400" />
                  </div>
                  Guida Completa agli Alimenti
                </h2>
                <p className="text-slate-400 text-lg font-medium">Lista della spesa e preparazione ottimale</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Food Categories */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-emerald-500/30 p-5 hover:shadow-xl hover:shadow-emerald-500/10 transition-all">
            <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
              <Leaf className="h-5 w-5 text-emerald-400" />
              <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">Verdure</span>
            </h4>
            <div className="space-y-2">
              <Badge className="bg-emerald-500/20 text-emerald-300 mr-2">Broccoli</Badge>
              <Badge className="bg-emerald-500/20 text-emerald-300 mr-2">Cavolfiore</Badge>
              <Badge className="bg-emerald-500/20 text-emerald-300 mr-2">Spinaci</Badge>
              <Badge className="bg-emerald-500/20 text-emerald-300 mr-2">Kale</Badge>
              <Badge className="bg-emerald-500/20 text-emerald-300">Rucola</Badge>
            </div>
          </Card>

          <Card className="border-green-500/30 p-5 hover:shadow-xl hover:shadow-green-500/10 transition-all">
            <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
              <Apple className="h-5 w-5 text-green-400" />
              <span className="bg-gradient-to-r from-green-400 to-lime-400 bg-clip-text text-transparent">Frutta</span>
            </h4>
            <div className="space-y-2">
              <Badge className="bg-green-500/20 text-green-300 mr-2">Mirtilli</Badge>
              <Badge className="bg-green-500/20 text-green-300 mr-2">Lamponi</Badge>
              <Badge className="bg-green-500/20 text-green-300 mr-2">Fragole</Badge>
              <Badge className="bg-green-500/20 text-green-300 mr-2">Melograno</Badge>
              <Badge className="bg-green-500/20 text-green-300">Avocado</Badge>
            </div>
          </Card>

          <Card className="border-teal-500/30 p-5 hover:shadow-xl hover:shadow-teal-500/10 transition-all">
            <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
              <Package className="h-5 w-5 text-teal-400" />
              <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">Legumi e Semi</span>
            </h4>
            <div className="space-y-2">
              <Badge className="bg-teal-500/20 text-teal-300 mr-2">Lenticchie</Badge>
              <Badge className="bg-teal-500/20 text-teal-300 mr-2">Ceci</Badge>
              <Badge className="bg-teal-500/20 text-teal-300 mr-2">Semi chia</Badge>
              <Badge className="bg-teal-500/20 text-teal-300 mr-2">Semi lino</Badge>
              <Badge className="bg-teal-500/20 text-teal-300">Canapa</Badge>
            </div>
          </Card>
        </div>

        {/* Shopping List */}
        <Card className="border-emerald-500/30 p-6 bg-gradient-to-br from-emerald-500/5 to-transparent">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <ShoppingBag className="h-6 w-6 text-emerald-400" />
            Lista della Spesa Settimanale
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3 text-emerald-400">Prodotti Freschi</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                  <span>2kg verdure a foglia verde</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                  <span>1kg broccoli/cavolfiore</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                  <span>500g frutti di bosco misti</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                  <span>6 avocado</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3 text-green-400">Dispensa</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                  <span>Olio extra vergine d&apos;oliva</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                  <span>Noci macadamia</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                  <span>Latte di macadamia</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                  <span>Spezie (curcuma, zenzero)</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    )
  },
  {
    id: "hair",
    title: "Capelli",
    emoji: "✂️",
    icon: Scissors,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    borderColor: "border-violet-500/20",
    content: (
      <div className="space-y-8">
        {/* Header Card */}
        <Card className="relative overflow-hidden bg-gradient-to-br from-violet-500/15 via-purple-500/10 to-indigo-500/5 border-violet-500/30 p-8 shadow-xl shadow-violet-500/5">
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-violet-500/5" />
          <div className="relative">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-4xl font-bold mb-3 flex items-center gap-3 bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                  <div className="p-3 bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-2xl shadow-lg shadow-violet-500/20">
                    <Scissors className="h-8 w-8 text-violet-400" />
                  </div>
                  Protocollo per i Capelli
                </h2>
                <p className="text-slate-400 text-lg font-medium">Mantenere capelli sani e forti</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Hair Care Routine */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-violet-500/30 p-6 hover:shadow-xl hover:shadow-violet-500/10 transition-all">
            <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Star className="h-5 w-5 text-violet-400" />
              Routine Quotidiana
            </h4>
            <div className="space-y-3">
              <div className="p-3 bg-violet-500/10 rounded-lg">
                <p className="font-medium text-violet-400">Mattina</p>
                <p className="text-sm text-slate-400 mt-1">Massaggio del cuoio capelluto 2 minuti</p>
              </div>
              <div className="p-3 bg-purple-500/10 rounded-lg">
                <p className="font-medium text-purple-400">Lavaggio</p>
                <p className="text-sm text-slate-400 mt-1">2-3 volte a settimana con shampoo naturale</p>
              </div>
              <div className="p-3 bg-indigo-500/10 rounded-lg">
                <p className="font-medium text-indigo-400">Trattamento</p>
                <p className="text-sm text-slate-400 mt-1">Olio di rosmarino per stimolare la crescita</p>
              </div>
            </div>
          </Card>

          <Card className="border-purple-500/30 p-6 hover:shadow-xl hover:shadow-purple-500/10 transition-all">
            <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Pill className="h-5 w-5 text-purple-400" />
              Supplementi per Capelli
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-violet-500/10 rounded-lg text-center">
                <p className="font-medium text-sm">Biotina</p>
                <p className="text-xs text-slate-400">10mg/giorno</p>
              </div>
              <div className="p-3 bg-purple-500/10 rounded-lg text-center">
                <p className="font-medium text-sm">Collagene</p>
                <p className="text-xs text-slate-400">15g/giorno</p>
              </div>
              <div className="p-3 bg-indigo-500/10 rounded-lg text-center">
                <p className="font-medium text-sm">Zinco</p>
                <p className="text-xs text-slate-400">15mg/giorno</p>
              </div>
              <div className="p-3 bg-blue-500/10 rounded-lg text-center">
                <p className="font-medium text-sm">Ferro</p>
                <p className="text-xs text-slate-400">Se carente</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Tips */}
        <Card className="border-violet-500/30 p-6 bg-gradient-to-br from-violet-500/5 to-transparent">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Info className="h-6 w-6 text-violet-400" />
            Consigli Importanti
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5" />
              <span>Evita acqua troppo calda durante il lavaggio</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5" />
              <span>Usa federa di seta per dormire</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5" />
              <span>Taglia le punte ogni 8-10 settimane</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5" />
              <span>Proteggi dal sole con cappello o prodotti UV</span>
            </div>
          </div>
        </Card>
      </div>
    )
  },
  {
    id: "skin",
    title: "Pelle",
    emoji: "😊",
    icon: Smile,
    color: "text-rose-500",
    bgColor: "bg-rose-500/10",
    borderColor: "border-rose-500/20",
    content: (
      <div className="space-y-8">
        {/* Header Card */}
        <Card className="relative overflow-hidden bg-gradient-to-br from-rose-500/15 via-pink-500/10 to-red-500/5 border-rose-500/30 p-8 shadow-xl shadow-rose-500/5">
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-rose-500/5" />
          <div className="relative">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-4xl font-bold mb-3 flex items-center gap-3 bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">
                  <div className="p-3 bg-gradient-to-br from-rose-500/20 to-pink-500/20 rounded-2xl shadow-lg shadow-rose-500/20">
                    <Smile className="h-8 w-8 text-rose-400" />
                  </div>
                  Protocollo per la Pelle
                </h2>
                <p className="text-slate-400 text-lg font-medium">Routine completa per una pelle giovane</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Morning & Evening Routine */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-rose-500/30 p-6 hover:shadow-xl hover:shadow-rose-500/10 transition-all">
            <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Sun className="h-5 w-5 text-rose-400" />
              Routine Mattutina
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-rose-500/10 rounded-lg">
                <Badge className="bg-rose-500/20 text-rose-300">1</Badge>
                <span className="text-sm">Detergente delicato</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-pink-500/10 rounded-lg">
                <Badge className="bg-pink-500/20 text-pink-300">2</Badge>
                <span className="text-sm">Vitamina C serum</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-red-500/10 rounded-lg">
                <Badge className="bg-red-500/20 text-red-300">3</Badge>
                <span className="text-sm">Crema idratante</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-orange-500/10 rounded-lg">
                <Badge className="bg-orange-500/20 text-orange-300">4</Badge>
                <span className="text-sm">SPF 50+ sempre</span>
              </div>
            </div>
          </Card>

          <Card className="border-pink-500/30 p-6 hover:shadow-xl hover:shadow-pink-500/10 transition-all">
            <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Moon className="h-5 w-5 text-pink-400" />
              Routine Serale
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-rose-500/10 rounded-lg">
                <Badge className="bg-rose-500/20 text-rose-300">1</Badge>
                <span className="text-sm">Doppia detersione</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-pink-500/10 rounded-lg">
                <Badge className="bg-pink-500/20 text-pink-300">2</Badge>
                <span className="text-sm">Retinolo/Tretinoin</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-purple-500/10 rounded-lg">
                <Badge className="bg-purple-500/20 text-purple-300">3</Badge>
                <span className="text-sm">Peptidi</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-indigo-500/10 rounded-lg">
                <Badge className="bg-indigo-500/20 text-indigo-300">4</Badge>
                <span className="text-sm">Crema notte ricca</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Weekly Treatments */}
        <Card className="border-rose-500/30 p-6 bg-gradient-to-br from-rose-500/5 to-transparent">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Calendar className="h-6 w-6 text-rose-400" />
            Trattamenti Settimanali
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-rose-500/10 rounded-xl">
              <p className="font-medium text-rose-400">2x/settimana</p>
              <p className="text-sm text-slate-400 mt-1">Esfoliazione chimica (AHA/BHA)</p>
            </div>
            <div className="p-4 bg-pink-500/10 rounded-xl">
              <p className="font-medium text-pink-400">1x/settimana</p>
              <p className="text-sm text-slate-400 mt-1">Maschera idratante</p>
            </div>
            <div className="p-4 bg-red-500/10 rounded-xl">
              <p className="font-medium text-red-400">3x/settimana</p>
              <p className="text-sm text-slate-400 mt-1">Terapia luce rossa</p>
            </div>
          </div>
        </Card>
      </div>
    )
  },
  {
    id: "measurement",
    title: "Misurazioni",
    emoji: "📊",
    icon: BarChart3,
    color: "text-teal-500",
    bgColor: "bg-teal-500/10",
    borderColor: "border-teal-500/20",
    content: (
      <div className="space-y-8">
        {/* Header Card */}
        <Card className="relative overflow-hidden bg-gradient-to-br from-teal-500/15 via-cyan-500/10 to-emerald-500/5 border-teal-500/30 p-8 shadow-xl shadow-teal-500/5">
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-teal-500/5" />
          <div className="relative">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-4xl font-bold mb-3 flex items-center gap-3 bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                  <div className="p-3 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-2xl shadow-lg shadow-teal-500/20">
                    <BarChart3 className="h-8 w-8 text-teal-400" />
                  </div>
                  Sistema di Misurazione
                </h2>
                <p className="text-slate-400 text-lg font-medium">Traccia oltre 100 biomarcatori</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Daily Measurements */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-teal-500/30 p-5 hover:shadow-xl hover:shadow-teal-500/10 transition-all">
            <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
              <Activity className="h-5 w-5 text-teal-400" />
              <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">Giornaliere</span>
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-400" />
                <span>Peso corporeo</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-400" />
                <span>Temperatura</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-400" />
                <span>HRV</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-400" />
                <span>Glucosio</span>
              </li>
            </ul>
          </Card>

          <Card className="border-cyan-500/30 p-5 hover:shadow-xl hover:shadow-cyan-500/10 transition-all">
            <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-cyan-400" />
              <span className="bg-gradient-to-r from-cyan-400 to-sky-400 bg-clip-text text-transparent">Settimanali</span>
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-400" />
                <span>Composizione corporea</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-400" />
                <span>Forza muscolare</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-400" />
                <span>VO2 max</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-400" />
                <span>Velocità di cammino</span>
              </li>
            </ul>
          </Card>

          <Card className="border-emerald-500/30 p-5 hover:shadow-xl hover:shadow-emerald-500/10 transition-all">
            <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
              <Stethoscope className="h-5 w-5 text-emerald-400" />
              <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">Mensili</span>
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-400" />
                <span>Analisi del sangue</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-400" />
                <span>Ormoni</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-400" />
                <span>Infiammazione</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-400" />
                <span>Vitamine/minerali</span>
              </li>
            </ul>
          </Card>
        </div>

        {/* Key Biomarkers */}
        <Card className="border-teal-500/30 p-6 bg-gradient-to-br from-teal-500/5 to-transparent">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Microscope className="h-6 w-6 text-teal-400" />
            Biomarcatori Chiave
          </h3>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-teal-500/10 rounded-xl">
              <p className="text-2xl font-bold text-teal-400">5.1%</p>
              <p className="text-sm text-slate-400 mt-1">HbA1c</p>
            </div>
            <div className="text-center p-4 bg-cyan-500/10 rounded-xl">
              <p className="text-2xl font-bold text-cyan-400">0.5</p>
              <p className="text-sm text-slate-400 mt-1">ApoB/ApoA</p>
            </div>
            <div className="text-center p-4 bg-emerald-500/10 rounded-xl">
              <p className="text-2xl font-bold text-emerald-400">1.2</p>
              <p className="text-sm text-slate-400 mt-1">hsCRP mg/L</p>
            </div>
            <div className="text-center p-4 bg-green-500/10 rounded-xl">
              <p className="text-2xl font-bold text-green-400">850</p>
              <p className="text-sm text-slate-400 mt-1">Testosterone ng/dL</p>
            </div>
          </div>
        </Card>
      </div>
    )
  },
  {
    id: "oral",
    title: "Cura Orale",
    emoji: "🦷",
    icon: Smile,
    color: "text-sky-500",
    bgColor: "bg-sky-500/10",
    borderColor: "border-sky-500/20",
    content: (
      <div className="space-y-8">
        {/* Header Card */}
        <Card className="relative overflow-hidden bg-gradient-to-br from-sky-500/15 via-blue-500/10 to-cyan-500/5 border-sky-500/30 p-8 shadow-xl shadow-sky-500/5">
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-sky-500/5" />
          <div className="relative">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-4xl font-bold mb-3 flex items-center gap-3 bg-gradient-to-r from-sky-400 to-blue-400 bg-clip-text text-transparent">
                  <div className="p-3 bg-gradient-to-br from-sky-500/20 to-blue-500/20 rounded-2xl shadow-lg shadow-sky-500/20">
                    <Smile className="h-8 w-8 text-sky-400" />
                  </div>
                  Protocollo di Cura Orale
                </h2>
                <p className="text-slate-400 text-lg font-medium">Salute orale completa e prevenzione</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Daily Routine */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-sky-500/30 p-6 hover:shadow-xl hover:shadow-sky-500/10 transition-all">
            <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-sky-400" />
              Routine Quotidiana
            </h4>
            <div className="space-y-3">
              <div className="p-3 bg-sky-500/10 rounded-lg">
                <p className="font-medium text-sky-400">Mattina</p>
                <ul className="text-sm text-slate-400 mt-2 space-y-1">
                  <li>• Oil pulling 5 minuti</li>
                  <li>• Spazzolino elettrico 2 minuti</li>
                  <li>• Filo interdentale</li>
                  <li>• Collutorio senza alcol</li>
                </ul>
              </div>
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <p className="font-medium text-blue-400">Sera</p>
                <ul className="text-sm text-slate-400 mt-2 space-y-1">
                  <li>• Waterpik/idropulsore</li>
                  <li>• Spazzolino 2 minuti</li>
                  <li>• Raschietto lingua</li>
                  <li>• Gel al fluoro</li>
                </ul>
              </div>
            </div>
          </Card>

          <Card className="border-blue-500/30 p-6 hover:shadow-xl hover:shadow-blue-500/10 transition-all">
            <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-400" />
              Prodotti Essenziali
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-sky-500/10 rounded-lg text-center">
                <p className="font-medium text-sm">Dentifricio</p>
                <p className="text-xs text-slate-400">Con fluoro</p>
              </div>
              <div className="p-3 bg-blue-500/10 rounded-lg text-center">
                <p className="font-medium text-sm">Spazzolino</p>
                <p className="text-xs text-slate-400">Elettrico sonico</p>
              </div>
              <div className="p-3 bg-cyan-500/10 rounded-lg text-center">
                <p className="font-medium text-sm">Filo</p>
                <p className="text-xs text-slate-400">Cerato</p>
              </div>
              <div className="p-3 bg-indigo-500/10 rounded-lg text-center">
                <p className="font-medium text-sm">Xilitolo</p>
                <p className="text-xs text-slate-400">Gomme/pastiglie</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Professional Care */}
        <Card className="border-sky-500/30 p-6 bg-gradient-to-br from-sky-500/5 to-transparent">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Stethoscope className="h-6 w-6 text-sky-400" />
            Cure Professionali
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-sky-500/10 rounded-xl">
              <p className="font-medium text-sky-400">Ogni 3 mesi</p>
              <p className="text-sm text-slate-400 mt-1">Pulizia professionale</p>
            </div>
            <div className="p-4 bg-blue-500/10 rounded-xl">
              <p className="font-medium text-blue-400">Ogni 6 mesi</p>
              <p className="text-sm text-slate-400 mt-1">Controllo completo</p>
            </div>
            <div className="p-4 bg-cyan-500/10 rounded-xl">
              <p className="font-medium text-cyan-400">Annualmente</p>
              <p className="text-sm text-slate-400 mt-1">Radiografie digitali</p>
            </div>
          </div>
        </Card>
      </div>
    )
  },
  {
    id: "therapies",
    title: "Terapie Avanzate",
    emoji: "🔬",
    icon: FlaskConical,
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
    borderColor: "border-indigo-500/20",
    content: (
      <div className="space-y-8">
        {/* Header Card */}
        <Card className="relative overflow-hidden bg-gradient-to-br from-indigo-500/15 via-purple-500/10 to-blue-500/5 border-indigo-500/30 p-8 shadow-xl shadow-indigo-500/5">
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-indigo-500/5" />
          <div className="relative">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-4xl font-bold mb-3 flex items-center gap-3 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  <div className="p-3 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl shadow-lg shadow-indigo-500/20">
                    <FlaskConical className="h-8 w-8 text-indigo-400" />
                  </div>
                  Terapie Avanzate
                </h2>
                <p className="text-slate-400 text-lg font-medium">Interventi di longevità all&apos;avanguardia</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Therapies Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-indigo-500/30 p-6 hover:shadow-xl hover:shadow-indigo-500/10 transition-all">
            <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Zap className="h-5 w-5 text-indigo-400" />
              Terapia Luce Rossa
            </h4>
            <p className="text-sm text-slate-400 mb-3">Stimola produzione collagene e riparazione cellulare</p>
            <div className="space-y-2">
              <div className="flex justify-between p-2 bg-indigo-500/10 rounded-lg">
                <span className="text-sm">Frequenza</span>
                <Badge className="bg-indigo-500/20 text-indigo-300">Quotidiana</Badge>
              </div>
              <div className="flex justify-between p-2 bg-purple-500/10 rounded-lg">
                <span className="text-sm">Durata</span>
                <Badge className="bg-purple-500/20 text-purple-300">10-15 min</Badge>
              </div>
            </div>
          </Card>

          <Card className="border-purple-500/30 p-6 hover:shadow-xl hover:shadow-purple-500/10 transition-all">
            <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Waves className="h-5 w-5 text-purple-400" />
              Sauna/Freddo
            </h4>
            <p className="text-sm text-slate-400 mb-3">Ormesi termica per resilienza cellulare</p>
            <div className="space-y-2">
              <div className="flex justify-between p-2 bg-purple-500/10 rounded-lg">
                <span className="text-sm">Sauna</span>
                <Badge className="bg-purple-500/20 text-purple-300">20min @ 80°C</Badge>
              </div>
              <div className="flex justify-between p-2 bg-blue-500/10 rounded-lg">
                <span className="text-sm">Immersione fredda</span>
                <Badge className="bg-blue-500/20 text-blue-300">3min @ 10°C</Badge>
              </div>
            </div>
          </Card>

          <Card className="border-blue-500/30 p-6 hover:shadow-xl hover:shadow-blue-500/10 transition-all">
            <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Wind className="h-5 w-5 text-blue-400" />
              Camera Iperbarica
            </h4>
            <p className="text-sm text-slate-400 mb-3">Aumenta ossigenazione tessuti e guarigione</p>
            <div className="space-y-2">
              <div className="flex justify-between p-2 bg-blue-500/10 rounded-lg">
                <span className="text-sm">Sessioni</span>
                <Badge className="bg-blue-500/20 text-blue-300">2x/settimana</Badge>
              </div>
              <div className="flex justify-between p-2 bg-cyan-500/10 rounded-lg">
                <span className="text-sm">Pressione</span>
                <Badge className="bg-cyan-500/20 text-cyan-300">1.5-2.0 ATA</Badge>
              </div>
            </div>
          </Card>

          <Card className="border-cyan-500/30 p-6 hover:shadow-xl hover:shadow-cyan-500/10 transition-all">
            <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
              <BrainCircuit className="h-5 w-5 text-cyan-400" />
              Neurofeedback
            </h4>
            <p className="text-sm text-slate-400 mb-3">Ottimizzazione onde cerebrali per focus e sonno</p>
            <div className="space-y-2">
              <div className="flex justify-between p-2 bg-cyan-500/10 rounded-lg">
                <span className="text-sm">Training</span>
                <Badge className="bg-cyan-500/20 text-cyan-300">40 sessioni</Badge>
              </div>
              <div className="flex justify-between p-2 bg-sky-500/10 rounded-lg">
                <span className="text-sm">Target</span>
                <Badge className="bg-sky-500/20 text-sky-300">Alpha/Theta</Badge>
              </div>
            </div>
          </Card>
        </div>
      </div>
    )
  },
  {
    id: "products",
    title: "Prodotti",
    emoji: "📦",
    icon: Package,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/20",
    content: (
      <div className="space-y-8">
        {/* Header Card */}
        <Card className="relative overflow-hidden bg-gradient-to-br from-orange-500/15 via-amber-500/10 to-yellow-500/5 border-orange-500/30 p-8 shadow-xl shadow-orange-500/5">
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-orange-500/5" />
          <div className="relative">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-4xl font-bold mb-3 flex items-center gap-3 bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                  <div className="p-3 bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-2xl shadow-lg shadow-orange-500/20">
                    <Package className="h-8 w-8 text-orange-400" />
                  </div>
                  Prodotti Essenziali
                </h2>
                <p className="text-slate-400 text-lg font-medium">Strumenti e prodotti per il protocollo</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Product Categories */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-orange-500/30 p-5 hover:shadow-xl hover:shadow-orange-500/10 transition-all">
            <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
              <Pill className="h-5 w-5 text-orange-400" />
              <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">Integratori Base</span>
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-400" />
                <span>Omega-3 (EPA/DHA)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-400" />
                <span>Vitamina D3/K2</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-400" />
                <span>Magnesio glicinato</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-400" />
                <span>NAD+ precursori</span>
              </li>
            </ul>
          </Card>

          <Card className="border-amber-500/30 p-5 hover:shadow-xl hover:shadow-amber-500/10 transition-all">
            <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
              <Activity className="h-5 w-5 text-amber-400" />
              <span className="bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">Dispositivi</span>
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-400" />
                <span>Oura Ring</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-400" />
                <span>CGM (glucosio continuo)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-400" />
                <span>Pannello luce rossa</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-400" />
                <span>DEXA scan access</span>
              </li>
            </ul>
          </Card>

          <Card className="border-yellow-500/30 p-5 hover:shadow-xl hover:shadow-yellow-500/10 transition-all">
            <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
              <Shield className="h-5 w-5 text-yellow-400" />
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Cura Personale</span>
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-400" />
                <span>SPF 50+ minerale</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-400" />
                <span>Retinolo/Tretinoin</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-400" />
                <span>Vitamina C serum</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-400" />
                <span>Peptidi collagene</span>
              </li>
            </ul>
          </Card>
        </div>

        {/* Investment */}
        <Card className="border-orange-500/30 p-6 bg-gradient-to-br from-orange-500/5 to-transparent">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-orange-400" />
            Investimento Mensile
          </h3>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-orange-500/10 rounded-xl">
              <p className="text-2xl font-bold text-orange-400">€300</p>
              <p className="text-sm text-slate-400 mt-1">Integratori</p>
            </div>
            <div className="text-center p-4 bg-amber-500/10 rounded-xl">
              <p className="text-2xl font-bold text-amber-400">€200</p>
              <p className="text-sm text-slate-400 mt-1">Test/Analisi</p>
            </div>
            <div className="text-center p-4 bg-yellow-500/10 rounded-xl">
              <p className="text-2xl font-bold text-yellow-400">€150</p>
              <p className="text-sm text-slate-400 mt-1">Cura pelle</p>
            </div>
            <div className="text-center p-4 bg-green-500/10 rounded-xl">
              <p className="text-2xl font-bold text-green-400">€650</p>
              <p className="text-sm text-slate-400 mt-1">Totale</p>
            </div>
          </div>
        </Card>
      </div>
    )
  }
];

export default function IlProtocolloPage() {
  const [activeTab, setActiveTab] = useState("eat");

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

      {/* Protocol Tabs Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center">
            Le 16 Sezioni del <span className="text-scientific-blue">Protocollo</span>
          </h2>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="flex flex-wrap gap-2 bg-navy-dark/50 backdrop-blur-md p-3 h-auto mb-8 rounded-xl border border-steel-blue/20 justify-center">
              {protocolSections.map((section) => (
                <TabsTrigger 
                  key={section.id} 
                  value={section.id}
                  className="data-[state=active]:bg-scientific-blue data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-scientific-blue/20 flex flex-col items-center py-3 px-3 rounded-lg transition-all hover:bg-steel-blue/20 min-w-[80px]"
                >
                  <span className="text-2xl mb-1">{section.emoji}</span>
                  <span className="text-xs font-medium">{section.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {protocolSections.map((section) => (
              <TabsContent key={section.id} value={section.id} className="mt-8 animate-in fade-in-50 duration-500">
                {section.content}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* What's Different */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-steel-blue/10">
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
      <section className="py-16 px-4 sm:px-6 lg:px-8">
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