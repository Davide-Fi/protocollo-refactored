const axios = require('axios');
const fs = require('fs').promises;
const Tesseract = require('tesseract.js');
const sharp = require('sharp');

async function extractBlueprintOCR() {
  console.log('🔬 BLUEPRINT SUPPLEMENTS OCR EXTRACTION - COMPLETE VERSION\n');
  console.log('=' .repeat(60));
  
  // All individual supplement products from the collection
  const supplementProducts = [
    'advanced-antioxidants',
    'ashwagandha-rhodiola-120mg', 
    'collagen',
    'creatine',
    'essentials-capsules',
    'extra-virgin-olive-oil',
    'longevity-blend-multinutrient-drink-mix-blood-orange-flavor',
    'nac-ginger-capsules',
    'nutty-butter',
    'macadamia-protein-bar'
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
      console.log(`  Images: ${product.images.length} total`);
      
      // Look for ingredient/nutrition images - use broader pattern
      const nutritionImages = [];
      
      for (const image of product.images || []) {
        const src = image.src;
        const filename = src.split('/').pop().split('?')[0];
        
        // Check filename patterns used by Blueprint
        if (filename && (
          filename.includes('Ingredient') ||
          filename.includes('Nutrition') ||
          filename.includes('Facts') ||
          filename.includes('Supplement') ||
          filename.match(/\d+[a-z]?_Ingredient/i) ||
          filename.match(/\d+_.*Facts/i)
        )) {
          nutritionImages.push({
            src,
            filename,
            position: image.position
          });
          console.log(`  📸 Found: ${filename}`);
        }
      }
      
      if (nutritionImages.length === 0) {
        // If no nutrition images found by name, check positions 3-8 (common pattern)
        for (const image of product.images || []) {
          if (image.position >= 3 && image.position <= 8) {
            const src = image.src;
            const filename = src.split('/').pop().split('?')[0];
            nutritionImages.push({
              src,
              filename,
              position: image.position
            });
          }
        }
        console.log(`  📸 Using positions 3-8 (${nutritionImages.length} images)`);
      }
      
      const productFacts = [];
      
      // Download and OCR each image
      for (const img of nutritionImages) {
        try {
          const filename = `${handle}-pos${img.position}.webp`;
          const filepath = `Integratori Research/${filename}`;
          
          // Download image
          console.log(`  Downloading: ${img.filename}`);
          const imageResponse = await axios.get(img.src, { responseType: 'arraybuffer' });
          await fs.writeFile(filepath, imageResponse.data);
          
          // Convert to PNG for OCR
          const pngFile = filepath.replace('.webp', '.png');
          await sharp(filepath)
            .png()
            .toFile(pngFile);
          
          // OCR the image
          console.log(`  Running OCR...`);
          const { data: { text } } = await Tesseract.recognize(
            pngFile,
            'eng',
            { logger: () => {} }
          );
          
          // Save raw OCR text
          await fs.writeFile(pngFile.replace('.png', '-ocr.txt'), text);
          
          // Extract supplement facts
          const facts = extractFactsFromText(text);
          
          if (facts.length > 0) {
            console.log(`  ✓ Extracted ${facts.length} ingredients from position ${img.position}`);
            productFacts.push(...facts);
          }
          
        } catch (e) {
          console.log(`  ⚠️ Failed to process image: ${e.message}`);
        }
      }
      
      if (productFacts.length > 0) {
        // Remove duplicates
        const uniqueFacts = [];
        const seen = new Set();
        
        for (const fact of productFacts) {
          const key = `${fact.ingredient}-${fact.amount}-${fact.unit}`;
          if (!seen.has(key)) {
            seen.add(key);
            uniqueFacts.push(fact);
          }
        }
        
        allResults.push({
          product: product.title,
          handle,
          facts: uniqueFacts
        });
        
        console.log(`  ✅ Total unique ingredients: ${uniqueFacts.length}`);
      } else {
        console.log(`  ⚠️ No supplement facts extracted`);
      }
      
    } catch (error) {
      console.log(`  ❌ Error: ${error.message}`);
    }
  }
  
  // Save all results
  console.log('\n' + '='.repeat(60));
  console.log('📊 SAVING RESULTS\n');
  
  // Create individual CSVs
  for (const result of allResults) {
    const csvFilename = `Integratori Research/${result.handle}-ocr.csv`;
    let csv = 'Ingredient Name,Amount,Unit\n';
    
    for (const fact of result.facts) {
      csv += `"${fact.ingredient}","${fact.amount}","${fact.unit}"\n`;
    }
    
    await fs.writeFile(csvFilename, csv);
    console.log(`✓ Saved: ${result.handle}-ocr.csv`);
  }
  
  // Create master CSV
  let masterCsv = 'Product,Ingredient Name,Amount,Unit\n';
  for (const result of allResults) {
    for (const fact of result.facts) {
      masterCsv += `"${result.product}","${fact.ingredient}","${fact.amount}","${fact.unit}"\n`;
    }
  }
  
  await fs.writeFile('Integratori Research/all-blueprint-supplements-ocr.csv', masterCsv);
  console.log('\n✅ Master CSV saved: all-blueprint-supplements-ocr.csv');
  
  // Create detailed README
  let readme = '# Blueprint Supplements OCR Data\n\n';
  readme += `**Extraction Date:** ${new Date().toISOString()}\n`;
  readme += `**Method:** OCR using Tesseract.js on official Blueprint product images\n`;
  readme += `**Source:** https://blueprint.bryanjohnson.com/collections/supplements\n\n`;
  readme += '## Products Processed\n\n';
  
  if (allResults.length === 0) {
    readme += '*No supplement facts could be extracted from the images.*\n\n';
  } else {
    for (const result of allResults) {
      readme += `### ${result.product}\n\n`;
      readme += '| Ingredient | Amount | Unit |\n';
      readme += '|------------|--------|------|\n';
      
      for (const fact of result.facts) {
        readme += `| ${fact.ingredient} | ${fact.amount} | ${fact.unit} |\n`;
      }
      readme += '\n---\n\n';
    }
  }
  
  readme += '## Notes\n\n';
  readme += '- Data extracted directly from product images using OCR\n';
  readme += '- Only includes what could be read from the images\n';
  readme += '- No external data sources used\n';
  readme += '- No data invented or estimated\n';
  
  await fs.writeFile('Integratori Research/ALL-BLUEPRINT-OCR.md', readme);
  console.log('✅ README created: ALL-BLUEPRINT-OCR.md');
  
  console.log('\n' + '='.repeat(60));
  console.log(`✨ COMPLETE: Processed ${supplementProducts.length} products`);
  console.log(`📊 Extracted data from ${allResults.length} products`);
}

function extractFactsFromText(text) {
  const facts = [];
  const lines = text.split('\n');
  
  for (const line of lines) {
    const cleanLine = line.trim();
    if (!cleanLine) continue;
    
    // Skip headers and non-ingredient lines
    if (cleanLine.match(/serving size|servings per|calories|daily value|supplement facts|nutrition facts/i)) {
      continue;
    }
    
    // Pattern matching for supplement facts
    const patterns = [
      // Standard format: "Vitamin C 250 mg"
      /^(.+?)\s+(\d+(?:,\d{3})*(?:\.\d+)?)\s*(mg|mcg|g|IU|ml|μg)$/i,
      // With parentheses: "Vitamin C (as Ascorbic Acid) 250 mg"
      /^(.+?\))\s+(\d+(?:,\d{3})*(?:\.\d+)?)\s*(mg|mcg|g|IU)$/i,
      // Percentage format: "Vitamin C 250mg 278%"
      /^(.+?)\s+(\d+(?:,\d{3})*)\s*(mg|mcg|g|IU)\s+\d+%$/i,
      // Simple format
      /^(\w[\w\s\-,()]+?)\s+(\d+)\s*(mg|mcg|g)$/i
    ];
    
    for (const pattern of patterns) {
      const match = cleanLine.match(pattern);
      if (match) {
        const ingredient = match[1].trim();
        const amount = match[2].replace(/,/g, '');
        const unit = match[3];
        
        // Validate it's a real ingredient
        if (ingredient.length > 2 && 
            ingredient.length < 60 &&
            !ingredient.toLowerCase().includes('total') &&
            !ingredient.toLowerCase().includes('calories') &&
            !ingredient.toLowerCase().includes('serving')) {
          facts.push({ ingredient, amount, unit });
          break;
        }
      }
    }
  }
  
  return facts;
}

extractBlueprintOCR().catch(console.error);