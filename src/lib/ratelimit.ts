import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { TRPCError } from '@trpc/server';

// Initialize Redis client - for development, use in-memory store
// For production, set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN
const redis = process.env.UPSTASH_REDIS_REST_URL
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  : null;

// Create rate limiter instances for different endpoints
export const createRateLimiter = (requests: number, window: `${number} ${'m' | 'h' | 'd'}`) => {
  if (!redis) {
    // In development without Redis, just pass through
    return {
      limit: async () => ({ success: true, limit: 100, remaining: 99, reset: 0 }),
    };
  }

  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(requests, window),
    analytics: true,
    prefix: 'protocollo',
  });
};

// Different rate limiters for different use cases
export const rateLimiters = {
  // General API rate limit: 100 requests per minute
  api: createRateLimiter(100, '1 m'),
  
  // Newsletter subscription: 5 requests per hour per IP
  newsletter: createRateLimiter(5, '1 h'),
  
  // Consultation form: 3 requests per hour per IP
  consultation: createRateLimiter(3, '1 h'),
  
  // Sunscreen search: 200 requests per minute
  search: createRateLimiter(200, '1 m'),
};

// Helper function to check rate limit
export async function checkRateLimit(
  limiter: ReturnType<typeof createRateLimiter>,
  identifier: string
) {
  const result = await limiter.limit(identifier);
  
  if (!result.success) {
    throw new TRPCError({
      code: 'TOO_MANY_REQUESTS',
      message: `Rate limit exceeded. Please try again in ${Math.ceil(
        (result.reset - Date.now()) / 1000
      )} seconds.`,
    });
  }
  
  return result;
}

// Middleware function for tRPC procedures
export async function rateLimitMiddleware(
  type: keyof typeof rateLimiters,
  identifier: string
) {
  return checkRateLimit(rateLimiters[type], identifier);
}