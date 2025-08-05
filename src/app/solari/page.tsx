'use client';

import { useState, useMemo } from "react";
import { Search, Shield, Sun } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Navigation from "@/components/navigation";
import { api } from "@/lib/trpc/client";

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

// Keep the original filter data for educational purposes
const sunscreenFilters: SunscreenFilter[] = [
  {
    tradeName: "Tinosorb S",
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
    tradeName: "Tinosorb M",
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
    tradeName: "Mexoryl XL",
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
    tradeName: "Mexoryl SX",
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
    tradeName: "Mexoryl 400",
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
  },
  {
    tradeName: "Homosalate",
    inciName: "Homosalate",
    uvRange: "UVB (280-315 nm)",
    peakWavelength: "306 nm",
    solubility: "Oil-soluble; commonly used in water-resistant formulations",
    photostability: "Moderate photostability; often paired with photostabilizers",
    regulatoryStatus: "FDA approved ≤ 15%; EU approved ≤ 10%",
    extraPoints: ["UVB protection specialist", "Water-resistant formulations", "High absorption coefficient"],
    uvbProtection: "strong",
    uva2Protection: "incomplete",
    uva1Protection: "incomplete",
    longUva1Protection: "incomplete"
  },
  {
    tradeName: "Octocrylene",
    inciName: "Octocrylene",
    uvRange: "UVB (280-320 nm)",
    peakWavelength: "303 nm",
    solubility: "Oil-soluble; acts as photostabilizer for other filters",
    photostability: "Highly photostable; stabilizes Avobenzone and other filters",
    regulatoryStatus: "FDA approved ≤ 10%; EU approved ≤ 10%",
    extraPoints: ["UVB protection + stabilizer", "Stabilizes Avobenzone", "Emollient properties"],
    uvbProtection: "strong",
    uva2Protection: "moderate",
    uva1Protection: "incomplete",
    longUva1Protection: "incomplete"
  },
  {
    tradeName: "Ethylhexyl Salicylate (Octisalate)",
    inciName: "Ethylhexyl Salicylate",
    uvRange: "UVB (280-320 nm)",
    peakWavelength: "307 nm",
    solubility: "Oil-soluble; excellent spreading properties",
    photostability: "Good photostability; commonly used in high SPF formulations",
    regulatoryStatus: "FDA approved ≤ 5%; EU approved ≤ 5%",
    extraPoints: ["UVB protection", "Excellent skin feel", "Emollient properties"],
    uvbProtection: "strong",
    uva2Protection: "incomplete",
    uva1Protection: "incomplete",
    longUva1Protection: "incomplete"
  },
  {
    tradeName: "Enulizole (PBSA)",
    inciName: "Phenylbenzimidazole Sulfonic Acid",
    uvRange: "UVB (280-320 nm)",
    peakWavelength: "296 nm",
    solubility: "Water-soluble; creates lightweight, non-greasy textures",
    photostability: "Good photostability; water-soluble UVB filter",
    regulatoryStatus: "EU approved ≤ 8%; not FDA approved",
    extraPoints: ["UVB protection", "Water-soluble", "Lightweight textures"],
    uvbProtection: "strong",
    uva2Protection: "incomplete",
    uva1Protection: "incomplete",
    longUva1Protection: "incomplete"
  },
  {
    tradeName: "Avobenzone",
    inciName: "Butyl Methoxydibenzoylmethane",
    uvRange: "UVA (320-400 nm)",
    peakWavelength: "357 nm",
    solubility: "Oil-soluble; requires photostabilizers (Octocrylene, Tinosorb)",
    photostability: "Poor without stabilizers; excellent when stabilized",
    regulatoryStatus: "FDA approved ≤ 3%; EU approved ≤ 5%",
    extraPoints: ["UVA protection specialist", "Needs stabilizers", "Gold standard UVA filter"],
    uvbProtection: "incomplete",
    uva2Protection: "strong",
    uva1Protection: "strong",
    longUva1Protection: "moderate"
  },
  {
    tradeName: "Uvinul T150",
    inciName: "Ethylhexyl Triazone",
    uvRange: "UVB + UVA2 (280-340 nm)",
    peakWavelength: "314 nm",
    solubility: "Oil-soluble; highly photostable broad-spectrum filter",
    photostability: "Excellent photostability; maintains effectiveness under UV",
    regulatoryStatus: "EU approved ≤ 5%; not FDA approved",
    extraPoints: ["Broad UVB/UVA protection", "Highly photostable", "BASF patented technology"],
    uvbProtection: "strong",
    uva2Protection: "strong",
    uva1Protection: "moderate",
    longUva1Protection: "incomplete"
  },
  {
    tradeName: "Octinoxate",
    inciName: "Ethylhexyl Methoxycinnamate",
    uvRange: "UVB (280–320 nm) + limited UVA2",
    peakWavelength: "~310 nm",
    solubility: "Oil-soluble; widely used in cosmetic formulations",
    photostability: "Moderate to poor; can degrade under UV exposure",
    regulatoryStatus: "EU approved with restrictions; concerns in some regions",
    extraPoints: [
      "Storico filtro UVB ampiamente utilizzato",
      "Richiede stabilizzazione con altri filtri",
      "Limitazioni crescenti per sicurezza ambientale",
      "Buona compatibilità cosmetica",
      "Protezione UVA2 moderata"
    ],
    uvbProtection: "good",
    uva2Protection: "moderate", 
    uva1Protection: "incomplete",
    longUva1Protection: "incomplete"
  }
];

const protectionLevels = {
  strong: { icon: "✅✅", color: "text-green-400", label: "Strong" },
  good: { icon: "✅", color: "text-blue-400", label: "Good" },
  moderate: { icon: "⚠️", color: "text-yellow-400", label: "Moderate" },
  incomplete: { icon: "❌", color: "text-red-400", label: "Incomplete" }
};

// const productRatings = {
//   excellent: { icon: "✅✅✅", color: "text-green-400", label: "Excellent" },
//   good: { icon: "✅✅", color: "text-blue-400", label: "Good" },
//   moderate: { icon: "✅", color: "text-yellow-400", label: "Moderate" },
//   poor: { icon: "❌", color: "text-red-400", label: "Poor" }
// };

// Skin Type Burn Times Data - Complete UV Index Coverage
const skinTypeData = [
  {
    type: 'Type I',
    description: 'Very Pale',
    burnTimes: { 
      // No SPF times for each UV index
      uv6: 9, uv7: 8, uv8: 7, uv9: 6, uv10: 5,
      // SPF 20 times for each UV index
      uv6_spf20: 180, uv7_spf20: 154, uv8_spf20: 135, uv9_spf20: 120, uv10_spf20: 100,
      // SPF 30 times for each UV index
      uv6_spf30: 270, uv7_spf30: 231, uv8_spf30: 202, uv9_spf30: 180, uv10_spf30: 150,
      // SPF 50 times for each UV index
      uv6_spf50: 450, uv7_spf50: 386, uv8_spf50: 338, uv9_spf50: 300, uv10_spf50: 250
    }
  },
  {
    type: 'Type II',
    description: 'Pale',
    burnTimes: { 
      // No SPF times for each UV index
      uv6: 12, uv7: 10, uv8: 9, uv9: 8, uv10: 7,
      // SPF 20 times for each UV index
      uv6_spf20: 240, uv7_spf20: 206, uv8_spf20: 180, uv9_spf20: 160, uv10_spf20: 140,
      // SPF 30 times for each UV index
      uv6_spf30: 360, uv7_spf30: 309, uv8_spf30: 270, uv9_spf30: 240, uv10_spf30: 210,
      // SPF 50 times for each UV index
      uv6_spf50: 600, uv7_spf50: 514, uv8_spf50: 450, uv9_spf50: 400, uv10_spf50: 350
    }
  },
  {
    type: 'Type III',
    description: 'Light Olive',
    burnTimes: { 
      // No SPF times for each UV index
      uv6: 15, uv7: 13, uv8: 11, uv9: 10, uv10: 9,
      // SPF 20 times for each UV index
      uv6_spf20: 300, uv7_spf20: 257, uv8_spf20: 225, uv9_spf20: 200, uv10_spf20: 180,
      // SPF 30 times for each UV index
      uv6_spf30: 450, uv7_spf30: 386, uv8_spf30: 338, uv9_spf30: 300, uv10_spf30: 270,
      // SPF 50 times for each UV index
      uv6_spf50: 750, uv7_spf50: 643, uv8_spf50: 562, uv9_spf50: 500, uv10_spf50: 450
    }
  },
  {
    type: 'Type IV',
    description: 'Mediterranean',
    burnTimes: { 
      // No SPF times for each UV index
      uv6: 20, uv7: 17, uv8: 15, uv9: 13, uv10: 12,
      // SPF 20 times for each UV index
      uv6_spf20: 390, uv7_spf20: 334, uv8_spf20: 292, uv9_spf20: 260, uv10_spf20: 240,
      // SPF 30 times for each UV index
      uv6_spf30: 585, uv7_spf30: 501, uv8_spf30: 439, uv9_spf30: 390, uv10_spf30: 360,
      // SPF 50 times for each UV index
      uv6_spf50: 975, uv7_spf50: 836, uv8_spf50: 731, uv9_spf50: 650, uv10_spf50: 600
    }
  },
  {
    type: 'Type V',
    description: 'Brown',
    burnTimes: { 
      // No SPF times for each UV index
      uv6: 27, uv7: 23, uv8: 20, uv9: 18, uv10: 15,
      // SPF 20 times for each UV index
      uv6_spf20: 540, uv7_spf20: 463, uv8_spf20: 405, uv9_spf20: 360, uv10_spf20: 300,
      // SPF 30 times for each UV index
      uv6_spf30: 810, uv7_spf30: 694, uv8_spf30: 608, uv9_spf30: 540, uv10_spf30: 450,
      // SPF 50 times for each UV index
      uv6_spf50: 1350, uv7_spf50: 1157, uv8_spf50: 1012, uv9_spf50: 900, uv10_spf50: 750
    }
  },
  {
    type: 'Type VI',
    description: 'Dark Brown to Black',
    burnTimes: { 
      // No SPF times for each UV index
      uv6: 38, uv7: 32, uv8: 28, uv9: 25, uv10: 20,
      // SPF 20 times for each UV index
      uv6_spf20: 750, uv7_spf20: 643, uv8_spf20: 562, uv9_spf20: 500, uv10_spf20: 400,
      // SPF 30 times for each UV index
      uv6_spf30: 1125, uv7_spf30: 964, uv8_spf30: 844, uv9_spf30: 750, uv10_spf30: 600,
      // SPF 50 times for each UV index
      uv6_spf50: 1875, uv7_spf50: 1607, uv8_spf50: 1406, uv9_spf50: 1250, uv10_spf50: 1000
    }
  }
];

export default function SolariPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [solubilityFilters, setSolubilityFilters] = useState<string[]>([]);
  const [regulatoryFilters, setRegulatoryFilters] = useState<string[]>([]);
  const [uvRangeFilters, setUvRangeFilters] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"filters" | "products">("filters");
  const [sortBy, setSortBy] = useState<string>("tradeName");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  
  // Product filtering states
  const [productProtectionFilters, setProductProtectionFilters] = useState<string[]>([]);
  // const [productChemicalFilters, setProductChemicalFilters] = useState<string[]>([]);
  const [selectedSkinType, setSelectedSkinType] = useState<string>('Type III');
  
  // Fetch sunscreen products from the database using tRPC
  const { data: sunscreenProducts = [], isLoading: isLoadingProducts } = api.sunscreen.getAll.useQuery({
    searchTerm: searchTerm || undefined,
  });
  
  // Fetch available brands
  const { data: availableBrands = [] } = api.sunscreen.getBrands.useQuery();

  // Get unique SPF values from products data (sorted descending)
  const availableSpfValues = useMemo(() => {
    if (!sunscreenProducts.length) return [];
    const spfValues = [...new Set(sunscreenProducts.map(product => product.spf))];
    return spfValues.sort((a, b) => b - a);
  }, [sunscreenProducts]);

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortDirection("asc");
    }
  };

  const filteredFilters = useMemo(() => {
    const filtered = sunscreenFilters.filter(filter => {
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

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue = a[sortBy as keyof SunscreenFilter];
      let bValue = b[sortBy as keyof SunscreenFilter];
      
      // Special handling for protection level columns
      if (["uvbProtection", "uva2Protection", "uva1Protection", "longUva1Protection"].includes(sortBy)) {
        const protectionOrder = { "strong": 4, "good": 3, "moderate": 2, "incomplete": 1 };
        const aScore = protectionOrder[aValue as keyof typeof protectionOrder] || 0;
        const bScore = protectionOrder[bValue as keyof typeof protectionOrder] || 0;
        
        if (aScore !== bScore) {
          return sortDirection === "asc" ? aScore - bScore : bScore - aScore;
        }
        return 0;
      }
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [searchTerm, solubilityFilters, regulatoryFilters, uvRangeFilters, sortBy, sortDirection]);

  // Product filtering logic
  const filteredProducts = useMemo(() => {
    let products = sunscreenProducts;

    // Apply protection quality filters
    if (productProtectionFilters.length > 0) {
      products = products.filter(product => {
        return productProtectionFilters.some(filter => {
          if (filter === "uvb-excellent") return product.uvbRating === "excellent";
          if (filter === "uvb-good") return product.uvbRating === "good";
          if (filter === "uva1-excellent") return product.uva1Rating === "excellent";
          if (filter === "uva1-good") return product.uva1Rating === "good";
          if (filter === "uva2-excellent") return product.uva2Rating === "excellent";
          if (filter === "uva2-good") return product.uva2Rating === "good";
          // Handle dynamic SPF values
          if (filter.startsWith("spf-")) {
            const spfValue = parseInt(filter.replace("spf-", ""));
            return product.spf === spfValue;
          }
          return false;
        });
      });
    }

    return products;
  }, [sunscreenProducts, productProtectionFilters]);

  return (
    <div className="min-h-screen bg-navy-charcoal text-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-steel-blue/30 rounded-sm mb-6">
            <Shield className="text-performance-green mr-2 h-4 w-4" />
            <span className="text-sm font-medium">Database Protocollo Solari</span>
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-black leading-tight mb-6">
            <span className="text-scientific-blue">Solari</span> Pro
          </h1>
          
          <p className="text-xl text-slate-300 mb-12 leading-relaxed">
            Database scientifico completo di filtri UV e prodotti solari con analisi dettagliata della protezione.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "filters" | "products")}>
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="filters">Filtri UV</TabsTrigger>
              <TabsTrigger value="products">
                Prodotti {isLoadingProducts ? "(Caricamento...)" : `(${sunscreenProducts.length})`}
              </TabsTrigger>
            </TabsList>

            {/* Filters Tab */}
            <TabsContent value="filters">
              {/* Filter Controls */}
              <div className="mb-8 space-y-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    placeholder="Cerca filtri UV per nome..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-steel-blue/20 border-steel-blue/30"
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {/* Solubility Filter */}
                  <Card className="bg-steel-blue/10 border-steel-blue/30">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Solubilità</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {["oil", "water"].map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox
                            id={`solubility-${type}`}
                            checked={solubilityFilters.includes(type)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSolubilityFilters([...solubilityFilters, type]);
                              } else {
                                setSolubilityFilters(solubilityFilters.filter(f => f !== type));
                              }
                            }}
                          />
                          <Label htmlFor={`solubility-${type}`} className="capitalize">
                            {type === "oil" ? "Liposolubile" : "Idrosolubile"}
                          </Label>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Regulatory Filter */}
                  <Card className="bg-steel-blue/10 border-steel-blue/30">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Approvazione</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {[
                        { id: "eu", label: "Europa (EU)" },
                        { id: "us", label: "Stati Uniti (FDA)" }
                      ].map((reg) => (
                        <div key={reg.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`regulatory-${reg.id}`}
                            checked={regulatoryFilters.includes(reg.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setRegulatoryFilters([...regulatoryFilters, reg.id]);
                              } else {
                                setRegulatoryFilters(regulatoryFilters.filter(f => f !== reg.id));
                              }
                            }}
                          />
                          <Label htmlFor={`regulatory-${reg.id}`}>
                            {reg.label}
                          </Label>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* UV Range Filter */}
                  <Card className="bg-steel-blue/10 border-steel-blue/30">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Protezione UV</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {[
                        { id: "uvb", label: "UVB Forte" },
                        { id: "uva2", label: "UVA2 Forte" },
                        { id: "uva1", label: "UVA1 Forte" },
                        { id: "broad", label: "Ampio Spettro" }
                      ].map((uv) => (
                        <div key={uv.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`uv-${uv.id}`}
                            checked={uvRangeFilters.includes(uv.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setUvRangeFilters([...uvRangeFilters, uv.id]);
                              } else {
                                setUvRangeFilters(uvRangeFilters.filter(f => f !== uv.id));
                              }
                            }}
                          />
                          <Label htmlFor={`uv-${uv.id}`}>
                            {uv.label}
                          </Label>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Filters Table */}
              <Card className="bg-steel-blue/10 border-steel-blue/30">
                <CardHeader>
                  <CardTitle>Database Filtri UV ({filteredFilters.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-steel-blue/30">
                          <th 
                            className="text-left p-3 cursor-pointer hover:text-scientific-blue"
                            onClick={() => handleSort("tradeName")}
                          >
                            Nome Commerciale {sortBy === "tradeName" && (sortDirection === "asc" ? "↑" : "↓")}
                          </th>
                          <th className="text-left p-3">Nome INCI</th>
                          <th className="text-left p-3">Spettro UV</th>
                          <th 
                            className="text-left p-3 cursor-pointer hover:text-scientific-blue"
                            onClick={() => handleSort("uvbProtection")}
                          >
                            UVB {sortBy === "uvbProtection" && (sortDirection === "asc" ? "↑" : "↓")}
                          </th>
                          <th 
                            className="text-left p-3 cursor-pointer hover:text-scientific-blue"
                            onClick={() => handleSort("uva2Protection")}
                          >
                            UVA2 {sortBy === "uva2Protection" && (sortDirection === "asc" ? "↑" : "↓")}
                          </th>
                          <th 
                            className="text-left p-3 cursor-pointer hover:text-scientific-blue"
                            onClick={() => handleSort("uva1Protection")}
                          >
                            UVA1 {sortBy === "uva1Protection" && (sortDirection === "asc" ? "↑" : "↓")}
                          </th>
                          <th className="text-left p-3">Fotostabilità</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredFilters.map((filter, index) => (
                          <tr key={index} className="border-b border-steel-blue/20 hover:bg-steel-blue/5">
                            <td className="p-3 font-medium text-scientific-blue">{filter.tradeName}</td>
                            <td className="p-3 text-slate-300 text-xs">{filter.inciName}</td>
                            <td className="p-3 text-slate-300 text-xs">{filter.uvRange}</td>
                            <td className="p-3">
                              <span className={protectionLevels[filter.uvbProtection].color}>
                                {protectionLevels[filter.uvbProtection].icon}
                              </span>
                            </td>
                            <td className="p-3">
                              <span className={protectionLevels[filter.uva2Protection].color}>
                                {protectionLevels[filter.uva2Protection].icon}
                              </span>
                            </td>
                            <td className="p-3">
                              <span className={protectionLevels[filter.uva1Protection].color}>
                                {protectionLevels[filter.uva1Protection].icon}
                              </span>
                            </td>
                            <td className="p-3 text-slate-300 text-xs">{filter.photostability}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Products Tab */}
            <TabsContent value="products">
              {isLoadingProducts ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-scientific-blue mx-auto mb-4"></div>
                  <p className="text-slate-300">Caricamento prodotti dal database...</p>
                </div>
              ) : (
                <>
                  {/* Product Filter Controls */}
                  <div className="mb-8 space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Protection Quality Filters */}
                      <Card className="bg-steel-blue/10 border-steel-blue/30">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg">Qualità Protezione</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          {[
                            { id: "uvb-excellent", label: "UVB Eccellente" },
                            { id: "uva1-excellent", label: "UVA1 Eccellente" },
                            { id: "uva2-excellent", label: "UVA2 Eccellente" },
                            ...availableSpfValues.map(spf => ({ id: `spf-${spf}`, label: `SPF ${spf}` }))
                          ].map((filter) => (
                            <div key={filter.id} className="flex items-center space-x-2">
                              <Checkbox
                                id={`protection-${filter.id}`}
                                checked={productProtectionFilters.includes(filter.id)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setProductProtectionFilters([...productProtectionFilters, filter.id]);
                                  } else {
                                    setProductProtectionFilters(productProtectionFilters.filter(f => f !== filter.id));
                                  }
                                }}
                              />
                              <Label htmlFor={`protection-${filter.id}`}>
                                {filter.label}
                              </Label>
                            </div>
                          ))}
                        </CardContent>
                      </Card>

                      {/* Brand Filter */}
                      <Card className="bg-steel-blue/10 border-steel-blue/30">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg">Marchi Disponibili</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          {availableBrands.map((brand) => (
                            <Badge key={brand} variant="secondary" className="mr-2 mb-2">
                              {brand}
                            </Badge>
                          ))}
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Products Grid */}
                  <div className="text-center py-12">
                    <Sun className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-300">
                      Prodotti disponibili: {filteredProducts.length}
                      {filteredProducts.length > 0 && " (Visualizzazione completa in sviluppo)"}
                    </p>
                  </div>

                  {filteredProducts.length === 0 && !isLoadingProducts && (
                    <div className="text-center py-12">
                      <Sun className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                      <p className="text-slate-300">Nessun prodotto trovato con i filtri selezionati.</p>
                    </div>
                  )}
                </>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Skin Type Calculator Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-steel-blue/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center">
            Calcolatore <span className="text-scientific-blue">Tempi di Bruciatura</span>
          </h2>
          
          <Card className="bg-navy-charcoal border-steel-blue/30">
            <CardHeader>
              <CardTitle className="text-center">Seleziona il tuo Fototipo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {skinTypeData.map((skinType) => (
                  <button
                    key={skinType.type}
                    onClick={() => setSelectedSkinType(skinType.type)}
                    className={`p-4 rounded-lg border-2 transition-colors ${
                      selectedSkinType === skinType.type
                        ? 'border-scientific-blue bg-scientific-blue/20'
                        : 'border-steel-blue/30 hover:border-steel-blue/50'
                    }`}
                  >
                    <div className="font-semibold text-sm">{skinType.type}</div>
                    <div className="text-xs text-slate-300 mt-1">{skinType.description}</div>
                  </button>
                ))}
              </div>

              {/* Burn Time Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-steel-blue/30">
                      <th className="text-left p-3">Indice UV</th>
                      <th className="text-left p-3">Senza SPF</th>
                      <th className="text-left p-3">SPF 20</th>
                      <th className="text-left p-3">SPF 30</th>
                      <th className="text-left p-3">SPF 50</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[6, 7, 8, 9, 10].map((uvIndex) => {
                      const selectedSkinData = skinTypeData.find(s => s.type === selectedSkinType);
                      if (!selectedSkinData) return null;

                      const formatTime = (minutes: number) => {
                        if (minutes < 60) return `${minutes}min`;
                        const hours = Math.floor(minutes / 60);
                        const mins = minutes % 60;
                        return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
                      };

                      return (
                        <tr key={uvIndex} className="border-b border-steel-blue/20">
                          <td className="p-3 font-medium">UV {uvIndex}</td>
                          <td className="p-3 text-red-400">
                            {formatTime(selectedSkinData.burnTimes[`uv${uvIndex}` as keyof typeof selectedSkinData.burnTimes] as number)}
                          </td>
                          <td className="p-3 text-yellow-400">
                            {formatTime(selectedSkinData.burnTimes[`uv${uvIndex}_spf20` as keyof typeof selectedSkinData.burnTimes] as number)}
                          </td>
                          <td className="p-3 text-blue-400">
                            {formatTime(selectedSkinData.burnTimes[`uv${uvIndex}_spf30` as keyof typeof selectedSkinData.burnTimes] as number)}
                          </td>
                          <td className="p-3 text-green-400">
                            {formatTime(selectedSkinData.burnTimes[`uv${uvIndex}_spf50` as keyof typeof selectedSkinData.burnTimes] as number)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}