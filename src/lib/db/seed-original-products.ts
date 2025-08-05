import { db, sunscreenProducts } from './index';

const seedOriginalSunscreenProducts = async () => {
  // Exact original 9 products from before refactoring
  const originalProducts = [
    {
      brand: "La Roche-Posay",
      productName: "Anthelios Ultra Cover",
      spf: 50,
      filters: {
        tinosorbS: true,
        tinosorbM: false,
        mexorylSX: true,
        mexorylXL: true,
        mexoryl400: false,
        uvinulAPlus: false,
        uvinulT150: true,
        homosalate: false,
        octocrylene: false,
        avobenzone: true,
        ethylhexylSalicylate: true,
        octisalate: false,
        enulizole: false,
        octinoxate: false,
        zincOxide: false,
        titaniumDioxide: false,
        overallRating: 5.0
      },
      uva1Rating: "excellent" as const,
      uva2Rating: "excellent" as const,
      uvbRating: "excellent" as const,
      availability: "widely_available" as const,
      notes: "Formula avanzata con Mexoryl XL per fotostabilità extra"
    },
    {
      brand: "Vichy",
      productName: "Capital Soleil",
      spf: 50,
      filters: {
        tinosorbS: true,
        tinosorbM: false,
        mexorylSX: true,
        mexorylXL: false,
        mexoryl400: false,
        uvinulAPlus: false,
        uvinulT150: true,
        homosalate: true,
        octocrylene: true,
        avobenzone: true,
        ethylhexylSalicylate: true,
        octisalate: false,
        enulizole: true,
        octinoxate: false,
        zincOxide: false,
        titaniumDioxide: false,
        overallRating: 4.8
      },
      uva1Rating: "excellent" as const,
      uva2Rating: "excellent" as const,
      uvbRating: "excellent" as const,
      availability: "widely_available" as const,
      notes: "Sistema completo con 8 filtri per protezione massima"
    },
    {
      brand: "ISDIN",
      productName: "Fotoprotetor Fusion Water",
      spf: 50,
      filters: {
        tinosorbS: true,
        tinosorbM: false,
        mexorylSX: false,
        mexorylXL: false,
        mexoryl400: false,
        uvinulAPlus: true,
        uvinulT150: false,
        homosalate: false,
        octocrylene: false,
        avobenzone: false,
        ethylhexylSalicylate: false,
        octisalate: true,
        enulizole: false,
        octinoxate: false,
        zincOxide: false,
        titaniumDioxide: false,
        overallRating: 4.8
      },
      uva1Rating: "excellent" as const,
      uva2Rating: "excellent" as const,
      uvbRating: "excellent" as const,
      availability: "widely_available" as const,
      notes: "Tinosorb S + Uvinul A Plus + Octisalate"
    },
    {
      brand: "Eucerin",
      productName: "Sun Sensitive Protect",
      spf: 30,
      filters: {
        tinosorbS: true,
        tinosorbM: true,
        mexorylSX: false,
        mexorylXL: false,
        mexoryl400: false,
        uvinulAPlus: false,
        uvinulT150: false,
        homosalate: false,
        octocrylene: false,
        avobenzone: false,
        ethylhexylSalicylate: false,
        octisalate: true,
        enulizole: false,
        octinoxate: false,
        zincOxide: false,
        titaniumDioxide: false,
        overallRating: 4.3
      },
      uva1Rating: "excellent" as const,
      uva2Rating: "excellent" as const,
      uvbRating: "good" as const,
      availability: "widely_available" as const,
      notes: "Tinosorb S + M + Octisalate"
    },
    {
      brand: "Avène",
      productName: "Fluide Mineral Teinté",
      spf: 50,
      filters: {
        tinosorbS: false,
        tinosorbM: false,
        mexorylSX: false,
        mexorylXL: false,
        mexoryl400: false,
        uvinulAPlus: false,
        uvinulT150: false,
        homosalate: false,
        octocrylene: false,
        avobenzone: false,
        ethylhexylSalicylate: false,
        octisalate: false,
        enulizole: false,
        octinoxate: false,
        zincOxide: true,
        titaniumDioxide: true,
        overallRating: 4.0
      },
      uva1Rating: "good" as const,
      uva2Rating: "excellent" as const,
      uvbRating: "excellent" as const,
      availability: "widely_available" as const,
      notes: "Zinc Oxide + Titanium Dioxide (Mineral)"
    },
    {
      brand: "Heliocare",
      productName: "Advanced Gel",
      spf: 50,
      filters: {
        tinosorbS: true,
        tinosorbM: false,
        mexorylSX: false,
        mexorylXL: false,
        mexoryl400: false,
        uvinulAPlus: true,
        uvinulT150: true,
        homosalate: false,
        octocrylene: false,
        avobenzone: false,
        ethylhexylSalicylate: false,
        octisalate: false,
        enulizole: false,
        octinoxate: false,
        zincOxide: false,
        titaniumDioxide: false,
        overallRating: 4.7
      },
      uva1Rating: "excellent" as const,
      uva2Rating: "excellent" as const,
      uvbRating: "excellent" as const,
      availability: "limited" as const,
      notes: "Tinosorb S + Uvinul A Plus + T150"
    },
    {
      brand: "Hawaiian Tropic",
      productName: "EU Variant",
      spf: 30,
      filters: {
        tinosorbS: false,
        tinosorbM: false,
        mexorylSX: false,
        mexorylXL: false,
        mexoryl400: false,
        uvinulAPlus: false,
        uvinulT150: false,
        homosalate: true,
        octocrylene: true,
        avobenzone: true,
        ethylhexylSalicylate: false,
        octisalate: false,
        enulizole: false,
        octinoxate: false,
        zincOxide: false,
        titaniumDioxide: false,
        overallRating: 3.8
      },
      uva1Rating: "good" as const,
      uva2Rating: "good" as const,
      uvbRating: "good" as const,
      availability: "widely_available" as const,
      notes: "Protezione quotidiana idratante ad ampio spettro"
    },
    {
      brand: "Bilboa",
      productName: "Carrot Plus",
      spf: 20,
      filters: {
        tinosorbS: false,
        tinosorbM: false,
        mexorylSX: false,
        mexorylXL: false,
        mexoryl400: false,
        uvinulAPlus: true,
        uvinulT150: false,
        homosalate: false,
        octocrylene: false,
        avobenzone: false,
        ethylhexylSalicylate: true,
        octisalate: false,
        enulizole: false,
        octinoxate: true,
        zincOxide: false,
        titaniumDioxide: false,
        overallRating: 3.2
      },
      uva1Rating: "moderate" as const,
      uva2Rating: "good" as const,
      uvbRating: "moderate" as const,
      availability: "limited" as const,
      notes: "Supporto abbronzatura con protezione UVA/UVB base"
    },
    {
      brand: "La Roche-Posay",
      productName: "Anthelios Invisible Spray",
      spf: 30,
      filters: {
        tinosorbS: false,
        tinosorbM: false,
        mexorylSX: false,
        mexorylXL: true,
        mexoryl400: false,
        uvinulAPlus: false,
        uvinulT150: true,
        homosalate: true,
        octocrylene: true,
        avobenzone: true,
        ethylhexylSalicylate: true,
        octisalate: false,
        enulizole: false,
        octinoxate: false,
        zincOxide: false,
        titaniumDioxide: false,
        overallRating: 4.6
      },
      uva1Rating: "excellent" as const,
      uva2Rating: "excellent" as const,
      uvbRating: "excellent" as const,
      availability: "widely_available" as const,
      notes: "Spray dermatologico viso e corpo per pelli sensibili"
    }
  ];

  try {
    // Clear existing products
    await db.delete(sunscreenProducts);
    console.log('🧹 Cleared existing sunscreen products');
    
    // Insert original products
    await db.insert(sunscreenProducts).values(originalProducts);
    console.log(`✅ Successfully seeded ${originalProducts.length} original sunscreen products`);
  } catch (error) {
    console.error('❌ Error seeding original sunscreen products:', error);
    throw error;
  }
};

async function main() {
  try {
    await seedOriginalSunscreenProducts();
    console.log('🎉 Database restored with original products!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database seeding failed:', error);
    process.exit(1);
  }
}

main();