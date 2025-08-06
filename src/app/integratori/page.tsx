"use client";

import { useState, useMemo } from "react";
import Navigation from "@/components/navigation";
import { 
  Pill, Search, Filter, Info, CheckCircle, X, ChevronDown, ChevronUp,
  FlaskConical
} from "lucide-react";
import { Card } from "@/components/ui/card";

// Type definition for ingredient data
interface IngredientItem {
  ingredient: string;
  category: string;
  data: { [key: string]: string };
}

// Define the complete ingredient matrix data
const ingredientData: IngredientItem[] = [
  // Product Info Rows
  { ingredient: "Daily Pills/Servings", category: "Info", data: { "Essential Capsules": "2 capsules", "Longevity Mix": "1 scoop", "Advanced Antioxidants": "1 capsule", "NAC + Ginger + Curcumin": "3 capsules", "Ashwagandha + Rhodiola": "1 capsule", "Red Yeast Rice + Garlic": "varies", "Metabolic Protein": "1-2 servings", "Longevity Protein": "1-2 servings", "Collagen Peptides": "1 serving", "Creatine": "1 scoop", "Blueberry Nut Mix": "1 serving", "Extra Virgin Olive Oil": "2-4 tbsp", "Nutty Butter": "as desired", "Macadamia Nut Puree": "as desired", "Non-Dairy Cocoa": "as desired", "Macadamia Protein Bar": "1-2 bars" }},
  { ingredient: "Product Purpose", category: "Info", data: { "Essential Capsules": "Complete daily vitamins and minerals", "Longevity Mix": "Comprehensive longevity support", "Advanced Antioxidants": "Fat-soluble antioxidants", "NAC + Ginger + Curcumin": "Detox and anti-inflammatory", "Ashwagandha + Rhodiola": "Stress and energy management", "Red Yeast Rice + Garlic": "Heart health support", "Metabolic Protein": "Muscle building", "Longevity Protein": "Muscle recovery", "Collagen Peptides": "Joint and skin health", "Creatine": "Athletic performance", "Blueberry Nut Mix": "Antioxidant snack", "Extra Virgin Olive Oil": "Polyphenol cooking oil", "Nutty Butter": "Healthy fat spread", "Macadamia Nut Puree": "Pure macadamia snack", "Non-Dairy Cocoa": "Flavanol beverage", "Macadamia Protein Bar": "Protein snack" }},
  { ingredient: "Vegan", category: "Info", data: { "Essential Capsules": "Yes", "Longevity Mix": "Yes", "Advanced Antioxidants": "Yes", "NAC + Ginger + Curcumin": "Yes", "Ashwagandha + Rhodiola": "Yes", "Red Yeast Rice + Garlic": "Yes", "Metabolic Protein": "Yes", "Longevity Protein": "Yes", "Collagen Peptides": "No", "Creatine": "Yes", "Blueberry Nut Mix": "Yes", "Extra Virgin Olive Oil": "Yes", "Nutty Butter": "Yes", "Macadamia Nut Puree": "Yes", "Non-Dairy Cocoa": "Yes", "Macadamia Protein Bar": "Yes" }},
  
  // B Vitamins
  { ingredient: "Vitamin B1 (Thiamine)", category: "B Vitamins", data: { "Essential Capsules": "✓" }},
  { ingredient: "Vitamin B2 (Riboflavin)", category: "B Vitamins", data: { "Essential Capsules": "✓" }},
  { ingredient: "Vitamin B3 (Niacinamide)", category: "B Vitamins", data: { "Essential Capsules": "15mg" }},
  { ingredient: "Vitamin B5 (Pantothenate)", category: "B Vitamins", data: { "Essential Capsules": "✓" }},
  { ingredient: "Vitamin B6 (P5P)", category: "B Vitamins", data: { "Essential Capsules": "✓" }},
  { ingredient: "Vitamin B7 (Biotin)", category: "B Vitamins", data: { "Essential Capsules": "✓" }},
  { ingredient: "Vitamin B9 (L-5-MTHF)", category: "B Vitamins", data: { "Essential Capsules": "✓" }},
  { ingredient: "Vitamin B12 (Methylcobalamin)", category: "B Vitamins", data: { "Essential Capsules": "✓" }},
  
  // Other Vitamins
  { ingredient: "Vitamin C (Ascorbic Acid)", category: "Vitamins", data: { "Essential Capsules": "✓" }},
  { ingredient: "Vitamin D (Veg D3)", category: "Vitamins", data: { "Longevity Mix": "1000 IU", "Advanced Antioxidants": "✓" }},
  { ingredient: "Vitamin E (d-alpha tocopherol)", category: "Vitamins", data: { "Essential Capsules": "✓", "Advanced Antioxidants": "✓" }},
  { ingredient: "Vitamin K1", category: "Vitamins", data: { "Essential Capsules": "✓", "Advanced Antioxidants": "600mcg" }},
  { ingredient: "Vitamin K2 (MK-4)", category: "Vitamins", data: { "Longevity Mix": "150mg", "Advanced Antioxidants": "5mg" }},
  { ingredient: "Vitamin K2 (MK-7)", category: "Vitamins", data: { "Longevity Mix": "300mcg" }},
  
  // Minerals
  { ingredient: "Calcium", category: "Minerals", data: { "Essential Capsules": "✓", "Longevity Mix": "100mg" }},
  { ingredient: "Magnesium Citrate", category: "Minerals", data: { "Essential Capsules": "✓" }},
  { ingredient: "Zinc Citrate", category: "Minerals", data: { "Essential Capsules": "✓" }},
  { ingredient: "Manganese Citrate", category: "Minerals", data: { "Essential Capsules": "✓" }},
  { ingredient: "Selenium", category: "Minerals", data: { "Essential Capsules": "✓" }},
  { ingredient: "Potassium Iodate", category: "Minerals", data: { "Essential Capsules": "✓" }},
  { ingredient: "Phosphorus", category: "Minerals", data: { "Essential Capsules": "✓" }},
  { ingredient: "Copper", category: "Minerals", data: { "Essential Capsules": "✓" }},
  { ingredient: "Iron", category: "Minerals", data: { "Essential Capsules": "✓" }},
  
  // Proteins
  { ingredient: "Hemp Protein", category: "Proteins", data: { "Metabolic Protein": "27g", "Longevity Protein": "26g", "Macadamia Protein Bar": "✓" }},
  { ingredient: "Pea Protein", category: "Proteins", data: { "Metabolic Protein": "27g", "Longevity Protein": "26g", "Macadamia Protein Bar": "✓" }},
  { ingredient: "Collagen Type I", category: "Proteins", data: { "Collagen Peptides": "20g total" }},
  { ingredient: "Collagen Type II", category: "Proteins", data: { "Collagen Peptides": "20g total" }},
  { ingredient: "Collagen Type III", category: "Proteins", data: { "Collagen Peptides": "20g total" }},
  
  // Amino Acids
  { ingredient: "Glycine", category: "Amino Acids", data: { "Essential Capsules": "✓" }},
  { ingredient: "L-Theanine", category: "Amino Acids", data: { "Essential Capsules": "✓" }},
  { ingredient: "L-Lysine", category: "Amino Acids", data: { "Longevity Mix": "125mg" }},
  { ingredient: "Taurine", category: "Amino Acids", data: { "Essential Capsules": "✓", "Longevity Mix": "200mg" }},
  { ingredient: "Creatine Monohydrate", category: "Amino Acids", data: { "Creatine": "5g" }},
  
  // Antioxidants & Extracts
  { ingredient: "NAC (N-Acetyl Cysteine)", category: "Antioxidants", data: { "NAC + Ginger + Curcumin": "500mg" }},
  { ingredient: "Ginger Extract", category: "Antioxidants", data: { "NAC + Ginger + Curcumin": "500mg" }},
  { ingredient: "Curcuminoids", category: "Antioxidants", data: { "NAC + Ginger + Curcumin": "500mg" }},
  { ingredient: "Ashwagandha Extract", category: "Adaptogens", data: { "Ashwagandha + Rhodiola": "600mg" }},
  { ingredient: "Rhodiola Extract", category: "Adaptogens", data: { "Ashwagandha + Rhodiola": "100mg" }},
  { ingredient: "Red Yeast Rice", category: "Heart Health", data: { "Red Yeast Rice + Garlic": "✓" }},
  { ingredient: "Odor-free Garlic", category: "Heart Health", data: { "Red Yeast Rice + Garlic": "✓" }},
  
  // Advanced Compounds
  { ingredient: "Ubiquinol", category: "Advanced", data: { "Essential Capsules": "✓" }},
  { ingredient: "Fisetin", category: "Advanced", data: { "Essential Capsules": "✓" }},
  { ingredient: "Luteolin", category: "Advanced", data: { "Longevity Mix": "15mg", "Advanced Antioxidants": "10mg" }},
  { ingredient: "Astaxanthin", category: "Advanced", data: { "Longevity Mix": "12mg", "Advanced Antioxidants": "5mg" }},
  { ingredient: "Lycopene", category: "Advanced", data: { "Longevity Mix": "10mg", "Advanced Antioxidants": "2mg" }},
  { ingredient: "Zeaxanthin", category: "Advanced", data: { "Longevity Mix": "2mg" }},
  { ingredient: "Lutein", category: "Advanced", data: { "Longevity Mix": "10mg" }},
  { ingredient: "Glutathione", category: "Advanced", data: { "Essential Capsules": "✓" }},
  { ingredient: "Grape Seed Extract", category: "Advanced", data: { "Longevity Mix": "50mg" }},
  { ingredient: "Pomegranate Extract", category: "Advanced", data: { "Longevity Mix": "60mg" }},
  { ingredient: "Sodium Hyaluronate", category: "Advanced", data: { "Longevity Mix": "120mg" }},
  { ingredient: "Glucosamine Sulfate", category: "Advanced", data: { "Longevity Mix": "1500mg" }},
  { ingredient: "Spermidine", category: "Advanced", data: { "Essential Capsules": "✓" }},
  { ingredient: "CaAKG", category: "Advanced", data: { "Longevity Mix": "1g" }},
  { ingredient: "Glucoraphanin", category: "Advanced", data: { "Longevity Mix": "17.5mg" }},
  { ingredient: "Lithium Orotate", category: "Advanced", data: { "Essential Capsules": "✓" }},
  { ingredient: "Lactobacillus Acidophilus", category: "Probiotics", data: { "Essential Capsules": "✓" }},
  
  // Fats & Oils
  { ingredient: "MCT Oil", category: "Fats", data: { "Advanced Antioxidants": "✓" }},
  { ingredient: "Flaxseed", category: "Fats", data: { "Blueberry Nut Mix": "✓", "Nutty Butter": "✓" }},
  { ingredient: "Sunflower Lecithin", category: "Fats", data: { "Metabolic Protein": "✓", "Longevity Protein": "✓" }},
  
  // Fibers & Sweeteners
  { ingredient: "Resistant Maltodextrin", category: "Fiber", data: { "Metabolic Protein": "8g" }},
  { ingredient: "Allulose", category: "Sweeteners", data: { "Metabolic Protein": "✓", "Longevity Protein": "✓" }},
  { ingredient: "Monk Fruit Extract", category: "Sweeteners", data: { "Metabolic Protein": "✓", "Longevity Protein": "✓" }},
  { ingredient: "Isomaltulose", category: "Carbs", data: { "Metabolic Protein": "✓" }},
  
  // Food Components
  { ingredient: "Polyphenols", category: "Food", data: { "Blueberry Nut Mix": "170mg", "Extra Virgin Olive Oil": ">400mg/kg" }},
  { ingredient: "Flavanols (Cocoa)", category: "Food", data: { "Non-Dairy Cocoa": "7.5%" }},
  { ingredient: "Macadamia Nuts", category: "Food", data: { "Blueberry Nut Mix": "✓", "Nutty Butter": "✓", "Macadamia Nut Puree": "100%", "Macadamia Protein Bar": "✓" }},
  { ingredient: "Walnuts", category: "Food", data: { "Blueberry Nut Mix": "✓" }},
  { ingredient: "Natural Flavors", category: "Food", data: { "Metabolic Protein": "✓", "Longevity Protein": "✓" }}
];

// Product columns in order
const productColumns = [
  "Essential Capsules",
  "Longevity Mix", 
  "Advanced Antioxidants",
  "NAC + Ginger + Curcumin",
  "Ashwagandha + Rhodiola",
  "Red Yeast Rice + Garlic",
  "Metabolic Protein",
  "Longevity Protein",
  "Collagen Peptides",
  "Creatine",
  "Blueberry Nut Mix",
  "Extra Virgin Olive Oil",
  "Nutty Butter",
  "Macadamia Nut Puree",
  "Non-Dairy Cocoa",
  "Macadamia Protein Bar"
];

// Get unique categories
const categories = Array.from(new Set(ingredientData.map(item => item.category)));

export default function IntegratoriPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedView, setExpandedView] = useState(false);
  const [showInfoRows, setShowInfoRows] = useState(true);

  // Filter ingredients based on search and category
  const filteredIngredients = useMemo(() => {
    return ingredientData.filter(item => {
      // Filter out info rows if not showing them
      if (!showInfoRows && item.category === "Info") {
        return false;
      }

      // Search filter
      if (searchTerm && !item.ingredient.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      // Category filter
      if (selectedCategory && item.category !== selectedCategory) {
        return false;
      }

      return true;
    });
  }, [searchTerm, selectedCategory, showInfoRows]);

  // Get which products are visible based on having any ingredients
  const visibleProducts = useMemo(() => {
    const productSet = new Set<string>();
    filteredIngredients.forEach(item => {
      Object.keys(item.data).forEach(product => {
        if (item.data[product]) {
          productSet.add(product);
        }
      });
    });
    return productColumns.filter(product => productSet.has(product));
  }, [filteredIngredients]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory(null);
  };

  const hasActiveFilters = searchTerm || selectedCategory;

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
            16 prodotti scientificamente formulati con oltre 70 ingredienti attivi.
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            <Card className="bg-navy-dark/50 border-steel-blue/30 p-4">
              <div className="text-3xl font-bold text-scientific-blue">16</div>
              <div className="text-sm text-slate-400 mt-1">Prodotti</div>
            </Card>
            <Card className="bg-navy-dark/50 border-steel-blue/30 p-4">
              <div className="text-3xl font-bold text-performance-green">70+</div>
              <div className="text-sm text-slate-400 mt-1">Ingredienti</div>
            </Card>
            <Card className="bg-navy-dark/50 border-steel-blue/30 p-4">
              <div className="text-3xl font-bold text-scientific-blue">100%</div>
              <div className="text-sm text-slate-400 mt-1">Testati</div>
            </Card>
            <Card className="bg-navy-dark/50 border-steel-blue/30 p-4">
              <div className="text-3xl font-bold text-performance-green">94%</div>
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
              Matrice Completa Ingredienti
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
              placeholder="Cerca ingredienti..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-navy-charcoal border border-steel-blue/30 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-scientific-blue transition-colors"
            />
          </div>

          {/* Filter Options */}
          <div className="flex flex-wrap gap-4 items-center">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.filter(cat => cat !== "Info").map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-scientific-blue text-white'
                      : 'bg-navy-charcoal border border-steel-blue/30 text-slate-300 hover:border-scientific-blue/50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* View Options */}
            <div className="flex gap-3 ml-auto">
              <button
                onClick={() => setShowInfoRows(!showInfoRows)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  showInfoRows
                    ? 'bg-performance-green text-white'
                    : 'bg-navy-charcoal border border-steel-blue/30 text-slate-300'
                }`}
              >
                {showInfoRows ? 'Nascondi' : 'Mostra'} Info Prodotti
              </button>
              <button
                onClick={() => setExpandedView(!expandedView)}
                className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
              >
                {expandedView ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                Vista {expandedView ? 'Compatta' : 'Espansa'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Ingredient Matrix Table */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">
              {filteredIngredients.length} Ingredienti × {visibleProducts.length} Prodotti
            </h2>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden rounded-lg border border-steel-blue/30">
                <table className="min-w-full divide-y divide-steel-blue/30">
                  <thead className="bg-navy-dark/50">
                    <tr>
                      <th className="sticky left-0 z-10 bg-navy-dark px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider min-w-[200px]">
                        Ingrediente
                      </th>
                      {visibleProducts.map(product => (
                        <th 
                          key={product}
                          className="px-3 py-3 text-center text-xs font-medium text-slate-400 uppercase tracking-wider min-w-[120px]"
                        >
                          <div className={expandedView ? "" : "max-w-[120px]"}>
                            <div className="font-semibold text-white">{product}</div>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-navy-charcoal/50 divide-y divide-steel-blue/20">
                    {filteredIngredients.map((item, idx) => (
                      <tr 
                        key={idx} 
                        className={`hover:bg-navy-dark/50 transition-colors ${
                          item.category === "Info" ? "bg-steel-blue/10" : ""
                        }`}
                      >
                        <td className="sticky left-0 z-10 bg-navy-charcoal px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div>
                              <div className="text-sm font-medium text-white">{item.ingredient}</div>
                              {item.category !== "Info" && (
                                <div className="text-xs text-slate-500 mt-0.5">{item.category}</div>
                              )}
                            </div>
                          </div>
                        </td>
                        {visibleProducts.map(product => (
                          <td key={product} className="px-3 py-3 text-center">
                            {item.data[product] ? (
                              item.category === "Info" ? (
                                <div className="text-xs text-slate-300 max-w-[150px] mx-auto">
                                  {item.data[product]}
                                </div>
                              ) : item.data[product] === "✓" ? (
                                <CheckCircle className="h-4 w-4 text-performance-green mx-auto" />
                              ) : (
                                <span className="text-xs font-medium text-scientific-blue">
                                  {item.data[product]}
                                </span>
                              )
                            ) : (
                              <span className="text-slate-600">-</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {filteredIngredients.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-400 text-lg mb-4">Nessun ingrediente trovato</p>
              <p className="text-slate-500">Prova a modificare i criteri di ricerca</p>
            </div>
          )}
        </div>
      </section>

      {/* Legend */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-steel-blue/10">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-navy-dark/50 border-steel-blue/30 p-6">
            <h3 className="text-lg font-semibold mb-4">Legenda</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-performance-green" />
                <span className="text-slate-300">Presente (quantità non specificata)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-scientific-blue font-medium">XXmg</span>
                <span className="text-slate-300">Quantità specifica</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-600">-</span>
                <span className="text-slate-300">Non presente</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-steel-blue/10 rounded"></div>
                <span className="text-slate-300">Riga informativa</span>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
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