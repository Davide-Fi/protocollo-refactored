const puppeteer = require('puppeteer');
const Tesseract = require('tesseract.js');
const fs = require('fs').promises;
const path = require('path');

async function extractSupplementFacts() {
  console.log('Starting supplement facts extraction...');
  
  let browser;
  try {
    // Launch browser
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    
    // Navigate to the product page
    const url = 'https://blueprint.bryanjohnson.com/products/longevity-blend-multinutrient-drink-mix-blood-orange-flavor?variant=47190798696733';
    console.log(`Navigating to: ${url}`);
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
    
    // Wait for the page to load
    await page.waitForTimeout(3000);
    
    // Try to find and click on the Nutrition Facts tab or button
    console.log('Looking for Nutrition Facts tab...');
    
    // Try multiple possible selectors for the tab
    const tabSelectors = [
      'button:has-text("Nutrition Facts")',
      'button:has-text("Supplement Facts")',
      '[aria-label*="Nutrition"]',
      '[aria-label*="Supplement"]',
      'button[data-tab*="nutrition"]',
      'button[data-tab*="supplement"]',
      '.tab-button:has-text("Nutrition")',
      '.tab-button:has-text("Supplement")',
      'a:has-text("Nutrition Facts")',
      'a:has-text("Supplement Facts")'
    ];
    
    let tabClicked = false;
    for (const selector of tabSelectors) {
      try {
        const elements = await page.$$(selector);
        if (elements.length > 0) {
          await elements[0].click();
          console.log(`Clicked tab with selector: ${selector}`);
          tabClicked = true;
          await page.waitForTimeout(2000);
          break;
        }
      } catch (e) {
        // Continue trying other selectors
      }
    }
    
    // Alternative: Try using text content
    if (!tabClicked) {
      console.log('Trying to click by text content...');
      await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button, a, div[role="tab"], li'));
        const nutritionButton = buttons.find(btn => 
          btn.textContent && (
            btn.textContent.toLowerCase().includes('nutrition') ||
            btn.textContent.toLowerCase().includes('supplement facts')
          )
        );
        if (nutritionButton) {
          nutritionButton.click();
          return true;
        }
        return false;
      });
      await page.waitForTimeout(2000);
    }
    
    // Take a full page screenshot first
    console.log('Taking full page screenshot...');
    await page.screenshot({ 
      path: 'full-page-screenshot.png',
      fullPage: true 
    });
    
    // Look for supplement facts image
    console.log('Looking for supplement facts image...');
    
    // Try multiple selectors for the supplement facts image
    const imageSelectors = [
      'img[alt*="Supplement Facts"]',
      'img[alt*="Nutrition Facts"]',
      'img[src*="supplement"]',
      'img[src*="nutrition"]',
      'img[src*="facts"]',
      '.nutrition-facts img',
      '.supplement-facts img',
      '[data-testid*="nutrition"] img',
      '.product-nutrition img',
      '.product-details img'
    ];
    
    let imageUrl = null;
    let imageElement = null;
    
    for (const selector of imageSelectors) {
      try {
        imageElement = await page.$(selector);
        if (imageElement) {
          imageUrl = await page.evaluate(el => el.src, imageElement);
          console.log(`Found image with selector: ${selector}`);
          console.log(`Image URL: ${imageUrl}`);
          break;
        }
      } catch (e) {
        // Continue trying other selectors
      }
    }
    
    // If no specific image found, try to get all images and filter
    if (!imageUrl) {
      console.log('Searching through all images on the page...');
      const allImages = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('img')).map(img => ({
          src: img.src,
          alt: img.alt,
          width: img.width,
          height: img.height
        }));
      });
      
      console.log(`Found ${allImages.length} images on the page`);
      
      // Look for images that might be supplement facts based on dimensions or URL
      const potentialImages = allImages.filter(img => 
        (img.alt && (img.alt.toLowerCase().includes('supplement') || img.alt.toLowerCase().includes('nutrition'))) ||
        (img.src && (img.src.includes('supplement') || img.src.includes('nutrition') || img.src.includes('facts'))) ||
        (img.width > 300 && img.height > 400) // Supplement facts are usually tall images
      );
      
      if (potentialImages.length > 0) {
        imageUrl = potentialImages[0].src;
        console.log(`Found potential supplement facts image: ${imageUrl}`);
      }
    }
    
    // If still no image, try to capture the visible area where supplement facts might be
    if (!imageUrl) {
      console.log('No supplement facts image found directly. Capturing visible content area...');
      
      // Try to find a container that might have the supplement facts
      const containerSelectors = [
        '.nutrition-facts',
        '.supplement-facts',
        '[data-testid*="nutrition"]',
        '.product-nutrition',
        '.tab-content',
        '.product-information',
        '.product-details'
      ];
      
      for (const selector of containerSelectors) {
        try {
          const element = await page.$(selector);
          if (element) {
            console.log(`Taking screenshot of container: ${selector}`);
            await element.screenshot({ path: 'supplement-facts-container.png' });
            break;
          }
        } catch (e) {
          // Continue
        }
      }
    }
    
    // Download the image if we found one
    if (imageUrl) {
      console.log('Downloading supplement facts image...');
      const imageResponse = await page.evaluate(async (url) => {
        const response = await fetch(url);
        const blob = await response.blob();
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(blob);
        });
      }, imageUrl);
      
      // Save the image
      const base64Data = imageResponse.replace(/^data:image\/\w+;base64,/, '');
      await fs.writeFile('supplement-facts.png', base64Data, 'base64');
      console.log('Image saved as supplement-facts.png');
    }
    
    // Also try to extract any text that's directly in the DOM
    console.log('Attempting to extract text directly from DOM...');
    const pageText = await page.evaluate(() => {
      const textElements = document.querySelectorAll('p, span, div, td, th, li');
      const texts = [];
      textElements.forEach(el => {
        const text = el.innerText || el.textContent;
        if (text && text.includes('mg') || text.includes('mcg') || text.includes('IU') || text.includes('Serving')) {
          texts.push(text.trim());
        }
      });
      return texts;
    });
    
    console.log('Found text elements containing measurements:');
    console.log(pageText.slice(0, 20)); // Show first 20 items
    
    // Save the extracted text
    await fs.writeFile('extracted-text.json', JSON.stringify(pageText, null, 2));
    
  } catch (error) {
    console.error('Error during extraction:', error);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
  
  // Now perform OCR on any captured images
  console.log('\nStarting OCR processing...');
  
  const imagesToProcess = [
    'supplement-facts.png',
    'supplement-facts-container.png',
    'full-page-screenshot.png'
  ];
  
  for (const imagePath of imagesToProcess) {
    try {
      await fs.access(imagePath);
      console.log(`\nProcessing ${imagePath} with OCR...`);
      
      const { data: { text } } = await Tesseract.recognize(
        imagePath,
        'eng',
        {
          logger: m => {
            if (m.status === 'recognizing text') {
              console.log(`OCR Progress: ${Math.round(m.progress * 100)}%`);
            }
          }
        }
      );
      
      console.log(`\nOCR Results from ${imagePath}:`);
      console.log('----------------------------------------');
      console.log(text.substring(0, 2000)); // Show first 2000 characters
      
      // Save OCR results
      await fs.writeFile(`ocr-results-${path.basename(imagePath, '.png')}.txt`, text);
      
      // Parse for supplement facts
      const supplementFacts = parseSupplementFacts(text);
      if (supplementFacts.length > 0) {
        console.log('\nParsed Supplement Facts:');
        console.log(supplementFacts);
        
        // Create CSV
        const csv = createCSV(supplementFacts);
        await fs.writeFile('supplement-facts-extracted.csv', csv);
        console.log('\nCSV file created: supplement-facts-extracted.csv');
        break; // Stop if we found good data
      }
      
    } catch (error) {
      // File doesn't exist or OCR failed
      continue;
    }
  }
}

function parseSupplementFacts(text) {
  const facts = [];
  const lines = text.split('\n');
  
  // Patterns to match supplement facts entries
  const patterns = [
    /(.+?)\s+(\d+(?:\.\d+)?)\s*(mg|mcg|g|IU|mg|μg)/i,
    /(.+?)\s+(\d+(?:\.\d+)?)\s*(milligrams?|micrograms?|grams?|international units?)/i,
    /(.+?)\s+(\d+(?:,\d{3})*(?:\.\d+)?)\s*(mg|mcg|g|IU)/i
  ];
  
  for (const line of lines) {
    const cleanLine = line.trim();
    if (!cleanLine) continue;
    
    for (const pattern of patterns) {
      const match = cleanLine.match(pattern);
      if (match) {
        facts.push({
          ingredient: match[1].trim(),
          amount: match[2],
          unit: match[3],
          line: cleanLine
        });
        break;
      }
    }
  }
  
  return facts;
}

function createCSV(facts) {
  let csv = 'Ingredient Name,Amount Per Serving,Unit,Original Line\n';
  
  for (const fact of facts) {
    csv += `"${fact.ingredient}","${fact.amount}","${fact.unit}","${fact.line}"\n`;
  }
  
  return csv;
}

// Run the extraction
extractSupplementFacts().then(() => {
  console.log('\nExtraction complete!');
}).catch(error => {
  console.error('Fatal error:', error);
});