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
  // Filter composition as boolean fields
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
  // Ratings
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

const sunscreenProducts: SunscreenProduct[] = [
  {
    brand: "La Roche-Posay",
    productName: "Anthelios Ultra Cover",
    spf: 50,
    tinosorbS: true,
    tinosorbM: false,
    mexorylSX: true,
    mexorylXL: true,
    mexoryl400: false,
    uvinulAPlus: false,
    uvinulT150: true,
    homosalate: false,
    octocrylene: false,
    avobenzone: true,
    ethylhexylSalicylate: true,
    octisalate: false,
    enulizole: false,
    octinoxate: false,
    zincOxide: false,
    titaniumDioxide: false,
    uva1Rating: "excellent",
    uva2Rating: "excellent", 
    uvbRating: "excellent",
    overallRating: 5.0,
    description: "Formula avanzata con Mexoryl XL per fotostabilità extra",
    availability: "EU, disponibile in Italia"
  },
  {
    brand: "Vichy",
    productName: "Capital Soleil",
    spf: 50,
    tinosorbS: true,
    tinosorbM: false,
    mexorylSX: true,
    mexorylXL: false,
    mexoryl400: false,
    uvinulAPlus: false,
    uvinulT150: true,
    homosalate: true,
    octocrylene: true,
    avobenzone: true,
    ethylhexylSalicylate: true,
    octisalate: false,
    enulizole: true,
    octinoxate: false,
    zincOxide: false,
    titaniumDioxide: false,
    uva1Rating: "excellent",
    uva2Rating: "excellent",
    uvbRating: "excellent", 
    overallRating: 4.8,
    description: "Sistema completo con 8 filtri per protezione massima",
    availability: "EU, disponibile in Italia"
  },
  {
    brand: "ISDIN",
    productName: "Fotoprotetor Fusion Water",
    spf: 50,
    tinosorbS: true,
    tinosorbM: false,
    mexorylSX: false,
    mexorylXL: false,
    mexoryl400: false,
    uvinulAPlus: true,
    uvinulT150: false,
    homosalate: false,
    octocrylene: false,
    avobenzone: false,
    ethylhexylSalicylate: false,
    octisalate: true,
    enulizole: false,
    octinoxate: false,
    zincOxide: false,
    titaniumDioxide: false,
    uva1Rating: "excellent",
    uva2Rating: "excellent",
    uvbRating: "excellent",
    overallRating: 4.8,
    description: "Tinosorb S + Uvinul A Plus + Octisalate",
    availability: "EU, Spagna principalmente"
  },
  {
    brand: "Eucerin",
    productName: "Sun Sensitive Protect",
    spf: 30,
    tinosorbS: true,
    tinosorbM: true,
    mexorylSX: false,
    mexorylXL: false,
    mexoryl400: false,
    uvinulAPlus: false,
    uvinulT150: false,
    homosalate: false,
    octocrylene: false,
    avobenzone: false,
    ethylhexylSalicylate: false,
    octisalate: true,
    enulizole: false,
    octinoxate: false,
    zincOxide: false,
    titaniumDioxide: false,
    uva1Rating: "excellent",
    uva2Rating: "excellent",
    uvbRating: "good",
    overallRating: 4.3,
    description: "Tinosorb S + M + Octisalate",
    availability: "EU, disponibile in Italia"
  },
  {
    brand: "Avène",
    productName: "Fluide Mineral Teinté",
    spf: 50,
    tinosorbS: false,
    tinosorbM: false,
    mexorylSX: false,
    mexorylXL: false,
    mexoryl400: false,
    uvinulAPlus: false,
    uvinulT150: false,
    homosalate: false,
    octocrylene: false,
    avobenzone: false,
    ethylhexylSalicylate: false,
    octisalate: false,
    enulizole: false,
    octinoxate: false,
    zincOxide: true,
    titaniumDioxide: true,
    uva1Rating: "good",
    uva2Rating: "excellent",
    uvbRating: "excellent",
    overallRating: 4.0,
    description: "Zinc Oxide + Titanium Dioxide (Mineral)",
    availability: "EU, disponibile in Italia"
  },
  {
    brand: "Heliocare",
    productName: "Advanced Gel",
    spf: 50,
    tinosorbS: true,
    tinosorbM: false,
    mexorylSX: false,
    mexorylXL: false,
    mexoryl400: false,
    uvinulAPlus: true,
    uvinulT150: true,
    homosalate: false,
    octocrylene: false,
    avobenzone: false,
    ethylhexylSalicylate: false,
    octisalate: false,
    enulizole: false,
    octinoxate: false,
    zincOxide: false,
    titaniumDioxide: false,
    uva1Rating: "excellent",
    uva2Rating: "excellent", 
    uvbRating: "excellent",
    overallRating: 4.7,
    description: "Tinosorb S + Uvinul A Plus + T150",
    availability: "EU, Spagna principalmente"
  },
  {
    brand: "Hawaiian Tropic",
    productName: "EU Variant",
    spf: 30,
    tinosorbS: false,
    tinosorbM: false,
    mexorylSX: false,
    mexorylXL: false,
    mexoryl400: false,
    uvinulAPlus: false,
    uvinulT150: false,
    homosalate: true,
    octocrylene: true,
    avobenzone: true,
    ethylhexylSalicylate: false,
    octisalate: false,
    enulizole: false,
    octinoxate: false,
    zincOxide: false,
    titaniumDioxide: false,
    uva1Rating: "good",
    uva2Rating: "good",
    uvbRating: "good",
    overallRating: 3.8,
    description: "Protezione quotidiana idratante ad ampio spettro",
    availability: "USA/EU, disponibile in Europa"
  },
  {
    brand: "Bilboa",
    productName: "Carrot Plus",
    spf: 20,
    tinosorbS: false,
    tinosorbM: false,
    mexorylSX: false,
    mexorylXL: false,
    mexoryl400: false,
    uvinulAPlus: true,
    uvinulT150: false,
    homosalate: false,
    octocrylene: false,
    avobenzone: false,
    ethylhexylSalicylate: true,
    octisalate: false,
    enulizole: false,
    octinoxate: true,
    zincOxide: false,
    titaniumDioxide: false,
    uva1Rating: "moderate",
    uva2Rating: "good",
    uvbRating: "moderate",
    overallRating: 3.2,
    description: "Supporto abbronzatura con protezione UVA/UVB base",
    availability: "Italia, prodotto locale"
  },
  {
    brand: "La Roche-Posay",
    productName: "Anthelios Invisible Spray",
    spf: 30,
    tinosorbS: false,
    tinosorbM: false,
    mexorylSX: false,
    mexorylXL: true,
    mexoryl400: false,
    uvinulAPlus: false,
    uvinulT150: true,
    homosalate: true,
    octocrylene: true,
    avobenzone: true,
    ethylhexylSalicylate: true,
    octisalate: false,
    enulizole: false,
    octinoxate: false,
    zincOxide: false,
    titaniumDioxide: false,
    uva1Rating: "excellent",
    uva2Rating: "excellent",
    uvbRating: "excellent",
    overallRating: 4.6,
    description: "Spray dermatologico viso e corpo per pelli sensibili",
    availability: "Francia (Gruppo L'Oréal), EU"
  }
];

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
  
  // New simple popup state
  const [popup, setPopup] = useState<{ filterName: string; products: SunscreenProduct[] } | null>(null);
  
  // Product filtering states
  const [productProtectionFilters, setProductProtectionFilters] = useState<string[]>([]);
  const [productChemicalFilters, setProductChemicalFilters] = useState<string[]>([]);
  const [selectedSkinType, setSelectedSkinType] = useState<string>('Type III');
  
  // Get unique SPF values from products data (sorted descending)
  const availableSpfValues = useMemo(() => {
    const spfValues = [...new Set(sunscreenProducts.map(product => product.spf))];
    return spfValues.sort((a, b) => b - a);
  }, []);
  
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
    let filtered = sunscreenFilters.filter(filter => {
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

    // Apply protection quality filters (AND logic - need 2+ criteria)
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
  }, [productProtectionFilters, productChemicalFilters]);

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
                  variant={activeTab === "filters" ? "default" : "ghost"}
                  onClick={() => setActiveTab("filters")}
                  className={`px-6 py-2 ${activeTab === "filters" ? "bg-scientific-blue text-white" : "text-slate-300 hover:text-white"}`}
                >
                  Database Filtri
                </Button>
                <Button
                  variant={activeTab === "products" ? "default" : "ghost"}
                  onClick={() => setActiveTab("products")}
                  className={`px-6 py-2 ${activeTab === "products" ? "bg-scientific-blue text-white" : "text-slate-300 hover:text-white"}`}
                >
                  Prodotti Solari
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Composition Matrix */}
      {activeTab === "products" && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Matrice <span className="text-scientific-blue">Composizione Filtri</span>
              </h2>
              <p className="text-lg text-slate-300">
                Confronta esattamente quali filtri usa ogni marca - Basato sui dati autentici Vichy vs La Roche-Posay
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
                  
                  {/* UVA1 Protection + SPF Numbers */}
                  <div>
                    <h4 className="font-semibold mb-2 text-scientific-blue text-sm">Protezione UVA1</h4>
                    <div className="flex flex-wrap gap-x-3 gap-y-2 mb-3">
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
                    
                    <h5 className="font-semibold mb-2 text-scientific-blue text-xs">Valore SPF</h5>
                    <div className="flex flex-wrap gap-x-3 gap-y-2">
                      {availableSpfValues.map((spfValue) => {
                        const filterId = `spf-${spfValue}`;
                        return (
                          <div key={spfValue} className="flex items-center space-x-1">
                            <Checkbox
                              id={filterId}
                              checked={productProtectionFilters.includes(filterId)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setProductProtectionFilters([...productProtectionFilters, filterId]);
                                } else {
                                  setProductProtectionFilters(productProtectionFilters.filter(f => f !== filterId));
                                }
                              }}
                            />
                            <Label htmlFor={filterId} className="text-slate-300 cursor-pointer text-xs">
                              SPF {spfValue}
                            </Label>
                          </div>
                        );
                      })}
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
                  

                  
                </div>
                
                {/* Protection Filter Status */}
                <div className="mt-4 pt-4 border-t border-steel-blue/30">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">
                      {productProtectionFilters.length === 0 
                        ? "Nessun filtro qualità selezionato" 
                        : `${productProtectionFilters.length} criteri qualità (mostra prodotti con qualsiasi criterio)`
                      }
                    </span>
                    {productProtectionFilters.length > 0 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setProductProtectionFilters([])}
                        className="border-steel-blue/30 text-slate-300 hover:border-red-500 hover:text-red-500 h-7 px-2"
                      >
                        <Filter className="w-3 h-3 mr-1" />
                        Cancella
                      </Button>
                    )}
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
                      <th className="text-left p-3 font-semibold text-scientific-blue sticky left-0 bg-navy-charcoal">Prodotto</th>
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
                        <td className="p-3 sticky left-0 bg-navy-charcoal">
                          <div>
                            <div className="font-semibold text-white text-sm">{product.brand}</div>
                            <div className="text-slate-300 text-xs">{product.productName}</div>
                            {/* Protection Quality Indicators */}
                            <div className="flex gap-1 mt-2">
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

            {/* SPF Efficacia Table - Now standalone at bottom */}
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
                  <div className="mt-3 pt-2 border-t border-steel-blue/30">
                    <p className="text-xs text-slate-400 italic">
                      SPF moltiplica quanto tempo puoi stare protetto dalle scottature rispetto alla pelle nuda.
                    </p>
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
          <div className="space-y-4 mb-6">
            {/* Search Row */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Cerca per nome commerciale o INCI..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-navy-charcoal border-steel-blue/30 text-white"
              />
            </div>
            
            {/* Compact Filter Controls Row */}
            <div className="bg-navy-charcoal border border-steel-blue/30 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Solubility Filters */}
                <div>
                  <h4 className="font-semibold mb-2 text-scientific-blue text-sm">Solubilità</h4>
                  <div className="flex gap-4">
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
                      <Label htmlFor="oil" className="text-slate-300 cursor-pointer text-sm">Lipo</Label>
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
                      <Label htmlFor="water" className="text-slate-300 cursor-pointer text-sm">Idro</Label>
                    </div>
                  </div>
                </div>
                
                {/* Regulatory Filters */}
                <div>
                  <h4 className="font-semibold mb-2 text-scientific-blue text-sm">Approvazioni</h4>
                  <div className="flex gap-4">
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
                      <Label htmlFor="eu" className="text-slate-300 cursor-pointer text-sm">EU</Label>
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
                      <Label htmlFor="us" className="text-slate-300 cursor-pointer text-sm">US</Label>
                    </div>
                  </div>
                </div>
                
                {/* UV Range Filters */}
                <div>
                  <h4 className="font-semibold mb-2 text-scientific-blue text-sm">Spettro UV</h4>
                  <div className="flex flex-wrap gap-x-3 gap-y-2">
                    <div className="flex items-center space-x-1">
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
                      <Label htmlFor="uvb" className="text-slate-300 cursor-pointer text-xs">UVB</Label>
                    </div>
                    <div className="flex items-center space-x-1">
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
                      <Label htmlFor="uva1" className="text-slate-300 cursor-pointer text-xs">UVA1</Label>
                    </div>
                    <div className="flex items-center space-x-1">
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
                      <Label htmlFor="uva2" className="text-slate-300 cursor-pointer text-xs">UVA2</Label>
                    </div>
                    <div className="flex items-center space-x-1">
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
                      <Label htmlFor="broad" className="text-slate-300 cursor-pointer text-xs">Ampio</Label>
                    </div>
                  </div>
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



          {/* Filter Properties Matrix Table */}
          <div className="max-w-full mx-auto mt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">
                Database Filtri UV ({filteredFilters.length})
              </h2>
              <Badge variant="outline" className="border-scientific-blue text-scientific-blue">
                {filteredFilters.length} di {sunscreenFilters.length}
              </Badge>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full bg-navy-charcoal rounded-lg border border-steel-blue/30">
                <thead>
                  <tr className="border-b border-steel-blue/30">
                    <th className="text-left p-3 font-semibold text-scientific-blue sticky left-0 bg-navy-charcoal min-w-[180px]">
                      Nome Commerciale
                    </th>
                    <th className="text-left p-3 font-semibold text-scientific-blue min-w-[200px]">
                      Nome INCI
                    </th>
                    <th className="text-center p-3 font-semibold text-scientific-blue min-w-[120px]">
                      Spettro UV
                    </th>
                    <th className="text-center p-3 font-semibold text-scientific-blue min-w-[100px]">Picco λ</th>
                    <th className="text-center p-3 font-semibold text-scientific-blue min-w-[120px]">
                      Fotostabilità
                    </th>
                    <th className="text-center p-3 font-semibold text-scientific-blue min-w-[100px]">Solubilità</th>
                    <th className="text-center p-3 font-semibold text-scientific-blue min-w-[120px]">Status Regolatorio</th>
                    <th className="text-center p-3 font-semibold text-scientific-blue min-w-[80px]">
                      UVB
                    </th>
                    <th className="text-center p-3 font-semibold text-scientific-blue min-w-[80px]">
                      UVA2
                    </th>
                    <th className="text-center p-3 font-semibold text-scientific-blue min-w-[80px]">
                      UVA1
                    </th>
                    <th className="text-center p-3 font-semibold text-scientific-blue min-w-[80px]">
                      Long UVA1
                    </th>
                    <th className="text-center p-3 font-semibold text-scientific-blue min-w-[120px]">Vantaggi Extra</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFilters.map((filter, index) => (
                    <tr 
                      key={index} 
                      className="border-b border-steel-blue/20 hover:bg-steel-blue/10 transition-colors cursor-pointer"
                      onClick={() => handleFilterClick(filter.tradeName)}
                      title="Clicca per vedere quali prodotti contengono questo filtro"
                    >
                      {/* Commercial Name */}
                      <td className="p-3 sticky left-0 bg-navy-charcoal">
                        <div className="font-bold text-scientific-blue text-sm">
                          {filter.tradeName}
                        </div>
                      </td>

                      {/* INCI Name */}
                      <td className="p-3">
                        <div className="text-slate-300 font-medium text-sm">
                          {filter.inciName}
                        </div>
                      </td>

                      {/* UV Range */}
                      <td className="p-3 text-center text-performance-green font-semibold text-xs">
                        {filter.uvRange}
                      </td>

                      {/* Peak Wavelength */}
                      <td className="p-3 text-center text-slate-300 text-sm">
                        {filter.peakWavelength}
                      </td>

                      {/* Photostability */}
                      <td className="p-3 text-center text-slate-300 text-sm">
                        {filter.photostability}
                      </td>

                      {/* Solubility */}
                      <td className="p-3 text-center text-slate-300 text-xs">
                        {filter.solubility.split(';').map((sol, idx) => (
                          <div key={idx} className="mb-1 text-steel-blue">
                            {sol.trim()}
                          </div>
                        ))}
                      </td>

                      {/* Regulatory Status */}
                      <td className="p-3 text-center text-slate-300 text-xs">
                        {filter.regulatoryStatus.split(';').map((status, idx) => (
                          <div key={idx} className="mb-1 text-scientific-blue">
                            {status.trim()}
                          </div>
                        ))}
                      </td>

                      {/* UVB Protection */}
                      <td className="p-3 text-center">
                        <div className={`text-xs font-semibold ${protectionLevels[filter.uvbProtection].color}`}>
                          {protectionLevels[filter.uvbProtection].icon}
                        </div>
                      </td>

                      {/* UVA2 Protection */}
                      <td className="p-3 text-center">
                        <div className={`text-xs font-semibold ${protectionLevels[filter.uva2Protection].color}`}>
                          {protectionLevels[filter.uva2Protection].icon}
                        </div>
                      </td>

                      {/* UVA1 Protection */}
                      <td className="p-3 text-center">
                        <div className={`text-xs font-semibold ${protectionLevels[filter.uva1Protection].color}`}>
                          {protectionLevels[filter.uva1Protection].icon}
                        </div>
                      </td>

                      {/* Long UVA1 Protection */}
                      <td className="p-3 text-center">
                        <div className={`text-xs font-semibold ${protectionLevels[filter.longUva1Protection].color}`}>
                          {protectionLevels[filter.longUva1Protection].icon}
                        </div>
                      </td>

                      {/* Extra Points */}
                      <td className="p-3">
                        <div className="space-y-1">
                          {filter.extraPoints.slice(0, 3).map((point, idx) => (
                            <div key={idx} className="text-performance-green text-xs">
                              <CheckCircle className="w-3 h-3 mr-1 inline" />
                              {point}
                            </div>
                          ))}
                          {filter.extraPoints.length > 3 && (
                            <div className="text-slate-400 text-xs">
                              +{filter.extraPoints.length - 3} altri
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredFilters.length === 0 && (
              <div className="text-center py-12">
                <p className="text-slate-400 text-lg mb-4">Nessun filtro trovato</p>
                <p className="text-slate-500">Prova a modificare i criteri di ricerca o i filtri</p>
              </div>
            )}



            {/* Bottom Section with Legend and SPF Table */}
            <div className="mt-8 grid md:grid-cols-4 gap-6">
              <div className="bg-steel-blue/20 rounded-lg p-6 border border-steel-blue/30">
                <h3 className="text-lg font-semibold mb-4 text-scientific-blue">Protezione UV</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <span className="text-green-400 mr-2">✅✅✅</span>
                    <span className="text-slate-300">Eccellente</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-blue-400 mr-2">✅✅</span>
                    <span className="text-slate-300">Buona</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-yellow-400 mr-2">✅</span>
                    <span className="text-slate-300">Moderata</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-red-400 mr-2">❌</span>
                    <span className="text-slate-300">Insufficiente</span>
                  </div>
                </div>
              </div>

              <div className="md:col-span-3">
                <div className="bg-steel-blue/20 rounded-lg p-6 border border-steel-blue/30">
                  <h3 className="text-xl font-semibold mb-4 text-scientific-blue">Efficacia SPF</h3>
                  
                  {/* Skin Type Filter */}
                  <div className="mb-6">
                    <p className="text-slate-400 text-sm mb-3">Seleziona il tuo tipo di pelle per vedere i tempi di protezione personalizzati</p>
                    <div className="flex flex-wrap gap-2">
                      {skinTypeData.map((skinType) => (
                        <button
                          key={skinType.type}
                          onClick={() => setSelectedSkinType(skinType.type)}
                          className={`px-3 py-2 rounded-full text-xs font-medium transition-all ${
                            selectedSkinType === skinType.type
                              ? 'bg-scientific-blue text-white border-2 border-scientific-blue'
                              : 'bg-navy-charcoal border-2 border-steel-blue/30 text-slate-300 hover:border-scientific-blue/50'
                          }`}
                        >
                          {skinType.type.replace('Type ', '')} - {skinType.description}
                        </button>
                      ))}
                    </div>
                  </div>

                  {(() => {
                    const selectedData = skinTypeData.find(st => st.type === selectedSkinType);
                    if (!selectedData) return null;

                    const formatTime = (minutes: number) => {
                      const hours = Math.floor(minutes / 60);
                      const mins = minutes % 60;
                      if (hours >= 1) {
                        return `${hours}:${mins.toString().padStart(2, '0')}h`;
                      }
                      return `${minutes}min`;
                    };

                    return (
                      <div className="space-y-4">
                        {/* Protection Time Cards for Selected Skin Type (UV 9) */}
                        <div className="bg-navy-charcoal rounded-lg p-4 border border-steel-blue/30">
                          <h4 className="text-lg font-semibold mb-3 text-performance-green">
                            Tempi di Protezione - {selectedData.type} ({selectedData.description})
                          </h4>
                          
                          <div className="grid grid-cols-4 gap-3">
                            <div className="text-center p-3 bg-red-500/20 rounded-lg border border-red-500/30">
                              <div className="text-xs text-slate-400 mb-1">Senza SPF</div>
                              <div className="text-red-400 font-bold text-lg">{selectedData.burnTimes.uv9}min</div>
                            </div>
                            
                            <div className="text-center p-3 bg-yellow-500/20 rounded-lg border border-yellow-500/30">
                              <div className="text-xs text-slate-400 mb-1">SPF 20</div>
                              <div className="text-yellow-400 font-bold text-lg">{formatTime(selectedData.burnTimes.uv9_spf20)}</div>
                            </div>
                            
                            <div className="text-center p-3 bg-blue-500/20 rounded-lg border border-blue-500/30">
                              <div className="text-xs text-slate-400 mb-1">SPF 30</div>
                              <div className="text-blue-400 font-bold text-lg">{formatTime(selectedData.burnTimes.uv9_spf30)}</div>
                            </div>
                            
                            <div className="text-center p-3 bg-green-500/20 rounded-lg border border-green-500/30">
                              <div className="text-xs text-slate-400 mb-1">SPF 50</div>
                              <div className="text-green-400 font-bold text-lg">{formatTime(selectedData.burnTimes.uv9_spf50)}</div>
                            </div>
                          </div>
                        </div>

                        {/* Complete SPF Table with All UV Indices */}
                        <div className="space-y-3 text-sm">
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
                              <span className="text-red-400 font-semibold">{selectedData.burnTimes.uv6}min</span>
                              <span className="text-red-400 font-semibold">{selectedData.burnTimes.uv7}min</span>
                              <span className="text-red-400 font-semibold">{selectedData.burnTimes.uv8}min</span>
                              <span className="text-red-400 font-semibold">{selectedData.burnTimes.uv9}min</span>
                              <span className="text-red-400 font-semibold">{selectedData.burnTimes.uv10}min</span>
                            </div>
                            <div className="grid grid-cols-7 gap-2 text-slate-300">
                              <span className="font-semibold">SPF 20</span>
                              <span className="text-yellow-400">~95%</span>
                              <span className="text-yellow-400 font-semibold">{formatTime(selectedData.burnTimes.uv6_spf20)}</span>
                              <span className="text-orange-400 font-semibold">{formatTime(selectedData.burnTimes.uv7_spf20)}</span>
                              <span className="text-orange-400 font-semibold">{formatTime(selectedData.burnTimes.uv8_spf20)}</span>
                              <span className="text-red-400 font-semibold">{formatTime(selectedData.burnTimes.uv9_spf20)}</span>
                              <span className="text-red-400 font-semibold">{formatTime(selectedData.burnTimes.uv10_spf20)}</span>
                            </div>
                            <div className="grid grid-cols-7 gap-2 text-slate-300">
                              <span className="font-semibold">SPF 30</span>
                              <span className="text-blue-400">~97%</span>
                              <span className="text-yellow-400 font-semibold">{formatTime(selectedData.burnTimes.uv6_spf30)}</span>
                              <span className="text-orange-400 font-semibold">{formatTime(selectedData.burnTimes.uv7_spf30)}</span>
                              <span className="text-orange-400 font-semibold">{formatTime(selectedData.burnTimes.uv8_spf30)}</span>
                              <span className="text-red-400 font-semibold">{formatTime(selectedData.burnTimes.uv9_spf30)}</span>
                              <span className="text-red-400 font-semibold">{formatTime(selectedData.burnTimes.uv10_spf30)}</span>
                            </div>
                            <div className="grid grid-cols-7 gap-2 text-slate-300">
                              <span className="font-semibold">SPF 50</span>
                              <span className="text-green-400">~98%</span>
                              <span className="text-yellow-400 font-semibold">{formatTime(selectedData.burnTimes.uv6_spf50)}</span>
                              <span className="text-orange-400 font-semibold">{formatTime(selectedData.burnTimes.uv7_spf50)}</span>
                              <span className="text-orange-400 font-semibold">{formatTime(selectedData.burnTimes.uv8_spf50)}</span>
                              <span className="text-red-400 font-semibold">{formatTime(selectedData.burnTimes.uv9_spf50)}</span>
                              <span className="text-red-400 font-semibold">{formatTime(selectedData.burnTimes.uv10_spf50)}</span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-3 pt-2 border-t border-steel-blue/30">
                          <p className="text-xs text-slate-400 italic">
                            Tempi personalizzati per {selectedData.description} su tutti gli indici UV. I tempi variano in base a fattori individuali e condizioni ambientali.
                          </p>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>



            </div>
          </div>
          </div>
        </section>
      )}

      {/* Enhanced Popup with Tabs */}
      {popup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-navy-charcoal border border-steel-blue/30 rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto">
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
                            
                            <div className="border-t border-steel-blue/30 pt-3">
                              <p className="text-slate-400 text-xs mb-1">Disponibilità</p>
                              <p className="text-slate-300 text-xs">{product.availability}</p>
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
                            <p className="text-slate-300">{filterData.solubility}</p>
                          </CardContent>
                        </Card>

                        <Card className="bg-steel-blue/20 border-steel-blue/30">
                          <CardHeader>
                            <CardTitle className="flex items-center text-scientific-blue">
                              <Zap className="mr-2 h-5 w-5" />
                              Fotostabilità
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-slate-300">{filterData.photostability}</p>
                          </CardContent>
                        </Card>

                        <Card className="bg-steel-blue/20 border-steel-blue/30">
                          <CardHeader>
                            <CardTitle className="text-scientific-blue">Nome INCI</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-slate-300 font-mono text-sm">{filterData.inciName}</p>
                          </CardContent>
                        </Card>

                        <div className="md:col-span-2">
                          <Card className="bg-steel-blue/20 border-steel-blue/30">
                            <CardHeader>
                              <CardTitle className="text-scientific-blue">Status Regolamentare</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-slate-300">{filterData.regulatoryStatus}</p>
                            </CardContent>
                          </Card>
                        </div>

                        <div className="md:col-span-2">
                          <Card className="bg-steel-blue/20 border-steel-blue/30">
                            <CardHeader>
                              <CardTitle className="text-scientific-blue">Efficacia di Protezione</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="text-center p-3 bg-navy-charcoal rounded-lg">
                                  <div className="text-xs text-slate-400 mb-2">UVB</div>
                                  <div className={`text-lg ${protectionLevels[filterData.uvbProtection].color}`}>
                                    {protectionLevels[filterData.uvbProtection].icon}
                                  </div>
                                  <div className="text-xs text-slate-500 capitalize mt-1">{filterData.uvbProtection}</div>
                                </div>
                                <div className="text-center p-3 bg-navy-charcoal rounded-lg">
                                  <div className="text-xs text-slate-400 mb-2">UVA2</div>
                                  <div className={`text-lg ${protectionLevels[filterData.uva2Protection].color}`}>
                                    {protectionLevels[filterData.uva2Protection].icon}
                                  </div>
                                  <div className="text-xs text-slate-500 capitalize mt-1">{filterData.uva2Protection}</div>
                                </div>
                                <div className="text-center p-3 bg-navy-charcoal rounded-lg">
                                  <div className="text-xs text-slate-400 mb-2">UVA1</div>
                                  <div className={`text-lg ${protectionLevels[filterData.uva1Protection].color}`}>
                                    {protectionLevels[filterData.uva1Protection].icon}
                                  </div>
                                  <div className="text-xs text-slate-500 capitalize mt-1">{filterData.uva1Protection}</div>
                                </div>
                                <div className="text-center p-3 bg-navy-charcoal rounded-lg">
                                  <div className="text-xs text-slate-400 mb-2">Long UVA1</div>
                                  <div className={`text-lg ${protectionLevels[filterData.longUva1Protection].color}`}>
                                    {protectionLevels[filterData.longUva1Protection].icon}
                                  </div>
                                  <div className="text-xs text-slate-500 capitalize mt-1">{filterData.longUva1Protection}</div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>

                        <div className="md:col-span-2">
                          <Card className="bg-steel-blue/20 border-steel-blue/30">
                            <CardHeader>
                              <CardTitle className="text-scientific-blue">Vantaggi Aggiuntivi</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="grid md:grid-cols-2 gap-2">
                                {filterData.extraPoints.map((point, idx) => (
                                  <div key={idx} className="flex items-center">
                                    <CheckCircle className="w-4 h-4 mr-2 text-performance-green" />
                                    <span className="text-slate-300">{point}</span>
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        </div>
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