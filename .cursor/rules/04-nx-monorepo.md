# Nx Monorepo Rules

## Version
- **Nx 22.3.3**

## Documentation
- Official Docs: https://nx.dev/getting-started/intro
- React Guide: https://nx.dev/recipes/react
- Module Federation: https://nx.dev/recipes/module-federation

## Workspace Structure

### Apps vs Libs
- **Apps** (`apps/`): Deployable applications
- **Libs** (`libs/`): Shared code and components

### Current Structure
```
ferris-intelligence/
├── apps/
│   ├── shell/          # Host app (Module Federation)
│   ├── coming-soon/    # Remote app
│   └── contact-us/     # Remote app
└── libs/
    └── ui/             # Shared UI library
```

## Nx Commands

### Running Apps
```bash
# Run single app
nx serve shell
nx serve coming-soon
nx serve contact-us

# Run all apps (dev mode with Module Federation)
pnpm dev
# Equivalent to: NX_MF_DEV_REMOTES=1 nx run-many -t serve --all --parallel
```

### Building
```bash
# Build single app
nx build shell

# Build all apps
pnpm build:all
# Equivalent to: nx run-many -t build --all --parallel

# Build for deployment
pnpm deploy:build
```

### Testing
```bash
# Test single project
nx test shell

# Test all projects
nx run-many -t test --all

# Test affected projects only
nx affected -t test
```

### Linting
```bash
# Lint single project
nx lint shell

# Lint all projects
nx run-many -t lint --all
```

## Creating New Projects

### ⚠️ ALWAYS Ask Before Creating
**Never create new apps or libs without user approval**

### Create New App
```bash
# React app with Rspack
nx g @nx/react:app my-app --bundler=rspack

# React app with Module Federation
nx g @nx/react:remote my-remote --host=shell
```

### Create New Library
```bash
# Buildable library
nx g @nx/react:lib my-lib --buildable

# Publishable library
nx g @nx/react:lib my-lib --publishable --importPath=@ferris-intelligence/my-lib
```

### Generate Component
```bash
# In an app
nx g @nx/react:component my-component --project=shell

# In a library
nx g @nx/react:component my-component --project=ui --export
```

## Project Configuration

### project.json
Each project has a `project.json` file defining:
- Build targets
- Serve targets
- Test targets
- Lint targets

```json
{
  "name": "shell",
  "targets": {
    "build": {
      "executor": "@nx/rspack:rspack",
      "options": {
        "target": "web",
        "outputPath": "dist/apps/shell"
      }
    },
    "serve": {
      "executor": "@nx/rspack:dev-server",
      "options": {
        "buildTarget": "shell:build:development",
        "port": 4200
      }
    }
  }
}
```

## Dependency Management

### Import Paths
```tsx
// ✅ Good - Use TypeScript path aliases
import { Button } from '@/libs/ui/src/components/ui/button';

// ❌ Avoid - Relative paths across projects
import { Button } from '../../../libs/ui/src/components/ui/button';
```

### tsconfig.base.json
Path mappings are defined here:
```json
{
  "compilerOptions": {
    "paths": {
      "@/libs/ui/*": ["libs/ui/src/*"]
    }
  }
}
```

## Dependency Graph

### Visualize Dependencies
```bash
# Open interactive dependency graph
nx graph

# Show affected projects
nx affected:graph
```

### Dependency Rules
- Apps can depend on libs
- Libs can depend on other libs
- Libs should NOT depend on apps
- Avoid circular dependencies

## Caching

### Nx Cache
Nx caches task outputs for faster builds:
- Build outputs
- Test results
- Lint results

### Clear Cache
```bash
nx reset
```

## Module Federation Specific

### Configuration Files
- `module-federation.config.ts`: Defines exposed modules and remotes
- `rspack.config.ts`: Rspack configuration with Module Federation plugin

### Shell App (Host)
```typescript
// module-federation.config.ts
const config: ModuleFederationConfig = {
  name: 'shell',
  remotes: ['contactUs', 'comingSoon'],
};
```

### Remote Apps
```typescript
// module-federation.config.ts
const config: ModuleFederationConfig = {
  name: 'contactUs',
  exposes: {
    './Module': './src/remote-entry.ts',
  },
};
```

### Remote Entry Point
```typescript
// src/remote-entry.ts
export { default } from './app/app';
```

### Consuming Remotes in Shell
```tsx
// In shell app
import * as React from 'react';

const ContactUs = React.lazy(() => import('contactUs/Module'));

export function App() {
  return (
    <React.Suspense fallback={null}>
      <ContactUs />
    </React.Suspense>
  );
}
```

## Environment Variables

### Development
```bash
# Enable dev remotes (loads remotes from localhost)
NX_MF_DEV_REMOTES=1 nx serve shell
```

### Production
```bash
# Build with production remotes (loads from deployed URLs)
nx build shell --configuration=production
```

## Best Practices

### Do's
- ✅ Use `nx affected` for CI/CD to only test/build changed projects
- ✅ Keep libs focused and single-purpose
- ✅ Use path aliases for imports
- ✅ Leverage Nx cache for faster builds
- ✅ Run `nx graph` to visualize dependencies
- ✅ Use `nx migrate` to update Nx and dependencies

### Don'ts
- ❌ Don't create circular dependencies
- ❌ Don't bypass the Nx cache without reason
- ❌ Don't create apps when a lib would suffice
- ❌ Don't manually edit `node_modules`
- ❌ Don't commit `dist/` or `.nx/cache/`

## Workspace Maintenance

### Update Nx
```bash
# Check for updates
nx migrate latest

# Apply migrations
nx migrate --run-migrations
```

### Clean Workspace
```bash
# Remove dist folder
rm -rf dist

# Clear Nx cache
nx reset

# Reinstall dependencies
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

## CI/CD Integration

### Affected Commands
```bash
# Build only affected apps
nx affected -t build

# Test only affected projects
nx affected -t test

# Lint only affected projects
nx affected -t lint
```

### Parallel Execution
```bash
# Run with maximum parallelization
nx run-many -t build --all --parallel

# Run with specific parallel limit
nx run-many -t build --all --parallel=3
```
