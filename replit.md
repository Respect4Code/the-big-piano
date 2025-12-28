# The Big Piano

## Overview

An interactive storytelling application built around a narrative about a toddler's discovery of different pianos. The app combines a paginated story reader with audio recording capabilities (so parents can record themselves reading the story) and interactive virtual piano keyboards with three distinct themes (toy, small upright, and grand piano). Each piano type has unique visual styling and synthesized sounds.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight alternative to React Router)
- **State Management**: TanStack React Query for server state, React hooks for local state
- **Styling**: Tailwind CSS with shadcn/ui component library (New York style)
- **Animations**: Framer Motion for piano key interactions and page transitions
- **Audio Synthesis**: Tone.js for generating piano sounds with different characteristics per piano type

### Build System
- **Bundler**: Vite for development and client builds
- **Server Bundling**: esbuild for production server bundle
- **TypeScript**: Strict mode enabled with path aliases (@/, @shared/, @assets/)

### Backend Architecture
- **Runtime**: Node.js with Express
- **Pattern**: Minimal API server - the app is primarily frontend-focused
- **Development**: tsx for running TypeScript directly
- **Static Serving**: Express serves built client assets in production

### Data Storage
- **Client-side Storage**: IndexedDB for audio recordings (stored as Blobs)
- **Database Schema**: Drizzle ORM with PostgreSQL configured, though currently only a minimal users table exists
- **Design Decision**: Audio recordings are intentionally stored client-side in IndexedDB rather than uploaded to a server, keeping the app simple and private

### Key Design Patterns
1. **Theme-based Piano Rendering**: Three piano types (toy, small, big) each have distinct visual themes and sound synthesis parameters
2. **Internationalization**: Story content supports English and Chinese with a simple object-based translation system
3. **Component Composition**: Piano keyboards built from Octave → PianoKey component hierarchy
4. **Audio Recording Flow**: MediaRecorder API captures audio, stores in IndexedDB with page-specific keys

## External Dependencies

### Audio & Media
- **Tone.js**: Web Audio API wrapper for synthesizing piano sounds with configurable oscillators, envelopes, and effects (reverb for grand piano)
- **MediaRecorder API**: Browser native API for recording user voice narration

### UI Components
- **shadcn/ui**: Pre-built accessible components using Radix UI primitives
- **Radix UI**: Headless UI primitives for dialogs, tooltips, dropdowns, etc.
- **Lucide React**: Icon library

### Database
- **PostgreSQL**: Database backend (requires DATABASE_URL environment variable)
- **Drizzle ORM**: Type-safe database queries and schema management
- **connect-pg-simple**: Session storage (configured but sessions not actively used)

### Development Tools
- **Replit Plugins**: Vite plugins for error overlay, cartographer, and dev banner in Replit environment