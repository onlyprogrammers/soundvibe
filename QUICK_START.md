# SoundVibe Quick Start Guide

Get up and running in 5 minutes!

## 1. Installation (2 minutes)

```bash
# Install dependencies
pnpm install

# Create .env.local with these variables:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/soundvibe
NEXTAUTH_SECRET=generate-secure-key-here
NEXTAUTH_URL=http://localhost:3000
```

## 2. Start Development (1 minute)

```bash
# Run dev server
pnpm dev

# App opens at http://localhost:3000
```

## 3. Setup MongoDB (1 minute)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Get connection string
4. Add to `.env.local`

## 4. Create Admin User (1 minute)

Create initial admin in MongoDB Atlas shell:

```javascript
db.admins.insertOne({
  email: "admin@soundvibe.com",
  password: "$2a$10$...", // Use bcryptjs
  name: "Admin",
  role: "super_admin",
  isActive: true
})
```

Or use online bcrypt generator to hash password first.

## First Steps

### Visit the App
- **Homepage**: http://localhost:3000
- **Admin Login**: http://localhost:3000/admin/login

### Using Admin Panel
1. Login with admin credentials
2. Go to Dashboard tab to see stats
3. Go to Upload tab
4. Select upload mode (single/multiple/zip)
5. Choose files
6. Click Upload

### Browse Sounds
1. View sounds on homepage
2. Use search bar to find specific sounds
3. Filter by category
4. Click sound card to see details
5. Like and download sounds

## Common Commands

```bash
# Development
pnpm dev

# Build
pnpm build

# Production
pnpm start

# Lint code
pnpm lint
```

## File Structure

```
Key folders:
- app/        → Pages and API routes
- components/ → UI components
- lib/        → Database, schemas, utilities
- public/     → Static assets (logo, images)
```

## API Endpoints (Quick Reference)

```
Public:
GET  /api/sounds           Get all sounds
GET  /api/sounds/[id]      Get sound details

Admin (need token):
POST /api/auth/login       Login
POST /api/admin/upload     Upload sounds
GET  /api/admin/stats      Get statistics
```

## Troubleshooting

### MongoDB Connection Failed
```
✗ Check MONGODB_URI format
✗ Verify IP whitelist in Atlas
✗ Check username/password
✗ Ensure @cluster.mongodb.net is in URI
```

### Admin Login Not Working
```
✗ Clear browser localStorage
✗ Verify admin user exists in MongoDB
✗ Check password hash with bcryptjs
✗ Verify NEXTAUTH_SECRET is set
```

### Upload Not Working
```
✗ Check file format (mp3, wav, ogg, m4a, flac)
✗ Verify file size is reasonable
✗ Check browser console for errors
✗ Verify API response in network tab
```

### Styles Not Loading
```
✗ Run: pnpm install
✗ Clear .next folder
✗ Restart dev server
✗ Check tailwind.config.ts
```

## Features Checklist

- ✅ Homepage with sound sections
- ✅ Search with category filters
- ✅ Mobile navigation drawer
- ✅ Admin login page
- ✅ Admin dashboard with stats
- ✅ Sound upload (single/multiple/zip)
- ✅ Sound detail pages
- ✅ Database integration (MongoDB)
- ✅ Responsive design
- ✅ Gradient UI design

## Next Steps

1. ✅ Complete basic setup
2. ✅ Add sounds via admin panel
3. ✅ Test all features
4. ✅ Customize categories
5. ✅ Deploy to Vercel
6. ✅ Setup custom domain
7. ✅ Configure email notifications
8. ✅ Add more features

## Key Technologies

| Tech | Purpose |
|------|---------|
| Next.js 16 | Framework |
| React 19 | UI Library |
| MongoDB | Database |
| Mongoose | ORM |
| JWT | Authentication |
| Tailwind CSS | Styling |
| TypeScript | Language |

## Environment Variables Needed

```env
# Must have
MONGODB_URI=...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=...

# Optional
NODE_ENV=development
```

## Important Notes

1. **First Time Setup**: Create MongoDB account first
2. **Password Hashing**: Use bcryptjs for admin passwords
3. **File Uploads**: Requires valid audio file formats
4. **ZIP Upload**: Automatically extracts and creates entries
5. **Admin Panel**: Always verify token in localStorage
6. **Mobile**: Test on mobile devices for best UX

## Performance Tips

- Clear .next folder if issues
- Restart dev server after env changes
- Use pnpm instead of npm for faster installs
- Verify database indexes are created
- Check network tab for slow API responses

## Security Reminders

- Never commit `.env.local`
- Keep NEXTAUTH_SECRET secret
- Use strong admin passwords
- Enable MongoDB authentication
- Use HTTPS in production
- Validate all file uploads
- Implement rate limiting

## Useful Links

- [Next.js Docs](https://nextjs.org/docs)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Tailwind CSS](https://tailwindcss.com)
- [React Docs](https://react.dev)
- [Mongoose Docs](https://mongoosejs.com)

## Getting Help

1. Check SETUP.md for detailed setup
2. Read IMPLEMENTATION_SUMMARY.md for features
3. See DEPLOYMENT.md for production setup
4. Review README.md for full documentation
5. Check API console for error messages
6. Review browser console for issues

## Deploy to Vercel (Optional)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
# Redeploy after setting variables
```

## 🎉 You're Ready!

Your SoundVibe app is now running!

Next: Upload some sounds and start creating! 🎵
