# General Project Rules

## Project Overview
This is a **Nx monorepo** using **Module Federation** architecture with multiple micro-frontends.

### Architecture
- **Shell App**: Main host application that loads remote modules
- **Remote Apps**: `coming-soon` and `contact-us` micro-frontends
- **Shared Libraries**: `libs/ui` for shared UI components

## Core Principles

### 1. Ask Before Major Changes
**ALWAYS ask the user before:**
- Adding new dependencies or packages
- Changing build configurations (rspack, module federation)
- Modifying project structure or creating new apps/libs
- Changing CI/CD or deployment configurations
- Updating major framework versions
- Modifying Nx workspace configuration
- Changing module federation setup or remote entry points
- Altering routing structure in the shell app

### 2. Use Existing Technologies
**NEVER introduce new technologies without explicit approval. Use:**
- React 19 (already installed)
- TypeScript 5.9
- Rspack for bundling (NOT Webpack or Vite for apps)
- Tailwind CSS v4 (NOT v3 or other CSS frameworks)
- shadcn/ui components (NOT other UI libraries)
- pnpm (NOT npm or yarn)
- Nx for monorepo management
- Module Federation for micro-frontends

### 3. Follow Existing Patterns
- Study existing code before creating new features
- Match the coding style and structure of similar files
- Use the same import patterns and file organization
- Follow the established naming conventions

## File Organization

### Apps Structure
```
apps/
  ├── shell/              # Host application
  ├── coming-soon/        # Remote app
  └── contact-us/         # Remote app
```

### Libs Structure
```
libs/
  └── ui/                 # Shared UI components
      └── src/
          ├── components/ui/  # shadcn components
          └── lib/           # Utilities
```

## Package Manager
- **ALWAYS use pnpm** for package management
- Use `pnpm add` not `npm install`
- Use `pnpm run` for scripts

## Development Commands
```bash
# Start all apps in dev mode
pnpm dev

# Build all apps
pnpm build:all

# Build and prepare for deployment
pnpm deploy:build
```

## Code Quality
- Write TypeScript, not JavaScript
- Use proper type annotations
- Follow ESLint rules
- Keep components small and focused
- Use meaningful variable and function names
