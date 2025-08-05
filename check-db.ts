import { db } from './src/lib/db';
import { sunscreenProducts } from './src/lib/db/schema';

async function checkDatabase() {
  try {
    const products = await db.select().from(sunscreenProducts);
    console.log(`Found ${products.length} sunscreen products in database`);
    
    if (products.length === 0) {
      console.log('Database is empty. Run: npm run db:seed');
    } else {
      console.log('Sample products:');
      products.slice(0, 3).forEach(p => {
        console.log(`- ${p.brand} ${p.productName} (SPF ${p.spf})`);
      });
    }
  } catch (error) {
    console.error('Error checking database:', error);
  }
  process.exit(0);
}

checkDatabase();
