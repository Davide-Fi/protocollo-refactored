const { chromium } = require('playwright');
const Tesseract = require('tesseract.js');
const fs = require('fs').promises;
const path = require('path');

async function extractSupplementFacts() {
  console.log('Starting supplement facts extraction with Playwright...');
  
  let browser;
  try {
    // Launch browser
    browser = await chromium.launch({
      headless: true
    });
    
    const context = await browser.newContext({
      viewport: { width: 1920, height: 1080 }
    });
    
    const page = await context.newPage();
    
    // Navigate to the product page
    const url = 'https://blueprint.bryanjohnson.com/products/longevity-blend-multinutrient-drink-mix-blood-orange-flavor?variant=47190798696733';
    console.log(`Navigating to: ${url}`);
    await page.goto(url, { waitUntil: 'networkidle' });
    
    // Wait for the page to load
    await page.waitForTimeout(3000);
    
    // Take a full page screenshot first
    console.log('Taking full page screenshot...');
    await page.screenshot({ 
      path: 'full-page-screenshot.png',
      fullPage: true 
    });
    
    // Try to find and click on tabs
    console.log('Looking for tabs with supplement facts...');
    
    // Get all clickable elements that might be tabs
    const tabTexts = ['Nutrition', 'Supplement', 'Facts', 'Ingredients'];
    
    for (const text of tabTexts) {
      try {
        // Try clicking elements containing the text
        const elements = await page.locator(`text=${text}`).all();
        console.log(`Found ${elements.length} elements with text "${text}"`);
        
        for (const element of elements) {
          try {
            await element.click();
            await page.waitForTimeout(1000);
            console.log(`Clicked element with text "${text}"`);
          } catch (e) {
            // Continue
          }
        }
      } catch (e) {
        // Continue
      }
    }
    
    // Look for images
    console.log('Looking for images...');
    const images = await page.locator('img').all();
    console.log(`Found ${images.length} images on the page`);
    
    // Try to find supplement facts images
    let supplementFactsFound = false;
    for (let i = 0; i < images.length; i++) {
      try {
        const imgSrc = await images[i].getAttribute('src');
        const imgAlt = await images[i].getAttribute('alt') || '';
        
        // Check if this might be a supplement facts image
        if (imgSrc && (
          imgAlt.toLowerCase().includes('supplement') ||
          imgAlt.toLowerCase().includes('nutrition') ||
          imgAlt.toLowerCase().includes('facts') ||
          imgSrc.includes('supplement') ||
          imgSrc.includes('nutrition') ||
          imgSrc.includes('facts')
        )) {
          console.log(`Found potential supplement facts image: ${imgSrc}`);
          console.log(`Alt text: ${imgAlt}`);
          
          // Screenshot the image
          await images[i].screenshot({ path: `supplement-image-${i}.png` });
          supplementFactsFound = true;
        }
      } catch (e) {
        // Continue
      }
    }
    
    // Try to capture specific sections
    console.log('Looking for content sections...');
    
    // Common selectors for product information
    const sectionSelectors = [
      '.product-single__description',
      '.product__info',
      '.product-info',
      '.tab-content',
      '.tabs-content',
      '.product-tabs',
      '[role="tabpanel"]',
      '.nutrition-facts',
      '.supplement-facts'
    ];
    
    for (const selector of sectionSelectors) {
      try {
        const element = await page.locator(selector).first();
        if (await element.isVisible()) {
          console.log(`Found section: ${selector}`);
          await element.screenshot({ path: `section-${selector.replace(/[^a-z0-9]/gi, '')}.png` });
        }
      } catch (e) {
        // Continue
      }
    }
    
    // Extract all text content
    console.log('Extracting text content...');
    const textContent = await page.evaluate(() => {
      const texts = [];
      const elements = document.querySelectorAll('*');
      
      elements.forEach(el => {
        const text = el.innerText || el.textContent || '';
        // Look for patterns that suggest supplement facts
        if (text && (
          text.match(/\d+\s*(mg|mcg|g|IU|μg)/i) ||
          text.includes('Serving Size') ||
          text.includes('Supplement Facts') ||
          text.includes('Amount Per Serving')
        )) {
          texts.push(text.trim());
        }
      });
      
      return [...new Set(texts)]; // Remove duplicates
    });
    
    console.log(`Found ${textContent.length} text elements with supplement-like patterns`);
    
    // Save the text content
    await fs.writeFile('extracted-text-content.json', JSON.stringify(textContent, null, 2));
    
    // Also try to get the page source and search for data
    const pageSource = await page.content();
    await fs.writeFile('page-source.html', pageSource);
    
  } catch (error) {
    console.error('Error during extraction:', error);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
  
  // Now perform OCR on captured images
  console.log('\nStarting OCR processing...');
  
  const files = await fs.readdir('.');
  const imageFiles = files.filter(f => f.endsWith('.png'));
  
  console.log(`Found ${imageFiles.length} image files to process`);
  
  let bestOcrResult = null;
  let bestScore = 0;
  
  for (const imagePath of imageFiles) {
    try {
      console.log(`\nProcessing ${imagePath} with OCR...`);
      
      const { data: { text, confidence } } = await Tesseract.recognize(
        imagePath,
        'eng',
        {
          logger: m => {
            if (m.status === 'recognizing text') {
              process.stdout.write(`\rOCR Progress: ${Math.round(m.progress * 100)}%`);
            }
          }
        }
      );
      
      console.log(`\nOCR Confidence: ${confidence}%`);
      
      // Save OCR results
      await fs.writeFile(`ocr-${path.basename(imagePath, '.png')}.txt`, text);
      
      // Parse for supplement facts
      const supplementFacts = parseSupplementFacts(text);
      
      // Score based on number of valid entries found
      const score = supplementFacts.length;
      
      if (score > bestScore) {
        bestScore = score;
        bestOcrResult = supplementFacts;
        console.log(`Found ${score} supplement facts entries`);
      }
      
    } catch (error) {
      console.log(`Failed to process ${imagePath}: ${error.message}`);
    }
  }
  
  if (bestOcrResult && bestOcrResult.length > 0) {
    console.log('\n=== Best OCR Results ===');
    console.log(bestOcrResult);
    
    // Create CSV
    const csv = createCSV(bestOcrResult);
    await fs.writeFile('supplement-facts-extracted.csv', csv);
    console.log('\nCSV file created: supplement-facts-extracted.csv');
  } else {
    console.log('\nNo supplement facts could be extracted from OCR');
  }
}

function parseSupplementFacts(text) {
  const facts = [];
  const lines = text.split('\n');
  
  // Known ingredients from the Blueprint Longevity Mix
  const knownIngredients = [
    'Vitamin C', 'Calcium', 'Magnesium', 'Creatine', 'CaAKG',
    'Taurine', 'Glycine', 'L-Lysine', 'Glucosamine', 'Glutathione',
    'L-Theanine', 'Sodium Hyaluronate', 'Carbohydrate'
  ];
  
  for (const line of lines) {
    const cleanLine = line.trim();
    if (!cleanLine) continue;
    
    // Try to match patterns like "Ingredient Name 123 mg"
    // More flexible patterns
    const patterns = [
      /^(.+?)\s+(\d+(?:,\d{3})*(?:\.\d+)?)\s*(mg|mcg|g|IU|μg)$/i,
      /^(.+?)\s+(\d+(?:\.\d+)?)\s*(mg|mcg|g|IU)$/i,
      /^(.+?)\s*(\d+(?:,\d{3})*)\s*(mg|mcg|g)$/i
    ];
    
    for (const pattern of patterns) {
      const match = cleanLine.match(pattern);
      if (match) {
        const ingredient = match[1].trim();
        const amount = match[2].replace(/,/g, '');
        const unit = match[3];
        
        // Validate that it's likely a supplement ingredient
        if (ingredient.length > 2 && ingredient.length < 50) {
          facts.push({
            ingredient,
            amount,
            unit,
            line: cleanLine
          });
          break;
        }
      }
    }
    
    // Also check for known ingredients
    for (const known of knownIngredients) {
      if (cleanLine.toLowerCase().includes(known.toLowerCase())) {
        const numberMatch = cleanLine.match(/(\d+(?:,\d{3})*(?:\.\d+)?)\s*(mg|mcg|g|IU|μg)/i);
        if (numberMatch && !facts.some(f => f.line === cleanLine)) {
          facts.push({
            ingredient: known,
            amount: numberMatch[1].replace(/,/g, ''),
            unit: numberMatch[2],
            line: cleanLine
          });
        }
      }
    }
  }
  
  return facts;
}

function createCSV(facts) {
  let csv = 'Ingredient Name,Amount Per Serving,Unit,% Daily Value\n';
  
  // Try to match with known daily values
  const knownDailyValues = {
    'Vitamin C': '278%',
    'Calcium': '31%',
    'Magnesium': '36%'
  };
  
  for (const fact of facts) {
    const dv = knownDailyValues[fact.ingredient] || '†';
    csv += `"${fact.ingredient}","${fact.amount}","${fact.unit}","${dv}"\n`;
  }
  
  return csv;
}

// Run the extraction
extractSupplementFacts().then(() => {
  console.log('\nExtraction complete!');
}).catch(error => {
  console.error('Fatal error:', error);
});