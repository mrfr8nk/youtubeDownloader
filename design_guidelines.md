# YouTube Video Downloader - Design Guidelines

## Design Approach: Reference-Based (YouTube + Modern Download Tools)

**Primary References:** YouTube's interface patterns, Spotify's download UI, and modern media tools like ClipChamp
**Justification:** This is a media-focused, experience-driven application where visual appeal and intuitive interaction drive user engagement. Drawing from YouTube's familiar patterns ensures user comfort while modern download tool aesthetics provide polish.

**Core Design Principles:**
- Instant visual feedback for all actions
- Clear quality differentiation through visual hierarchy
- Seamless transition from search to download
- Trust-building through progress transparency

---

## Color Palette

**Dark Mode (Primary):**
- Background: 222 15% 8% (deep charcoal)
- Surface: 222 15% 12% (elevated cards)
- Primary (YouTube Red): 0 100% 50%
- Primary Hover: 0 100% 45%
- Text Primary: 0 0% 98%
- Text Secondary: 220 9% 65%
- Success (Download Ready): 142 71% 45%
- Border: 220 13% 18%

**Light Mode:**
- Background: 0 0% 98%
- Surface: 0 0% 100%
- Primary: 0 100% 50%
- Text Primary: 222 47% 11%
- Text Secondary: 215 14% 34%

---

## Typography

**Font Families:**
- Primary: 'Inter' (Google Fonts) - All UI elements
- Monospace: 'JetBrains Mono' - Quality badges, download sizes

**Type Scale:**
- Hero/Title: text-4xl font-bold (36px)
- Video Title: text-xl font-semibold (20px)
- Section Headers: text-lg font-medium (18px)
- Body: text-base (16px)
- Caption/Metadata: text-sm text-secondary (14px)
- Badges: text-xs font-medium uppercase tracking-wide (12px)

---

## Layout System

**Spacing Primitives:** Use Tailwind units of 3, 4, 6, 8, 12, 16
- Component padding: p-6 to p-8
- Section gaps: space-y-8 to space-y-12
- Card spacing: p-6
- Button padding: px-6 py-3

**Container Strategy:**
- Max width: max-w-6xl mx-auto
- Page padding: px-4 md:px-6 lg:px-8
- Grid layouts: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 for quality options

---

## Component Library

### Hero Section
- **Layout:** Full-width gradient background (from YouTube red to deep purple), h-[400px]
- **Content:** Centered search interface with animated input field
- **Search Bar:** Prominent w-full max-w-3xl with icon, rounded-xl, shadow-2xl
- **Credit:** "Powered by Mr. Frank" - subtle placement in hero, text-sm opacity-80

### Video Preview Card
- **Container:** Rounded-2xl surface with subtle shadow and border
- **Thumbnail:** 16:9 ratio, rounded-t-2xl, overlay with play button icon
- **Metadata Grid:** 2-column layout showing title, duration, views (if available)
- **Quality Selector:** Horizontal pill navigation below thumbnail

### Download Options
- **Layout:** Grid of quality cards (3-4 columns on desktop)
- **Quality Badges:** Colored pills - 1080p (green), 720p (blue), 480p/360p (gray), 144p (minimal)
- **Format Indicators:** MP3 with music icon, MP4 with video icon
- **File Size:** Display in monospace font below quality

### Download Buttons
- **Primary Action:** Large rounded-lg button with download icon
- **States:** Default (primary red), Downloading (animated progress), Complete (green checkmark)
- **Progress Bar:** Thin linear indicator below button, animated gradient

### Download History Section
- **Layout:** Compact list with small thumbnails (80px width)
- **Items:** Horizontal cards showing thumbnail, title, quality, timestamp
- **Action:** Re-download icon button on hover
- **Max Items:** Display last 5 downloads with "Clear History" option

### Input & Forms
- **Search Input:** Large h-14 with YouTube red focus ring, search icon left, clear button right
- **URL Input:** Same styling with paste icon, real-time validation feedback
- **Validation States:** Green checkmark (valid), red X with error message (invalid)

---

## Interactive Elements

**Micro-interactions:**
- Search input: Scale-up on focus with subtle glow
- Quality cards: Lift on hover (translateY -2px) with shadow increase
- Download button: Pulse animation on hover, smooth progress fill
- Video card: Thumbnail zoom on hover (scale 1.05)

**Loading States:**
- Skeleton screens for video preview
- Spinner for API calls (YouTube red color)
- Shimmer effect on loading cards

---

## Images & Media

**Hero Background:**
- Abstract gradient mesh with YouTube play button watermarks, subtle opacity
- Animated gradient shift on page load

**Video Thumbnails:**
- Display high-quality YouTube thumbnails from API
- Fallback: Gradient placeholder with video icon if thumbnail fails
- Aspect ratio: Strict 16:9 with object-cover

**Icons:**
- Use Heroicons for all interface icons (download, search, play, quality indicators)
- Consistent 24px size for primary actions, 20px for secondary

---

## Accessibility & Polish

- Dark mode as default with toggle in header
- Focus states: 2px YouTube red ring with offset
- ARIA labels on all interactive elements
- Keyboard navigation: Tab through quality options, Enter to download
- Error handling: Toast notifications for API failures (top-right position)
- Success feedback: Animated checkmark with "Download started" message

---

**Deployment Note:** Ensure all assets load via CDN for Vercel optimization, implement lazy loading for download history thumbnails.