const axios = require('axios');
const fs = require('fs').promises;
const Tesseract = require('tesseract.js');
const sharp = require('sharp');

async function extractAllSupplements() {
  console.log('🔬 BLUEPRINT SUPPLEMENTS OCR EXTRACTION\n');
  console.log('=' .repeat(60));
  
  // Individual supplement products (excluding stacks, packs, bundles)
  const supplementProducts = [
    'advanced-antioxidants',
    'ashwagandha-rhodiola-120mg', 
    'collagen',
    'creatine',
    'essentials-capsules',
    'extra-virgin-olive-oil',
    'longevity-blend-multinutrient-drink-mix-blood-orange-flavor',
    'nac-ginger-capsules',
    'hair-peptide-serum',
    'hair-peptide-shampoo',
    'macadamia-protein-bar',
    'metabolic-protein',
    'longevity-protein',
    'blueberry-nut-mix',
    'nutty-butter',
    'cocoa',
    'macadamia-nut-oil'
  ];

  const allResults = [];

  for (const handle of supplementProducts) {
    console.log(`\n📦 Processing: ${handle}`);
    console.log('-'.repeat(40));
    
    try {
      // Get product JSON
      const productUrl = `https://blueprint.bryanjohnson.com/products/${handle}.json`;
      const response = await axios.get(productUrl);
      const product = response.data.product;
      
      console.log(`✓ Product: ${product.title}`);
      console.log(`  Type: ${product.product_type}`);
      
      // Look for ingredient/nutrition images
      const nutritionImages = [];
      
      for (const image of product.images || []) {
        const src = image.src;
        const alt = image.alt || '';
        
        // Check if this might be nutrition/ingredient info
        if (src && (
          src.includes('ingredient') ||
          src.includes('nutrition') ||
          src.includes('supplement') ||
          src.includes('facts') ||
          alt.toLowerCase().includes('ingredient') ||
          alt.toLowerCase().includes('nutrition') ||
          alt.toLowerCase().includes('supplement')
        )) {
          nutritionImages.push({
            src,
            alt,
            position: image.position
          });
        }
      }
      
      if (nutritionImages.length > 0) {
        console.log(`  Found ${nutritionImages.length} potential nutrition images`);
        
        // Download and OCR each image
        for (const img of nutritionImages) {
          try {
            const filename = `${handle}-nutrition-${img.position}.webp`;
            
            // Download image
            const imageResponse = await axios.get(img.src, { responseType: 'arraybuffer' });
            await fs.writeFile(`Integratori Research/${filename}`, imageResponse.data);
            
            // Convert to PNG for OCR
            const pngFile = filename.replace('.webp', '.png');
            await sharp(`Integratori Research/${filename}`)
              .png()
              .toFile(`Integratori Research/${pngFile}`);
            
            // OCR the image
            console.log(`  Running OCR on ${pngFile}...`);
            const { data: { text } } = await Tesseract.recognize(
              `Integratori Research/${pngFile}`,
              'eng',
              { logger: () => {} }
            );
            
            // Extract supplement facts
            const facts = extractFactsFromText(text);
            
            if (facts.length > 0) {
              console.log(`  ✓ Extracted ${facts.length} ingredients`);
              
              allResults.push({
                product: product.title,
                handle,
                facts,
                source: img.src
              });
            }
            
          } catch (e) {
            console.log(`  ⚠️ Failed to process image: ${e.message}`);
          }
        }
      } else {
        console.log(`  ⚠️ No nutrition images found`);
      }
      
    } catch (error) {
      console.log(`  ❌ Error: ${error.message}`);
    }
  }
  
  // Save all results
  console.log('\n' + '='.repeat(60));
  console.log('📊 SAVING RESULTS\n');
  
  for (const result of allResults) {
    const csvFilename = `Integratori Research/${result.handle}-ocr.csv`;
    let csv = 'Ingredient Name,Amount,Unit\n';
    
    for (const fact of result.facts) {
      csv += `"${fact.ingredient}","${fact.amount}","${fact.unit}"\n`;
    }
    
    await fs.writeFile(csvFilename, csv);
    console.log(`✓ Saved: ${csvFilename}`);
  }
  
  // Create master CSV
  let masterCsv = 'Product,Ingredient Name,Amount,Unit\n';
  for (const result of allResults) {
    for (const fact of result.facts) {
      masterCsv += `"${result.product}","${fact.ingredient}","${fact.amount}","${fact.unit}"\n`;
    }
  }
  
  await fs.writeFile('Integratori Research/all-supplements-ocr.csv', masterCsv);
  console.log('\n✓ Master CSV saved: all-supplements-ocr.csv');
  
  // Update README
  let readme = '# Blueprint Supplements OCR Data\n\n';
  readme += `Extracted on: ${new Date().toISOString()}\n\n`;
  readme += '## Products Processed\n\n';
  
  for (const result of allResults) {
    readme += `### ${result.product}\n\n`;
    readme += '| Ingredient | Amount | Unit |\n';
    readme += '|------------|--------|------|\n';
    
    for (const fact of result.facts) {
      readme += `| ${fact.ingredient} | ${fact.amount} | ${fact.unit} |\n`;
    }
    readme += '\n';
  }
  
  await fs.writeFile('Integratori Research/ALL-PRODUCTS-OCR.md', readme);
  console.log('✓ README updated: ALL-PRODUCTS-OCR.md');
}

function extractFactsFromText(text) {
  const facts = [];
  const lines = text.split('\n');
  
  for (const line of lines) {
    const cleanLine = line.trim();
    if (!cleanLine) continue;
    
    // Pattern matching for supplement facts
    const patterns = [
      /(.+?)\s+(\d+(?:,\d{3})*(?:\.\d+)?)\s*(mg|mcg|g|IU|ml|capsules?|tablets?)/i,
      /(.+?)\s*:\s*(\d+(?:\.\d+)?)\s*(mg|mcg|g|IU)/i,
      /(\w[\w\s\-()]+?)\s+(\d+)\s*(mg|mcg|g)/i
    ];
    
    for (const pattern of patterns) {
      const match = cleanLine.match(pattern);
      if (match) {
        const ingredient = match[1].trim();
        const amount = match[2].replace(/,/g, '');
        const unit = match[3];
        
        // Filter out obvious non-ingredients
        if (ingredient.length > 2 && 
            ingredient.length < 50 &&
            !ingredient.toLowerCase().includes('serving') &&
            !ingredient.toLowerCase().includes('daily value')) {
          facts.push({ ingredient, amount, unit });
          break;
        }
      }
    }
  }
  
  return facts;
}

extractAllSupplements().catch(console.error);