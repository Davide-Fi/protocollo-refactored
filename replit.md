# Overview

This is a full-stack web application for "Protocollo", a longevity optimization platform focused on male health. The application provides scientifically-backed protocols for nutrition, supplementation, prevention, and performance tracking. It features a dark-themed landing page with sections for different health protocols, a newsletter subscription system, consultation request functionality, and a comprehensive sunscreen filter database with working cross-database linking functionality.

# User Preferences

Preferred communication style: Simple, everyday language.
Always add new pages to both hamburger menu and footer navigation automatically.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Comprehensive shadcn/ui component library with Radix UI primitives
- **Styling**: Tailwind CSS with a dark theme design system featuring custom color variables (navy-charcoal, steel-blue, scientific-blue, performance-green)
- **State Management**: TanStack Query for server state management and API interactions
- **Form Handling**: React Hook Form with Zod validation for type-safe form management

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Development Server**: Custom Vite integration for development with HMR support
- **API Design**: RESTful endpoints for newsletter subscriptions and consultation requests
- **Error Handling**: Centralized error middleware with proper HTTP status codes

## Data Storage Solutions
- **ORM**: Drizzle ORM with PostgreSQL dialect for type-safe database operations
- **Database**: Configured for PostgreSQL (Neon Database) with connection pooling
- **Schema Management**: Shared schema definitions between client and server using Drizzle and Zod
- **Development Storage**: In-memory storage implementation for development/testing
- **Migrations**: Drizzle Kit for database schema migrations
- **Cross-Database Linking**: Successfully implemented popup system linking sunscreen filters to products containing those filters using boolean field mapping (Jan 2025)

## Authentication and Authorization
- **Session Management**: Basic session handling with connect-pg-simple for PostgreSQL session storage
- **No Authentication**: Currently implements a simple contact/newsletter system without user authentication

## External Dependencies
- **Database Provider**: Neon Database (@neondatabase/serverless) for serverless PostgreSQL
- **Validation**: Zod for runtime type checking and schema validation
- **Icons**: Lucide React for consistent iconography, React Icons for social media icons
- **Development Tools**: ESBuild for production builds, TSX for development server execution
- **Replit Integration**: Custom Replit plugins for development environment integration