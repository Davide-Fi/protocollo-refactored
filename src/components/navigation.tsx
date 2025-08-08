'use client';

import { useState } from "react";
import { Menu, X, Dna } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-navy-charcoal/95 backdrop-blur-sm z-50 border-b border-steel-blue/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-scientific-blue rounded-sm flex items-center justify-center">
              <Dna className="text-white h-6 w-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight">Protocollo</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/il-protocollo"
              className="text-slate-300 hover:text-scientific-blue font-medium transition-colors"
            >
              Il Protocollo
            </Link>
            <Link 
              href="/protocollo-old"
              className="text-slate-300 hover:text-scientific-blue font-medium transition-colors"
            >
              Protocollo (Old)
            </Link>
            <Link 
              href="/integratori"
              className="text-slate-300 hover:text-scientific-blue font-medium transition-colors"
            >
              Integratori
            </Link>
            <Link 
              href="/solari"
              className="text-slate-300 hover:text-scientific-blue font-medium transition-colors"
            >
              Filtri Solari
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link href="/il-protocollo">
              <Button 
                className="bg-scientific-blue hover:bg-scientific-blue/80 text-white font-semibold"
              >
                Inizia Ora
              </Button>
            </Link>
            <button 
              className="md:hidden text-slate-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-steel-blue/30 py-4">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/il-protocollo"
                className="text-slate-300 hover:text-scientific-blue font-medium transition-colors text-left"
                onClick={() => setIsMenuOpen(false)}
              >
                Il Protocollo
              </Link>
              <Link 
                href="/protocollo-old"
                className="text-slate-300 hover:text-scientific-blue font-medium transition-colors text-left"
                onClick={() => setIsMenuOpen(false)}
              >
                Protocollo (Old)
              </Link>
              <Link 
                href="/integratori"
                className="text-slate-300 hover:text-scientific-blue font-medium transition-colors text-left"
                onClick={() => setIsMenuOpen(false)}
              >
                Integratori
              </Link>
              <Link 
                href="/solari"
                className="text-slate-300 hover:text-scientific-blue font-medium transition-colors text-left"
                onClick={() => setIsMenuOpen(false)}
              >
                Filtri Solari
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}