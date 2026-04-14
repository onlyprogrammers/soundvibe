# SoundVibe - Premium Sound Effects Library

A modern, full-stack sound effects library platform built with Next.js, MongoDB, and beautiful UI components. Perfect for video editors, content creators, and podcasters looking for high-quality sound effects.

## Features

### User Features
- 🎵 Browse thousands of sound effects organized by category
- 🔍 Real-time search with category filtering
- ⭐ Like and download your favorite sounds
- 📱 Beautiful mobile-first responsive design
- 🎨 Modern dark theme with vibrant gradients
- 🚀 Fast and smooth performance

### Admin Features
- 📊 Dashboard with statistics and analytics
- 📤 Upload sounds individually or in bulk
- 📦 ZIP file extraction and batch upload
- 🏷️ Sound categorization and tagging
- 🎯 Featured and trending sound management
- 🔐 Secure admin authentication

### Technical Features
- ⚡ Next.js 16 with React 19
- 💾 MongoDB database with Mongoose
- 🔐 JWT authentication with bcryptjs
- 📁 ZIP file processing with JSZip
- 🎨 Tailwind CSS with shadcn/ui components
- 🔗 RESTful API design
- 📱 Mobile-optimized navigation drawer
- 🎯 SEO optimized

## Quick Start

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm
- MongoDB Atlas account

### Installation

1. **Clone or download the project**

2. **Install dependencies**
```bash
pnpm install
```

3. **Set up environment variables**

Create `.env.local`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/soundvibe
NEXTAUTH_SECRET=your-secure-secret-key-here
NEXTAUTH_URL=http://localhost:3000
```

4. **Run development server**
```bash
pnpm dev
```

5. **Open in browser**
```
http://localhost:3000
```

## Project Structure

```
├── app/
│   ├── admin/               # Admin pages
│   │   ├── login/          # Admin login
│   │   └── dashboard/      # Admin dashboard
│   ├── api/                # API routes
│   │   ├── auth/          # Authentication
│   │   ├── admin/         # Admin endpoints
│   │   └── sounds/        # Sound endpoints
│   ├── sound/             # Sound detail page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
│
├── components/
│   ├── admin/             # Admin components
│   │   ├── sound-upload.tsx
│   │   └── admin-stats.tsx
│   ├── header.tsx         # Main header
│   ├── footer.tsx         # Footer
│   ├── hero-banner.tsx    # Hero section
│   ├── mobile-nav.tsx     # Mobile navigation
│   ├── search-bar.tsx     # Search component
│   ├── sound-card.tsx     # Sound card
│   └── sound-section.tsx  # Sound section
│
├── lib/
│   ├── db.ts              # MongoDB connection
│   ├── models/            # Mongoose schemas
│   │   ├── Sound.ts      # Sound model
│   │   └── Admin.ts      # Admin model
│   ├── sounds-data.ts     # Static sound data
│   └── upload-utils.ts    # Upload utilities
│
└── public/
    └── logo.png           # App logo
```

## Database Schema

### Sound Model
```javascript
{
  name: String,              // Unique sound name
  category: String,          // Category (Funny, Transitions, etc)
  description: String,       // Sound description
  duration: Number,          // Duration in seconds
  downloads: Number,         // Download count
  likes: Number,             // Like count
  fileUrl: String,           // Sound file URL
  imageUrl: String,          // Image URL (optional)
  featured: Boolean,         // Featured flag
  trending: Boolean,         // Trending flag
  isNew: Boolean,            // New flag
  createdAt: Date,           // Creation date
  updatedAt: Date            // Update date
}
```

### Admin Model
```javascript
{
  email: String,             // Unique email
  password: String,          // Bcrypt hashed password
  name: String,              // Admin name
  role: String,              // 'admin' or 'super_admin'
  isActive: Boolean,         // Account active status
  createdAt: Date,           // Creation date
  updatedAt: Date            // Update date
}
```

## API Documentation

### Public Endpoints

#### Get Sounds
```
GET /api/sounds
Query params:
  - category: string (filter by category)
  - trending: boolean (get trending sounds)
  - limit: number (default: 20)

Response: { success: true, sounds: Sound[], count: number }
```

#### Get Sound Details
```
GET /api/sounds/[id]

Response: { success: true, sound: Sound }
```

### Admin Endpoints (Requires JWT Token)

#### Admin Login
```
POST /api/auth/login
Body: { email: string, password: string }

Response: { message: string, token: string, admin: Admin }
```

#### Upload Sounds
```
POST /api/admin/upload
Headers: { Authorization: 'Bearer [token]' }
Body: FormData with files and mode

Response: { message: string, count: number, sounds: Sound[] }
```

#### Get Statistics
```
GET /api/admin/stats
Headers: { Authorization: 'Bearer [token]' }

Response: {
  totalSounds: number,
  totalDownloads: number,
  totalLikes: number,
  trendingSounds: number
}
```

## Admin Panel

### Access
Navigate to `http://localhost:3000/admin/login`

### Dashboard
View key statistics:
- Total sounds in library
- Total downloads across all sounds
- Total likes
- Number of trending sounds

### Upload Sounds
Three upload modes:
1. **Single** - Upload one sound
2. **Multiple** - Upload multiple files
3. **Bulk (ZIP)** - Upload and auto-extract ZIP file

Supported formats: MP3, WAV, OGG, M4A, FLAC

## Categories

Available sound categories:
- 🎭 Funny
- 📍 Transitions
- 💥 Impact
- 🎤 Voice Effects
- 🌊 Ambient
- 🎬 Cinematic
- 🕹️ Retro
- ✨ Modern

## Color System

- **Primary**: Electric Purple (#A855F7)
- **Secondary**: Warm Orange (#FF6B35)
- **Accent**: Cyan Blue (#00D9FF)
- **Background**: Deep Dark (#0A0E27)
- **Card**: Dark Slate (#18202F)

## Responsive Design

### Mobile (< 768px)
- Full-width layout
- Slide-out navigation drawer
- Stacked sections
- Touch-friendly buttons

### Tablet (768px - 1024px)
- Two-column layouts
- Optimized spacing
- Visible scroll buttons

### Desktop (> 1024px)
- Multi-column layouts
- Hover effects
- Full navigation visible
- Scroll navigation buttons

## File Upload Process

1. **Select files** (single, multiple, or ZIP)
2. **Choose upload mode** automatically detected
3. **For ZIP files**: 
   - Extract contents
   - Identify audio files
   - Create database entries
4. **Generate file URLs**
5. **Store metadata** in MongoDB
6. **Return confirmation** with details

## Security

- ✅ Password hashing with bcryptjs
- ✅ JWT token authentication
- ✅ Protected API endpoints
- ✅ Input validation
- ✅ MongoDB injection prevention
- ✅ CORS configured
- ✅ Environment variables secured

## Performance

- 📦 Next.js optimizations
- ⚡ Database indexing
- 🎨 CSS-in-JS efficiency
- 🖼️ Image optimization
- 🔄 API response caching ready
- 📱 Mobile-first CSS

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers

## Development

### Build
```bash
pnpm build
```

### Start Production
```bash
pnpm start
```

### Lint
```bash
pnpm lint
```

## Environment Variables

```env
# Database
MONGODB_URI=mongodb+srv://...

# Authentication
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000

# Optional
NODE_ENV=development
```

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy to Vercel

```bash
npx vercel
```

## Documentation

- [Setup Guide](./SETUP.md) - Detailed setup instructions
- [Implementation Summary](./IMPLEMENTATION_SUMMARY.md) - Complete feature list
- [Deployment Guide](./DEPLOYMENT.md) - Production deployment steps

## Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## License

MIT License - see LICENSE file for details

## Support

For issues or questions:
1. Check documentation files
2. Review API responses
3. Check browser console
4. Verify environment variables
5. Contact via email: admin@soundvibe.com

## Roadmap

### Phase 2
- [ ] User accounts and authentication
- [ ] Sound favorites/playlists
- [ ] User ratings and reviews
- [ ] Sound previews with HTML5 audio player
- [ ] Advanced search filters
- [ ] Download history
- [ ] Admin sound editing
- [ ] Bulk sound deletion

### Phase 3
- [ ] Mobile app
- [ ] API documentation site
- [ ] Sound analytics dashboard
- [ ] Subscription tiers
- [ ] Advanced audio editor
- [ ] Community submissions
- [ ] Sound versioning

### Phase 4
- [ ] AI-powered sound recommendations
- [ ] Sound effect collections
- [ ] Collaboration features
- [ ] Sound licensing system
- [ ] Marketplace for creators
- [ ] Advanced analytics

## Performance Metrics

Target performance:
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- Time to Interactive: < 3s

## Changelog

### v1.0.0 (Current)
- ✅ Initial release
- ✅ Homepage with sound library
- ✅ Search and filtering
- ✅ Admin panel with upload
- ✅ MongoDB integration
- ✅ JWT authentication
- ✅ Mobile-responsive design

## Credits

Built with:
- [Next.js](https://nextjs.org)
- [React](https://react.dev)
- [MongoDB](https://www.mongodb.com)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Lucide Icons](https://lucide.dev)

## Contact

- Email: admin@soundvibe.com
- Website: soundvibe.com
- Twitter: @soundvibe

---

Made with ❤️ for creators
"# soundvibe" 
