import { and, ilike, gte, lte, inArray } from 'drizzle-orm';
import { db, sunscreenProducts } from '@/lib/db';
import { sunscreenProductSchema, sunscreenFilterSchema } from '@/lib/validations';
import { publicProcedure, router } from '../server';

export const sunscreenRouter = router({
  getAll: publicProcedure
    .input(sunscreenFilterSchema.optional())
    .query(async ({ input }) => {
      try {
        const conditions = [];
        
        if (input) {
          // Brand filter
          if (input.brands.length > 0) {
            conditions.push(inArray(sunscreenProducts.brand, input.brands));
          }
          
          // SPF range filter
          if (input.spfRange) {
            conditions.push(
              and(
                gte(sunscreenProducts.spf, input.spfRange.min),
                lte(sunscreenProducts.spf, input.spfRange.max)
              )
            );
          }
          
          // Rating filters
          if (input.uva1Rating.length > 0) {
            conditions.push(inArray(sunscreenProducts.uva1Rating, input.uva1Rating));
          }
          
          if (input.uva2Rating.length > 0) {
            conditions.push(inArray(sunscreenProducts.uva2Rating, input.uva2Rating));
          }
          
          if (input.uvbRating.length > 0) {
            conditions.push(inArray(sunscreenProducts.uvbRating, input.uvbRating));
          }
          
          // Price range filter
          if (input.priceRange.length > 0) {
            conditions.push(inArray(sunscreenProducts.priceRange, input.priceRange));
          }
          
          // Availability filter
          if (input.availability.length > 0) {
            conditions.push(inArray(sunscreenProducts.availability, input.availability));
          }
          
          // Search term
          if (input.searchTerm) {
            conditions.push(
              ilike(sunscreenProducts.productName, `%${input.searchTerm}%`)
            );
          }
        }
        
        const products = await db
          .select()
          .from(sunscreenProducts)
          .where(conditions.length > 0 ? and(...conditions) : undefined)
          .orderBy(sunscreenProducts.brand, sunscreenProducts.productName);
          
        return products;
      } catch (error) {
        console.error('Sunscreen products fetch error:', error);
        throw new Error('Failed to fetch sunscreen products');
      }
    }),

  create: publicProcedure
    .input(sunscreenProductSchema)
    .mutation(async ({ input }) => {
      try {
        const result = await db.insert(sunscreenProducts).values({
          brand: input.brand,
          productName: input.productName,
          spf: input.spf,
          uva1Rating: input.uva1Rating,
          uva2Rating: input.uva2Rating,
          uvbRating: input.uvbRating,
          filters: input.filters,
          textureRating: input.textureRating,
          priceRange: input.priceRange,
          availability: input.availability,
          notes: input.notes,
        }).returning();

        return { 
          success: true, 
          message: 'Product added successfully',
          product: result[0] 
        };
      } catch (error) {
        console.error('Sunscreen product creation error:', error);
        return { success: false, message: 'Failed to add product' };
      }
    }),

  getBrands: publicProcedure
    .query(async () => {
      try {
        const brands = await db
          .selectDistinct({ brand: sunscreenProducts.brand })
          .from(sunscreenProducts)
          .orderBy(sunscreenProducts.brand);
        
        return brands.map(b => b.brand);
      } catch (error) {
        console.error('Brands fetch error:', error);
        throw new Error('Failed to fetch brands');
      }
    }),
});