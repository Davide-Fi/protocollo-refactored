'use client';

import { useState } from "react";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ContactSection() {
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

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterData.email || !newsletterData.name) {
      alert("Compila tutti i campi richiesti.");
      return;
    }
    
    try {
      // TODO: Implement API call when tRPC is properly configured
      console.log("Newsletter submission:", newsletterData);
      alert("Iscrizione completata!");
      setNewsletterData({ email: "", name: "" });
    } catch {
      alert("Si è verificato un errore. Riprova.");
    }
  };

  const handleConsultationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consultationData.firstName || !consultationData.lastName || !consultationData.email || !consultationData.interest) {
      alert("Compila tutti i campi richiesti.");
      return;
    }
    
    try {
      // TODO: Implement API call when tRPC is properly configured
      console.log("Consultation submission:", consultationData);
      alert("Richiesta inviata!");
      setConsultationData({
        firstName: "",
        lastName: "",
        email: "",
        interest: "",
        message: ""
      });
    } catch {
      alert("Si è verificato un errore. Riprova.");
    }
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
              >
                Iscriviti alla Newsletter
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
              <select
                value={consultationData.interest}
                onChange={(e) => setConsultationData(prev => ({ ...prev, interest: e.target.value }))}
                className="w-full bg-steel-blue/20 border border-steel-blue/30 text-white focus:border-scientific-blue rounded-md px-3 py-2"
                required
              >
                <option value="">Area di interesse</option>
                <option value="nutrition">Protocolli Nutrizione</option>
                <option value="supplements">Stack Integrazione</option>
                <option value="prevention">Prevenzione</option>
                <option value="complete">Protocollo Completo</option>
              </select>
              <textarea
                placeholder="Descrivere i tuoi obiettivi di longevità..."
                rows={4}
                value={consultationData.message}
                onChange={(e) => setConsultationData(prev => ({ ...prev, message: e.target.value }))}
                className="w-full bg-steel-blue/20 border border-steel-blue/30 text-white placeholder-slate-400 focus:border-scientific-blue rounded-md px-3 py-2"
              />
              <Button 
                type="submit" 
                className="w-full bg-performance-green hover:bg-performance-green/80 font-semibold"
              >
                Richiedi Consulenza
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}