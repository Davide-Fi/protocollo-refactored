/**
 * Professional Supplement Facts OCR Extractor
 * Uses cutting-edge tools and techniques from 2024
 * 
 * Based on Reddit recommendations and industry best practices:
 * 1. Playwright for dynamic content (better than Puppeteer/Selenium in 2024)
 * 2. Multiple OCR approaches: Tesseract, Mindee API, GPT-4 Vision
 * 3. Handles Shopify's JavaScript-rendered tabs
 */

const { chromium } = require('playwright');
const Tesseract = require('tesseract.js');
const axios = require('axios');
const fs = require('fs').promises;
const sharp = require('sharp');

class SupplementFactsExtractor {
  constructor(options = {}) {
    this.options = {
      headless: true,
      useMindeeAPI: options.mindeeApiKey ? true : false,
      mindeeApiKey: options.mindeeApiKey || null,
      useGPT4Vision: options.openaiApiKey ? true : false,
      openaiApiKey: options.openaiApiKey || null,
      ...options
    };
  }

  /**
   * Main extraction method using Playwright
   * Better than Puppeteer for JavaScript-heavy sites in 2024
   */
  async extractFromShopifyProduct(url) {
    console.log('🚀 Starting professional extraction with Playwright...');
    
    const browser = await chromium.launch({
      headless: this.options.headless,
      // Use stealth mode to avoid detection
      args: ['--disable-blink-features=AutomationControlled']
    });

    try {
      const context = await browser.newContext({
        viewport: { width: 1920, height: 1080 },
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      });

      // Enable request interception to capture images as they load
      const imageUrls = [];
      await context.route('**/*.{png,jpg,jpeg,webp}', route => {
        const url = route.request().url();
        imageUrls.push(url);
        route.continue();
      });

      const page = await context.newPage();
      
      console.log('📍 Navigating to:', url);
      await page.goto(url, { 
        waitUntil: 'networkidle',
        timeout: 30000 
      });

      // Wait for dynamic content
      await page.waitForTimeout(2000);

      // Strategy 1: Click all possible tabs to reveal hidden content
      console.log('🔍 Searching for product tabs...');
      const tabSelectors = [
        // Common Shopify tab selectors
        '[data-tab]',
        '[role="tab"]',
        '.tabs__tab',
        '.product-tabs button',
        '.tab-link',
        'button:has-text("Nutrition")',
        'button:has-text("Supplement")',
        'button:has-text("Facts")',
        'button:has-text("Ingredients")',
        // Accordion patterns
        '.accordion__button',
        '.collapsible-trigger',
        'details summary'
      ];

      for (const selector of tabSelectors) {
        try {
          const tabs = await page.$$(selector);
          for (const tab of tabs) {
            const text = await tab.textContent();
            if (text && (
              text.match(/nutrition|supplement|facts|ingredients/i)
            )) {
              console.log(`  ✓ Clicking tab: "${text.trim()}"`);
              await tab.click();
              await page.waitForTimeout(1000);
              
              // Scroll to trigger lazy loading
              await page.evaluate(() => {
                window.scrollBy(0, 500);
              });
              await page.waitForTimeout(500);
            }
          }
        } catch (e) {
          // Continue with next selector
        }
      }

      // Strategy 2: Find supplement facts images directly
      console.log('📸 Capturing supplement facts images...');
      
      // Look for images with specific patterns
      const supplementImageSelectors = [
        'img[alt*="supplement" i]',
        'img[alt*="nutrition" i]',
        'img[alt*="facts" i]',
        'img[src*="supplement"]',
        'img[src*="nutrition"]',
        'img[src*="facts"]',
        '.product__media img',
        '.product-single__media img',
        '[data-product-featured-media] img'
      ];

      const capturedImages = [];
      
      for (const selector of supplementImageSelectors) {
        try {
          const images = await page.$$(selector);
          for (let i = 0; i < images.length; i++) {
            const src = await images[i].getAttribute('src');
            const alt = await images[i].getAttribute('alt') || '';
            
            // Check if this looks like supplement facts
            if (this.isLikelySupplementFacts(src, alt)) {
              const filename = `supplement-facts-${i}.png`;
              
              // Method 1: Screenshot the element
              await images[i].screenshot({ path: filename });
              capturedImages.push(filename);
              
              // Method 2: Download the source image
              if (src) {
                const fullUrl = this.makeAbsoluteUrl(src, url);
                await this.downloadImage(fullUrl, `downloaded-${i}.png`);
                capturedImages.push(`downloaded-${i}.png`);
              }
              
              console.log(`  ✓ Captured: ${alt || src.substring(0, 50)}...`);
            }
          }
        } catch (e) {
          // Continue
        }
      }

      // Strategy 3: Capture full product description area
      const contentSelectors = [
        '.product__info',
        '.product-single__description',
        '.product-description',
        '[data-product-description]'
      ];

      for (const selector of contentSelectors) {
        try {
          const element = await page.$(selector);
          if (element) {
            await element.screenshot({ path: 'product-content.png' });
            capturedImages.push('product-content.png');
            console.log('  ✓ Captured product content area');
          }
        } catch (e) {
          // Continue
        }
      }

      await browser.close();

      // Process captured images with OCR
      console.log(`\n📊 Processing ${capturedImages.length} captured images...`);
      
      let bestResult = null;
      let bestScore = 0;

      for (const imagePath of capturedImages) {
        const result = await this.processImageWithOCR(imagePath);
        if (result && result.score > bestScore) {
          bestScore = result.score;
          bestResult = result;
        }
      }

      return bestResult;

    } catch (error) {
      console.error('❌ Extraction error:', error);
      throw error;
    } finally {
      await browser.close();
    }
  }

  /**
   * Process image with multiple OCR approaches
   */
  async processImageWithOCR(imagePath) {
    console.log(`\n🔬 Processing ${imagePath}...`);
    
    // Preprocess image for better OCR
    await this.preprocessImage(imagePath);
    
    let results = [];

    // Method 1: Tesseract.js (Free, local)
    try {
      const tesseractResult = await this.extractWithTesseract(imagePath);
      results.push(tesseractResult);
    } catch (e) {
      console.log('  ⚠️ Tesseract failed:', e.message);
    }

    // Method 2: Mindee API (Specialized for nutrition facts)
    if (this.options.useMindeeAPI) {
      try {
        const mindeeResult = await this.extractWithMindeeAPI(imagePath);
        results.push(mindeeResult);
      } catch (e) {
        console.log('  ⚠️ Mindee API failed:', e.message);
      }
    }

    // Method 3: GPT-4 Vision (Best for complex layouts)
    if (this.options.useGPT4Vision) {
      try {
        const gpt4Result = await this.extractWithGPT4Vision(imagePath);
        results.push(gpt4Result);
      } catch (e) {
        console.log('  ⚠️ GPT-4 Vision failed:', e.message);
      }
    }

    // Return best result
    return results.reduce((best, current) => {
      return (!best || current.score > best.score) ? current : best;
    }, null);
  }

  /**
   * Preprocess image for better OCR results
   */
  async preprocessImage(imagePath) {
    try {
      const processedPath = `processed-${imagePath}`;
      
      await sharp(imagePath)
        .greyscale()
        .normalize()
        .sharpen()
        .threshold(128)
        .toFile(processedPath);
      
      // Replace original with processed
      await fs.rename(processedPath, imagePath);
      console.log('  ✓ Image preprocessed for OCR');
    } catch (e) {
      // Continue with original image
    }
  }

  /**
   * Extract with Tesseract.js
   */
  async extractWithTesseract(imagePath) {
    const { data: { text, confidence } } = await Tesseract.recognize(
      imagePath,
      'eng',
      {
        logger: () => {} // Silent mode
      }
    );

    const facts = this.parseSupplementFacts(text);
    
    return {
      method: 'Tesseract',
      confidence,
      score: facts.length * (confidence / 100),
      facts,
      rawText: text
    };
  }

  /**
   * Extract with Mindee API (Best for nutrition labels)
   */
  async extractWithMindeeAPI(imagePath) {
    const formData = new FormData();
    const imageBuffer = await fs.readFile(imagePath);
    formData.append('document', imageBuffer);

    const response = await axios.post(
      'https://api.mindee.net/v1/products/mindee/nutrition_facts/v1/predict',
      formData,
      {
        headers: {
          'Authorization': `Token ${this.options.mindeeApiKey}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    const prediction = response.data.document.inference.prediction;
    const facts = this.parseMindeeResponse(prediction);

    return {
      method: 'Mindee API',
      confidence: 95, // Mindee reports >95% accuracy
      score: facts.length * 0.95,
      facts,
      rawData: prediction
    };
  }

  /**
   * Extract with GPT-4 Vision
   */
  async extractWithGPT4Vision(imagePath) {
    const imageBuffer = await fs.readFile(imagePath);
    const base64Image = imageBuffer.toString('base64');

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4-vision-preview',
        messages: [{
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Extract all supplement facts from this image. Return as JSON with fields: ingredient, amount, unit, dailyValue'
            },
            {
              type: 'image_url',
              image_url: {
                url: `data:image/png;base64,${base64Image}`
              }
            }
          ]
        }],
        max_tokens: 1000
      },
      {
        headers: {
          'Authorization': `Bearer ${this.options.openaiApiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const content = response.data.choices[0].message.content;
    const facts = JSON.parse(content);

    return {
      method: 'GPT-4 Vision',
      confidence: 90,
      score: facts.length * 0.9,
      facts,
      rawResponse: content
    };
  }

  /**
   * Parse supplement facts from text
   */
  parseSupplementFacts(text) {
    const facts = [];
    const lines = text.split('\n');
    
    // Comprehensive patterns for supplement facts
    const patterns = [
      // Standard format: "Vitamin C 250 mg 278%"
      /^(.+?)\s+(\d+(?:,\d{3})*(?:\.\d+)?)\s*(mg|mcg|g|IU|μg)\s*(\d+%)?$/i,
      // With parentheses: "Calcium (from CaAKG) 400 mg"
      /^(.+?)\s*\(.*?\)\s*(\d+(?:,\d{3})*(?:\.\d+)?)\s*(mg|mcg|g|IU)$/i,
      // Simple format: "Taurine 1500mg"
      /^(\w[\w\s-]+?)\s*(\d+)\s*(mg|mcg|g)$/i
    ];

    for (const line of lines) {
      const cleanLine = line.trim();
      if (!cleanLine) continue;

      for (const pattern of patterns) {
        const match = cleanLine.match(pattern);
        if (match) {
          facts.push({
            ingredient: match[1].trim(),
            amount: match[2].replace(/,/g, ''),
            unit: match[3],
            dailyValue: match[4] || '†'
          });
          break;
        }
      }
    }

    return facts;
  }

  /**
   * Parse Mindee API response
   */
  parseMindeeResponse(prediction) {
    const facts = [];
    
    // Mindee returns structured nutrition data
    if (prediction.nutrients) {
      for (const nutrient of prediction.nutrients) {
        facts.push({
          ingredient: nutrient.name,
          amount: nutrient.value,
          unit: nutrient.unit,
          dailyValue: nutrient.daily_value || '†'
        });
      }
    }

    return facts;
  }

  /**
   * Helper: Check if image is likely supplement facts
   */
  isLikelySupplementFacts(src, alt) {
    const keywords = ['supplement', 'nutrition', 'facts', 'label', 'ingredients'];
    const combined = (src + ' ' + alt).toLowerCase();
    return keywords.some(keyword => combined.includes(keyword));
  }

  /**
   * Helper: Make absolute URL
   */
  makeAbsoluteUrl(url, baseUrl) {
    if (url.startsWith('http')) return url;
    if (url.startsWith('//')) return 'https:' + url;
    const base = new URL(baseUrl);
    return new URL(url, base.origin).href;
  }

  /**
   * Helper: Download image
   */
  async downloadImage(url, filepath) {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    await fs.writeFile(filepath, response.data);
  }

  /**
   * Generate final CSV output
   */
  generateCSV(facts) {
    let csv = 'Ingredient Name,Amount Per Serving,Unit,% Daily Value\n';
    
    for (const fact of facts) {
      csv += `"${fact.ingredient}","${fact.amount}","${fact.unit}","${fact.dailyValue}"\n`;
    }

    return csv;
  }
}

// Example usage
async function main() {
  const extractor = new SupplementFactsExtractor({
    // Add API keys here if available
    // mindeeApiKey: 'your-mindee-api-key',
    // openaiApiKey: 'your-openai-api-key'
  });

  const url = 'https://blueprint.bryanjohnson.com/products/longevity-blend-multinutrient-drink-mix-blood-orange-flavor?variant=47190798696733';
  
  try {
    const result = await extractor.extractFromShopifyProduct(url);
    
    if (result && result.facts.length > 0) {
      console.log('\n✅ EXTRACTION SUCCESSFUL!');
      console.log(`Method: ${result.method}`);
      console.log(`Confidence: ${result.confidence}%`);
      console.log(`Found ${result.facts.length} ingredients`);
      
      // Generate CSV
      const csv = extractor.generateCSV(result.facts);
      await fs.writeFile('professional-supplement-facts.csv', csv);
      console.log('\n📄 CSV saved to professional-supplement-facts.csv');
      
      // Display results
      console.log('\n🏆 Extracted Supplement Facts:');
      console.table(result.facts);
    } else {
      console.log('\n⚠️ No supplement facts could be extracted');
      console.log('Recommendations:');
      console.log('1. Sign up for Mindee API (free tier: 250 images/month)');
      console.log('2. Use GPT-4 Vision API for best results');
      console.log('3. Try Veryfi or Koncile APIs as alternatives');
    }
  } catch (error) {
    console.error('Fatal error:', error);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = SupplementFactsExtractor;