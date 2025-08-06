const axios = require('axios');
const fs = require('fs').promises;

async function getBlueprintProducts() {
  console.log('Fetching Blueprint supplements collection...\n');
  
  try {
    // Get the collection page
    const response = await axios.get('https://blueprint.bryanjohnson.com/collections/supplements.json');
    const products = response.data.products || [];
    
    console.log(`Found ${products.length} products in supplements collection\n`);
    
    // Filter out stacks and packs
    const individualSupplements = products.filter(p => {
      const title = p.title.toLowerCase();
      const handle = p.handle.toLowerCase();
      return !title.includes('stack') && 
             !title.includes('pack') && 
             !handle.includes('stack') && 
             !handle.includes('pack') &&
             !title.includes('bundle');
    });
    
    console.log(`Filtered to ${individualSupplements.length} individual supplements (excluding stacks/packs)\n`);
    
    console.log('Individual Supplement Products:');
    console.log('================================');
    
    const productList = [];
    
    for (const product of individualSupplements) {
      console.log(`\n${product.title}`);
      console.log(`Handle: ${product.handle}`);
      console.log(`Type: ${product.product_type}`);
      console.log(`URL: https://blueprint.bryanjohnson.com/products/${product.handle}`);
      
      productList.push({
        title: product.title,
        handle: product.handle,
        type: product.product_type,
        url: `https://blueprint.bryanjohnson.com/products/${product.handle}`,
        jsonUrl: `https://blueprint.bryanjohnson.com/products/${product.handle}.json`
      });
    }
    
    // Save the list
    await fs.writeFile('blueprint-products-list.json', JSON.stringify(productList, null, 2));
    console.log('\n\nSaved product list to blueprint-products-list.json');
    
    return productList;
    
  } catch (error) {
    console.error('Error fetching products:', error.message);
  }
}

getBlueprintProducts().catch(console.error);