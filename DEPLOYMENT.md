# SoundVibe - Deployment Guide

## Pre-Deployment Checklist

### 1. Environment Variables Setup

Create these environment variables in your hosting platform:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/soundvibe
NEXTAUTH_SECRET=your-very-secure-random-string-min-32-chars
NEXTAUTH_URL=https://yourdomain.com
NODE_ENV=production
```

### 2. Generate Secure Secrets

```bash
# Generate a secure NextAuth secret
openssl rand -base64 32
```

### 3. MongoDB Setup

- ✅ Create MongoDB Atlas account
- ✅ Create production cluster
- ✅ Add IP whitelist for deployment server
- ✅ Create database user with strong password
- ✅ Backup connection string

### 4. Code Review

- ✅ No sensitive data in code
- ✅ All console.logs removed
- ✅ Error handling implemented
- ✅ Input validation in place
- ✅ SQL injection prevention (using Mongoose)
- ✅ CORS configured if needed

## Deployment Platforms

### Vercel (Recommended)

1. **Connect Repository**
   ```bash
   git push origin main
   ```

2. **Configure in Vercel Dashboard**
   - Select "Next.js" framework
   - Set environment variables
   - Enable automatic deployments

3. **Environment Variables in Vercel**
   - Go to Settings → Environment Variables
   - Add all variables from `.env.local`
   - Set for all environments (Production, Preview, Development)

4. **Deploy**
   - Vercel auto-deploys on git push
   - Check deployment logs for errors
   - Test all features in preview

### Alternative: AWS Amplify

1. **Connect GitHub**
   - Select repository
   - Choose main branch

2. **Build Settings**
   ```
   Build command: npm run build
   Start command: npm start
   ```

3. **Environment Variables**
   - Add in Amplify console
   - Use same variables as `.env.local`

4. **Deploy**
   - Click Deploy
   - Monitor build process

### Alternative: Railway/Render

1. **Create New Project**
2. **Connect GitHub Repository**
3. **Set Environment Variables**
4. **Deploy**

## Post-Deployment Steps

### 1. Database Initialization

After deployment, create initial admin user:

```javascript
// Run in MongoDB Atlas shell or through app endpoint
db.admins.insertOne({
  email: "admin@yourdomain.com",
  password: "$2a$10...", // bcrypt hash
  name: "Admin User",
  role: "super_admin",
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
})
```

### 2. Test All Features

- [ ] Homepage loads correctly
- [ ] Search functionality works
- [ ] Category filters work
- [ ] Mobile navigation functions
- [ ] Sound details page loads
- [ ] Admin login works
- [ ] Dashboard displays statistics
- [ ] Upload functionality works
- [ ] ZIP extraction works
- [ ] Footer displays correctly

### 3. Security Checklist

- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] CORS properly configured
- [ ] Rate limiting implemented (optional)
- [ ] Input validation active
- [ ] Authentication tokens secure
- [ ] Database credentials secure
- [ ] API keys not exposed

### 4. Performance Optimization

```bash
# Test production build locally
npm run build
npm start
```

- [ ] Build completes without errors
- [ ] No console errors in production
- [ ] Page load times acceptable
- [ ] Images optimized
- [ ] API responses fast

### 5. Monitoring Setup

#### Vercel Analytics
- ✅ Built-in performance monitoring
- ✅ Real user metrics
- ✅ Error tracking

#### Optional: Third-party Monitoring
- Sentry for error tracking
- LogRocket for session replay
- MongoDB Atlas monitoring

### 6. Backup Strategy

```
Daily MongoDB backups:
- MongoDB Atlas: Automated snapshots
- Manual exports every week
- Store securely off-site
```

## Scaling Considerations

### Database Optimization

1. **Indexing**
   - Create index on `category` field
   - Create index on `trending` field
   - Create index on `createdAt` for sorting

2. **Query Optimization**
   - Use projection to limit returned fields
   - Implement pagination for large result sets
   - Cache frequently accessed data

3. **MongoDB Atlas**
   - Choose appropriate tier (M0-M100)
   - Enable auto-scaling
   - Monitor connection pool

### File Storage

Current: Local file system (`/uploads`)

Future options:
- AWS S3 for scalable storage
- Cloudinary for image hosting
- Azure Blob Storage
- Vercel Blob

### Caching

Implement Redis caching for:
- Popular sounds list
- Admin statistics
- Search results
- User sessions

## CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2
      - name: Use Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - run: npm ci
      - run: npm run lint
      - run: npm run build
      - run: npm run test # if tests exist
      
      - name: Deploy to Vercel
        uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

## Rollback Plan

If deployment fails:

1. **Immediate Rollback**
   ```bash
   # Vercel: Use deployment history
   # AWS: Redeploy previous version
   ```

2. **Database Rollback**
   - Restore from MongoDB backup
   - Verify data integrity
   - Test core functionality

3. **Investigation**
   - Check deployment logs
   - Review recent changes
   - Fix issues locally
   - Test thoroughly

## Monitoring & Maintenance

### Daily Tasks
- Check error logs
- Monitor database connection
- Review admin activity

### Weekly Tasks
- Performance review
- Security audit
- Database optimization
- Backup verification

### Monthly Tasks
- Full system audit
- Capacity planning
- Cost optimization
- Documentation update

## Troubleshooting Deployment

### Common Issues

**Issue: MongoDB Connection Fails**
```
Solution:
1. Verify MONGODB_URI is correct
2. Check IP whitelist in Atlas
3. Verify credentials
4. Test connection string locally
```

**Issue: Uploads Not Working**
```
Solution:
1. Check file permissions
2. Verify upload directory exists
3. Check file size limits
4. Review API logs
```

**Issue: High Database Latency**
```
Solution:
1. Check Atlas instance size
2. Optimize queries
3. Add database indexes
4. Enable caching
5. Monitor connection pool
```

## DNS & Domain Setup

1. **Purchase Domain**
   - GoDaddy, Namecheap, or registrar

2. **Point DNS to Hosting**
   - Vercel: Add CNAME record
   - AWS/Render: Follow platform instructions
   - Enable SSL/TLS

3. **Verify Setup**
   ```bash
   nslookup yourdomain.com
   ```

## Final Checklist

- [ ] All environment variables set
- [ ] Database initialized
- [ ] Admin user created
- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] All features tested
- [ ] Monitoring enabled
- [ ] Backup system active
- [ ] Domain configured
- [ ] Documentation updated

## Support Resources

- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Vercel Docs](https://vercel.com/docs)
- [Node.js Best Practices](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)

## Success Criteria

After deployment:

✅ Homepage loads in < 2s
✅ Search results instant
✅ Admin panel responsive
✅ Uploads successful
✅ No console errors
✅ Mobile responsive
✅ All links working
✅ Database connected
✅ Authentication working
✅ Monitoring active

## Continuous Improvement

Post-launch:

1. Gather user feedback
2. Monitor performance metrics
3. Optimize based on usage
4. Add new features iteratively
5. Maintain security updates
6. Plan for scaling
