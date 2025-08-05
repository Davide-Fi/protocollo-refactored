# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

```bash
# Development
npm run dev          # Start development server with Turbopack
npm run build        # Build Next.js application
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking

# Database
npm run db:generate  # Generate Drizzle migrations
npm run db:migrate   # Run Drizzle migrations
npm run db:studio    # Open Drizzle Studio
npm run db:seed      # Seed database with sample data

# Testing
npm run test         # Run Vitest tests
npm run test:e2e     # Run Playwright E2E tests
```

## Architecture Overview

This is a Next.js 15 application for a longevity optimization platform focused on male health, completely refactored from the original Vite/Express architecture.

### Tech Stack
- **Framework**: Next.js 15 + App Router + React 19 + TypeScript
- **API Layer**: tRPC for end-to-end type safety
- **Database**: Neon PostgreSQL + Drizzle ORM
- **UI**: Tailwind CSS v4 + Dark theme design system
- **Forms**: React Hook Form + Zod validation
- **State Management**: Zustand + TanStack Query

### Key Architecture Patterns

1. **Shared Code**: `/shared/` directory contains database schemas and types used by both client and server
2. **Type Safety**: Drizzle ORM schemas generate TypeScript types, Zod validates at runtime
3. **API Communication**: TanStack Query manages server state with custom `apiRequest` wrapper
4. **Path Aliases**: 
   - `@/*` → client source files
   - `@shared/*` → shared code
   - `@assets/*` → client assets

### Database Schema

Two main tables (in `/shared/schema.ts`):
- `newsletters`: Email subscriptions with status tracking
- `consultations`: Consultation requests with personal info and status

Development uses in-memory storage (`/server/storage.ts`), production uses PostgreSQL.

### API Endpoints

All APIs are under `/api/`:
- `POST /api/newsletter` - Newsletter subscription
- `POST /api/consultation` - Consultation request
- `GET /api/consultations` - Retrieve consultations (admin)

### Frontend Routes

- `/` - Main landing page with all content sections
- `/il-protocollo` - Detailed protocol information
- `/solari` - Sunscreen database with filtering

### Important Implementation Details

1. **Sunscreen Filter System**: Complex dual-filter logic - chemical ingredients use OR logic, protection criteria changed from 2+ to 1+ requirements (Jan 2025)
2. **No Authentication**: Currently no user auth, just contact/newsletter forms
3. **Environment Variables**: Requires `DATABASE_URL` for PostgreSQL connection
4. **Session Infrastructure**: Packages installed but not actively used (express-session, passport ready for future)
5. **Development Server**: Custom Vite integration in Express for HMR in development mode

### Testing

No test framework is currently configured. When implementing tests, consider adding Jest or Vitest for the React/TypeScript stack.

### Deployment

Originally hosted on Replit. For VPS deployment:
- Set `NODE_ENV=production`
- Configure `DATABASE_URL`
- Default port is 5000 (configurable via `PORT` env var)
- Use PM2 or similar for process management
- Nginx for reverse proxy/SSL