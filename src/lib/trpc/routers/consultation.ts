import { db, consultations } from '@/lib/db';
import { consultationSchema } from '@/lib/validations';
import { consultationProcedure, router } from '../server';

export const consultationRouter = router({
  create: consultationProcedure
    .input(consultationSchema)
    .mutation(async ({ input }) => {
      try {
        const result = await db.insert(consultations).values({
          firstName: input.firstName,
          lastName: input.lastName,
          email: input.email,
          interest: input.interest,
          message: input.message,
          status: 'pending',
          priority: 'medium',
        }).returning();

        return { 
          success: true, 
          message: 'Consultation request submitted successfully',
          id: result[0].id 
        };
      } catch (error) {
        console.error('Consultation creation error:', error);
        return { success: false, message: 'Failed to submit consultation request' };
      }
    }),

  // Admin-only procedures would be added here with authentication
});