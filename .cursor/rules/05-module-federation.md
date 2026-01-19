# Module Federation Rules

## Overview
Module Federation allows multiple independent builds to form a single application. This project uses **@module-federation/enhanced** with Rspack.

## Documentation
- Module Federation Docs: https://module-federation.io/
- Nx Module Federation: https://nx.dev/recipes/module-federation
- Enhanced Plugin: https://module-federation.io/configure/index.html

## Architecture

### Current Setup
```
┌─────────────────────────────────────┐
│         Shell (Host)                │
│         Port: 4200                  │
│  ┌─────────────────────────────┐   │
│  │  Loads Remote Modules       │   │
│  │  - contactUs/Module         │   │
│  │  - comingSoon/Module        │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
           │                │
           ▼                ▼
    ┌──────────┐      ┌──────────┐
    │ContactUs │      │ComingSoon│
    │Port: 4201│      │Port: 4202│
    └──────────┘      └──────────┘
```

## Configuration

### Shell App (Host)
```typescript
// apps/shell/module-federation.config.ts
import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'shell',
  remotes: ['contactUs', 'comingSoon'],
};

export default config;
```

### Remote Apps
```typescript
// apps/contact-us/module-federation.config.ts
import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'contactUs',
  exposes: {
    './Module': './src/remote-entry.ts',
  },
};

export default config;
```

## Remote Entry Points

### Creating Remote Entry
```typescript
// apps/contact-us/src/remote-entry.ts
export { default } from './app/app';
```

### Remote App Component
```tsx
// apps/contact-us/src/app/app.tsx
export function App() {
  return (
    <div>
      <h1>Contact Us</h1>
      {/* Component content */}
    </div>
  );
}

export default App;
```

## Consuming Remotes

### Type Declarations
```typescript
// apps/shell/src/remotes.d.ts
declare module 'contactUs/Module' {
  const Module: React.ComponentType;
  export default Module;
}

declare module 'comingSoon/Module' {
  const Module: React.ComponentType;
  export default Module;
}
```

### Lazy Loading Remotes
```tsx
// apps/shell/src/app/app.tsx
import * as React from 'react';
import { Route, Routes } from 'react-router-dom';

// Lazy load remote modules
const ContactUs = React.lazy(() => import('contactUs/Module'));
const ComingSoon = React.lazy(() => import('comingSoon/Module'));

export function App() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/coming-soon" element={<ComingSoon />} />
      </Routes>
    </React.Suspense>
  );
}
```

## Development Mode

### Dev Remotes
```bash
# Start all apps with dev remotes
NX_MF_DEV_REMOTES=1 nx run-many -t serve --all --parallel

# Or use the npm script
pnpm dev
```

### How Dev Remotes Work
- Shell loads remotes from `localhost:4201`, `localhost:4202`, etc.
- Hot module replacement works across all apps
- Changes in remotes are instantly reflected in the shell

## Production Build

### Build Process
```bash
# Build all apps
pnpm build:all

# Merge remotes into shell dist
pnpm postbuild:merge
```

### Deployment Structure
```
dist/apps/shell/
├── index.html
├── main.*.js
├── remoteEntry.js (shell's entry)
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

### Production Remote URLs
In production, configure remote URLs in `rspack.config.prod.ts`:
```typescript
remotes: [
  ['contactUs', 'https://your-domain.com/remotes/contact-us/remoteEntry.js'],
  ['comingSoon', 'https://your-domain.com/remotes/coming-soon/remoteEntry.js'],
]
```

## Shared Dependencies

### Sharing React
```typescript
// In module-federation.config.ts
const config: ModuleFederationConfig = {
  name: 'contactUs',
  exposes: {
    './Module': './src/remote-entry.ts',
  },
  shared: {
    react: {
      singleton: true,
      requiredVersion: '^19.0.0',
    },
    'react-dom': {
      singleton: true,
      requiredVersion: '^19.0.0',
    },
  },
};
```

### Why Singleton?
- Ensures only one instance of React is loaded
- Prevents version conflicts
- Reduces bundle size

## Sharing UI Components

### Option 1: Via NPM Library (Current)
```tsx
// In any app
import { Button } from '@/libs/ui/src/components/ui/button';
```

### Option 2: Via Module Federation (Advanced)
**⚠️ Ask before implementing this pattern**

```typescript
// libs/ui/module-federation.config.ts
const config: ModuleFederationConfig = {
  name: 'ui',
  exposes: {
    './Button': './src/components/ui/button.tsx',
  },
};
```

## Error Handling

### Remote Loading Errors
```tsx
import * as React from 'react';

const ContactUs = React.lazy(() =>
  import('contactUs/Module').catch(() => {
    return { default: () => <div>Failed to load Contact Us module</div> };
  })
);

export function App() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <ContactUs />
    </React.Suspense>
  );
}
```

### Error Boundaries
```tsx
import * as React from 'react';

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong loading the module.</div>;
    }
    return this.props.children;
  }
}

// Usage
<ErrorBoundary>
  <React.Suspense fallback={<div>Loading...</div>}>
    <ContactUs />
  </React.Suspense>
</ErrorBoundary>
```

## Best Practices

### Do's
- ✅ Always wrap remote imports in `React.Suspense`
- ✅ Use lazy loading for all remote modules
- ✅ Define proper TypeScript types for remotes
- ✅ Share singleton dependencies (React, React DOM)
- ✅ Handle loading and error states
- ✅ Test remotes independently before integration
- ✅ Use meaningful names for exposed modules

### Don'ts
- ❌ Don't import remotes synchronously
- ❌ Don't expose internal implementation details
- ❌ Don't create circular dependencies between remotes
- ❌ Don't forget to update `remotes.d.ts` when adding remotes
- ❌ Don't share too many dependencies (increases complexity)
- ❌ Don't expose entire apps (expose specific modules)

## Adding New Remote

### ⚠️ ALWAYS Ask Before Adding
**Steps to add a new remote (with user approval):**

1. Generate new remote app:
```bash
nx g @nx/react:remote new-remote --host=shell
```

2. Update shell's `module-federation.config.ts`:
```typescript
const config: ModuleFederationConfig = {
  name: 'shell',
  remotes: ['contactUs', 'comingSoon', 'newRemote'], // Add here
};
```

3. Create type declaration in shell:
```typescript
// apps/shell/src/remotes.d.ts
declare module 'newRemote/Module' {
  const Module: React.ComponentType;
  export default Module;
}
```

4. Add route in shell:
```tsx
const NewRemote = React.lazy(() => import('newRemote/Module'));

<Route path="/new-remote" element={<NewRemote />} />
```

## Debugging

### Check Module Federation Stats
```bash
# After build, check mf-stats.json
cat dist/apps/shell/mf-stats.json
```

### Common Issues

**Remote not loading:**
- Check if remote is running (dev mode)
- Verify remote URL is correct (production)
- Check browser console for errors
- Verify `remotes.d.ts` is up to date

**Version conflicts:**
- Ensure shared dependencies have same version
- Use singleton for React and React DOM
- Check `package.json` versions match

**Build errors:**
- Clear Nx cache: `nx reset`
- Rebuild all: `pnpm build:all`
- Check `module-federation.config.ts` syntax

## Performance Considerations

### Lazy Loading Benefits
- Reduces initial bundle size
- Loads remotes only when needed
- Improves Time to Interactive (TTI)

### Preloading (Advanced)
```tsx
// Preload remote on hover
const ContactUs = React.lazy(() => import('contactUs/Module'));

function Navigation() {
  const preloadContactUs = () => {
    import('contactUs/Module');
  };

  return (
    <nav>
      <Link to="/contact-us" onMouseEnter={preloadContactUs}>
        Contact Us
      </Link>
    </nav>
  );
}
```
