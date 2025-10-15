
# 🎥 YouTube Downloader

A modern, fast, and user-friendly YouTube video downloader built with React and Express. Download your favorite YouTube videos in multiple quality options or extract audio in MP3 format.

![YouTube Downloader](https://img.shields.io/badge/Status-Active-success)
![License](https://img.shields.io/badge/License-MIT-blue)
![Node](https://img.shields.io/badge/Node-20.x-green)
![React](https://img.shields.io/badge/React-18.3-61DAFB)

## ✨ Features

- 🔍 **Smart Search**: Search YouTube videos or paste direct URLs
- 📊 **Multiple Quality Options**: Download videos from 144p to 1080p
- 🎵 **Audio Extraction**: Extract MP3 audio from videos
- 📝 **Download History**: Track your recent downloads
- 🌓 **Dark/Light Theme**: Toggle between themes for comfortable viewing
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile
- ⚡ **Fast Performance**: Built with Vite for lightning-fast development and production builds
- 🎨 **Modern UI**: Beautiful interface inspired by YouTube's design language

## 🚀 Tech Stack

### Frontend
- **[React 18.3](https://react.dev/)** - Modern UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Vite](https://vitejs.dev/)** - Next-generation frontend tooling
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Re-usable component library
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[TanStack Query](https://tanstack.com/query)** - Powerful data synchronization
- **[Wouter](https://github.com/molefrog/wouter)** - Minimalist routing
- **[Framer Motion](https://www.framer.com/motion/)** - Production-ready animations
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation

### Backend
- **[Express.js](https://expressjs.com/)** - Fast, unopinionated web framework
- **[Node.js 20](https://nodejs.org/)** - JavaScript runtime
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety on the server
- **[yt-search](https://www.npmjs.com/package/yt-search)** - YouTube search functionality
- **[Drizzle ORM](https://orm.drizzle.team/)** - TypeScript ORM (configured for future use)

### Development Tools
- **[ESBuild](https://esbuild.github.io/)** - Fast JavaScript bundler
- **[TSX](https://github.com/privatenumber/tsx)** - TypeScript execution environment
- **[Drizzle Kit](https://orm.drizzle.team/kit-docs/overview)** - Database migration toolkit

### External APIs
- **[Hector's YouTube Downloader API](https://yt-dl.officialhectormanuel.workers.dev/)** - Video metadata and download link generation

## 📦 Installation

### Prerequisites
- Node.js 20.x or higher
- npm or yarn package manager

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/mrfr8nk/youtube-downloader.git
cd youtube-downloader
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm run start        # Start production server

# Type Checking
npm run check        # Run TypeScript type checking

# Database
npm run db:push      # Push database schema changes
```

## 📁 Project Structure

```
youtube-downloader/
├── client/              # Frontend React application
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   ├── hooks/       # Custom React hooks
│   │   ├── lib/         # Utility functions
│   │   └── App.tsx      # Main app component
│   └── index.html       # HTML entry point
├── server/              # Backend Express application
│   ├── index.ts         # Server entry point
│   ├── routes.ts        # API route definitions
│   ├── storage.ts       # In-memory storage
│   └── vite.ts          # Vite integration
├── shared/              # Shared types and schemas
│   └── schema.ts        # Zod schemas
└── package.json         # Project dependencies
```

## 🎨 Features Breakdown

### Video Download
- Support for multiple video quality formats (144p, 240p, 360p, 480p, 720p, 1080p)
- File size estimation for each quality option
- One-click download functionality

### Search Functionality
- Real-time YouTube search with video previews
- Display video thumbnails, titles, and metadata
- Click to select from search results

### Download History
- Automatically saves download history
- Quick re-download from history
- Persistent storage across sessions

### Theme Support
- Light and dark mode themes
- System preference detection
- Persistent theme selection

## 🌐 Deployment

This application is optimized for deployment on **[Replit](https://replit.com)** with automatic configuration:

```bash
# Build and deploy
npm run build
npm run start
```

The deployment configuration is already set up in `.replit` for seamless hosting.

## 👨‍💻 Developer

**Darrell Mucheri**
- Full Stack Developer | Open Source Enthusiast
- 📧 Email: [darrelmucheri@gmail.com](mailto:darrelmucheri@gmail.com)
- 🐙 GitHub: [@mrfr8nk](https://github.com/mrfr8nk)
- 💬 WhatsApp: [+263 719 647 303](https://wa.me/263719647303)
- 📱 Telegram: [@mrfrankofc](https://t.me/mrfrankofc)

## 💖 Support & Donate

If you find this project useful and would like to support its development, you can:

### Ways to Support
- ⭐ **Star this repository** - It helps others discover the project
- 🐛 **Report bugs** - Help improve the application
- 💡 **Suggest features** - Share your ideas for enhancements
- 🔀 **Contribute code** - Submit pull requests
- ☕ **Buy me a coffee** - Support development directly

### Contact for Donations
Reach out through any of the following channels:
- 📧 Email: darrelmucheri@gmail.com
- 💬 WhatsApp: +263 719 647 303
- 📱 Telegram: @mrfrankofc

Your support helps keep this project maintained and free for everyone! 🙏

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **[Hector's YouTube Downloader API](https://yt-dl.officialhectormanuel.workers.dev/)** - For providing the video download functionality
- **[shadcn/ui](https://ui.shadcn.com/)** - For the beautiful component library
- **[Radix UI](https://www.radix-ui.com/)** - For accessible UI primitives
- **Open Source Community** - For all the amazing tools and libraries

## ⚠️ Disclaimer

This tool is for personal use only. Please respect YouTube's Terms of Service and copyright laws. Only download videos you have the right to download.

---

<div align="center">
  
**Built with ❤️ by Darrell Mucheri**

[⬆ Back to Top](#-youtube-downloader)

</div>
