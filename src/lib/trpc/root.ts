import { router } from './server';
import { newsletterRouter } from './routers/newsletter';
import { consultationRouter } from './routers/consultation';
import { sunscreenRouter } from './routers/sunscreen';

export const appRouter = router({
  newsletter: newsletterRouter,
  consultation: consultationRouter,
  sunscreen: sunscreenRouter,
});

export type AppRouter = typeof appRouter;