# YouTube Video Downloader

## Overview

A modern YouTube video and audio downloader application that allows users to download YouTube content in multiple quality formats (144p-1080p video or MP3 audio). The application features a clean, YouTube-inspired interface with dark mode support and real-time download history tracking.

The application is built as a full-stack web application with a React frontend and Express backend, using an external YouTube download API service for fetching video data and generating download links.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **Routing**: Wouter (lightweight client-side routing)
- **State Management**: TanStack Query (React Query) for server state management
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **Styling**: Tailwind CSS with custom design system

**Design System:**
- Custom color palette supporting dark/light themes
- Typography using Inter (UI) and JetBrains Mono (code/badges) fonts
- Component architecture follows YouTube's familiar patterns for user comfort
- Responsive design with mobile-first approach

**Key Frontend Components:**
- `SearchBar`: URL input with YouTube URL validation
- `VideoPreview`: Displays video thumbnail and metadata
- `QualitySelector`: Presents download options for different video qualities and audio
- `DownloadHistory`: Shows recent downloads with ability to re-download
- `ThemeToggle`: Dark/light mode switcher

**State Management Strategy:**
- Server state cached and managed by React Query
- Local UI state managed with React hooks
- Theme preference persisted in localStorage
- Download history synced with backend storage

### Backend Architecture

**Technology Stack:**
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Data Storage**: In-memory storage (MemStorage class) for download history
- **Schema Validation**: Zod for request/response validation
- **External API**: Integration with Hector's YouTube Downloader API

**API Design:**
- RESTful endpoints for fetching video data and managing download history
- Type-safe request/response handling with Zod schemas
- Error handling middleware for consistent error responses
- Request logging for monitoring API usage

**Key Backend Routes:**
1. `POST /api/youtube/fetch` - Fetches video metadata and download links from external API
2. `POST /api/download-history` - Saves download record to history
3. `GET /api/download-history` - Retrieves user's download history

**Data Storage Pattern:**
- In-memory Map-based storage for simplicity and speed
- UUID-based record identification
- Timestamp-sorted history entries
- Designed for easy migration to persistent database (structure supports Drizzle ORM with PostgreSQL)

**Rationale for In-Memory Storage:**
- Fast read/write operations for download history
- No external database setup required for initial deployment
- Simple data model suitable for stateless operation
- Can be replaced with Drizzle + PostgreSQL when persistence is needed

### External Dependencies

**Third-Party Services:**
- **Hector's YouTube Downloader API** (`https://yt-dl.officialhectormanuel.workers.dev/`)
  - Purpose: Fetches YouTube video metadata and generates download links
  - Returns: Video title, thumbnail, audio link, and multiple video quality options (144p-1080p)
  - API Key: Not required (public API)
  - Response format: JSON with status, title, thumbnail, audio URL, and quality-mapped video URLs

**UI Component Libraries:**
- **shadcn/ui**: Pre-built, customizable React components
- **Radix UI**: Accessible primitive components for building the UI
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Lucide React**: Icon library for consistent iconography

**Development Tools:**
- **Vite Plugins**: Development banner, error overlay, and cartographer (Replit-specific)
- **TypeScript**: Type safety across the entire application
- **Drizzle Kit**: Database schema management (configured but not actively used)

**Data Validation:**
- **Zod**: Runtime type validation for API requests/responses
- Shared schema definitions between frontend and backend for type consistency

**Fonts:**
- **Google Fonts**: Inter and JetBrains Mono for typography

**Database (Configured but Unused):**
- **Drizzle ORM**: Type-safe ORM ready for PostgreSQL integration
- **Neon Database**: Serverless PostgreSQL driver configured
- Schema defined in `shared/schema.ts` for future migration from in-memory storage