'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, Mail, Phone, MapPin, MessageSquare, ArrowRight } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    goals: '',
    experience: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSubmitted(true);
    setIsSubmitting(false);
    
    // Reset form after success message
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        age: '',
        goals: '',
        experience: '',
        message: ''
      });
    }, 3000);
  };

  const consultationTypes = [
    {
      title: "Consultazione Completa",
      duration: "90 minuti",
      description: "Analisi approfondita di biomarker, storia medica e creazione del protocollo personalizzato",
      price: "€297",
      includes: [
        "Analisi biomarker completa",
        "Valutazione genetica opzionale",
        "Protocollo nutrizionale",
        "Piano integrazione",
        "Follow-up 30 giorni"
      ]
    },
    {
      title: "Consultazione Express",
      duration: "45 minuti",
      description: "Valutazione rapida e ottimizzazione di protocolli esistenti",
      price: "€147",
      includes: [
        "Review biomarker recenti",
        "Aggiustamenti protocollo",
        "Q&A approfondite",
        "Raccomandazioni immediate"
      ]
    },
    {
      title: "Follow-up Personalizzato",
      duration: "30 minuti",
      description: "Monitoraggio progressi e aggiustamenti protocollo",
      price: "€97",
      includes: [
        "Review progressi",
        "Aggiustamenti necessari",
        "Nuove raccomandazioni",
        "Planning fase successiva"
      ]
    }
  ];

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      details: "consultazioni@protocollo.it",
      description: "Risposta entro 24 ore"
    },
    {
      icon: Phone,
      title: "Telefono",
      details: "+39 02 1234 5678",
      description: "Lun-Ven 9:00-18:00"
    },
    {
      icon: MapPin,
      title: "Sede",
      details: "Milano, Zona Brera",
      description: "Consultazioni anche online"
    },
    {
      icon: Calendar,
      title: "Disponibilità",
      details: "Prenota online",
      description: "Slot disponibili ogni settimana"
    }
  ];

  if (submitted) {
    return (
      <section id="contact" className="py-20 bg-gradient-to-br from-background to-performance-green/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-performance-green/10 to-scientific-blue/10 rounded-2xl p-12 border border-performance-green/20">
            <div className="w-16 h-16 bg-performance-green/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageSquare className="w-8 h-8 text-performance-green" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Richiesta Inviata con Successo!</h3>
            <p className="text-lg text-muted-foreground mb-6">
              Grazie per il tuo interesse. Ti contatteremo entro 24 ore per programmare la tua consultazione personalizzata.
            </p>
            <div className="bg-background/50 rounded-lg p-4 inline-block">
              <p className="text-sm text-performance-green">
                Nel frattempo, controlla la tua email per i dettagli sulla preparazione alla consultazione.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-background to-performance-green/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-performance-green/10 border border-performance-green/20 text-performance-green text-sm font-medium mb-6">
            <Calendar className="w-4 h-4 mr-2" />
            Consultazione Personalizzata
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Inizia il Tuo Percorso verso la
            <span className="text-performance-green"> Longevità Ottimale</span>
          </h2>
          
          <p className="text-xl text-muted-foreground leading-relaxed">
            Prenota una consultazione personalizzata per scoprire come i nostri protocolli scientifici 
            possono trasformare la tua salute, performance e longevità.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Consultation Types */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">Tipi di Consultazione</h3>
            
            {consultationTypes.map((consultation, index) => (
              <Card key={index} className="bg-card/50 border-border hover:bg-card/70 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-lg text-white">{consultation.title}</CardTitle>
                    <div className="text-right">
                      <div className="text-lg font-bold text-performance-green">{consultation.price}</div>
                      <div className="text-sm text-muted-foreground">{consultation.duration}</div>
                    </div>
                  </div>
                  <CardDescription className="text-muted-foreground">
                    {consultation.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-white mb-2">Incluso:</div>
                    {consultation.includes.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-performance-green rounded-full mr-3 flex-shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Contact Info */}
            <div className="grid md:grid-cols-2 gap-4 mt-8">
              {contactInfo.map((contact, index) => (
                <div key={index} className="bg-gradient-to-br from-scientific-blue/10 to-performance-green/10 rounded-lg p-4 border border-border">
                  <div className="flex items-center space-x-3">
                    <div className="bg-background/50 p-2 rounded-lg">
                      <contact.icon className="w-5 h-5 text-scientific-blue" />
                    </div>
                    <div>
                      <div className="font-semibold text-white text-sm">{contact.title}</div>
                      <div className="text-sm text-performance-green">{contact.details}</div>
                      <div className="text-xs text-muted-foreground">{contact.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div>
            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle className="text-xl text-white">Richiedi Consultazione</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Compila il form per ricevere una proposta personalizzata
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                        Nome Completo *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Il tuo nome"
                        className="bg-background/50"
                      />
                    </div>
                    <div>
                      <label htmlFor="age" className="block text-sm font-medium text-white mb-2">
                        Età
                      </label>
                      <Input
                        id="age"
                        name="age"
                        type="number"
                        value={formData.age}
                        onChange={handleInputChange}
                        placeholder="35"
                        className="bg-background/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="nome@email.com"
                      className="bg-background/50"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
                      Telefono
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+39 123 456 7890"
                      className="bg-background/50"
                    />
                  </div>

                  <div>
                    <label htmlFor="goals" className="block text-sm font-medium text-white mb-2">
                      Obiettivi Principali
                    </label>
                    <select
                      id="goals"
                      name="goals"
                      value={formData.goals}
                      onChange={handleInputChange}
                      className="w-full h-9 rounded-md border border-input bg-background/50 px-3 py-1 text-sm text-white"
                    >
                      <option value="">Seleziona obiettivo</option>
                      <option value="testosterone">Ottimizzazione Testosterone</option>
                      <option value="energy">Aumento Energia</option>
                      <option value="body-composition">Composizione Corporea</option>
                      <option value="longevity">Longevità e Anti-aging</option>
                      <option value="performance">Performance Atletica</option>
                      <option value="prevention">Prevenzione Malattie</option>
                      <option value="cognitive">Funzione Cognitiva</option>
                      <option value="other">Altro</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="experience" className="block text-sm font-medium text-white mb-2">
                      Esperienza con Protocolli
                    </label>
                    <select
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="w-full h-9 rounded-md border border-input bg-background/50 px-3 py-1 text-sm text-white"
                    >
                      <option value="">Seleziona livello</option>
                      <option value="beginner">Principiante</option>
                      <option value="intermediate">Intermedio</option>
                      <option value="advanced">Avanzato</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                      Note Aggiuntive
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Descrivi la tua situazione attuale, eventuali problemi di salute, farmaci che assumi..."
                      className="w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm text-white placeholder:text-muted-foreground resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="performance"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Clock className="w-5 h-5 mr-2 animate-spin" />
                        Invio in corso...
                      </>
                    ) : (
                      <>
                        Richiedi Consultazione
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    Cliccando su &quot;Richiedi Consultazione&quot; accetti i nostri termini di servizio e la privacy policy.
                    Ti contatteremo entro 24 ore per confermare l&apos;appuntamento.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}