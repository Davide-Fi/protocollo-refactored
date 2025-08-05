'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Activity, Mail, MapPin, Phone, Instagram, Linkedin, Youtube } from "lucide-react";

export default function Footer() {
  const footerSections = [
    {
      title: "Servizi",
      links: [
        { name: "Consultazione Completa", href: "#contact" },
        { name: "Analisi Biomarker", href: "#research" },
        { name: "Protocolli Nutrizionali", href: "#nutrizione" },
        { name: "Supplementazione", href: "#integrazione" },
        { name: "Medicina Preventiva", href: "#prevenzione" }
      ]
    },
    {
      title: "Risorse",
      links: [
        { name: "Ricerca Scientifica", href: "#research" },
        { name: "Blog & Articoli", href: "/blog" },
        { name: "Guide Gratuite", href: "/guide" },
        { name: "Webinar", href: "/webinar" },
        { name: "FAQ", href: "/faq" }
      ]
    },
    {
      title: "Azienda",
      links: [
        { name: "Chi Siamo", href: "/about" },
        { name: "Il Team", href: "/team" },
        { name: "Certificazioni", href: "/certificazioni" },
        { name: "Partnership", href: "/partnership" },
        { name: "Carriere", href: "/carriere" }
      ]
    },
    {
      title: "Supporto",
      links: [
        { name: "Centro Assistenza", href: "/supporto" },
        { name: "Contatti", href: "#contact" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Termini di Servizio", href: "/termini" },
        { name: "Cookie Policy", href: "/cookie" }
      ]
    }
  ];

  const socialLinks = [
    { icon: Instagram, href: "https://instagram.com/protocollo", label: "Instagram" },
    { icon: Linkedin, href: "https://linkedin.com/company/protocollo", label: "LinkedIn" },
    { icon: Youtube, href: "https://youtube.com/@protocollo", label: "YouTube" }
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log('Newsletter signup');
  };

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.getElementById(href.substring(1));
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gradient-to-br from-navy-charcoal to-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-6 gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <div className="bg-gradient-to-br from-scientific-blue to-performance-green p-2 rounded-lg">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">Protocollo</span>
              </div>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                La piattaforma italiana leader nell&apos;ottimizzazione scientifica della longevità maschile. 
                Protocolli evidence-based per massimizzare salute, performance e qualità della vita.
              </p>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-3 text-scientific-blue" />
                  Milano, Zona Brera
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Phone className="w-4 h-4 mr-3 text-scientific-blue" />
                  +39 02 1234 5678
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Mail className="w-4 h-4 mr-3 text-scientific-blue" />
                  info@protocollo.it
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-background/50 p-2 rounded-lg hover:bg-scientific-blue/20 transition-colors group"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-scientific-blue transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section, index) => (
              <div key={index}>
                <h3 className="font-semibold text-white mb-4">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <button
                        onClick={() => scrollToSection(link.href)}
                        className="text-sm text-muted-foreground hover:text-scientific-blue transition-colors"
                      >
                        {link.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="py-8 border-t border-border">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                Rimani Aggiornato sulle Ultime Ricerche
              </h3>
              <p className="text-muted-foreground">
                Ricevi weekly insights su longevità, biohacking e ottimizzazione della salute maschile.
              </p>
            </div>
            
            <form onSubmit={handleNewsletterSubmit} className="flex gap-3">
              <Input
                type="email"
                placeholder="La tua email"
                className="bg-background/50 flex-1"
                required
              />
              <Button variant="scientific" type="submit">
                <Mail className="w-4 h-4 mr-2" />
                Iscriviti
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © 2024 Protocollo. Tutti i diritti riservati.
            </div>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <button className="hover:text-scientific-blue transition-colors">
                Privacy Policy
              </button>
              <button className="hover:text-scientific-blue transition-colors">
                Termini di Servizio
              </button>
              <button className="hover:text-scientific-blue transition-colors">
                Cookie Policy
              </button>
              <div className="flex items-center">
                <span className="mr-2">Made with</span>
                <div className="w-4 h-4 bg-red-500 rounded-sm animate-pulse" />
                <span className="ml-2">in Italy</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-scientific-blue/50 to-transparent" />
    </footer>
  );
}