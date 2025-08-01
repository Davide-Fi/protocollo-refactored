import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function ContactSection() {
  const { toast } = useToast();
  
  // Newsletter form state
  const [newsletterData, setNewsletterData] = useState({
    email: "",
    name: ""
  });

  // Consultation form state
  const [consultationData, setConsultationData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    interest: "",
    message: ""
  });

  // Newsletter subscription mutation
  const newsletterMutation = useMutation({
    mutationFn: async (data: typeof newsletterData) => {
      const response = await apiRequest("POST", "/api/newsletter", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Iscrizione completata!",
        description: "Ti abbiamo aggiunto alla nostra newsletter di longevità.",
      });
      setNewsletterData({ email: "", name: "" });
    },
    onError: (error: any) => {
      toast({
        title: "Errore nell'iscrizione",
        description: error.message || "Si è verificato un errore. Riprova.",
        variant: "destructive",
      });
    },
  });

  // Consultation request mutation
  const consultationMutation = useMutation({
    mutationFn: async (data: typeof consultationData) => {
      const response = await apiRequest("POST", "/api/consultation", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Richiesta inviata!",
        description: "Ti contatteremo presto per la tua consulenza personalizzata.",
      });
      setConsultationData({
        firstName: "",
        lastName: "",
        email: "",
        interest: "",
        message: ""
      });
    },
    onError: (error: any) => {
      toast({
        title: "Errore nell'invio",
        description: error.message || "Si è verificato un errore. Riprova.",
        variant: "destructive",
      });
    },
  });

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterData.email || !newsletterData.name) {
      toast({
        title: "Campi mancanti",
        description: "Compila tutti i campi richiesti.",
        variant: "destructive",
      });
      return;
    }
    newsletterMutation.mutate(newsletterData);
  };

  const handleConsultationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consultationData.firstName || !consultationData.lastName || !consultationData.email || !consultationData.interest) {
      toast({
        title: "Campi mancanti",
        description: "Compila tutti i campi richiesti.",
        variant: "destructive",
      });
      return;
    }
    consultationMutation.mutate(consultationData);
  };

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Newsletter */}
          <div>
            <h3 className="text-3xl font-bold mb-6">Unisciti alla Community Longevità</h3>
            <p className="text-slate-300 mb-8 text-lg">
              Ricevi protocolli esclusivi, aggiornamenti scientifici e consigli personalizzati 
              per ottimizzare la tua longevità maschile.
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="space-y-4">
              <Input
                type="email"
                placeholder="La tua email"
                value={newsletterData.email}
                onChange={(e) => setNewsletterData(prev => ({ ...prev, email: e.target.value }))}
                className="bg-steel-blue/20 border-steel-blue/30 text-white placeholder-slate-400 focus:border-scientific-blue"
                required
              />
              <Input
                type="text"
                placeholder="Nome"
                value={newsletterData.name}
                onChange={(e) => setNewsletterData(prev => ({ ...prev, name: e.target.value }))}
                className="bg-steel-blue/20 border-steel-blue/30 text-white placeholder-slate-400 focus:border-scientific-blue"
                required
              />
              <Button 
                type="submit" 
                className="w-full bg-scientific-blue hover:bg-scientific-blue/80 font-semibold"
                disabled={newsletterMutation.isPending}
              >
                {newsletterMutation.isPending ? "Iscrizione in corso..." : "Iscriviti alla Newsletter"}
              </Button>
            </form>
            
            <div className="flex items-center space-x-4 mt-6 text-sm text-slate-400">
              <Shield className="text-performance-green h-4 w-4" />
              <span>Privacy garantita. Cancellati quando vuoi.</span>
            </div>
          </div>
          
          {/* Contact Form */}
          <div>
            <h3 className="text-3xl font-bold mb-6">Consulenza Protocolli</h3>
            <p className="text-slate-300 mb-8 text-lg">
              Richiedi una consulenza personalizzata per ottimizzare i tuoi protocolli di longevità.
            </p>
            
            <form onSubmit={handleConsultationSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  type="text"
                  placeholder="Nome"
                  value={consultationData.firstName}
                  onChange={(e) => setConsultationData(prev => ({ ...prev, firstName: e.target.value }))}
                  className="bg-steel-blue/20 border-steel-blue/30 text-white placeholder-slate-400 focus:border-scientific-blue"
                  required
                />
                <Input
                  type="text"
                  placeholder="Cognome"
                  value={consultationData.lastName}
                  onChange={(e) => setConsultationData(prev => ({ ...prev, lastName: e.target.value }))}
                  className="bg-steel-blue/20 border-steel-blue/30 text-white placeholder-slate-400 focus:border-scientific-blue"
                  required
                />
              </div>
              <Input
                type="email"
                placeholder="Email"
                value={consultationData.email}
                onChange={(e) => setConsultationData(prev => ({ ...prev, email: e.target.value }))}
                className="bg-steel-blue/20 border-steel-blue/30 text-white placeholder-slate-400 focus:border-scientific-blue"
                required
              />
              <Select onValueChange={(value) => setConsultationData(prev => ({ ...prev, interest: value }))}>
                <SelectTrigger className="bg-steel-blue/20 border-steel-blue/30 text-white focus:border-scientific-blue">
                  <SelectValue placeholder="Area di interesse" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nutrition">Protocolli Nutrizione</SelectItem>
                  <SelectItem value="supplements">Stack Integrazione</SelectItem>
                  <SelectItem value="prevention">Prevenzione</SelectItem>
                  <SelectItem value="complete">Protocollo Completo</SelectItem>
                </SelectContent>
              </Select>
              <Textarea
                placeholder="Descrivere i tuoi obiettivi di longevità..."
                rows={4}
                value={consultationData.message}
                onChange={(e) => setConsultationData(prev => ({ ...prev, message: e.target.value }))}
                className="bg-steel-blue/20 border-steel-blue/30 text-white placeholder-slate-400 focus:border-scientific-blue"
              />
              <Button 
                type="submit" 
                className="w-full bg-performance-green hover:bg-performance-green/80 font-semibold"
                disabled={consultationMutation.isPending}
              >
                {consultationMutation.isPending ? "Invio in corso..." : "Richiedi Consulenza"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
