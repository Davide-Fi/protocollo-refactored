'use client';

import { Dna } from "lucide-react";
import { FaTwitter, FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-steel-blue/30 border-t border-steel-blue/30 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-scientific-blue rounded-sm flex items-center justify-center">
                <Dna className="text-white h-6 w-6" />
              </div>
              <span className="text-2xl font-bold">Protocollo</span>
            </div>
            <p className="text-slate-400 mb-6">
              Ottimizzazione longevità basata su evidenze scientifiche.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-scientific-blue transition-colors">
                <FaTwitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-scientific-blue transition-colors">
                <FaInstagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-scientific-blue transition-colors">
                <FaYoutube className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-scientific-blue transition-colors">
                <FaLinkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Protocolli</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link 
                  href="/il-protocollo"
                  className="hover:text-scientific-blue transition-colors"
                >
                  Il Protocollo
                </Link>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('nutrizione')}
                  className="hover:text-scientific-blue transition-colors"
                >
                  Nutrizione
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('integrazione')}
                  className="hover:text-scientific-blue transition-colors"
                >
                  Integrazione
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('prevenzione')}
                  className="hover:text-scientific-blue transition-colors"
                >
                  Prevenzione
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('dashboard')}
                  className="hover:text-scientific-blue transition-colors"
                >
                  Dashboard
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Risorse</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link 
                  href="/solari"
                  className="hover:text-scientific-blue transition-colors"
                >
                  Filtri Solari
                </Link>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('ricerca')}
                  className="hover:text-scientific-blue transition-colors"
                >
                  Ricerca
                </button>
              </li>
              <li><a href="#" className="hover:text-scientific-blue transition-colors">Guide Gratuite</a></li>
              <li><a href="#" className="hover:text-scientific-blue transition-colors">App Mobile</a></li>
              <li><a href="#" className="hover:text-scientific-blue transition-colors">Community</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Supporto</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#" className="hover:text-scientific-blue transition-colors">Centro Assistenza</a></li>
              <li><a href="#" className="hover:text-scientific-blue transition-colors">Contatti</a></li>
              <li><a href="#" className="hover:text-scientific-blue transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-scientific-blue transition-colors">Termini di Uso</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-steel-blue/30 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-slate-400 text-sm">
            © 2024 Protocollo.io. Tutti i diritti riservati.
          </div>
          <div className="text-slate-400 text-sm mt-4 md:mt-0">
            Ottimizzazione longevità maschile basata su scienza
          </div>
        </div>
      </div>
    </footer>
  );
}