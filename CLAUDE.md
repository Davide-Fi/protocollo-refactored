# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

```bash
# Development
pnpm dev             # Start development server with Turbopack on port 3000
pnpm build           # Build production bundle
pnpm start           # Start production server
pnpm lint            # Run ESLint
pnpm lint:fix        # Auto-fix ESLint issues
pnpm type-check      # TypeScript type checking
pnpm format          # Format code with Prettier

# Database (Drizzle ORM + Neon PostgreSQL)
pnpm db:generate     # Generate migration files from schema changes
pnpm db:migrate      # Apply pending migrations to database
pnpm db:studio       # Open Drizzle Studio GUI at localhost:4983
pnpm db:seed         # Seed database with sample data
pnpm db:seed-original # Seed original sunscreen products data

# Testing
pnpm test            # Run Vitest unit tests
pnpm test:e2e        # Run Playwright E2E tests (not configured yet)
```

## Architecture Overview

Next.js 15 application for "Il Protocollo" - a male longevity optimization platform focusing on nutrition, supplementation, and prevention. Features a sophisticated sunscreen filter database and consultation system.

### Core Tech Stack
- **Framework**: Next.js 15.4.5 with App Router
- **Runtime**: React 19.1.1 + TypeScript 5
- **Styling**: Tailwind CSS v4 (alpha) with dark theme
- **Database**: Neon PostgreSQL + Drizzle ORM 0.44.4
- **API**: tRPC (next canary) for type-safe APIs
- **Auth**: NextAuth.js v5 beta with JWT strategy
- **Validation**: Zod v4 for runtime validation
- **Testing**: Vitest configured, Playwright ready

### Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   ├── auth/         # NextAuth endpoints
│   │   └── trpc/         # tRPC handler
│   ├── auth/             # Auth pages (signin/signup)
│   ├── dashboard/        # Protected user dashboard
│   ├── il-protocollo/    # Protocol information page
│   ├── profile/          # User profile page
│   └── solari/           # Sunscreen database page
├── components/            # React components
├── lib/                   # Core utilities
│   ├── db/               # Database config & schema
│   ├── trpc/             # tRPC routers & config
│   ├── auth.ts           # NextAuth configuration
│   ├── auth-helpers.ts   # Auth utilities
│   └── ratelimit.ts      # Rate limiting logic
└── types/                # TypeScript type definitions
```

### Key Architecture Decisions

1. **API Layer**: tRPC provides end-to-end type safety between client and server. All API calls go through tRPC routers in `/lib/trpc/routers/`.

2. **Database Schema** (`/lib/db/schema.ts`):
   - `users`, `accounts`, `sessions`, `verificationTokens` - Auth tables
   - `newsletters` - Email subscriptions with status tracking
   - `consultations` - Consultation requests with priority levels
   - `sunscreenProducts` - Comprehensive sunscreen database with filter composition
   - `pageViews` - Analytics tracking

3. **Authentication Flow**:
   - JWT-based sessions (30-day expiry)
   - Supports credentials + OAuth (Google, GitHub)
   - Role-based access: admin, editor, viewer, user
   - Protected routes via middleware.ts
   - bcryptjs with 12 salt rounds for password hashing

4. **Rate Limiting** (via Upstash Redis when configured):
   - General API: 100 req/min
   - Newsletter: 5 req/hour
   - Consultation: 3 req/hour
   - Search: 200 req/min

5. **Sunscreen Filter System** (`/app/solari/page.tsx`):
   - Dual filtering logic: Chemical ingredients (OR), Protection criteria (1+ match)
   - Dynamic column display based on filtered products
   - SPF efficacy calculator with skin type customization
   - Complex UV protection matrix (UVB, UVA1, UVA2, Long UVA1)

### Environment Variables

Required in `.env.local`:
```
DATABASE_URL=              # Neon PostgreSQL connection string
NEXTAUTH_URL=              # Authentication URL (http://localhost:3000)
NEXTAUTH_SECRET=           # 32+ character secret for JWT signing

# Optional OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

# Optional Rate Limiting (production)
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

### Important Implementation Notes

1. **Security Headers**: Configured in `next.config.ts` including CSP, HSTS, X-Frame-Options. Adjust CSP for production domains.

2. **tRPC Context**: Includes client IP extraction for rate limiting. Context created in `/lib/trpc/server.ts`.

3. **Form Validation**: All forms use React Hook Form + Zod schemas. Validation schemas in `/lib/validations.ts`.

4. **Sunscreen Products**: Database seeded from `/lib/db/seed-original-products.ts`. Products use JSONB for filter composition to allow flexible chemical tracking.

5. **Italian Language**: UI primarily in Italian. Form validations include Italian error messages.

### Development Workflow

1. **Database Changes**: 
   - Modify schema in `/lib/db/schema.ts`
   - Run `pnpm db:generate` then `pnpm db:migrate`
   - Update seed data if needed

2. **Adding API Endpoints**:
   - Create router in `/lib/trpc/routers/`
   - Add to root router in `/lib/trpc/root.ts`
   - Use appropriate rate-limited procedure

3. **Protected Routes**:
   - Add path patterns to `middleware.ts`
   - Use `auth()` in server components
   - Use `useSession()` in client components

4. **Type Safety**:
   - Database types auto-generated from Drizzle schema
   - tRPC provides full-stack type inference
   - Zod schemas provide runtime validation

### Testing Strategy

- **Unit Tests**: Vitest configured with React Testing Library
- **E2E Tests**: Playwright ready but no tests written yet
- **Test Database**: Use separate DATABASE_URL for testing

### Deployment Considerations

- **Build**: Runs type checking and linting before build
- **Database**: Ensure migrations are run before deployment
- **Environment**: Set NODE_ENV=production
- **Security**: Generate strong NEXTAUTH_SECRET
- **Monitoring**: Consider adding Sentry for error tracking
- **Analytics**: Basic pageViews tracking implemented