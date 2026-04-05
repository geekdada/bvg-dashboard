# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `pnpm dev` - Start development server (Next.js 15)
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run Next.js linting

## Project Architecture

This is a Next.js 15 dashboard application for displaying real-time BVG (Berlin public transport) departures and trip information.

### Tech Stack

- **Framework**: Next.js 15 with App Router
- **UI**: Radix UI components + shadcn/ui, Tailwind CSS
- **Styling**: Custom BVG brand colors and transport-specific colors
- **Package Manager**: pnpm (required)
- **API**: BVG REST API (v6.bvg.transport.rest)

### Key Directories Structure

- `app/` - Next.js app router pages (layout, home, stops/[id], trips/[id])
- `components/` - Reusable React components and shadcn/ui components
- `lib/` - Utility functions and API calls
- `hooks/` - Custom React hooks

### Core API Functions (lib/api.ts)

- `fetchDepartures(stopId)` - Get departures for a specific stop
- `searchStops(query)` - Search for stops by name
- `fetchTripDetails(tripId)` - Get detailed trip information with stopovers

### Utility Functions (lib/utils.ts)

- Time formatting utilities (`formatTime`, `formatDelay`)
- Transport-specific helpers (`getProductIcon`, `getProductColor`)
- BVG transport products: suburban (S), subway (U), tram (T), bus (B), ferry (F), express (E), regional (R)

### Design System

- Uses BVG official colors (yellow, black) and transport line colors
- Responsive design with mobile-first approach
- Dark mode support via next-themes
- Custom CSS variables for consistent theming

### Design Guidelines

- Aim for a **Berlin underground** aesthetic: moody, calm, utility-first, and high-contrast rather than glossy SaaS styling
- Keep **BVG yellow** for strong accents, active states, and key time markers; avoid using bright yellow for small light-mode text
- Prefer darker accent text tones on light backgrounds for readability
- Use signage-inspired hierarchy: compact uppercase kickers, bold destination names, and tabular numerals for times
- Departure cards should prioritize scan order on mobile: line, destination, time, relative time/delay, then secondary metadata
- Keep mobile layouts dense but breathable; reduce vertical waste before shrinking text
- Search results should appear as a floating popup surface, not an inline expanding block
- Filter tabs should use a fixed outer shell with only the inner tab content scrolling horizontally when needed
- Platform and product filters should have distinct sizing so nested controls read as secondary navigation
- Remarks/actions on small screens should stay compact and icon-first while preserving accessible labels
- Prefer rounded panel surfaces, subtle borders, and visible layered shadows to preserve depth across light and dark themes
- Maintain visible focus states, keyboard navigation, and touch-friendly targets for all interactive controls

### Key Features

- Real-time departure information
- Stop search functionality
- Trip details with stopovers
- Google Maps integration for stops
- Mobile-responsive interface

## Important Notes

- TypeScript and ESLint errors are ignored during builds (legacy configuration)
- Uses `@/*` path mapping for imports
- All API calls are server-side (no client-side API keys needed)
- BVG REST API provides public transport data for Berlin
