# Cursor AI Rules for Ferris Intelligence

This directory contains comprehensive rules and guidelines for AI-assisted development in the Ferris Intelligence project.

## 📁 Rules Files

### Core Rules
1. **[00-general.md](./00-general.md)** - General project overview, principles, and commands
2. **[01-react.md](./01-react.md)** - React 19 patterns, hooks, and best practices
3. **[02-typescript.md](./02-typescript.md)** - TypeScript usage, types, and patterns
4. **[03-styling.md](./03-styling.md)** - Tailwind CSS v4, shadcn/ui, and SCSS modules

### Architecture & Infrastructure
5. **[04-nx-monorepo.md](./04-nx-monorepo.md)** - Nx workspace management and commands
6. **[05-module-federation.md](./05-module-federation.md)** - Module Federation architecture and patterns
7. **[06-routing.md](./06-routing.md)** - React Router v6 navigation and routing
8. **[07-testing.md](./07-testing.md)** - Jest and Testing Library patterns
9. **[08-deployment.md](./08-deployment.md)** - Build process and Vercel deployment

### Quality & Security
10. **[09-accessibility.md](./09-accessibility.md)** - WCAG 2.1 compliance and accessibility patterns
11. **[10-observability.md](./10-observability.md)** - Sentry and OpenTelemetry monitoring
12. **[11-security.md](./11-security.md)** - OWASP security standards and best practices

## 🎯 Quick Reference

### Technology Stack
- **Framework**: React 19.0.0
- **Language**: TypeScript 5.9.2
- **Build Tool**: Rspack 1.5.0
- **Monorepo**: Nx 22.3.3
- **Styling**: Tailwind CSS 4.1.18
- **UI Components**: shadcn/ui with Radix UI
- **Routing**: React Router 6.29.0
- **Testing**: Jest 30.0.2 + Testing Library
- **Package Manager**: pnpm 9.1.0
- **Deployment**: Vercel

### Key Principles
1. **Ask Before Major Changes** - Always request approval for:
   - Adding new dependencies
   - Changing build configurations
   - Modifying project structure
   - Updating major versions

2. **Use Existing Technologies** - Never introduce new tech without approval

3. **Follow Existing Patterns** - Study existing code before creating new features

### Common Commands
```bash
# Development
pnpm dev                 # Start all apps
nx serve shell           # Start shell app only

# Building
pnpm build:all          # Build all apps
pnpm deploy:build       # Build for deployment

# Testing
nx test shell           # Test single app
nx run-many -t test --all  # Test all

# Linting
nx lint shell           # Lint single app
nx run-many -t lint --all  # Lint all
```

## 📖 How to Use These Rules

### For AI Assistants
1. Read `00-general.md` first for project overview
2. Reference specific files based on the task:
   - UI work → `01-react.md`, `03-styling.md`, `09-accessibility.md`
   - Type issues → `02-typescript.md`
   - Architecture → `04-nx-monorepo.md`, `05-module-federation.md`
   - Navigation → `06-routing.md`
   - Tests → `07-testing.md`
   - Deployment → `08-deployment.md`
   - Accessibility → `09-accessibility.md`
   - Monitoring → `10-observability.md`
   - Security → `11-security.md` (CRITICAL for server-side code)

### For Developers
- Use as reference documentation
- Update rules when patterns change
- Add new rules files as needed
- Keep rules in sync with actual codebase

## 🔄 Updating Rules

When updating these rules:
1. Keep them concise and actionable
2. Include code examples
3. Link to official documentation
4. Mark deprecated patterns
5. Update version numbers

## 📚 External Documentation

### Official Docs

#### Core Technologies
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [Nx](https://nx.dev/)
- [Module Federation](https://module-federation.io/)
- [React Router](https://reactrouter.com/)
- [Jest](https://jestjs.io/)
- [Testing Library](https://testing-library.com/)

#### Quality & Security
- [WCAG 2.1](https://www.w3.org/TR/WCAG21/)
- [ARIA Practices](https://www.w3.org/WAI/ARIA/apg/)
- [Sentry](https://docs.sentry.io/)
- [OpenTelemetry](https://opentelemetry.io/docs/)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OWASP Cheat Sheets](https://cheatsheetseries.owasp.org/)

## 🤝 Contributing

To add or modify rules:
1. Create/edit the appropriate `.md` file
2. Follow the existing format
3. Include practical examples
4. Test with AI assistant
5. Update this README if adding new files

## 📝 File Naming Convention

Rules files follow this pattern:
- `XX-topic.md` where XX is a number (00-99)
- Numbers indicate recommended reading order
- Use descriptive, lowercase names with hyphens

## ⚠️ Important Notes

- These rules are **prescriptive**, not just descriptive
- AI assistants should **strictly follow** these guidelines
- Always **ask before** deviating from established patterns
- Rules should be **updated** as the project evolves

---

**Last Updated**: January 2026
**Project Version**: 0.0.0
**Nx Version**: 22.3.3
