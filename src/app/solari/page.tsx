'use client';

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

interface SunscreenProduct {
  id?: string;
  brand: string;
  productName: string;
  spf: number;
  // Filter composition as boolean fields (matching original exactly)
  tinosorbS: boolean;
  tinosorbM: boolean;
  mexorylSX: boolean;
  mexorylXL: boolean;
  mexoryl400: boolean;
  uvinulAPlus: boolean;
  uvinulT150: boolean;
  homosalate: boolean;  
  octocrylene: boolean;
  avobenzone: boolean;
  ethylhexylSalicylate: boolean;
  octisalate: boolean;
  enulizole: boolean;
  octinoxate: boolean;
  zincOxide: boolean;
  titaniumDioxide: boolean;
  // Ratings (matching original exactly)
  uva1Rating: "excellent" | "good" | "moderate" | "poor";
  uva2Rating: "excellent" | "good" | "moderate" | "poor";
  uvbRating: "excellent" | "good" | "moderate" | "poor";
  overallRating: number; // out of 5
  description: string;
  price?: string;
  availability: string;
  // Database-specific fields (optional)
  filters?: any;
  textureRating?: "excellent" | "good" | "moderate" | "poor";
  priceRange?: "budget" | "mid" | "premium";
  notes?: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;
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

const productRatings = {
  excellent: { icon: "✅✅✅", color: "text-green-400", label: "Excellent" },
  good: { icon: "✅✅", color: "text-blue-400", label: "Good" },
  moderate: { icon: "✅", color: "text-yellow-400", label: "Moderate" },
  poor: { icon: "❌", color: "text-red-400", label: "Poor" }
};

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
  
  // Popup state for filter details
  const [popup, setPopup] = useState<{ filterName: string; products: SunscreenProduct[] } | null>(null);
  
  // Product filtering states
  const [productProtectionFilters, setProductProtectionFilters] = useState<string[]>([]);
  const [productChemicalFilters, setProductChemicalFilters] = useState<string[]>([]);
  const [selectedSkinType, setSelectedSkinType] = useState<string>('Type III');
  
  // Fetch sunscreen products from the database using tRPC
  const { data: rawSunscreenProducts = [], isLoading: isLoadingProducts } = api.sunscreen.getAll.useQuery({
    searchTerm: searchTerm || undefined,
  });
  
  // Transform the raw products to match original interface exactly
  const sunscreenProducts = useMemo(() => {
    return rawSunscreenProducts.map(product => {
      // Cast filters as any to handle JSONB type from database
      const filters = (product.filters as any) || {};
      
      return {
        ...product,
        // Map all boolean filter properties to top-level (matching original interface exactly)
        tinosorbS: Boolean(filters.tinosorbS),
        tinosorbM: Boolean(filters.tinosorbM),
        mexorylSX: Boolean(filters.mexorylSX),  
        mexorylXL: Boolean(filters.mexorylXL),
        mexoryl400: Boolean(filters.mexoryl400),
        uvinulAPlus: Boolean(filters.uvinulAPlus),
        uvinulT150: Boolean(filters.uvinulT150),
        homosalate: Boolean(filters.homosalate),
        octocrylene: Boolean(filters.octocrylene),
        avobenzone: Boolean(filters.avobenzone),
        ethylhexylSalicylate: Boolean(filters.ethylhexylSalicylate),
        octisalate: Boolean(filters.octisalate),
        enulizole: Boolean(filters.enulizole),
        octinoxate: Boolean(filters.octinoxate),
        zincOxide: Boolean(filters.zincOxide),
        titaniumDioxide: Boolean(filters.titaniumDioxide),
        // Add missing fields with defaults (to match original exactly)
        overallRating: 4.0, // Default rating - should be stored in database
        description: product.notes || "Prodotto solare ad ampio spettro", // Use notes as description fallback
        price: product.priceRange === 'budget' ? '€10-20' : 
               product.priceRange === 'mid' ? '€20-35' : 
               product.priceRange === 'premium' ? '€35-50+' : undefined,
        availability: product.availability === 'widely_available' ? 'Ampiamente disponibile' :
                     product.availability === 'limited' ? 'Disponibilità limitata' :
                     product.availability === 'discontinued' ? 'Fuori produzione' : 'Disponibile'
      } as SunscreenProduct;
    });
  }, [rawSunscreenProducts]);
  
  // Fetch available brands
  const { data: availableBrands = [] } = api.sunscreen.getBrands.useQuery();

  // Get unique SPF values from products data (sorted descending)
  const availableSpfValues = useMemo(() => {
    if (!sunscreenProducts.length) return [];
    const spfValues = [...new Set(sunscreenProducts.map(product => product.spf))];
    return spfValues.sort((a, b) => b - a);
  }, [sunscreenProducts]);

  // Simple function to get products for a filter
  const getProductsForFilter = (filterName: string): SunscreenProduct[] => {
    const filterMap: Record<string, keyof SunscreenProduct> = {
      'Tinosorb S': 'tinosorbS',
      'Tinosorb M': 'tinosorbM',
      'Mexoryl SX': 'mexorylSX',
      'Mexoryl XL': 'mexorylXL',
      'Mexoryl 400': 'mexoryl400',
      'Uvinul A Plus': 'uvinulAPlus',
      'Uvinul T150': 'uvinulT150',
      'Homosalate': 'homosalate',
      'Octocrylene': 'octocrylene',
      'Avobenzone': 'avobenzone',
      'Ethylhexyl Salicylate': 'ethylhexylSalicylate',
      'Octisalate': 'octisalate',
      'Enulizole': 'enulizole',
      'Octinoxate': 'octinoxate',
      'Zinc Oxide': 'zincOxide',
      'Titanium Dioxide': 'titaniumDioxide'
    };
    
    const field = filterMap[filterName];
    if (!field) return [];
    
    return sunscreenProducts.filter(product => product[field] === true);
  };

  // Handle filter click
  const handleFilterClick = (filterName: string) => {
    const products = getProductsForFilter(filterName);
    setPopup({ filterName, products });
  };

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
        const matchingQualities = productProtectionFilters.filter(filter => {
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
        return matchingQualities.length >= 1; // Show products with 1+ matching criteria
      });
    }

    // Apply chemical filters (OR logic - has ANY selected chemical)
    if (productChemicalFilters.length > 0) {
      products = products.filter(product => {
        return productChemicalFilters.some(filter => {
          const chemicalMapping: Record<string, keyof SunscreenProduct> = {
            'tinosorb-s': 'tinosorbS',
            'tinosorb-m': 'tinosorbM',
            'mexoryl-sx': 'mexorylSX',
            'mexoryl-xl': 'mexorylXL',
            'mexoryl-400': 'mexoryl400',
            'uvinul-a-plus': 'uvinulAPlus',
            'avobenzone': 'avobenzone',
            'octocrylene': 'octocrylene',
            'homosalate': 'homosalate',
            'uvinul-t150': 'uvinulT150',
            'ethylhexyl-salicylate': 'ethylhexylSalicylate',
            'enulizole': 'enulizole',
            'octinoxate': 'octinoxate',
            'zinc-oxide': 'zincOxide',
            'titanium-dioxide': 'titaniumDioxide'
          };
          const fieldName = chemicalMapping[filter];
          return fieldName && product[fieldName] === true;
        });
      });
    }

    return products;
  }, [sunscreenProducts, productProtectionFilters, productChemicalFilters]);

  // Dynamic chemical columns based on filtered products
  const dynamicChemicalColumns = useMemo(() => {
    if (filteredProducts.length === 0) return [];
    
    // Define all possible chemicals with their display names and field mappings
    const allChemicals = [
      { id: 'tinosorbS', displayName: 'Tinosorb S', field: 'tinosorbS' as keyof SunscreenProduct },
      { id: 'tinosorbM', displayName: 'Tinosorb M', field: 'tinosorbM' as keyof SunscreenProduct },
      { id: 'mexorylSX', displayName: 'Mexoryl SX', field: 'mexorylSX' as keyof SunscreenProduct },
      { id: 'mexorylXL', displayName: 'Mexoryl XL', field: 'mexorylXL' as keyof SunscreenProduct },
      { id: 'mexoryl400', displayName: 'Mexoryl 400', field: 'mexoryl400' as keyof SunscreenProduct },
      { id: 'uvinulAPlus', displayName: 'Uvinul A Plus', field: 'uvinulAPlus' as keyof SunscreenProduct },
      { id: 'uvinulT150', displayName: 'Uvinul T150', field: 'uvinulT150' as keyof SunscreenProduct },
      { id: 'homosalate', displayName: 'Homosalate', field: 'homosalate' as keyof SunscreenProduct },
      { id: 'octocrylene', displayName: 'Octocrylene', field: 'octocrylene' as keyof SunscreenProduct },
      { id: 'avobenzone', displayName: 'Avobenzone', field: 'avobenzone' as keyof SunscreenProduct },
      { id: 'ethylhexylSalicylate', displayName: 'Ethylhexyl Salicylate', field: 'ethylhexylSalicylate' as keyof SunscreenProduct },
      { id: 'octisalate', displayName: 'Octisalate', field: 'octisalate' as keyof SunscreenProduct },
      { id: 'enulizole', displayName: 'Enulizole (PBSA)', field: 'enulizole' as keyof SunscreenProduct },
      { id: 'octinoxate', displayName: 'Octinoxate', field: 'octinoxate' as keyof SunscreenProduct },
      { id: 'zincOxide', displayName: 'Zinc Oxide', field: 'zincOxide' as keyof SunscreenProduct },
      { id: 'titaniumDioxide', displayName: 'Titanium Dioxide', field: 'titaniumDioxide' as keyof SunscreenProduct }
    ];
    
    // Find chemicals that are present in at least one filtered product
    const presentChemicals = allChemicals.filter(chemical => {
      return filteredProducts.some(product => product[chemical.field] === true);
    });
    
    return presentChemicals;
  }, [filteredProducts]);

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
                            <td className="p-3 font-medium text-scientific-blue">
                              <button 
                                onClick={() => handleFilterClick(filter.tradeName)}
                                className="hover:text-performance-green transition-colors cursor-pointer underline"
                              >
                                {filter.tradeName}
                              </button>
                            </td>
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
                  {/* Section Header */}
                  <div className="text-center mb-8">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                      Matrice <span className="text-scientific-blue">Composizione Filtri</span>
                    </h2>
                    <p className="text-lg text-slate-300">
                      Confronta esattamente quali filtri usa ogni marca - Basato sui dati autentici
                    </p>
                  </div>

                  {/* Product Filtering Controls */}
                  <div className="space-y-4 mb-8">
                    {/* Chemical Filters */}
                    <div className="bg-navy-charcoal border border-steel-blue/30 rounded-lg p-4">
                      <h4 className="font-semibold mb-3 text-scientific-blue text-sm">Filtri per Ingrediente Chimico</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                        {[
                          { id: 'tinosorb-s', label: 'Tinosorb S' },
                          { id: 'tinosorb-m', label: 'Tinosorb M' },
                          { id: 'mexoryl-sx', label: 'Mexoryl SX' },
                          { id: 'mexoryl-xl', label: 'Mexoryl XL' },
                          { id: 'mexoryl-400', label: 'Mexoryl 400' },
                          { id: 'uvinul-a-plus', label: 'Uvinul A Plus' },
                          { id: 'avobenzone', label: 'Avobenzone' },
                          { id: 'octocrylene', label: 'Octocrylene' },
                          { id: 'homosalate', label: 'Homosalate' },
                          { id: 'uvinul-t150', label: 'Uvinul T150' },
                          { id: 'ethylhexyl-salicylate', label: 'Ethylhexyl Sal.' },
                          { id: 'enulizole', label: 'Enulizole' },
                          { id: 'octinoxate', label: 'Octinoxate' },
                          { id: 'zinc-oxide', label: 'Zinc Oxide' },
                          { id: 'titanium-dioxide', label: 'Titanium Dio.' }
                        ].map(chemical => (
                          <div key={chemical.id} className="flex items-center space-x-1">
                            <Checkbox
                              id={chemical.id}
                              checked={productChemicalFilters.includes(chemical.id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setProductChemicalFilters([...productChemicalFilters, chemical.id]);
                                } else {
                                  setProductChemicalFilters(productChemicalFilters.filter(f => f !== chemical.id));
                                }
                              }}
                            />
                            <Label htmlFor={chemical.id} className="text-slate-300 cursor-pointer text-xs">{chemical.label}</Label>
                          </div>
                        ))}
                      </div>
                      
                      {/* Chemical Filter Status */}
                      <div className="mt-3 pt-3 border-t border-steel-blue/30">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-400">
                            {productChemicalFilters.length === 0 
                              ? "Nessun filtro chimico selezionato" 
                              : `${productChemicalFilters.length} ingredienti selezionati (mostra prodotti con QUALSIASI di questi)`
                            }
                          </span>
                          {productChemicalFilters.length > 0 && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setProductChemicalFilters([])}
                              className="border-steel-blue/30 text-slate-300 hover:border-red-500 hover:text-red-500 h-7 px-2"
                            >
                              <Filter className="w-3 h-3 mr-1" />
                              Cancella
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Protection Quality Filters */}
                    <div className="bg-navy-charcoal border border-steel-blue/30 rounded-lg p-4">
                      <h4 className="font-semibold mb-3 text-scientific-blue text-sm">Filtri per Qualità Protezione</h4>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        
                        {/* UVB Protection */}
                        <div>
                          <h4 className="font-semibold mb-2 text-scientific-blue text-sm">Protezione UVB</h4>
                          <div className="flex flex-wrap gap-x-3 gap-y-2">
                            <div className="flex items-center space-x-1">
                              <Checkbox
                                id="uvb-excellent"
                                checked={productProtectionFilters.includes("uvb-excellent")}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setProductProtectionFilters([...productProtectionFilters, "uvb-excellent"]);
                                  } else {
                                    setProductProtectionFilters(productProtectionFilters.filter(f => f !== "uvb-excellent"));
                                  }
                                }}
                              />
                              <Label htmlFor="uvb-excellent" className="text-slate-300 cursor-pointer text-xs">Eccellente</Label>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Checkbox
                                id="uvb-good"
                                checked={productProtectionFilters.includes("uvb-good")}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setProductProtectionFilters([...productProtectionFilters, "uvb-good"]);
                                  } else {
                                    setProductProtectionFilters(productProtectionFilters.filter(f => f !== "uvb-good"));
                                  }
                                }}
                              />
                              <Label htmlFor="uvb-good" className="text-slate-300 cursor-pointer text-xs">Buona</Label>
                            </div>
                          </div>
                        </div>
                        
                        {/* UVA1 Protection */}
                        <div>
                          <h4 className="font-semibold mb-2 text-scientific-blue text-sm">Protezione UVA1</h4>
                          <div className="flex flex-wrap gap-x-3 gap-y-2">
                            <div className="flex items-center space-x-1">
                              <Checkbox
                                id="uva1-excellent"
                                checked={productProtectionFilters.includes("uva1-excellent")}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setProductProtectionFilters([...productProtectionFilters, "uva1-excellent"]);
                                  } else {
                                    setProductProtectionFilters(productProtectionFilters.filter(f => f !== "uva1-excellent"));
                                  }
                                }}
                              />
                              <Label htmlFor="uva1-excellent" className="text-slate-300 cursor-pointer text-xs">Eccellente</Label>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Checkbox
                                id="uva1-good"
                                checked={productProtectionFilters.includes("uva1-good")}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setProductProtectionFilters([...productProtectionFilters, "uva1-good"]);
                                  } else {
                                    setProductProtectionFilters(productProtectionFilters.filter(f => f !== "uva1-good"));
                                  }
                                }}
                              />
                              <Label htmlFor="uva1-good" className="text-slate-300 cursor-pointer text-xs">Buona</Label>
                            </div>
                          </div>
                        </div>
                        
                        {/* UVA2 Protection */}
                        <div>
                          <h4 className="font-semibold mb-2 text-scientific-blue text-sm">Protezione UVA2</h4>
                          <div className="flex flex-wrap gap-x-3 gap-y-2">
                            <div className="flex items-center space-x-1">
                              <Checkbox
                                id="uva2-excellent"
                                checked={productProtectionFilters.includes("uva2-excellent")}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setProductProtectionFilters([...productProtectionFilters, "uva2-excellent"]);
                                  } else {
                                    setProductProtectionFilters(productProtectionFilters.filter(f => f !== "uva2-excellent"));
                                  }
                                }}
                              />
                              <Label htmlFor="uva2-excellent" className="text-slate-300 cursor-pointer text-xs">Eccellente</Label>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Checkbox
                                id="uva2-good"
                                checked={productProtectionFilters.includes("uva2-good")}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setProductProtectionFilters([...productProtectionFilters, "uva2-good"]);
                                  } else {
                                    setProductProtectionFilters(productProtectionFilters.filter(f => f !== "uva2-good"));
                                  }
                                }}
                              />
                              <Label htmlFor="uva2-good" className="text-slate-300 cursor-pointer text-xs">Buona</Label>
                            </div>
                          </div>
                        </div>
                        
                        {/* SPF Values */}
                        <div>
                          <h4 className="font-semibold mb-2 text-scientific-blue text-sm">Valori SPF</h4>
                          <div className="flex flex-wrap gap-x-3 gap-y-2">
                            {availableSpfValues.map(spf => (
                              <div key={spf} className="flex items-center space-x-1">
                                <Checkbox
                                  id={`spf-${spf}`}
                                  checked={productProtectionFilters.includes(`spf-${spf}`)}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      setProductProtectionFilters([...productProtectionFilters, `spf-${spf}`]);
                                    } else {
                                      setProductProtectionFilters(productProtectionFilters.filter(f => f !== `spf-${spf}`));
                                    }
                                  }}
                                />
                                <Label htmlFor={`spf-${spf}`} className="text-slate-300 cursor-pointer text-xs">SPF {spf}</Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Products Count Display */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-semibold text-scientific-blue">
                        Prodotti Solari ({filteredProducts.length})
                      </h3>
                      {dynamicChemicalColumns.length > 0 && (
                        <div className="text-sm text-slate-400 mt-1">
                          <p>Mostrando {dynamicChemicalColumns.length} filtri chimici presenti nei prodotti filtrati</p>
                          {productChemicalFilters.length > 0 && (
                            <p className="text-xs text-slate-500 mt-1">
                              Filtri attivi: {productChemicalFilters.length} • Colonne dinamiche: {dynamicChemicalColumns.length}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      {(productProtectionFilters.length > 0 || productChemicalFilters.length > 0) && (
                        <Badge variant="outline" className="border-performance-green text-performance-green">
                          {filteredProducts.length} di {sunscreenProducts.length} prodotti
                        </Badge>
                      )}
                      {(productProtectionFilters.length > 0 || productChemicalFilters.length > 0) && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setProductProtectionFilters([]);
                            setProductChemicalFilters([]);
                          }}
                          className="border-steel-blue/30 text-slate-300 hover:border-red-500 hover:text-red-500 h-7 px-3"
                        >
                          <Filter className="w-3 h-3 mr-1" />
                          Cancella Tutti
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Product Table */}
                  {filteredProducts.length === 0 && (productProtectionFilters.length > 0 || productChemicalFilters.length > 0) ? (
                    <div className="text-center py-12 bg-navy-charcoal rounded-lg border border-steel-blue/30">
                      <p className="text-slate-400 text-lg mb-4">Nessun prodotto trovato</p>
                      <p className="text-slate-500 mb-2">
                        {productProtectionFilters.length > 0 && "Criteri di qualità troppo restrittivi"}
                        {productProtectionFilters.length > 0 && productChemicalFilters.length > 0 && " o "}
                        {productChemicalFilters.length > 0 && "Nessun prodotto contiene gli ingredienti selezionati"}
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setProductProtectionFilters([]);
                          setProductChemicalFilters([]);
                        }}
                        className="mt-4 border-steel-blue/30 text-slate-300 hover:border-performance-green hover:text-performance-green"
                      >
                        Rimuovi Tutti i Filtri
                      </Button>
                    </div>
                  ) : dynamicChemicalColumns.length === 0 && filteredProducts.length > 0 ? (
                    <div className="text-center py-12 bg-navy-charcoal rounded-lg border border-steel-blue/30">
                      <p className="text-slate-400 text-lg mb-4">Nessun filtro chimico presente</p>
                      <p className="text-slate-500 mb-2">
                        I prodotti filtrati non contengono filtri chimici solari
                      </p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full bg-navy-charcoal rounded-lg border border-steel-blue/30">
                        <thead>
                          <tr className="border-b border-steel-blue/30 sticky top-0 bg-navy-charcoal z-10">
                            <th className="text-center p-3 font-semibold text-scientific-blue sticky left-0 bg-navy-charcoal">Prodotto</th>
                            <th className="text-center p-2 font-semibold text-scientific-blue text-xs">SPF</th>
                            {dynamicChemicalColumns.map((chemical) => (
                              <th key={chemical.id} className={`text-center p-2 font-semibold text-scientific-blue text-xs ${dynamicChemicalColumns.length > 8 ? 'min-w-16' : 'min-w-20'}`} title={chemical.displayName}>
                                <div className={`${dynamicChemicalColumns.length > 8 ? 'max-w-16' : 'max-w-20'} truncate`}>
                                  {chemical.displayName}
                                </div>
                              </th>
                            ))}
                            <th className="text-center p-2 font-semibold text-scientific-blue text-xs">Total Filtri</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredProducts.map((product, index) => {
                            return (
                              <tr key={index} className="border-b border-steel-blue/20 hover:bg-steel-blue/10 transition-colors">
                                <td className="p-3 sticky left-0 bg-navy-charcoal text-center">
                                  <div>
                                    <div className="font-semibold text-white text-sm">{product.brand}</div>
                                    <div className="text-slate-300 text-xs">{product.productName}</div>
                                    
                                    {/* Overall Rating Stars */}
                                    <div className="flex items-center justify-center gap-1 mt-2">
                                      <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                          <span 
                                            key={i} 
                                            className={`text-xs ${
                                              i < Math.floor(product.overallRating) 
                                                ? 'text-yellow-400' 
                                                : 'text-slate-600'
                                            }`}
                                          >
                                            ★
                                          </span>
                                        ))}
                                      </div>
                                      <span className="text-slate-400 text-xs ml-1">
                                        {product.overallRating}/5.0
                                      </span>
                                    </div>
                                    
                                    {/* Description */}
                                    <div className="text-slate-300 text-xs mt-1 max-w-40 truncate" title={product.description}>
                                      {product.description}
                                    </div>
                                    
                                    {/* Price */}
                                    {product.price && (
                                      <div className="text-performance-green text-xs mt-1 font-medium">
                                        {product.price}
                                      </div>
                                    )}
                                    
                                    {/* Protection Quality Indicators */}
                                    <div className="flex gap-1 mt-2 justify-center">
                                      {product.uvbRating === "excellent" && <div className="w-1.5 h-1.5 bg-green-400 rounded-full" title="UVB Eccellente"></div>}
                                      {product.uva1Rating === "excellent" && <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" title="UVA1 Eccellente"></div>}
                                      {product.uva2Rating === "excellent" && <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full" title="UVA2 Eccellente"></div>}
                                    </div>
                                  </div>
                                </td>
                                <td className="p-2 text-center">
                                  <div className="font-bold text-scientific-blue text-lg">{product.spf}</div>
                                </td>
                                {dynamicChemicalColumns.map((chemical) => {
                                  const hasFilter = product[chemical.field] === true;
                                  
                                  return (
                                    <td key={chemical.id} className="p-2 text-center">
                                      {hasFilter ? (
                                        <div className="text-performance-green text-lg font-bold">✓</div>
                                      ) : (
                                        <div className="text-slate-600 text-lg">—</div>
                                      )}
                                    </td>
                                  );
                                })}
                                <td className="p-3 text-center">
                                  <div className="font-bold text-scientific-blue text-lg">
                                    {(() => {
                                      const filterFields = [
                                        'tinosorbS', 'tinosorbM', 'mexorylSX', 'mexorylXL', 'mexoryl400',
                                        'uvinulAPlus', 'uvinulT150', 'homosalate', 'octocrylene', 'avobenzone',
                                        'ethylhexylSalicylate', 'octisalate', 'enulizole', 'octinoxate', 'zincOxide', 'titaniumDioxide'
                                      ] as const;
                                      return filterFields.filter(field => product[field] === true).length;
                                    })()}
                                  </div>
                                  <div className="text-xs text-slate-400">filtri</div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* SPF Efficacy Table - Now standalone at bottom */}
                  <div className="mt-8">
                    <div className="bg-steel-blue/20 rounded-lg p-6 border border-steel-blue/30">
                      <h3 className="text-xl font-semibold mb-4 text-scientific-blue">Efficacia SPF</h3>
                      <div className="space-y-3 text-sm">
                        {/* Merged SPF Table */}
                        <div className="grid grid-cols-7 gap-2 text-xs font-semibold text-slate-400 border-b border-steel-blue/30 pb-2">
                          <span>SPF</span>
                          <span>UVB Bloccato</span>
                          <span className="text-yellow-400">UV 6</span>
                          <span className="text-orange-400">UV 7</span>
                          <span className="text-orange-400">UV 8</span>
                          <span className="text-red-400">UV 9</span>
                          <span className="text-red-400">UV 10</span>
                        </div>
                        <div className="space-y-1">
                          <div className="grid grid-cols-7 gap-2 text-slate-300">
                            <span className="font-semibold">No SPF</span>
                            <span className="text-red-400">~0%</span>
                            <span className="text-red-400">9 min</span>
                            <span className="text-red-400">8 min</span>
                            <span className="text-red-400">7 min</span>
                            <span className="text-red-400">6 min</span>
                            <span className="text-red-400">5 min</span>
                          </div>
                          <div className="grid grid-cols-7 gap-2 text-slate-300">
                            <span className="font-semibold">SPF 20</span>
                            <span className="text-yellow-400">~95%</span>
                            <span>200 min</span>
                            <span>171 min</span>
                            <span>150 min</span>
                            <span>133 min</span>
                            <span>120 min</span>
                          </div>
                          <div className="grid grid-cols-7 gap-2 text-slate-300">
                            <span className="font-semibold">SPF 30</span>
                            <span className="text-blue-400">~97%</span>
                            <span>300 min</span>
                            <span>257 min</span>
                            <span>225 min</span>
                            <span>200 min</span>
                            <span>180 min</span>
                          </div>
                          <div className="grid grid-cols-7 gap-2 text-slate-300">
                            <span className="font-semibold">SPF 50</span>
                            <span className="text-green-400">~98%</span>
                            <span className="text-green-400">500 min</span>
                            <span className="text-green-400">429 min</span>
                            <span className="text-green-400">375 min</span>
                            <span className="text-green-400">333 min</span>
                            <span className="text-green-400">300 min</span>
                          </div>
                        </div>
                        <div className="text-xs text-slate-500 mt-4 pt-4 border-t border-steel-blue/30">
                          <p><strong>Nota:</strong> Tempi calcolati per Fototipo I (pelle molto chiara). Altri fototipi resistono più a lungo.</p>
                          <p>I valori sono indicativi e possono variare in base a condizioni ambientali, applicazione e riapplicazione del prodotto.</p>
                        </div>
                      </div>
                    </div>
                  </div>
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

      {/* Popup for Filter Details */}
      {popup && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={() => setPopup(null)}>
          <div className="bg-navy-charcoal border border-steel-blue/30 rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-scientific-blue mb-2">
                    {popup.filterName}
                  </h2>
                  <p className="text-slate-400">Informazioni complete sul filtro</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setPopup(null)}
                  className="border-slate-600 text-slate-400 hover:border-red-500 hover:text-red-500"
                >
                  Chiudi
                </Button>
              </div>
              <Tabs defaultValue="products" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6 bg-steel-blue/20">
                  <TabsTrigger value="products" className="data-[state=active]:bg-scientific-blue">
                    Prodotti ({popup.products.length})
                  </TabsTrigger>
                  <TabsTrigger value="details" className="data-[state=active]:bg-scientific-blue">
                    Dettagli Filtro
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="products" className="space-y-4">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-performance-green mb-4">
                      Prodotti che contengono {popup.filterName}
                    </h3>
                    
                    {popup.products.length > 0 ? (
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {popup.products.map((product, index) => (
                          <div key={index} className="bg-steel-blue/20 rounded-lg border border-steel-blue/30 p-4">
                            <div className="flex items-center gap-2 mb-3">
                              <div className="w-6 h-6 bg-scientific-blue/20 rounded flex items-center justify-center">
                                <Sun className="w-3 h-3 text-scientific-blue" />
                              </div>
                              <Badge variant="outline" className="border-performance-green text-performance-green text-xs">
                                SPF {product.spf}
                              </Badge>
                            </div>
                            
                            <h4 className="font-bold text-scientific-blue text-lg mb-1">
                              {product.brand}
                            </h4>
                            <p className="text-slate-300 text-sm mb-3">
                              {product.productName}
                            </p>
                            
                            {/* Overall Rating Stars */}
                            <div className="flex items-center gap-2 mb-3">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <span 
                                    key={i} 
                                    className={`text-xs ${
                                      i < Math.floor(product.overallRating) 
                                        ? 'text-yellow-400' 
                                        : 'text-slate-600'
                                    }`}
                                  >
                                    ★
                                  </span>
                                ))}
                              </div>
                              <span className="text-slate-400 text-xs">
                                {product.overallRating}/5.0
                              </span>
                            </div>
                            
                            <p className="text-slate-300 text-xs mb-3 leading-relaxed">
                              {product.description}
                            </p>
                            
                            {/* Rating indicators */}
                            <div className="flex gap-2 mb-2">
                              <div className={`text-xs px-2 py-1 rounded ${product.uvbRating === 'excellent' ? 'bg-green-900 text-green-300' : product.uvbRating === 'good' ? 'bg-blue-900 text-blue-300' : 'bg-gray-700 text-gray-300'}`}>
                                UVB: {product.uvbRating}
                              </div>
                              <div className={`text-xs px-2 py-1 rounded ${product.uva1Rating === 'excellent' ? 'bg-green-900 text-green-300' : product.uva1Rating === 'good' ? 'bg-blue-900 text-blue-300' : 'bg-gray-700 text-gray-300'}`}>
                                UVA1: {product.uva1Rating}
                              </div>
                            </div>
                            
                            <div className="border-t border-steel-blue/30 pt-3">
                              {product.price && (
                                <div className="mb-2">
                                  <p className="text-slate-400 text-xs mb-1">Prezzo</p>
                                  <p className="text-performance-green text-xs font-medium">{product.price}</p>
                                </div>
                              )}
                              <div>
                                <p className="text-slate-400 text-xs mb-1">Disponibilità</p>
                                <p className="text-slate-300 text-xs">{product.availability}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-slate-400">Nessun prodotto trovato con questo filtro</p>
                        <p className="text-slate-500 text-sm mt-2">
                          Il filtro potrebbe essere utilizzato in prodotti non ancora catalogati
                        </p>
                      </div>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="details" className="space-y-6">
                  {(() => {
                    const filterData = sunscreenFilters.find(f => f.tradeName === popup.filterName);
                    if (!filterData) return <div>Dati filtro non trovati</div>;
                    
                    return (
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
                              <Badge className="bg-performance-green text-black">{filterData.uvRange}</Badge>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>Picco di assorbimento:</span>
                              <span className="text-scientific-blue font-semibold">{filterData.peakWavelength}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mt-4">
                              <div className="text-center">
                                <div className="text-xs text-slate-400 mb-1">UVB</div>
                                <div className={protectionLevels[filterData.uvbProtection].color}>
                                  {protectionLevels[filterData.uvbProtection].icon}
                                </div>
                              </div>
                              <div className="text-center">
                                <div className="text-xs text-slate-400 mb-1">UVA1</div>
                                <div className={protectionLevels[filterData.uva1Protection].color}>
                                  {protectionLevels[filterData.uva1Protection].icon}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card className="bg-steel-blue/20 border-steel-blue/30">
                          <CardHeader>
                            <CardTitle className="flex items-center text-scientific-blue">
                              <Zap className="mr-2 h-5 w-5" />
                              Proprietà Tecniche
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div>
                              <div className="text-xs text-slate-400 mb-1">Solubilità</div>
                              <p className="text-sm text-slate-300">{filterData.solubility}</p>
                            </div>
                            <div>
                              <div className="text-xs text-slate-400 mb-1">Fotostabilità</div>
                              <p className="text-sm text-slate-300">{filterData.photostability}</p>
                            </div>
                            <div>
                              <div className="text-xs text-slate-400 mb-1">Status Regolatorio</div>
                              <p className="text-sm text-slate-300">{filterData.regulatoryStatus}</p>
                            </div>
                          </CardContent>
                        </Card>
                        
                        {filterData.extraPoints.length > 0 && (
                          <Card className="bg-steel-blue/20 border-steel-blue/30 md:col-span-2">
                            <CardHeader>
                              <CardTitle className="flex items-center text-scientific-blue">
                                <CheckCircle className="mr-2 h-5 w-5" />
                                Punti Chiave
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="grid md:grid-cols-2 gap-2">
                                {filterData.extraPoints.map((point, idx) => (
                                  <div key={idx} className="flex items-start space-x-2">
                                    <div className="w-1.5 h-1.5 bg-performance-green rounded-full mt-2 flex-shrink-0"></div>
                                    <span className="text-sm text-slate-300">{point}</span>
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        )}
                      </div>
                    );
                  })()}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}