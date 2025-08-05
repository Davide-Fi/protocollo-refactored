import { db } from './seed-client';
import { sunscreenProducts } from './schema';

const seedSunscreenProducts = async () => {
  console.log('🌱 Seeding sunscreen products...');
  
  const products = [
    {
      brand: "La Roche-Posay",
      productName: "Anthelios Ultra Cover",
      spf: 50,
      filters: {
        chemical: ["Tinosorb S", "Mexoryl SX", "Mexoryl XL", "Uvinul T150", "Avobenzone", "Ethylhexyl Salicylate"],
        mineral: []
      },
      uva1Rating: "excellent" as const,
      uva2Rating: "excellent" as const,
      uvbRating: "excellent" as const,
      textureRating: "excellent" as const,
      priceRange: "premium" as const,
      availability: "widely_available" as const,
      notes: "Formula avanzata con Mexoryl XL per fotostabilità extra. Disponibile in Italia."
    },
    {
      brand: "Vichy",
      productName: "Capital Soleil",
      spf: 50,
      filters: {
        chemical: ["Tinosorb S", "Mexoryl SX", "Uvinul T150", "Homosalate", "Octocrylene", "Avobenzone", "Ethylhexyl Salicylate", "Ensulizole"],
        mineral: []
      },
      uva1Rating: "excellent" as const,
      uva2Rating: "excellent" as const,
      uvbRating: "excellent" as const,
      textureRating: "good" as const,
      priceRange: "premium" as const,
      availability: "widely_available" as const,
      notes: "Protezione completa con texture leggera"
    },
    {
      brand: "EAU THERMALE Avène",
      productName: "Fluide Sport SPF 50+",
      spf: 50,
      filters: {
        chemical: ["Tinosorb S", "Tinosorb M", "Uvinul A Plus", "Uvinul T150"],
        mineral: []
      },
      uva1Rating: "excellent" as const,
      uva2Rating: "excellent" as const,
      uvbRating: "excellent" as const,
      textureRating: "excellent" as const,
      priceRange: "premium" as const,
      availability: "widely_available" as const,
      notes: "Formula water-resistant ideale per lo sport"
    },
    {
      brand: "ISDIN",
      productName: "Fusion Water",
      spf: 50,
      filters: {
        chemical: ["Tinosorb S", "Uvinul A Plus", "Uvinul T150", "Ethylhexyl Salicylate", "Homosalate"],
        mineral: []
      },
      uva1Rating: "good" as const,
      uva2Rating: "excellent" as const,
      uvbRating: "excellent" as const,
      textureRating: "excellent" as const,
      priceRange: "mid" as const,
      availability: "widely_available" as const,
      notes: "Base acquosa, ideale per pelli grasse"
    },
    {
      brand: "Eucerin",
      productName: "Oil Control SPF 50+",
      spf: 50,
      filters: {
        chemical: ["Tinosorb S", "Uvinul A Plus", "Uvinul T150", "Homosalate", "Ethylhexyl Salicylate"],
        mineral: []
      },
      uva1Rating: "good" as const,
      uva2Rating: "excellent" as const,
      uvbRating: "excellent" as const,
      textureRating: "excellent" as const,
      priceRange: "mid" as const,
      availability: "widely_available" as const,
      notes: "Formula oil-free con controllo del sebo"
    },
    {
      brand: "Garnier",
      productName: "Ambre Solaire Sensitive Expert+",
      spf: 50,
      filters: {
        chemical: ["Tinosorb S", "Mexoryl XL", "Uvinul T150", "Octocrylene", "Avobenzone"],
        mineral: []
      },
      uva1Rating: "good" as const,
      uva2Rating: "good" as const,
      uvbRating: "excellent" as const,
      textureRating: "good" as const,
      priceRange: "budget" as const,
      availability: "widely_available" as const,
      notes: "Buon rapporto qualità-prezzo"
    },
    {
      brand: "Rilastil",
      productName: "Sun System Water Touch",
      spf: 50,
      filters: {
        chemical: ["Tinosorb M", "Tinosorb S", "Uvinul A Plus", "Uvinul T150"],
        mineral: []
      },
      uva1Rating: "excellent" as const,
      uva2Rating: "excellent" as const,
      uvbRating: "excellent" as const,
      textureRating: "excellent" as const,
      priceRange: "premium" as const,
      availability: "limited" as const,
      notes: "Formula italiana di alta qualità"
    },
    {
      brand: "P20",
      productName: "Suncare for Kids",
      spf: 50,
      filters: {
        chemical: ["Tinosorb S", "Tinosorb M", "Uvinul A Plus", "Uvinul T150"],
        mineral: []
      },
      uva1Rating: "excellent" as const,
      uva2Rating: "excellent" as const,
      uvbRating: "excellent" as const,
      textureRating: "good" as const,
      priceRange: "premium" as const,
      availability: "limited" as const,
      notes: "Formula per bambini, molto resistente all'acqua"
    },
    {
      brand: "Ultrasun",
      productName: "Face Anti-Ageing",
      spf: 50,
      filters: {
        chemical: ["Tinosorb S", "Tinosorb M", "Uvinul A Plus", "Uvinul T150", "Octinoxate"],
        mineral: ["Titanium Dioxide"]
      },
      uva1Rating: "excellent" as const,
      uva2Rating: "excellent" as const,
      uvbRating: "excellent" as const,
      textureRating: "good" as const,
      priceRange: "premium" as const,
      availability: "limited" as const,
      notes: "Formula svizzera anti-età"
    },
    {
      brand: "Bioderma",
      productName: "Photoderm MAX",
      spf: 50,
      filters: {
        chemical: ["Tinosorb S", "Tinosorb M", "Uvinul A Plus", "Octocrylene", "Avobenzone"],
        mineral: []
      },
      uva1Rating: "excellent" as const,
      uva2Rating: "excellent" as const,
      uvbRating: "excellent" as const,
      textureRating: "good" as const,
      priceRange: "premium" as const,
      availability: "widely_available" as const,
      notes: "Tecnologia Cellular Bioprotection"
    },
    {
      brand: "SVR",
      productName: "Cicavit+ SPF 50+",
      spf: 50,
      filters: {
        chemical: ["Tinosorb S", "Uvinul A Plus", "Uvinul T150", "Octisalate"],
        mineral: []
      },
      uva1Rating: "good" as const,
      uva2Rating: "excellent" as const,
      uvbRating: "excellent" as const,
      textureRating: "excellent" as const,
      priceRange: "mid" as const,
      availability: "widely_available" as const,
      notes: "Formula riparatrice con SPF"
    },
    {
      brand: "Cetaphil",
      productName: "Sun SPF 50+ Light Gel",
      spf: 50,
      filters: {
        chemical: ["Tinosorb S", "Uvinul A Plus", "Octocrylene", "Avobenzone"],
        mineral: []
      },
      uva1Rating: "good" as const,
      uva2Rating: "good" as const,
      uvbRating: "excellent" as const,
      textureRating: "excellent" as const,
      priceRange: "mid" as const,
      availability: "widely_available" as const,
      notes: "Texture gel leggera"
    },
    {
      brand: "Angstrom",
      productName: "Protect Hydraxol",
      spf: 50,
      filters: {
        chemical: ["Tinosorb S", "Uvinul A Plus", "Uvinul T150", "Homosalate"],
        mineral: []
      },
      uva1Rating: "good" as const,
      uva2Rating: "excellent" as const,
      uvbRating: "excellent" as const,
      textureRating: "good" as const,
      priceRange: "mid" as const,
      availability: "widely_available" as const,
      notes: "Formula idratante italiana"
    },
    {
      brand: "Caudalie",
      productName: "Vinosun Protect",
      spf: 50,
      filters: {
        chemical: ["Tinosorb S", "Uvinul A Plus", "Octisalate", "Homosalate"],
        mineral: []
      },
      uva1Rating: "moderate" as const,
      uva2Rating: "good" as const,
      uvbRating: "excellent" as const,
      textureRating: "excellent" as const,
      priceRange: "premium" as const,
      availability: "widely_available" as const,
      notes: "Formula naturale con antiossidanti"
    },
    {
      brand: "Heliocare",
      productName: "360° Gel Oil-Free",
      spf: 50,
      filters: {
        chemical: ["Tinosorb S", "Tinosorb M", "Uvinul A Plus", "Uvinul T150"],
        mineral: []
      },
      uva1Rating: "excellent" as const,
      uva2Rating: "excellent" as const,
      uvbRating: "excellent" as const,
      textureRating: "excellent" as const,
      priceRange: "premium" as const,
      availability: "limited" as const,
      notes: "Con Fernblock, tecnologia antiossidante"
    }
  ];

  try {
    await db.insert(sunscreenProducts).values(products);
    console.log(`✅ Successfully seeded ${products.length} sunscreen products`);
  } catch (error) {
    console.error('❌ Error seeding sunscreen products:', error);
    throw error;
  }
};

async function main() {
  try {
    await seedSunscreenProducts();
    console.log('🎉 Database seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database seeding failed:', error);
    process.exit(1);
  }
}

main();