import { initTRPC } from '@trpc/server';
import { cache } from 'react';
import superjson from 'superjson';

const createContext = cache(() => {
  return {
    // Add context properties here (user, session, etc.)
  };
});

const t = initTRPC.context<typeof createContext>().create({
  transformer: superjson,
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const createCallerFactory = t.createCallerFactory;