'use client';

import { useState } from "react";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/trpc/client";

export default function ContactSection() {
  const newsletterMutation = api.newsletter.subscribe.useMutation();
  const consultationMutation = api.consultation.create.useMutation();

  // Newsletter form state
  const [newsletterData, setNewsletterData] = useState({
    name: "",
    email: ""
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
      const result = await newsletterMutation.mutateAsync(newsletterData);
      if (result.success) {
        alert("Iscrizione completata! Controlla la tua email.");
        setNewsletterData({ email: "", name: "" });
      } else {
        alert(result.message || "Si è verificato un errore. Riprova.");
      }
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
      const result = await consultationMutation.mutateAsync({
        ...consultationData,
        interest: consultationData.interest as "nutrizione" | "integrazione" | "prevenzione" | "protocollo" | "altro"
      });
      if (result.success) {
        alert("Richiesta inviata con successo! Ti contatteremo a breve.");
        setConsultationData({
          firstName: "",
          lastName: "",
          email: "",
          interest: "",
          message: ""
        });
      } else {
        alert(result.message || "Si è verificato un errore. Riprova.");
      }
    } catch {
      alert("Si è verificato un errore. Riprova.");
    }
  };

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-16">Contatta il Team Protocollo</h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Newsletter Signup */}
          <div className="bg-steel-blue/10 backdrop-blur-sm rounded-2xl p-8 border border-steel-blue/20">
            <h3 className="text-3xl font-bold mb-6">Newsletter Biohacking</h3>
            <p className="text-slate-300 mb-8 text-lg">
              Ricevi protocolli esclusivi, aggiornamenti scientifici e consigli personalizzati 
              per ottimizzare la tua longevità maschile.
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="space-y-4">
              <Input
                type="text"
                placeholder="Nome"
                value={newsletterData.name}
                onChange={(e) => setNewsletterData(prev => ({ ...prev, name: e.target.value }))}
                className="bg-steel-blue/20 border-steel-blue/30 text-white placeholder-slate-400 focus:border-scientific-blue"
                required
              />
              <Input
                type="email"
                placeholder="Email"
                value={newsletterData.email}
                onChange={(e) => setNewsletterData(prev => ({ ...prev, email: e.target.value }))}
                className="bg-steel-blue/20 border-steel-blue/30 text-white placeholder-slate-400 focus:border-scientific-blue"
                required
              />
              <Button 
                type="submit" 
                className="w-full bg-scientific-blue hover:bg-scientific-blue/80 font-semibold"
                disabled={newsletterMutation.isPending}
              >
                {newsletterMutation.isPending ? "Invio in corso..." : "Iscriviti alla Newsletter"}
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
                className="w-full px-4 py-3 bg-steel-blue/20 border border-steel-blue/30 rounded-md text-white placeholder-slate-400 focus:border-scientific-blue focus:outline-none"
                required
              >
                <option value="">Seleziona area di interesse</option>
                <option value="completo">Protocollo Completo</option>
                <option value="nutrizione">Solo Nutrizione</option>
                <option value="integrazione">Solo Integrazione</option>
                <option value="prevenzione">Solo Prevenzione</option>
                <option value="personalizzato">Piano Personalizzato</option>
              </select>
              
              <textarea
                placeholder="Messaggio (opzionale)"
                rows={4}
                value={consultationData.message}
                onChange={(e) => setConsultationData(prev => ({ ...prev, message: e.target.value }))}
                className="w-full px-4 py-3 bg-steel-blue/20 border border-steel-blue/30 rounded-md text-white placeholder-slate-400 focus:border-scientific-blue focus:outline-none resize-none"
              />
              
              <Button 
                type="submit" 
                className="w-full bg-performance-green hover:bg-performance-green/80 font-semibold"
                disabled={consultationMutation.isPending}
              >
                {consultationMutation.isPending ? "Invio in corso..." : "Richiedi Consulenza"}
              </Button>
            </form>
            
            <div className="mt-8 grid md:grid-cols-3 gap-6 text-center">
              <div className="bg-steel-blue/10 p-6 rounded-lg border border-steel-blue/20">
                <p className="text-3xl font-bold text-scientific-blue mb-2">€247</p>
                <p className="text-sm text-slate-400">Protocollo Base</p>
              </div>
              <div className="bg-steel-blue/10 p-6 rounded-lg border border-steel-blue/20">
                <p className="text-3xl font-bold text-scientific-blue mb-2">€497</p>
                <p className="text-sm text-slate-400">Protocollo Avanzato</p>
              </div>
              <div className="bg-steel-blue/10 p-6 rounded-lg border border-steel-blue/20">
                <p className="text-3xl font-bold text-scientific-blue mb-2">€997</p>
                <p className="text-sm text-slate-400">Protocollo Premium</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}