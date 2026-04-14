# SoundVibe Architecture

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENT BROWSER                            │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              React 19 + Next.js 16                    │ │
│  │                                                        │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌────────────┐ │ │
│  │  │   Homepage   │  │   Admin Page  │  │Sound Detail│ │ │
│  │  │  - Hero      │  │ - Login       │  │  - Info    │ │ │
│  │  │  - Sections  │  │ - Dashboard   │  │  - Related │ │ │
│  │  │  - Search    │  │ - Upload      │  │  - Links   │ │ │
│  │  └──────────────┘  └──────────────┘  └────────────┘ │ │
│  │                                                        │ │
│  │  ┌───────────────────────────────────────────────┐   │ │
│  │  │   UI Components (Tailwind CSS + shadcn/ui)   │   │ │
│  │  │  - Header, Footer, Navigation                │   │ │
│  │  │  - Sound Cards, Search Bar                   │   │ │
│  │  │  - Forms, Buttons, Modals                    │   │ │
│  │  └───────────────────────────────────────────────┘   │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  LocalStorage: JWT Token, Admin Session                     │
└─────────────────────────────────────────────────────────────┘
             ↕ (HTTP/JSON)
┌─────────────────────────────────────────────────────────────┐
│              NEXT.JS SERVER (Node.js)                        │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │             API Routes (/api)                       │   │
│  │                                                     │   │
│  │  Public Endpoints:                                 │   │
│  │  ├─ GET /api/sounds              → Get sounds     │   │
│  │  └─ GET /api/sounds/[id]         → Get detail    │   │
│  │                                                     │   │
│  │  Admin Endpoints (JWT Protected):                 │   │
│  │  ├─ POST /api/auth/login         → Authenticate  │   │
│  │  ├─ POST /api/admin/upload       → Upload sounds │   │
│  │  └─ GET /api/admin/stats         → Get stats     │   │
│  │                                                     │   │
│  │  Middleware:                                       │   │
│  │  ├─ JWT verification                              │   │
│  │  ├─ Input validation                              │   │
│  │  ├─ Error handling                                │   │
│  │  └─ CORS headers                                  │   │
│  └─────────────────────────────────────────────────────┘   │
│                          ↕                                   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │          Core Services / Utilities                  │   │
│  │                                                     │   │
│  │  ├─ Database Connection (MongoDB)                 │   │
│  │  ├─ JWT Authentication                            │   │
│  │  ├─ Password Hashing (bcryptjs)                   │   │
│  │  ├─ ZIP File Extraction                           │   │
│  │  ├─ File Validation                               │   │
│  │  └─ Response Formatting                           │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
             ↕ (MongoDB Protocol)
┌─────────────────────────────────────────────────────────────┐
│            MONGODB ATLAS (Cloud Database)                    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │          Collections & Documents                   │   │
│  │                                                     │   │
│  │  sounds Collection:                                │   │
│  │  ├─ Document: {id, name, category, ...}           │   │
│  │  ├─ Index: category                               │   │
│  │  ├─ Index: trending                               │   │
│  │  └─ Index: createdAt                              │   │
│  │                                                     │   │
│  │  admins Collection:                                │   │
│  │  ├─ Document: {id, email, password, role, ...}    │   │
│  │  └─ Index: email (unique)                         │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  Features:                                                  │
│  ├─ Automatic backups                                      │
│  ├─ Connection pooling                                     │
│  ├─ Scaling ready                                          │
│  └─ 99.99% uptime SLA                                      │
└─────────────────────────────────────────────────────────────┘
             ↕ (File Storage - Local/S3)
┌─────────────────────────────────────────────────────────────┐
│              FILE STORAGE                                    │
│                                                              │
│  Current: Local filesystem (/uploads)                       │
│  Future: AWS S3, Cloudinary, or Vercel Blob               │
│                                                              │
│  Stored Files:                                              │
│  ├─ Sound files (.mp3, .wav, .ogg, .m4a, .flac)           │
│  └─ Image files (.png, .jpg, .webp)                       │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow Diagram

### User Browsing Sounds
```
User Visit Homepage
        ↓
Browser Loads page.tsx (Server Component)
        ↓
Component calls getSounds() from sounds-data.ts
        ↓
Data loaded from MongoDB via getNewReleases(), getTrendingSounds()
        ↓
Return sounds to Frontend
        ↓
Render Sound Cards in SoundSection components
        ↓
User sees homepage with all sounds organized in sections
```

### Admin Upload Flow
```
Admin Visits /admin/login
        ↓
Enter email/password
        ↓
Click Login
        ↓
POST to /api/auth/login
        ↓
Verify credentials in MongoDB admins collection
        ↓
Hash password with bcryptjs.compare()
        ↓
Generate JWT token
        ↓
Return token to client
        ↓
Store token in localStorage
        ↓
Redirect to /admin/dashboard
        ↓
Dashboard verifies token is present
        ↓
Admin navigates to Upload tab
        ↓
Select files (single/multiple/zip)
        ↓
Click Upload
        ↓
POST to /api/admin/upload with token
        ↓
Server verifies JWT token
        ↓
Process files:
  - If ZIP: Extract with JSZip
  - Validate audio formats
  - Create file list
        ↓
For each file:
  - Create Sound document in MongoDB
  - Set default fields (category, featured, trending)
  - Generate fileUrl
        ↓
Save all to MongoDB
        ↓
Return success message with count
        ↓
Show success notification to user
```

### Search Flow
```
User types in search bar
        ↓
onChange event triggered
        ↓
Call searchSounds(query) function
        ↓
Filter sounds from local sounds-data
        ↓
Apply category filter if selected
        ↓
Return matching sounds (max 8 shown)
        ↓
Display results in dropdown
        ↓
User clicks on result
        ↓
Navigate to /sound/[id]
        ↓
Load sound detail from MongoDB via /api/sounds/[id]
        ↓
Display full information and related sounds
```

## Component Hierarchy

```
<RootLayout>
  <Header>
    <MobileNav>
      - Navigation links with icons
      - Admin link
      - Copyright info
    </MobileNav>
    <Logo>
    <SearchBar>
      - Search input
      - Category filters
      - Results dropdown
    </SearchBar>
    <AdminLink>
  </Header>

  <HomePage>
    <HeroBanner>
      - Animated background
      - Statistics
      - Call-to-action
    </HeroBanner>

    <SoundSection> (x4)
      <SoundCard> (x many)
        - Sound info
        - Action buttons
        - Like/Download counters
      </SoundCard>
    </SoundSection>
  </HomePage>

  <Footer>
    - Links in columns
    - Social media
    - Copyright
  </Footer>

  <AdminPages>
    <LoginPage>
      - Email input
      - Password input
      - Login button
    </LoginPage>

    <DashboardPage>
      <AdminStats>
        - Stat cards (4 cards)
        - Quick actions
      </AdminStats>

      <SoundUpload>
        - Mode selection (Single/Multiple/ZIP)
        - Upload area
        - File list
        - Progress bar
        - Upload button
      </SoundUpload>
    </DashboardPage>
  </AdminPages>

  <SoundDetailPage>
    - Sound info
    - Play button
    - Like/Download buttons
    <SoundSection>
      - Related sounds
    </SoundSection>
  </SoundDetailPage>
</RootLayout>
```

## Database Schema Design

### Sound Collection
```
{
  _id: ObjectId,                    // MongoDB ID
  name: String,                     // Unique
  category: String,                 // Enum
  description: String,              // Optional
  duration: Number,                 // Seconds
  downloads: Number,                // Counter (default: 0)
  likes: Number,                    // Counter (default: 0)
  fileUrl: String,                  // Required
  imageUrl: String,                 // Optional
  featured: Boolean,                // Default: false
  trending: Boolean,                // Default: false
  isNew: Boolean,                   // Default: true
  createdAt: Date,                  // Auto-generated
  updatedAt: Date                   // Auto-generated
}

Indexes:
  - name (unique)
  - category
  - trending
  - createdAt
```

### Admin Collection
```
{
  _id: ObjectId,                    // MongoDB ID
  email: String,                    // Unique, Required
  password: String,                 // Bcrypt hashed
  name: String,                     // Required
  role: String,                     // 'admin' or 'super_admin'
  isActive: Boolean,                // Default: true
  createdAt: Date,                  // Auto-generated
  updatedAt: Date                   // Auto-generated
}

Indexes:
  - email (unique)
```

## API Contract Examples

### Get Sounds
```javascript
// Request
GET /api/sounds?category=Funny&limit=20

// Response
{
  success: true,
  sounds: [
    {
      _id: "123...",
      name: "Door Slam",
      category: "Impact",
      duration: 2,
      downloads: 150,
      likes: 45,
      fileUrl: "/uploads/door-slam.mp3",
      featured: false,
      trending: true,
      ...
    },
    ...
  ],
  count: 20
}
```

### Login
```javascript
// Request
POST /api/auth/login
{
  email: "admin@soundvibe.com",
  password: "securepassword123"
}

// Response
{
  message: "Login successful",
  token: "eyJhbGciOiJIUzI1NiIs...",
  admin: {
    id: "456...",
    email: "admin@soundvibe.com",
    name: "Admin User",
    role: "super_admin"
  }
}
```

### Upload Sounds
```javascript
// Request
POST /api/admin/upload
Headers: { Authorization: "Bearer [token]" }
Body: FormData with files and mode

// Response
{
  message: "Successfully uploaded 5 sound(s)",
  count: 5,
  sounds: [
    { _id: "...", name: "Sound1", ... },
    { _id: "...", name: "Sound2", ... },
    ...
  ]
}
```

## Authentication Flow

```
User Credentials (email, password)
        ↓
Admin clicks Login
        ↓
Client sends POST /api/auth/login
        ↓
Server receives request
        ↓
Find admin by email in MongoDB
        ↓
Hash entered password with bcryptjs
        ↓
Compare with stored hash
        ↓
If match:
  ├─ Create JWT token payload
  │  └─ {id, email, role}
  ├─ Sign with NEXTAUTH_SECRET
  └─ Return token
        ↓
If no match:
  └─ Return error 401
        ↓
Client stores token in localStorage
        ↓
Include token in Authorization header for future requests
        ↓
Server verifies token on protected endpoints
        ↓
If valid:
  ├─ Process request
  └─ Return data
        ↓
If invalid:
  └─ Return 401 Unauthorized
```

## Deployment Architecture

```
┌──────────────────────────────────────┐
│   Domain Name                        │
│   (your-domain.com)                  │
└──────────────────┬───────────────────┘
                   ↓
┌──────────────────────────────────────┐
│   CDN / HTTPS (CloudFlare / Vercel)  │
│   - SSL/TLS                          │
│   - Caching                          │
│   - DDoS Protection                  │
└──────────────────┬───────────────────┘
                   ↓
┌──────────────────────────────────────┐
│   Vercel / AWS / Render              │
│   - Next.js App Server               │
│   - API Routes                       │
│   - Static Files                     │
└──────────────────┬───────────────────┘
                   ↓
┌──────────────────────────────────────┐
│   MongoDB Atlas                      │
│   - Database                         │
│   - Backups                          │
│   - Monitoring                       │
└──────────────────────────────────────┘
                   ↓
┌──────────────────────────────────────┐
│   File Storage                       │
│   - Local (dev)                      │
│   - S3 / Blob (production)           │
└──────────────────────────────────────┘
```

## Security Architecture

```
┌─────────────────────────────────────────┐
│     Browser / Client                    │
│  ┌───────────────────────────────────┐ │
│  │ HTTPS Only                        │ │
│  │ Secure Token Storage              │ │
│  │ Input Validation                  │ │
│  └───────────────────────────────────┘ │
└─────────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────┐
│     Next.js Server                      │
│  ┌───────────────────────────────────┐ │
│  │ CORS Configuration                │ │
│  │ Rate Limiting (Ready)             │ │
│  │ Input Sanitization                │ │
│  │ JWT Verification                  │ │
│  └───────────────────────────────────┘ │
└─────────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────┐
│     Database Layer                      │
│  ┌───────────────────────────────────┐ │
│  │ Mongoose Schema Validation        │ │
│  │ Query Parameter Binding           │ │
│  │ Connection Encryption             │ │
│  │ Authentication                    │ │
│  │ Network Whitelisting              │ │
│  └───────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

## Performance Optimization Strategy

```
┌─────────────────────────────────────────┐
│     Frontend Optimization               │
│  ├─ Code Splitting                      │
│  ├─ Image Optimization                  │
│  ├─ CSS-in-JS Efficiency               │
│  ├─ Lazy Loading                        │
│  └─ Caching Headers                     │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│     Backend Optimization                │
│  ├─ Database Indexes                    │
│  ├─ Query Optimization                  │
│  ├─ Connection Pooling                  │
│  ├─ Response Compression                │
│  └─ API Caching Ready                   │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│     Infrastructure Optimization         │
│  ├─ CDN for Static Content              │
│  ├─ Server-Side Rendering              │
│  ├─ Automatic Scaling                   │
│  └─ Global Distribution                 │
└─────────────────────────────────────────┘
```

This architecture is:
- ✅ Scalable - Can handle growing data
- ✅ Secure - Multiple security layers
- ✅ Performant - Optimized at every level
- ✅ Maintainable - Clean separation of concerns
- ✅ Extensible - Easy to add features
- ✅ Reliable - Proper error handling
