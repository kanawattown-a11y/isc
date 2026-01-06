# ISC Internal Security Command Website

## Overview

This is a bilingual (Arabic primary, English secondary) website for the Internal Security Command (قيادة الأمن الداخلي) of Jabal Bashan. The project is a full-stack application with a React frontend and Express backend, designed with a governmental/security agency aesthetic. The site features RTL (right-to-left) layout support, a contact form system, and follows official government website design patterns.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight alternative to React Router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **UI Components**: shadcn/ui component library (Radix UI primitives)
- **Animations**: Framer Motion for page transitions and interactions
- **Forms**: React Hook Form with Zod validation
- **Build Tool**: Vite with custom plugins for Replit integration

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript (ESM modules)
- **API Pattern**: RESTful endpoints under `/api/*`
- **Storage**: Abstracted storage layer with in-memory implementation (MemStorage)
- **Database Ready**: Drizzle ORM configured for PostgreSQL (schema defined, can be connected)

### Directory Structure
```
client/           # Frontend React application
  src/
    components/   # Reusable UI components
    pages/        # Route page components
    hooks/        # Custom React hooks
    lib/          # Utility functions and API client
server/           # Backend Express application
  index.ts        # Server entry point
  routes.ts       # API route definitions
  storage.ts      # Data storage abstraction
shared/           # Shared code between frontend and backend
  schema.ts       # Drizzle schema and Zod validators
```

### Design System
- **Color Palette**: Navy (#1e2a5e), Sky Blue (#4a90e2), Light Blue (#6eb5e8), Silver-Gray (#e8edf2)
- **Typography**: Tajawal (Arabic), Inter (English fallback)
- **Layout**: 1280px max-width container, 12-column grid system
- **RTL Support**: Full right-to-left layout with `dir="rtl"` and `lang="ar"`

### Key Design Decisions

1. **Bilingual Support**: Primary Arabic with English secondary, using Tajawal font optimized for Arabic readability
2. **Storage Abstraction**: IStorage interface allows swapping between MemStorage and database implementations
3. **Shared Schema**: Single source of truth for types using Drizzle + Zod (drizzle-zod)
4. **Component Library**: shadcn/ui provides accessible, customizable components with Radix primitives

## External Dependencies

### Database
- **PostgreSQL**: Configured via `DATABASE_URL` environment variable
- **Drizzle ORM**: Schema in `shared/schema.ts`, migrations in `./migrations`
- **Drizzle Kit**: Database push via `npm run db:push`

### Third-Party Services
- **Google Fonts**: Tajawal and Inter fonts loaded via CDN

### Key NPM Packages
- `@tanstack/react-query`: Server state management
- `@radix-ui/*`: Accessible UI primitives
- `framer-motion`: Animation library
- `wouter`: Lightweight routing
- `zod`: Runtime type validation
- `drizzle-orm` / `drizzle-zod`: Database ORM and schema validation
- `express`: HTTP server framework
- `connect-pg-simple`: PostgreSQL session store (available for auth)