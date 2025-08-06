"use client";

import { useState, useMemo } from "react";
import Navigation from "@/components/navigation";
import { 
  Pill, Search, Filter, Info, CheckCircle, X, ChevronDown, ChevronUp,
  Heart, Brain, Dumbbell, Shield, Sparkles, Zap, Eye, Leaf,
  Coffee, Apple, Star, Package, FlaskConical, Activity
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Product data structure
interface SupplementProduct {
  id: string;
  name: string;
  creator: string;
  category: string;
  needs: string[];
  ingredients: { [key: string]: string | number | boolean };
  dailyServing: string;
  description: string;
  additionalNotes: string;
  vegan: boolean;
  thirdPartyTested: boolean;
}

// Define all products with their complete data
const supplementProducts: SupplementProduct[] = [
  {
    id: "essential-capsules",
    name: "Essential Capsules",
    creator: "Bryan Johnson",
    category: "Capsules",
    needs: ["Daily Essentials", "Vitamins", "Minerals", "Foundation"],
    ingredients: {
      "Vitamin B1 (Thiamine)": "✓",
      "Vitamin B2 (Riboflavin)": "✓",
      "Vitamin B3 (Niacinamide)": "15mg",
      "Vitamin B5 (Pantothenate)": "✓",
      "Vitamin B6 (P5P)": "✓",
      "Vitamin B7 (Biotin)": "✓",
      "Vitamin B9 (L-5-MTHF)": "✓",
      "Vitamin B12 (Methylcobalamin)": "✓",
      "Vitamin C (Ascorbic Acid)": "✓",
      "Vitamin E (d-alpha tocopherol)": "✓",
      "Vitamin K1": "✓",
      "Calcium": "✓",
      "Magnesium Citrate": "✓",
      "Zinc Citrate": "✓",
      "Manganese Citrate": "✓",
      "Selenium": "✓",
      "Potassium Iodate": "✓",
      "Phosphorus": "✓",
      "Copper": "✓",
      "Iron": "✓",
      "Glycine": "✓",
      "L-Theanine": "✓",
      "Taurine": "✓",
      "Ubiquinol": "✓",
      "Fisetin": "✓",
      "Glutathione": "✓",
      "Spermidine": "✓",
      "Lithium Orotate": "✓",
      "Lactobacillus Acidophilus": "✓"
    },
    dailyServing: "2 capsules",
    description: "Complete daily vitamins and minerals - 24 vital nutrients",
    additionalNotes: "Foundation of daily supplementation",
    vegan: true,
    thirdPartyTested: true
  },
  {
    id: "longevity-mix",
    name: "Longevity Mix",
    creator: "Bryan Johnson",
    category: "Powder",
    needs: ["Longevity", "Anti-Aging", "Comprehensive Support", "Antioxidants"],
    ingredients: {
      "Vitamin D (Veg D3)": "1000 IU",
      "Vitamin K2 (MK-4)": "150mg",
      "Vitamin K2 (MK-7)": "300mcg",
      "Calcium": "100mg",
      "L-Lysine": "125mg",
      "Taurine": "200mg",
      "Luteolin": "15mg",
      "Astaxanthin": "12mg",
      "Lycopene": "10mg",
      "Zeaxanthin": "2mg",
      "Lutein": "10mg",
      "Grape Seed Extract": "50mg",
      "Pomegranate Extract": "60mg",
      "Sodium Hyaluronate": "120mg",
      "Glucosamine Sulfate": "1500mg",
      "CaAKG": "1g",
      "Glucoraphanin": "17.5mg"
    },
    dailyServing: "1 scoop",
    description: "Comprehensive longevity support drink - 13 health actives",
    additionalNotes: "Mix with water or smoothie",
    vegan: true,
    thirdPartyTested: true
  },
  {
    id: "advanced-antioxidants",
    name: "Advanced Antioxidants",
    creator: "Bryan Johnson",
    category: "Capsules",
    needs: ["Antioxidants", "Eye Health", "Cellular Health", "Anti-Aging"],
    ingredients: {
      "Vitamin D (Veg D3)": "✓",
      "Vitamin E (d-alpha tocopherol)": "✓",
      "Vitamin K1": "600mcg",
      "Vitamin K2 (MK-4)": "5mg",
      "Luteolin": "10mg",
      "Astaxanthin": "5mg",
      "Lycopene": "2mg",
      "MCT Oil": "✓"
    },
    dailyServing: "1 capsule",
    description: "Fat-soluble antioxidants for eye and cellular health - 7 fat-soluble nutrients",
    additionalNotes: "Also contains Vitamin D from Longevity Mix",
    vegan: true,
    thirdPartyTested: true
  },
  {
    id: "nac-ginger-curcumin",
    name: "NAC + Ginger + Curcumin",
    creator: "Bryan Johnson",
    category: "Capsules",
    needs: ["Detox", "Anti-Inflammatory", "Liver Support", "Joint Health"],
    ingredients: {
      "NAC (N-Acetyl Cysteine)": "500mg",
      "Ginger Extract": "500mg",
      "Curcuminoids": "500mg"
    },
    dailyServing: "3 capsules",
    description: "Detox and anti-inflammatory support",
    additionalNotes: "Powerful antioxidant combination",
    vegan: true,
    thirdPartyTested: true
  },
  {
    id: "ashwagandha-rhodiola",
    name: "Ashwagandha + Rhodiola",
    creator: "Bryan Johnson",
    category: "Capsules",
    needs: ["Stress Management", "Energy", "Adaptogenic", "Mental Clarity"],
    ingredients: {
      "Ashwagandha Extract": "600mg",
      "Rhodiola Extract": "100mg"
    },
    dailyServing: "1 capsule",
    description: "Stress and energy management - Adaptogenic herbs",
    additionalNotes: "Supports stress resilience",
    vegan: true,
    thirdPartyTested: true
  },
  {
    id: "red-yeast-rice-garlic",
    name: "Red Yeast Rice + Garlic",
    creator: "Bryan Johnson",
    category: "Capsules",
    needs: ["Heart Health", "Cardiovascular", "Cholesterol Support"],
    ingredients: {
      "Red Yeast Rice": "amount varies",
      "Odor-free Garlic": "amount varies"
    },
    dailyServing: "amount varies",
    description: "Heart health and cardiovascular support",
    additionalNotes: "Natural cholesterol management",
    vegan: true,
    thirdPartyTested: true
  },
  {
    id: "metabolic-protein",
    name: "Metabolic Protein",
    creator: "Bryan Johnson",
    category: "Protein Powder",
    needs: ["Muscle Building", "Metabolism", "Protein", "Recovery"],
    ingredients: {
      "Hemp Protein": "27g",
      "Pea Protein": "27g",
      "Sunflower Lecithin": "✓",
      "Resistant Maltodextrin (Fiber)": "8g",
      "Allulose": "✓",
      "Monk Fruit Extract": "✓",
      "Isomaltulose (Slow Carbs)": "✓",
      "Natural Flavors": "✓"
    },
    dailyServing: "1-2 servings",
    description: "Muscle building and metabolism - Plant-based protein",
    additionalNotes: "GI 32 slow carbs",
    vegan: true,
    thirdPartyTested: true
  },
  {
    id: "longevity-protein",
    name: "Longevity Protein",
    creator: "Bryan Johnson",
    category: "Protein Powder",
    needs: ["Muscle Recovery", "Protein", "Polyphenols", "Anti-Aging"],
    ingredients: {
      "Hemp Protein": "26g",
      "Pea Protein": "26g",
      "Sunflower Lecithin": "✓",
      "Allulose": "✓",
      "Monk Fruit Extract": "✓",
      "Natural Flavors": "✓"
    },
    dailyServing: "1-2 servings",
    description: "Muscle recovery with polyphenols - Plant-based protein",
    additionalNotes: "Enhanced with polyphenols",
    vegan: true,
    thirdPartyTested: true
  },
  {
    id: "collagen-peptides",
    name: "Collagen Peptides",
    creator: "Bryan Johnson",
    category: "Protein Powder",
    needs: ["Joint Health", "Skin Health", "Collagen", "Anti-Aging"],
    ingredients: {
      "Collagen Type I": "20g total",
      "Collagen Type II": "20g total",
      "Collagen Type III": "20g total"
    },
    dailyServing: "1 serving",
    description: "Joint and skin health support",
    additionalNotes: "Multi-type collagen blend",
    vegan: false,
    thirdPartyTested: true
  },
  {
    id: "creatine",
    name: "Creatine",
    creator: "Bryan Johnson",
    category: "Powder",
    needs: ["Athletic Performance", "Muscle Building", "Sports", "Energy"],
    ingredients: {
      "Creatine Monohydrate": "5g"
    },
    dailyServing: "1 scoop",
    description: "Athletic performance - Pure creatine",
    additionalNotes: "Supports ATP production",
    vegan: true,
    thirdPartyTested: true
  },
  {
    id: "blueberry-nut-mix",
    name: "Blueberry Nut Mix",
    creator: "Bryan Johnson",
    category: "Food",
    needs: ["Antioxidants", "Snacks", "Healthy Fats", "Brain Health"],
    ingredients: {
      "Polyphenols": "170mg",
      "Flaxseed": "✓",
      "Macadamia Nuts": "✓",
      "Walnuts": "✓"
    },
    dailyServing: "1 serving",
    description: "Antioxidant-rich snack",
    additionalNotes: "Omega-3 source",
    vegan: true,
    thirdPartyTested: true
  },
  {
    id: "extra-virgin-olive-oil",
    name: "Extra Virgin Olive Oil",
    creator: "Bryan Johnson",
    category: "Food",
    needs: ["Cooking", "Polyphenols", "Healthy Fats", "Heart Health"],
    ingredients: {
      "Polyphenols": ">400mg/kg"
    },
    dailyServing: "2-4 tbsp",
    description: "Polyphenol-rich cooking oil",
    additionalNotes: "High polyphenol content",
    vegan: true,
    thirdPartyTested: true
  },
  {
    id: "nutty-butter",
    name: "Nutty Butter",
    creator: "Bryan Johnson",
    category: "Food",
    needs: ["Healthy Fats", "Spreads", "Snacks"],
    ingredients: {
      "Flaxseed": "✓",
      "Macadamia Nuts": "✓"
    },
    dailyServing: "as desired",
    description: "Healthy fat spread",
    additionalNotes: "Rich in omega fatty acids",
    vegan: true,
    thirdPartyTested: true
  },
  {
    id: "macadamia-nut-puree",
    name: "Macadamia Nut Puree",
    creator: "Bryan Johnson",
    category: "Food",
    needs: ["Snacks", "Healthy Fats", "Energy"],
    ingredients: {
      "Macadamia Nuts": "100%"
    },
    dailyServing: "as desired",
    description: "Pure macadamia snack",
    additionalNotes: "Single ingredient",
    vegan: true,
    thirdPartyTested: true
  },
  {
    id: "non-dairy-cocoa",
    name: "Non-Dairy Cocoa",
    creator: "Bryan Johnson",
    category: "Food",
    needs: ["Beverages", "Flavanols", "Heart Health", "Antioxidants"],
    ingredients: {
      "Flavanols (Cocoa)": "7.5%"
    },
    dailyServing: "as desired",
    description: "Flavanol-rich beverage addition",
    additionalNotes: "Supports cardiovascular health",
    vegan: true,
    thirdPartyTested: true
  },
  {
    id: "macadamia-protein-bar",
    name: "Macadamia Protein Bar",
    creator: "Bryan Johnson",
    category: "Food",
    needs: ["Protein", "Snacks", "Convenience", "Energy"],
    ingredients: {
      "Macadamia Nuts": "✓",
      "Hemp Protein": "✓",
      "Pea Protein": "✓"
    },
    dailyServing: "1-2 bars",
    description: "Convenient protein snack",
    additionalNotes: "On-the-go nutrition",
    vegan: true,
    thirdPartyTested: true
  }
];

// Get unique needs for filtering
const allNeeds = Array.from(new Set(supplementProducts.flatMap(p => p.needs))).sort();

// Get all unique ingredients
const allIngredients = Array.from(new Set(
  supplementProducts.flatMap(p => Object.keys(p.ingredients))
)).sort();

export default function IntegratoriPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCreator, setSelectedCreator] = useState<string | null>(null);
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showVeganOnly, setShowVeganOnly] = useState(false);
  const [expandedIngredients, setExpandedIngredients] = useState(false);

  // Filter products based on criteria
  const filteredProducts = useMemo(() => {
    return supplementProducts.filter(product => {
      // Search filter
      if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !product.description.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      // Creator filter
      if (selectedCreator && product.creator !== selectedCreator) {
        return false;
      }

      // Needs filter
      if (selectedNeeds.length > 0 && !selectedNeeds.some(need => product.needs.includes(need))) {
        return false;
      }

      // Category filter
      if (selectedCategory && product.category !== selectedCategory) {
        return false;
      }

      // Vegan filter
      if (showVeganOnly && !product.vegan) {
        return false;
      }

      return true;
    });
  }, [searchTerm, selectedCreator, selectedNeeds, selectedCategory, showVeganOnly]);

  // Get visible ingredients (only those present in filtered products)
  const visibleIngredients = useMemo(() => {
    const ingredientSet = new Set<string>();
    filteredProducts.forEach(product => {
      Object.keys(product.ingredients).forEach(ing => ingredientSet.add(ing));
    });
    return allIngredients.filter(ing => ingredientSet.has(ing));
  }, [filteredProducts]);

  const toggleNeed = (need: string) => {
    setSelectedNeeds(prev => 
      prev.includes(need) 
        ? prev.filter(n => n !== need)
        : [...prev, need]
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCreator(null);
    setSelectedNeeds([]);
    setSelectedCategory(null);
    setShowVeganOnly(false);
  };

  const hasActiveFilters = searchTerm || selectedCreator || selectedNeeds.length > 0 || 
                          selectedCategory || showVeganOnly;

  return (
    <div className="min-h-screen bg-navy-charcoal text-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-navy-charcoal via-navy-dark to-navy-charcoal">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-scientific-blue/20 rounded-full mb-6 border border-scientific-blue/30">
            <Pill className="text-scientific-blue mr-2 h-4 w-4" />
            <span className="text-sm font-medium text-scientific-blue">Supplementazione Ottimizzata</span>
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-black leading-tight mb-6">
            <span className="bg-gradient-to-r from-scientific-blue to-performance-green bg-clip-text text-transparent">
              Integratori
            </span>
          </h1>
          
          <p className="text-xl text-slate-300 mb-8 leading-relaxed max-w-3xl mx-auto">
            Il protocollo completo di supplementazione per ottimizzare ogni aspetto della tua salute e longevità.
            16 prodotti scientificamente formulati per supportare energia, recupero, e benessere ottimale.
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            <Card className="bg-navy-dark/50 border-steel-blue/30 p-4">
              <div className="text-3xl font-bold text-scientific-blue">{supplementProducts.length}</div>
              <div className="text-sm text-slate-400 mt-1">Prodotti</div>
            </Card>
            <Card className="bg-navy-dark/50 border-steel-blue/30 p-4">
              <div className="text-3xl font-bold text-performance-green">{allIngredients.length}+</div>
              <div className="text-sm text-slate-400 mt-1">Ingredienti</div>
            </Card>
            <Card className="bg-navy-dark/50 border-steel-blue/30 p-4">
              <div className="text-3xl font-bold text-scientific-blue">100%</div>
              <div className="text-sm text-slate-400 mt-1">Testati</div>
            </Card>
            <Card className="bg-navy-dark/50 border-steel-blue/30 p-4">
              <div className="text-3xl font-bold text-performance-green">15/16</div>
              <div className="text-sm text-slate-400 mt-1">Vegani</div>
            </Card>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-steel-blue/10">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-navy-dark/50 border-steel-blue/30 p-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <FlaskConical className="h-6 w-6 text-scientific-blue" />
              La Filosofia degli Integratori
            </h2>
            <div className="space-y-4 text-slate-300">
              <p>
                Gli integratori non sono sostituti di una dieta sana, ma complementi strategici 
                per colmare lacune nutrizionali e ottimizzare le funzioni biologiche. Il nostro 
                approccio si basa su tre principi fondamentali:
              </p>
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="bg-navy-charcoal/50 p-4 rounded-lg border border-steel-blue/20">
                  <h3 className="font-semibold text-scientific-blue mb-2">1. Evidenza Scientifica</h3>
                  <p className="text-sm">
                    Ogni ingrediente è supportato da ricerca peer-reviewed e dosato secondo 
                    gli studi clinici più rigorosi.
                  </p>
                </div>
                <div className="bg-navy-charcoal/50 p-4 rounded-lg border border-steel-blue/20">
                  <h3 className="font-semibold text-performance-green mb-2">2. Biodisponibilità</h3>
                  <p className="text-sm">
                    Utilizziamo solo forme altamente biodisponibili di nutrienti per 
                    massimizzare l&apos;assorbimento e l&apos;efficacia.
                  </p>
                </div>
                <div className="bg-navy-charcoal/50 p-4 rounded-lg border border-steel-blue/20">
                  <h3 className="font-semibold text-scientific-blue mb-2">3. Sinergia</h3>
                  <p className="text-sm">
                    I prodotti sono progettati per lavorare in sinergia, amplificando 
                    i benefici attraverso interazioni positive.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-navy-dark/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Filter className="h-6 w-6 text-scientific-blue" />
              Filtra Prodotti
            </h2>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1"
              >
                <X className="h-4 w-4" />
                Rimuovi Filtri
              </button>
            )}
          </div>

          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Cerca prodotti o ingredienti..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-navy-charcoal border border-steel-blue/30 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-scientific-blue transition-colors"
            />
          </div>

          {/* Filter Pills */}
          <div className="space-y-4">
            {/* Creator Filter */}
            <div>
              <h3 className="text-sm font-semibold text-slate-400 mb-2">Creatore</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCreator(selectedCreator === "Bryan Johnson" ? null : "Bryan Johnson")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCreator === "Bryan Johnson"
                      ? 'bg-scientific-blue text-white'
                      : 'bg-navy-charcoal border border-steel-blue/30 text-slate-300 hover:border-scientific-blue/50'
                  }`}
                >
                  Bryan Johnson
                </button>
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <h3 className="text-sm font-semibold text-slate-400 mb-2">Categoria</h3>
              <div className="flex flex-wrap gap-2">
                {["Capsules", "Powder", "Protein Powder", "Food"].map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? 'bg-performance-green text-white'
                        : 'bg-navy-charcoal border border-steel-blue/30 text-slate-300 hover:border-performance-green/50'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Needs Filter */}
            <div>
              <h3 className="text-sm font-semibold text-slate-400 mb-2">Esigenze</h3>
              <div className="flex flex-wrap gap-2">
                {allNeeds.map(need => (
                  <button
                    key={need}
                    onClick={() => toggleNeed(need)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      selectedNeeds.includes(need)
                        ? 'bg-scientific-blue text-white'
                        : 'bg-navy-charcoal border border-steel-blue/30 text-slate-300 hover:border-scientific-blue/50'
                    }`}
                  >
                    {need}
                  </button>
                ))}
              </div>
            </div>

            {/* Vegan Filter */}
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showVeganOnly}
                  onChange={(e) => setShowVeganOnly(e.target.checked)}
                  className="w-4 h-4 rounded border-steel-blue/30 bg-navy-charcoal text-scientific-blue focus:ring-scientific-blue focus:ring-offset-0"
                />
                <span className="text-sm text-slate-300">Solo Prodotti Vegani</span>
              </label>
            </div>
          </div>
        </div>
      </section>

      {/* Products Table Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              Prodotti ({filteredProducts.length})
            </h2>
            <button
              onClick={() => setExpandedIngredients(!expandedIngredients)}
              className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
            >
              {expandedIngredients ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              {expandedIngredients ? "Comprimi" : "Espandi"} Ingredienti
            </button>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden rounded-lg border border-steel-blue/30">
                <table className="min-w-full divide-y divide-steel-blue/30">
                  <thead className="bg-navy-dark/50">
                    <tr>
                      <th className="sticky left-0 z-10 bg-navy-dark px-3 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider min-w-[150px] max-w-[200px]">
                        Prodotto
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                        Categoria
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                        Esigenze
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                        Porzione
                      </th>
                      {visibleIngredients.slice(0, expandedIngredients ? undefined : 5).map(ingredient => (
                        <th 
                          key={ingredient}
                          className="px-2 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider min-w-[80px]"
                        >
                          <div className="text-xs">
                            {ingredient.length > 20 ? ingredient.substring(0, 20) + '...' : ingredient}
                          </div>
                        </th>
                      ))}
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                        Vegano
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-navy-charcoal/50 divide-y divide-steel-blue/20">
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-navy-dark/50 transition-colors">
                        <td className="sticky left-0 z-10 bg-navy-charcoal px-3 py-3 min-w-[150px] max-w-[200px]">
                          <div>
                            <div className="text-xs font-semibold text-white truncate">{product.name}</div>
                            <div className="text-xs text-slate-400 mt-0.5 line-clamp-2">{product.description}</div>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <Badge className="bg-steel-blue/20 text-slate-300 border-steel-blue/30">
                            {product.category}
                          </Badge>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex flex-wrap gap-1">
                            {product.needs.slice(0, 3).map(need => (
                              <Badge 
                                key={need}
                                className="bg-scientific-blue/20 text-scientific-blue border-scientific-blue/30 text-xs"
                              >
                                {need}
                              </Badge>
                            ))}
                            {product.needs.length > 3 && (
                              <Badge className="bg-steel-blue/20 text-slate-400 border-steel-blue/30 text-xs">
                                +{product.needs.length - 3}
                              </Badge>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-300">
                          {product.dailyServing}
                        </td>
                        {visibleIngredients.slice(0, expandedIngredients ? undefined : 5).map(ingredient => (
                          <td key={ingredient} className="px-2 py-4 text-center">
                            {product.ingredients[ingredient] ? (
                              <div className="text-xs">
                                {product.ingredients[ingredient] === "✓" ? (
                                  <CheckCircle className="h-4 w-4 text-performance-green mx-auto" />
                                ) : (
                                  <span className="text-scientific-blue font-medium">
                                    {product.ingredients[ingredient]}
                                  </span>
                                )}
                              </div>
                            ) : (
                              <span className="text-slate-600">-</span>
                            )}
                          </td>
                        ))}
                        <td className="px-4 py-4 text-center">
                          {product.vegan ? (
                            <CheckCircle className="h-5 w-5 text-performance-green mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-red-400 mx-auto" />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-400 text-lg mb-4">Nessun prodotto trovato</p>
              <p className="text-slate-500">Prova a modificare i criteri di ricerca</p>
            </div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-steel-blue/10">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-navy-dark/50 border-steel-blue/30 p-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Info className="h-6 w-6 text-scientific-blue" />
              Informazioni Importanti
            </h2>
            <div className="space-y-4 text-slate-300">
              <div>
                <h3 className="font-semibold text-performance-green mb-2">Consultazione Medica</h3>
                <p className="text-sm">
                  Prima di iniziare qualsiasi regime di supplementazione, consulta sempre un professionista 
                  sanitario qualificato, specialmente se hai condizioni mediche preesistenti o stai assumendo farmaci.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-scientific-blue mb-2">Qualità e Certificazioni</h3>
                <p className="text-sm">
                  Tutti i prodotti sono testati da terze parti per purezza, potenza e sicurezza. 
                  I certificati di analisi sono disponibili su richiesta.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-performance-green mb-2">Personalizzazione</h3>
                <p className="text-sm">
                  Il protocollo è un punto di partenza. Le esigenze individuali possono variare 
                  in base a genetica, stile di vita e obiettivi di salute specifici.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}