# Deployment Rules

## Current Setup

### Deployment Platform
Based on `vercel.json` in the project root, this project is configured for **Vercel** deployment.

## Documentation
- Vercel Docs: https://vercel.com/docs
- Nx Deployment: https://nx.dev/recipes/deployment

## Build Process

### Development Build
```bash
# Start dev servers with hot reload
pnpm dev
```

### Production Build
```bash
# Build all apps
pnpm build:all

# Merge remotes into shell dist folder
pnpm postbuild:merge

# Or run both
pnpm deploy:build
```

### Build Output Structure
```
dist/
└── apps/
    └── shell/
        ├── index.html
        ├── main.*.js
        ├── remoteEntry.js
        └── remotes/
            ├── coming-soon/
            │   ├── index.html
            │   ├── main.*.js
            │   └── remoteEntry.js
            └── contact-us/
                ├── index.html
                ├── main.*.js
                └── remoteEntry.js
```

## Vercel Configuration

### vercel.json
```json
{
  "buildCommand": "pnpm deploy:build",
  "outputDirectory": "dist/apps/shell",
  "framework": null,
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Key Settings
- **buildCommand**: Runs the full build process
- **outputDirectory**: Points to the shell app's dist folder
- **rewrites**: Enables client-side routing (SPA)

## Environment Variables

### ⚠️ Ask Before Adding
**Always ask the user before adding environment variables**

### Vercel Environment Variables
Set in Vercel Dashboard:
- Go to Project Settings → Environment Variables
- Add variables for different environments (Production, Preview, Development)

### Accessing in Code
```typescript
// In your app
const apiUrl = process.env.NX_API_URL;
const apiKey = process.env.NX_API_KEY;
```

### .env Files (Local Development)
```bash
# .env.local (not committed)
NX_API_URL=http://localhost:3000
NX_API_KEY=dev-key-123
```

**Note:** Nx environment variables must be prefixed with `NX_`

## Module Federation in Production

### Remote URLs
In production, remotes are loaded from the same domain:

```typescript
// rspack.config.prod.ts (if needed)
remotes: [
  ['contactUs', '/remotes/contact-us/remoteEntry.js'],
  ['comingSoon', '/remotes/coming-soon/remoteEntry.js'],
]
```

### Current Setup
The `postbuild:merge` script handles this by copying remote builds into the shell's dist folder.

## Deployment Checklist

### Before Deploying
- [ ] Run tests: `nx run-many -t test --all`
- [ ] Run linting: `nx run-many -t lint --all`
- [ ] Build locally: `pnpm deploy:build`
- [ ] Test production build locally
- [ ] Check for console errors
- [ ] Verify all routes work
- [ ] Check Module Federation remotes load correctly
- [ ] Review environment variables

### Testing Production Build Locally
```bash
# Build for production
pnpm deploy:build

# Serve the production build
npx serve dist/apps/shell

# Or use a simple HTTP server
cd dist/apps/shell
python -m http.server 8080
```

## CI/CD Pipeline

### GitHub Actions (Recommended)
**⚠️ Ask before setting up CI/CD**

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - uses: pnpm/action-setup@v2
        with:
          version: 9.1.0
      
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install
      
      - name: Lint
        run: pnpm nx run-many -t lint --all
      
      - name: Test
        run: pnpm nx run-many -t test --all
      
      - name: Build
        run: pnpm deploy:build
```

## Vercel Deployment

### Automatic Deployments
Vercel automatically deploys:
- **Production**: Pushes to `main` branch
- **Preview**: Pull requests and other branches

### Manual Deployment
```bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

## Performance Optimization

### Build Optimization
- Rspack handles code splitting automatically
- Module Federation loads remotes on demand
- Use lazy loading for routes

### Caching
```json
// vercel.json
{
  "headers": [
    {
      "source": "/(.*).js",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### Bundle Analysis
```bash
# Build with stats
nx build shell --stats-json

# Analyze bundle (if analyzer is installed)
npx webpack-bundle-analyzer dist/apps/shell/stats.json
```

## Monitoring

### Error Tracking
**⚠️ Ask before adding monitoring tools**

Popular options:
- Sentry
- LogRocket
- Datadog

### Analytics
**⚠️ Ask before adding analytics**

Popular options:
- Google Analytics
- Plausible
- Mixpanel

## Rollback Strategy

### Vercel Rollback
1. Go to Vercel Dashboard
2. Navigate to Deployments
3. Find previous successful deployment
4. Click "Promote to Production"

### Git Rollback
```bash
# Revert last commit
git revert HEAD

# Push to trigger new deployment
git push origin main
```

## Domain Configuration

### Custom Domain
**⚠️ Ask before configuring custom domains**

1. Go to Vercel Dashboard → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Wait for DNS propagation

## Security

### Environment Variables
- Never commit `.env` files
- Use Vercel's environment variables for secrets
- Rotate API keys regularly

### HTTPS
- Vercel provides automatic HTTPS
- Enforce HTTPS in production

### Content Security Policy
```json
// vercel.json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';"
        }
      ]
    }
  ]
}
```

## Troubleshooting

### Common Issues

**Build Fails:**
- Check build logs in Vercel Dashboard
- Verify all dependencies are in `package.json`
- Test build locally: `pnpm deploy:build`

**Routes Not Working:**
- Verify `rewrites` in `vercel.json`
- Check that `outputDirectory` is correct

**Remotes Not Loading:**
- Check browser console for errors
- Verify remote paths in production build
- Ensure `postbuild:merge` ran successfully

**Environment Variables Not Working:**
- Verify variables are prefixed with `NX_`
- Check variables are set in Vercel Dashboard
- Redeploy after adding new variables

## Best Practices

### Do's
- ✅ Test production build locally before deploying
- ✅ Use environment variables for configuration
- ✅ Enable automatic deployments from main branch
- ✅ Use preview deployments for testing
- ✅ Monitor build times and optimize if needed
- ✅ Set up error tracking
- ✅ Use semantic versioning for releases

### Don'ts
- ❌ Don't commit sensitive data
- ❌ Don't skip testing before deployment
- ❌ Don't deploy directly to production without preview
- ❌ Don't ignore build warnings
- ❌ Don't hardcode API URLs
- ❌ Don't deploy with failing tests
