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
