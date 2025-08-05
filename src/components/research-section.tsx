import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function ResearchSection() {
  const articles = [
    {
      image: "/attached_assets/generated_images/Italian_man_nutrition_research_study_ed0b681f.webp",
      category: "NUTRIZIONE",
      title: "Intermittent Fasting e Longevità",
      excerpt: "Nuovi studi dimostrano come il digiuno intermittente possa aumentare l&apos;aspettativa di vita del 15-20%.",
      date: "15 Gen 2024",
      categoryColor: "scientific-blue"
    },
    {
      image: "/attached_assets/generated_images/Italian_man_taking_supplements_research_e63753c6.webp",
      category: "INTEGRAZIONE",
      title: "NAD+ e Prestazioni Cognitive",
      excerpt: "Ricerca su come i precursori del NAD+ migliorino memoria e focus negli over 40.",
      date: "12 Gen 2024",
      categoryColor: "performance-green"
    },
    {
      image: "/attached_assets/generated_images/Italian_man_prevention_research_biomarkers_2a7baa78.webp",
      category: "PREVENZIONE",
      title: "Biomarcatori Predittivi del Aging",
      excerpt: "Identificati 12 biomarcatori chiave per predire l&apos;invecchiamento biologico.",
      date: "8 Gen 2024",
      categoryColor: "yellow-500"
    }
  ];

  return (
    <section id="ricerca" className="py-20 bg-steel-blue/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-black mb-6">
            Ricerca <span className="text-scientific-blue">Scientifica</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Studi e ricerche all&apos;avanguardia sulla longevità maschile e l&apos;ottimizzazione delle prestazioni.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <article key={index} className="bg-navy-charcoal border border-steel-blue/30 rounded-lg overflow-hidden hover:border-scientific-blue/50 transition-colors">
              <Image 
                src={article.image}
                alt={article.title} 
                className="w-full h-48 object-cover"
                width={300}
                height={200}
              />
              
              <div className="p-6">
                <div className={`text-${article.categoryColor} text-sm font-semibold mb-2`}>
                  {article.category}
                </div>
                <h3 className="text-xl font-bold mb-3">{article.title}</h3>
                <p className="text-slate-400 text-sm mb-4">{article.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">{article.date}</span>
                  <button className="text-scientific-blue text-sm font-semibold hover:underline">
                    Leggi Studio
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button className="bg-scientific-blue hover:bg-scientific-blue/80 text-white px-8 py-3 font-semibold">
            Vedi Tutte le Ricerche
          </Button>
        </div>
      </div>
    </section>
  );
}