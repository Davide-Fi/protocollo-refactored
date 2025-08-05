import { initTRPC } from '@trpc/server';
import { cache } from 'react';
import superjson from 'superjson';
import { rateLimitMiddleware } from '@/lib/ratelimit';
import { headers } from 'next/headers';

// Context includes request headers for rate limiting
export const createContext = cache(async () => {
  const headersList = await headers();
  const clientIp = headersList.get('x-forwarded-for') || 
                   headersList.get('x-real-ip') || 
                   'unknown';
  
  return {
    clientIp,
    headers: headersList,
  };
});

const t = initTRPC.context<typeof createContext>().create({
  transformer: superjson,
});

// Rate limit middleware
const enforceRateLimit = (type: 'api' | 'newsletter' | 'consultation' | 'search') =>
  t.middleware(async ({ ctx, next }) => {
    await rateLimitMiddleware(type, ctx.clientIp);
    return next();
  });

export const router = t.router;
export const publicProcedure = t.procedure;

// Procedures with rate limiting
export const rateLimitedProcedure = publicProcedure.use(enforceRateLimit('api'));
export const newsletterProcedure = publicProcedure.use(enforceRateLimit('newsletter'));
export const consultationProcedure = publicProcedure.use(enforceRateLimit('consultation'));
export const searchProcedure = publicProcedure.use(enforceRateLimit('search'));

export const createCallerFactory = t.createCallerFactory;