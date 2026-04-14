# SoundVibe - Setup Guide

## Prerequisites

- Node.js 18+ and pnpm
- MongoDB Atlas account (or local MongoDB)
- Environment variables configured

## Installation

1. **Install Dependencies**
```bash
pnpm install
```

2. **Configure Environment Variables**

Create a `.env.local` file in the root directory:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/soundvibe?retryWrites=true&w=majority

# Auth Secret
NEXTAUTH_SECRET=your-secret-key-here-at-least-32-chars

# Next Auth URL
NEXTAUTH_URL=http://localhost:3000
```

## Database Setup

### 1. Create MongoDB Database

- Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create a free cluster
- Get your connection string
- Replace `username:password` with your credentials

### 2. Create Initial Admin User

Create a `scripts/create-admin.ts` file or run the following in your MongoDB shell:

```javascript
db.admins.insertOne({
  email: "admin@soundvibe.com",
  password: "bcrypt-hashed-password", // Use bcryptjs to hash
  name: "Admin User",
  role: "super_admin",
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
})
```

Or use the API to create an admin account.

## Running the Application

### Development
```bash
pnpm dev
```

The app will be available at `http://localhost:3000`

### Production Build
```bash
pnpm build
pnpm start
```

## Features

### Public Features
- **Homepage**: Browse trending, most downloaded, new releases, and featured sounds
- **Search**: Real-time search with category filters
- **Sound Details**: View full sound information and related sounds
- **Responsive Design**: Mobile-first design that works on all devices

### Admin Features
- **Dashboard**: View statistics (total sounds, downloads, likes, trending)
- **Upload Sounds**:
  - Single sound upload
  - Multiple sounds upload
  - Bulk ZIP file upload (auto-extraction)
- **Sound Management**: Edit and manage uploaded sounds

## API Endpoints

### Public APIs
- `GET /api/sounds` - Get all sounds with filters
- `GET /api/sounds/[id]` - Get single sound details

### Admin APIs (Require Auth Token)
- `POST /api/auth/login` - Admin login
- `POST /api/admin/upload` - Upload sounds (single/multiple/zip)
- `GET /api/admin/stats` - Get dashboard statistics

## File Upload

### Supported Formats
- **Audio**: MP3, WAV, OGG, M4A, FLAC
- **Archives**: ZIP files containing audio files

### Upload Modes
1. **Single** - Upload one sound file
2. **Multiple** - Upload multiple sound files at once
3. **Bulk (ZIP)** - Upload a ZIP file containing multiple sounds (auto-extracted)

## Admin Panel Access

1. Navigate to `http://localhost:3000/admin/login`
2. Login with your admin credentials
3. Access the dashboard to manage sounds

## Folder Structure

```
/app
  /admin
    /login - Admin login page
    /dashboard - Admin dashboard
  /api
    /auth - Authentication endpoints
    /admin - Admin-only endpoints
    /sounds - Public sound endpoints
  /page.tsx - Homepage

/components
  /admin - Admin components
  /header.tsx - Main header with search
  /footer.tsx - Footer
  /mobile-nav.tsx - Mobile navigation drawer
  /sound-card.tsx - Sound display card
  /sound-section.tsx - Sound section with scrollable cards

/lib
  /db.ts - MongoDB connection
  /models
    /Sound.ts - Sound schema
    /Admin.ts - Admin schema
  /sounds-data.ts - Static sound data (fallback)
  /upload-utils.ts - ZIP extraction utilities
```

## Troubleshooting

### MongoDB Connection Issues
- Verify MongoDB URI in `.env.local`
- Check IP whitelist in MongoDB Atlas
- Ensure database permissions are correct

### Authentication Errors
- Clear browser localStorage
- Verify admin credentials
- Check NEXTAUTH_SECRET is set

### Upload Issues
- Check file size limits
- Verify supported audio formats
- Ensure directory permissions for file storage

## Security Notes

- Store `NEXTAUTH_SECRET` securely
- Use strong passwords for admin accounts
- Enable MongoDB authentication
- Restrict API access in production
- Use HTTPS in production

## Next Steps

1. Set up MongoDB database
2. Configure environment variables
3. Create initial admin user
4. Run development server
5. Access admin panel to upload sounds
6. Customize categories and sound properties

## Support

For issues or questions:
- Check API response messages
- Review browser console for errors
- Verify environment variables are correct
- Check MongoDB connection status
