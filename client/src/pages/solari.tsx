import { useState, useMemo } from "react";
import { Search, Filter, Shield, Sun, Droplets, Zap, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Navigation from "@/components/navigation";

interface SunscreenFilter {
  tradeName: string;
  inciName: string;
  uvRange: string;
  peakWavelength: string;
  solubility: string;
  photostability: string;
  regulatoryStatus: string;
  extraPoints: string[];
  uvbProtection: "strong" | "good" | "moderate" | "incomplete";
  uva2Protection: "strong" | "good" | "moderate" | "incomplete";
  uva1Protection: "strong" | "good" | "moderate" | "incomplete";
  longUva1Protection: "strong" | "good" | "moderate" | "incomplete";
}

interface SunscreenProduct {
  brand: string;
  productName: string;
  spf: number;
  filters: string[];
  uva1Rating: "excellent" | "good" | "moderate" | "poor";
  uva2Rating: "excellent" | "good" | "moderate" | "poor";
  uvbRating: "excellent" | "good" | "moderate" | "poor";
  overallRating: number; // out of 5
  description: string;
  price?: string;
  availability: string;
}

const sunscreenFilters: SunscreenFilter[] = [
  {
    tradeName: "Tinosorb® S",
    inciName: "Bis-ethylhexyloxyphenol Methoxyphenyl Triazine",
    uvRange: "290-≈370 nm",
    peakWavelength: "≈ 342 nm",
    solubility: "Oil-soluble → drops into the oily phase of a cream, helps keep textures elegant and water-resistant",
    photostability: "Ultra-photostable; even stabilises photo-fragile filters like avobenzone",
    regulatoryStatus: "EU/AUS/KR ≤ 10%; not yet allowed in the US OTC monograph",
    extraPoints: ["Strong SPF-boost", "Low skin penetration", "Reef-safe"],
    uvbProtection: "strong",
    uva2Protection: "strong",
    uva1Protection: "good",
    longUva1Protection: "moderate"
  },
  {
    tradeName: "Tinosorb® M",
    inciName: "Methylene Bis-Benzotriazolyl Tetramethylbutylphenol",
    uvRange: "280-400 nm plus some visible blue light",
    peakWavelength: "Broad spectrum",
    solubility: "Water-dispersible micro-fine particles – acts like a hybrid chemical/physical filter; boosts other filters via scattering",
    photostability: "Photostable; also increases photostability of the whole filter deck",
    regulatoryStatus: "EU/AUS/KR ≤ 10%; not US-approved",
    extraPoints: ["Gives very high UVA-PF", "Transparent on skin", "Particulate scattering"],
    uvbProtection: "strong",
    uva2Protection: "strong",
    uva1Protection: "strong",
    longUva1Protection: "good"
  },
  {
    tradeName: "Mexoryl® XL",
    inciName: "Drometrizole trisiloxane",
    uvRange: "UVB + UVA (~303 & 344 nm)",
    peakWavelength: "303 nm (UVB) & 344 nm (UVA)",
    solubility: "Oil-soluble; pairs perfectly with SX, fits into water-resistant formulations",
    photostability: "Very high photostability; synergises with SX to lift both UVA-PF and SPF",
    regulatoryStatus: "EU/CA/most of world ≤ 5%; not cleared by FDA",
    extraPoints: ["Broad-spectrum UVA/UVB", "Exclusively licensed to the L'Oréal group", "Synergistic with Mexoryl SX"],
    uvbProtection: "strong",
    uva2Protection: "strong",
    uva1Protection: "good",
    longUva1Protection: "moderate"
  },
  {
    tradeName: "Mexoryl® SX",
    inciName: "Ecamsule (Terephthalylidene dicamphor sulfonic acid)",
    uvRange: "UVA (max ~343–350 nm)",
    peakWavelength: "343–350 nm",
    solubility: "Water-soluble; creates elegant textures in aqueous formulations",
    photostability: "High photostability; maintains effectiveness under UV exposure",
    regulatoryStatus: "EU/CA/most of world approved; FDA approved (limited use)",
    extraPoints: ["UVA protection specialist", "Exclusively licensed to the L'Oréal group", "Synergistic with Mexoryl XL"],
    uvbProtection: "moderate",
    uva2Protection: "strong",
    uva1Protection: "strong",
    longUva1Protection: "good"
  },
  {
    tradeName: "Mexoryl® 400",
    inciName: "Methoxypropylamino cyclohexenylidene ethoxyethylcyanoacetate (MCE)",
    uvRange: "Long-wave UVA1 (~370–400 nm)",
    peakWavelength: "370–400 nm",
    solubility: "Oil-soluble; specialized for long-wave UVA1 protection",
    photostability: "Very high photostability; extends protection to deeper skin layers",
    regulatoryStatus: "EU approved; Latest L'Oréal innovation for extended UVA1 coverage",
    extraPoints: ["Extends UVA1 protection to deeper skin layers", "Latest generation filter", "Exclusively licensed to the L'Oréal group"],
    uvbProtection: "incomplete",
    uva2Protection: "moderate",
    uva1Protection: "strong",
    longUva1Protection: "strong"
  }
];

const protectionLevels = {
  strong: { icon: "✅✅", color: "bg-green-500", label: "Strong" },
  good: { icon: "✅", color: "bg-blue-500", label: "Good" },
  moderate: { icon: "⚠️", color: "bg-yellow-500", label: "Moderate" },
  incomplete: { icon: "❌", color: "bg-red-500", label: "Incomplete" }
};

const productRatings = {
  excellent: { icon: "✅✅✅", color: "text-green-400", label: "Excellent" },
  good: { icon: "✅✅", color: "text-blue-400", label: "Good" },
  moderate: { icon: "✅", color: "text-yellow-400", label: "Moderate" },
  poor: { icon: "❌", color: "text-red-400", label: "Poor" }
};

const sunscreenProducts: SunscreenProduct[] = [
  {
    brand: "La Roche-Posay",
    productName: "Anthelios Shaka SPF 30",
    spf: 30,
    filters: ["Mexoryl SX", "Mexoryl XL", "Tinosorb S"],
    uva1Rating: "excellent",
    uva2Rating: "excellent", 
    uvbRating: "excellent",
    overallRating: 5.0,
    description: "Mexoryl SX + XL + Tinosorb S",
    availability: "EU, disponibile in Italia"
  },
  {
    brand: "Vichy",
    productName: "Acqua Solare SPF 30",
    spf: 30,
    filters: ["Mexoryl SX", "Tinosorb S"],
    uva1Rating: "good",
    uva2Rating: "excellent",
    uvbRating: "excellent", 
    overallRating: 4.5,
    description: "Mexoryl SX + Tinosorb S",
    availability: "EU, disponibile in Italia"
  },
  {
    brand: "ISDIN",
    productName: "Fotoprotetor Fusion Water SPF 50",
    spf: 50,
    filters: ["Tinosorb S", "Uvinul A Plus", "Octisalate"],
    uva1Rating: "excellent",
    uva2Rating: "excellent",
    uvbRating: "excellent",
    overallRating: 4.8,
    description: "Tinosorb S + Uvinul A Plus + Octisalate",
    availability: "EU, Spagna principalmente"
  },
  {
    brand: "Eucerin",
    productName: "Sun Sensitive Protect SPF 30",
    spf: 30,
    filters: ["Tinosorb S", "Tinosorb M", "Octisalate"],
    uva1Rating: "excellent",
    uva2Rating: "excellent",
    uvbRating: "good",
    overallRating: 4.3,
    description: "Tinosorb S + M + Octisalate",
    availability: "EU, disponibile in Italia"
  },
  {
    brand: "Avène",
    productName: "Fluide Mineral Teinté SPF 50+",
    spf: 50,
    filters: ["Zinc Oxide", "Titanium Dioxide"],
    uva1Rating: "good",
    uva2Rating: "excellent",
    uvbRating: "excellent",
    overallRating: 4.0,
    description: "Zinc Oxide + Titanium Dioxide (Mineral)",
    availability: "EU, disponibile in Italia"
  },
  {
    brand: "Heliocare",
    productName: "Advanced Gel SPF 50",
    spf: 50,
    filters: ["Tinosorb S", "Uvinul A Plus", "Uvinul T150"],
    uva1Rating: "excellent",
    uva2Rating: "excellent", 
    uvbRating: "excellent",
    overallRating: 4.7,
    description: "Tinosorb S + Uvinul A Plus + T150",
    availability: "EU, Spagna principalmente"
  }
];

export default function SolariPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [solubilityFilters, setSolubilityFilters] = useState<string[]>([]);
  const [regulatoryFilters, setRegulatoryFilters] = useState<string[]>([]);
  const [uvRangeFilters, setUvRangeFilters] = useState<string[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<SunscreenFilter | null>(null);
  const [activeTab, setActiveTab] = useState<"filters" | "products">("products");

  const filteredFilters = useMemo(() => {
    return sunscreenFilters.filter(filter => {
      const matchesSearch = 
        filter.tradeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        filter.inciName.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSolubility = 
        solubilityFilters.length === 0 ||
        solubilityFilters.some(solFilter => {
          if (solFilter === "oil") return filter.solubility.toLowerCase().includes("oil");
          if (solFilter === "water") return filter.solubility.toLowerCase().includes("water");
          return false;
        });

      const matchesRegulatory = 
        regulatoryFilters.length === 0 ||
        regulatoryFilters.some(regFilter => {
          if (regFilter === "eu") return filter.regulatoryStatus.toLowerCase().includes("eu");
          if (regFilter === "us") return !filter.regulatoryStatus.toLowerCase().includes("not") && filter.regulatoryStatus.toLowerCase().includes("fda");
          return false;
        });

      const matchesUvRange = 
        uvRangeFilters.length === 0 ||
        uvRangeFilters.some(uvFilter => {
          if (uvFilter === "uvb") return filter.uvbProtection === "strong";
          if (uvFilter === "uva1") return filter.uva1Protection === "strong";
          if (uvFilter === "uva2") return filter.uva2Protection === "strong";
          if (uvFilter === "broad") return filter.uvRange.includes("280") && filter.uvRange.includes("400");
          return false;
        });

      return matchesSearch && matchesSolubility && matchesRegulatory && matchesUvRange;
    });
  }, [searchTerm, solubilityFilters, regulatoryFilters, uvRangeFilters]);

  return (
    <div className="min-h-screen bg-navy-charcoal text-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-scientific-blue/30 rounded-sm mb-6">
            <Sun className="text-performance-green mr-2 h-4 w-4" />
            <span className="text-sm font-medium">Comparatore Filtri Solari</span>
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-black leading-tight mb-6">
            Database <span className="text-scientific-blue">Filtri Solari</span>
          </h1>
          
          <p className="text-xl text-slate-300 mb-8 leading-relaxed max-w-3xl mx-auto">
            Trova e confronta i filtri solari più avanzati per nome chimico, spettro UV, 
            solubilità e approvazioni regolatorie.
          </p>
          
          <div className="flex justify-center mb-12">
            <div className="bg-navy-charcoal rounded-lg border border-steel-blue/30 p-1">
              <div className="flex">
                <Button
                  variant={activeTab === "products" ? "default" : "ghost"}
                  onClick={() => setActiveTab("products")}
                  className={`px-6 py-2 ${activeTab === "products" ? "bg-scientific-blue text-white" : "text-slate-300 hover:text-white"}`}
                >
                  Prodotti Solari
                </Button>
                <Button
                  variant={activeTab === "filters" ? "default" : "ghost"}
                  onClick={() => setActiveTab("filters")}
                  className={`px-6 py-2 ${activeTab === "filters" ? "bg-scientific-blue text-white" : "text-slate-300 hover:text-white"}`}
                >
                  Database Filtri
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Comparison Table */}
      {activeTab === "products" && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Confronto <span className="text-scientific-blue">Prodotti Solari</span>
              </h2>
              <p className="text-lg text-slate-300">
                Confronta le performance di protezione UV dei migliori prodotti disponibili
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full bg-navy-charcoal rounded-lg border border-steel-blue/30">
                <thead>
                  <tr className="border-b border-steel-blue/30">
                    <th className="text-left p-4 font-semibold text-scientific-blue">Prodotto</th>
                    <th className="text-center p-4 font-semibold text-scientific-blue">UVA1 (340–400 nm)</th>
                    <th className="text-center p-4 font-semibold text-scientific-blue">UVA2 (320–340 nm)</th>
                    <th className="text-center p-4 font-semibold text-scientific-blue">UVB (280–320 nm)</th>
                    <th className="text-center p-4 font-semibold text-scientific-blue">Copertura Totale</th>
                  </tr>
                </thead>
                <tbody>
                  {sunscreenProducts.map((product, index) => (
                    <tr key={index} className="border-b border-steel-blue/20 hover:bg-steel-blue/10 transition-colors">
                      <td className="p-4">
                        <div>
                          <div className="font-semibold text-white text-lg">{product.brand}</div>
                          <div className="text-slate-300">{product.productName}</div>
                          <div className="text-sm text-slate-400 mt-1">
                            SPF {product.spf} • {product.description}
                          </div>
                          <div className="text-xs text-slate-500 mt-1">
                            {product.availability}
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className={`font-semibold ${productRatings[product.uva1Rating].color}`}>
                          {productRatings[product.uva1Rating].icon}
                        </div>
                        <div className="text-sm text-slate-400 mt-1">
                          {productRatings[product.uva1Rating].label}
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className={`font-semibold ${productRatings[product.uva2Rating].color}`}>
                          {productRatings[product.uva2Rating].icon}
                        </div>
                        <div className="text-sm text-slate-400 mt-1">
                          {productRatings[product.uva2Rating].label}
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className={`font-semibold ${productRatings[product.uvbRating].color}`}>
                          {productRatings[product.uvbRating].icon}
                        </div>
                        <div className="text-sm text-slate-400 mt-1">
                          {productRatings[product.uvbRating].label}
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex justify-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`text-lg ${
                                i < Math.floor(product.overallRating)
                                  ? "text-yellow-400"
                                  : i === Math.floor(product.overallRating) && product.overallRating % 1 >= 0.5
                                  ? "text-yellow-400"
                                  : "text-slate-600"
                              }`}
                            >
                              {i === Math.floor(product.overallRating) && product.overallRating % 1 >= 0.5 ? "½" : "⭐"}
                            </span>
                          ))}
                        </div>
                        <div className="text-sm text-slate-400">
                          {product.overallRating}/5.0
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 bg-steel-blue/20 rounded-lg p-6 border border-steel-blue/30">
              <h3 className="text-xl font-semibold mb-4 text-scientific-blue">Legenda</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="flex items-center mb-2">
                    <span className="text-green-400 mr-2">✅✅✅</span>
                    <span className="text-slate-300">Excellent - Protezione ottimale</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <span className="text-blue-400 mr-2">✅✅</span>
                    <span className="text-slate-300">Good - Protezione buona</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center mb-2">
                    <span className="text-yellow-400 mr-2">✅</span>
                    <span className="text-slate-300">Moderate - Protezione moderata</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-red-400 mr-2">❌</span>
                    <span className="text-slate-300">Poor - Protezione insufficiente</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Filters Section */}
      {activeTab === "filters" && (
        <section className="py-8 px-4 sm:px-6 lg:px-8 bg-steel-blue/10">
          <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Cerca per nome commerciale o INCI..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-navy-charcoal border-steel-blue/30 text-white"
              />
            </div>
            
            {/* Solubility Filters */}
            <div className="bg-navy-charcoal border border-steel-blue/30 rounded-lg p-4">
              <h4 className="font-semibold mb-3 text-scientific-blue">Solubilità</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="oil"
                    checked={solubilityFilters.includes("oil")}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSolubilityFilters([...solubilityFilters, "oil"]);
                      } else {
                        setSolubilityFilters(solubilityFilters.filter(f => f !== "oil"));
                      }
                    }}
                  />
                  <Label htmlFor="oil" className="text-slate-300 cursor-pointer">Liposolubile</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="water"
                    checked={solubilityFilters.includes("water")}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSolubilityFilters([...solubilityFilters, "water"]);
                      } else {
                        setSolubilityFilters(solubilityFilters.filter(f => f !== "water"));
                      }
                    }}
                  />
                  <Label htmlFor="water" className="text-slate-300 cursor-pointer">Idrosolubile</Label>
                </div>
              </div>
            </div>
            
            {/* Regulatory Filters */}
            <div className="bg-navy-charcoal border border-steel-blue/30 rounded-lg p-4">
              <h4 className="font-semibold mb-3 text-scientific-blue">Approvazioni</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="eu"
                    checked={regulatoryFilters.includes("eu")}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setRegulatoryFilters([...regulatoryFilters, "eu"]);
                      } else {
                        setRegulatoryFilters(regulatoryFilters.filter(f => f !== "eu"));
                      }
                    }}
                  />
                  <Label htmlFor="eu" className="text-slate-300 cursor-pointer">Approvato EU</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="us"
                    checked={regulatoryFilters.includes("us")}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setRegulatoryFilters([...regulatoryFilters, "us"]);
                      } else {
                        setRegulatoryFilters(regulatoryFilters.filter(f => f !== "us"));
                      }
                    }}
                  />
                  <Label htmlFor="us" className="text-slate-300 cursor-pointer">Approvato US</Label>
                </div>
              </div>
            </div>
            
            {/* UV Range Filters */}
            <div className="bg-navy-charcoal border border-steel-blue/30 rounded-lg p-4">
              <h4 className="font-semibold mb-3 text-scientific-blue">Spettro UV</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="uvb"
                    checked={uvRangeFilters.includes("uvb")}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setUvRangeFilters([...uvRangeFilters, "uvb"]);
                      } else {
                        setUvRangeFilters(uvRangeFilters.filter(f => f !== "uvb"));
                      }
                    }}
                  />
                  <Label htmlFor="uvb" className="text-slate-300 cursor-pointer">UVB Forte</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="uva1"
                    checked={uvRangeFilters.includes("uva1")}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setUvRangeFilters([...uvRangeFilters, "uva1"]);
                      } else {
                        setUvRangeFilters(uvRangeFilters.filter(f => f !== "uva1"));
                      }
                    }}
                  />
                  <Label htmlFor="uva1" className="text-slate-300 cursor-pointer">UVA1 Forte</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="uva2"
                    checked={uvRangeFilters.includes("uva2")}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setUvRangeFilters([...uvRangeFilters, "uva2"]);
                      } else {
                        setUvRangeFilters(uvRangeFilters.filter(f => f !== "uva2"));
                      }
                    }}
                  />
                  <Label htmlFor="uva2" className="text-slate-300 cursor-pointer">UVA2 Forte</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="broad"
                    checked={uvRangeFilters.includes("broad")}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setUvRangeFilters([...uvRangeFilters, "broad"]);
                      } else {
                        setUvRangeFilters(uvRangeFilters.filter(f => f !== "broad"));
                      }
                    }}
                  />
                  <Label htmlFor="broad" className="text-slate-300 cursor-pointer">Spettro Ampio</Label>
                </div>
              </div>
            </div>
          </div>
          
          {/* Clear Filters Button */}
          {(solubilityFilters.length > 0 || regulatoryFilters.length > 0 || uvRangeFilters.length > 0 || searchTerm) && (
            <div className="flex justify-center mb-4">
              <Button
                variant="outline"
                onClick={() => {
                  setSolubilityFilters([]);
                  setRegulatoryFilters([]);
                  setUvRangeFilters([]);
                  setSearchTerm("");
                }}
                className="border-steel-blue/30 text-slate-300 hover:border-red-500 hover:text-red-500"
              >
                <Filter className="w-4 h-4 mr-2" />
                Cancella Tutti i Filtri
              </Button>
            </div>
          )}
          </div>
        </section>
      )}

      {/* Detailed View Modal/Panel */}
      {selectedFilter && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-navy-charcoal border border-steel-blue/30 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-scientific-blue mb-2">
                    {selectedFilter.tradeName}
                  </h2>
                  <p className="text-slate-300">{selectedFilter.inciName}</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSelectedFilter(null)}
                  className="border-slate-600 text-slate-400 hover:border-red-500 hover:text-red-500"
                >
                  Chiudi
                </Button>
              </div>

              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6 bg-steel-blue/20">
                  <TabsTrigger value="overview" className="data-[state=active]:bg-scientific-blue">Panoramica</TabsTrigger>
                  <TabsTrigger value="technical" className="data-[state=active]:bg-scientific-blue">Dettagli Tecnici</TabsTrigger>
                  <TabsTrigger value="regulatory" className="data-[state=active]:bg-scientific-blue">Regolamentazione</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="bg-steel-blue/20 border-steel-blue/30">
                      <CardHeader>
                        <CardTitle className="flex items-center text-scientific-blue">
                          <Shield className="mr-2 h-5 w-5" />
                          Spettro di Protezione
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span>Range UV:</span>
                          <Badge className="bg-performance-green text-black">{selectedFilter.uvRange}</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Picco di assorbimento:</span>
                          <span className="text-scientific-blue font-semibold">{selectedFilter.peakWavelength}</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-steel-blue/20 border-steel-blue/30">
                      <CardHeader>
                        <CardTitle className="flex items-center text-scientific-blue">
                          <Droplets className="mr-2 h-5 w-5" />
                          Proprietà Fisiche
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-300">{selectedFilter.solubility}</p>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="bg-steel-blue/20 border-steel-blue/30">
                    <CardHeader>
                      <CardTitle className="flex items-center text-scientific-blue">
                        <Zap className="mr-2 h-5 w-5" />
                        Fotostabilità
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-300">{selectedFilter.photostability}</p>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="technical" className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-steel-blue/20 rounded-lg">
                      <div className="text-sm text-slate-400 mb-2">UVB Protection</div>
                      <div className={`inline-flex items-center px-3 py-1 rounded font-semibold ${protectionLevels[selectedFilter.uvbProtection].color} text-white`}>
                        {protectionLevels[selectedFilter.uvbProtection].icon} {protectionLevels[selectedFilter.uvbProtection].label}
                      </div>
                    </div>
                    <div className="text-center p-4 bg-steel-blue/20 rounded-lg">
                      <div className="text-sm text-slate-400 mb-2">UVA2 Protection</div>
                      <div className={`inline-flex items-center px-3 py-1 rounded font-semibold ${protectionLevels[selectedFilter.uva2Protection].color} text-white`}>
                        {protectionLevels[selectedFilter.uva2Protection].icon} {protectionLevels[selectedFilter.uva2Protection].label}
                      </div>
                    </div>
                    <div className="text-center p-4 bg-steel-blue/20 rounded-lg">
                      <div className="text-sm text-slate-400 mb-2">UVA1 Protection</div>
                      <div className={`inline-flex items-center px-3 py-1 rounded font-semibold ${protectionLevels[selectedFilter.uva1Protection].color} text-white`}>
                        {protectionLevels[selectedFilter.uva1Protection].icon} {protectionLevels[selectedFilter.uva1Protection].label}
                      </div>
                    </div>
                    <div className="text-center p-4 bg-steel-blue/20 rounded-lg">
                      <div className="text-sm text-slate-400 mb-2">Long UVA1</div>
                      <div className={`inline-flex items-center px-3 py-1 rounded font-semibold ${protectionLevels[selectedFilter.longUva1Protection].color} text-white`}>
                        {protectionLevels[selectedFilter.longUva1Protection].icon} {protectionLevels[selectedFilter.longUva1Protection].label}
                      </div>
                    </div>
                  </div>

                  <Card className="bg-steel-blue/20 border-steel-blue/30">
                    <CardHeader>
                      <CardTitle className="text-scientific-blue">Vantaggi Aggiuntivi</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-2">
                        {selectedFilter.extraPoints.map((point, idx) => (
                          <div key={idx} className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-2 text-performance-green" />
                            <span className="text-slate-300">{point}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="regulatory" className="space-y-6">
                  <Card className="bg-steel-blue/20 border-steel-blue/30">
                    <CardHeader>
                      <CardTitle className="text-scientific-blue">Status Regolamentare</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-300 text-lg">{selectedFilter.regulatoryStatus}</p>
                    </CardContent>
                  </Card>

                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                    <h4 className="text-yellow-500 font-semibold mb-2">Nota Importante</h4>
                    <p className="text-slate-300 text-sm">
                      Verifica sempre le approvazioni locali prima dell'uso. Le regolamentazioni 
                      possono variare tra paesi e aggiornarsi nel tempo.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}