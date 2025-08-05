import { eq } from 'drizzle-orm';
import { db, newsletters } from '@/lib/db';
import { newsletterSchema } from '@/lib/validations';
import { newsletterProcedure, router } from '../server';

export const newsletterRouter = router({
  subscribe: newsletterProcedure
    .input(newsletterSchema)
    .mutation(async ({ input }) => {
      try {
        // Check if email already exists
        const existingSubscription = await db
          .select()
          .from(newsletters)
          .where(eq(newsletters.email, input.email))
          .limit(1);

        if (existingSubscription.length > 0) {
          // If unsubscribed, resubscribe
          if (!existingSubscription[0].subscribed) {
            await db
              .update(newsletters)
              .set({
                subscribed: true,
                subscribedAt: new Date(),
                unsubscribedAt: null,
                updatedAt: new Date(),
              })
              .where(eq(newsletters.email, input.email));
            
            return { success: true, message: 'Subscription renewed successfully' };
          }
          
          return { success: false, message: 'Email already subscribed' };
        }

        // Create new subscription
        await db.insert(newsletters).values({
          email: input.email,
          name: input.name,
          subscribed: true,
        });

        return { success: true, message: 'Subscription successful' };
      } catch (error) {
        console.error('Newsletter subscription error:', error);
        return { success: false, message: 'Subscription failed' };
      }
    }),

  unsubscribe: newsletterProcedure
    .input(newsletterSchema.pick({ email: true }))
    .mutation(async ({ input }) => {
      try {
        await db
          .update(newsletters)
          .set({
            subscribed: false,
            unsubscribedAt: new Date(),
            updatedAt: new Date(),
          })
          .where(eq(newsletters.email, input.email));

        return { success: true, message: 'Unsubscribed successfully' };
      } catch (error) {
        console.error('Newsletter unsubscribe error:', error);
        return { success: false, message: 'Unsubscribe failed' };
      }
    }),
});