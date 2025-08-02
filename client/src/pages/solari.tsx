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
    inciName: "Drometrizole Trisiloxane",
    uvRange: "≈ 290-400 nm",
    peakWavelength: "UVA-II + UVB range",
    solubility: "Oil-soluble; pairs perfectly with SX, fits into water-resistant 'Netlock' gels",
    photostability: "Photostable; synergises with SX to lift both UVA-PF and SPF",
    regulatoryStatus: "EU/CA/most of world ≤ 5%; not cleared by FDA (so you'll only find it in EU imports)",
    extraPoints: ["Exclusively licensed to the L'Oréal group", "Synergistic with Mexoryl SX"],
    uvbProtection: "strong",
    uva2Protection: "strong",
    uva1Protection: "good",
    longUva1Protection: "moderate"
  },
  {
    tradeName: "Mexoryl® SX",
    inciName: "Ecamsule / Terephthalylidene Dicamphor Sulfonic Acid",
    uvRange: "320-400 nm",
    peakWavelength: "≈ 345 nm",
    solubility: "Water-soluble; creates elegant textures in aqueous formulations",
    photostability: "Highly photostable; maintains effectiveness under UV exposure",
    regulatoryStatus: "EU/CA/most of world approved; FDA approved (limited use)",
    extraPoints: ["Deep UVA-I focus", "Exclusively licensed to the L'Oréal group", "Synergistic with Mexoryl XL"],
    uvbProtection: "moderate",
    uva2Protection: "strong",
    uva1Protection: "strong",
    longUva1Protection: "good"
  }
];

const protectionLevels = {
  strong: { icon: "✅✅", color: "bg-green-500", label: "Strong" },
  good: { icon: "✅", color: "bg-blue-500", label: "Good" },
  moderate: { icon: "⚠️", color: "bg-yellow-500", label: "Moderate" },
  incomplete: { icon: "❌", color: "bg-red-500", label: "Incomplete" }
};

export default function SolariPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [solubilityFilters, setSolubilityFilters] = useState<string[]>([]);
  const [regulatoryFilters, setRegulatoryFilters] = useState<string[]>([]);
  const [uvRangeFilters, setUvRangeFilters] = useState<string[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<SunscreenFilter | null>(null);

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
          
          <p className="text-xl text-slate-300 mb-12 leading-relaxed max-w-3xl mx-auto">
            Trova e confronta i filtri solari più avanzati per nome chimico, spettro UV, 
            solubilità e approvazioni regolatorie.
          </p>
        </div>
      </section>

      {/* Filters Section */}
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

      {/* Results Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">
              Filtri Trovati ({filteredFilters.length})
            </h2>
            <Badge variant="outline" className="border-scientific-blue text-scientific-blue">
              {filteredFilters.length} di {sunscreenFilters.length}
            </Badge>
          </div>

          <div className="grid gap-6">
            {filteredFilters.map((filter, index) => (
              <Card key={index} className="bg-steel-blue/20 border-steel-blue/30 hover:border-scientific-blue/50 transition-colors cursor-pointer"
                    onClick={() => setSelectedFilter(filter)}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl text-scientific-blue mb-2">
                        {filter.tradeName}
                      </CardTitle>
                      <p className="text-slate-300 text-sm">{filter.inciName}</p>
                    </div>
                    <Badge className="bg-performance-green text-black font-semibold">
                      {filter.uvRange}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-sm text-slate-400 mb-1">UVB (280-320nm)</div>
                      <div className={`inline-flex items-center px-2 py-1 rounded text-xs font-semibold ${protectionLevels[filter.uvbProtection].color} text-white`}>
                        {protectionLevels[filter.uvbProtection].icon} {protectionLevels[filter.uvbProtection].label}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-slate-400 mb-1">UVA2 (320-340nm)</div>
                      <div className={`inline-flex items-center px-2 py-1 rounded text-xs font-semibold ${protectionLevels[filter.uva2Protection].color} text-white`}>
                        {protectionLevels[filter.uva2Protection].icon} {protectionLevels[filter.uva2Protection].label}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-slate-400 mb-1">UVA1 (340-400nm)</div>
                      <div className={`inline-flex items-center px-2 py-1 rounded text-xs font-semibold ${protectionLevels[filter.uva1Protection].color} text-white`}>
                        {protectionLevels[filter.uva1Protection].icon} {protectionLevels[filter.uva1Protection].label}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-slate-400 mb-1">Long UVA1 (380-400nm)</div>
                      <div className={`inline-flex items-center px-2 py-1 rounded text-xs font-semibold ${protectionLevels[filter.longUva1Protection].color} text-white`}>
                        {protectionLevels[filter.longUva1Protection].icon} {protectionLevels[filter.longUva1Protection].label}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {filter.extraPoints.map((point, idx) => (
                      <Badge key={idx} variant="outline" className="border-performance-green text-performance-green text-xs">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        {point}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-scientific-blue text-scientific-blue hover:bg-scientific-blue hover:text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFilter(filter);
                    }}
                  >
                    Vedi Dettagli Completi
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

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