# Styling Rules

## Technologies

### Tailwind CSS v4
- **Version**: 4.1.18
- **Documentation**: https://tailwindcss.com/docs
- **Migration Guide**: https://tailwindcss.com/docs/v4-beta

### SCSS Modules
- Used for component-specific styles
- File naming: `component.module.scss`

## Tailwind CSS v4 Specifics

### Configuration
- Config file: `tailwind.config.js` in each app/lib
- Uses CSS variables for theming
- PostCSS config: `postcss.config.js`

### New v4 Features
```css
/* Use @import instead of @tailwind */
@import "tailwindcss";

/* Use @theme for custom values */
@theme {
  --color-primary: #3b82f6;
  --font-size-huge: 10rem;
}
```

### Class Naming
```tsx
// ✅ Good - Use Tailwind utilities
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
  <h1 className="text-2xl font-bold text-gray-900">Title</h1>
</div>

// ✅ Good - Responsive design
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Content */}
</div>

// ✅ Good - Dark mode (if enabled)
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
  {/* Content */}
</div>
```

## shadcn/ui Integration

### Component Library
- **Documentation**: https://ui.shadcn.com/
- **Location**: `libs/ui/src/components/ui/`
- **Config**: `components.json` at root

### Using shadcn Components
```tsx
import { Button } from '@/libs/ui/src/components/ui/button';

export function MyComponent() {
  return (
    <Button variant="default" size="lg">
      Click me
    </Button>
  );
}
```

### Adding New shadcn Components
**⚠️ ALWAYS ask the user before adding new shadcn components**

```bash
# The user should run this command
npx shadcn@latest add button
```

### Customizing shadcn Components
- Modify components in `libs/ui/src/components/ui/`
- Use Tailwind classes for styling
- Maintain the existing structure and patterns

## SCSS Modules

### When to Use SCSS Modules
- Complex component-specific styles
- Animations and transitions
- Styles that are hard to express with Tailwind

### File Structure
```
Component/
  ├── Component.tsx
  └── Component.module.scss
```

### Usage Pattern
```tsx
// Component.tsx
import styles from './Component.module.scss';

export function Component() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Title</h1>
    </div>
  );
}
```

```scss
// Component.module.scss
.container {
  display: flex;
  flex-direction: column;
  
  &:hover {
    background-color: var(--color-primary);
  }
}

.title {
  font-size: 2rem;
  font-weight: bold;
}
```

## Combining Tailwind and SCSS

### Use cn() Utility
```tsx
import { cn } from '@/libs/ui/src/lib/utils';
import styles from './Component.module.scss';

export function Component({ className }: { className?: string }) {
  return (
    <div className={cn(styles.container, 'p-4 bg-white', className)}>
      {/* Content */}
    </div>
  );
}
```

## Styling Best Practices

### Prefer Tailwind for Most Styles
```tsx
// ✅ Good - Use Tailwind utilities
<button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
  Click me
</button>

// ❌ Avoid - Custom CSS for simple styles
<button className={styles.button}>Click me</button>
```

### Use Consistent Spacing
```tsx
// ✅ Good - Tailwind spacing scale
<div className="p-4 mb-6 space-y-4">
  {/* Content */}
</div>

// ❌ Avoid - Arbitrary values without reason
<div className="p-[17px] mb-[23px]">
  {/* Content */}
</div>
```

### Responsive Design
```tsx
// ✅ Good - Mobile-first approach
<div className="text-sm md:text-base lg:text-lg">
  Responsive text
</div>

// ✅ Good - Responsive grid
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  {/* Items */}
</div>
```

### Color Usage
```tsx
// ✅ Good - Use semantic colors from theme
<div className="bg-primary text-primary-foreground">
  Primary content
</div>

// ✅ Good - Use Tailwind color palette
<div className="bg-blue-500 text-white">
  Blue content
</div>

// ❌ Avoid - Hardcoded hex colors
<div className="bg-[#3b82f6]">
  Content
</div>
```

## Component Variants with CVA

### class-variance-authority (cva)
```tsx
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/libs/ui/src/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}
```

## Theme Configuration

### CSS Variables (Tailwind v4)
```css
/* In your CSS file */
@theme {
  /* Colors */
  --color-primary: #3b82f6;
  --color-secondary: #64748b;
  
  /* Spacing */
  --spacing-card: 1.5rem;
  
  /* Border radius */
  --radius-lg: 0.5rem;
}
```

### Using Theme Variables
```tsx
<div className="bg-primary text-primary-foreground rounded-lg">
  Themed content
</div>
```

## Accessibility in Styling

### Focus States
```tsx
// ✅ Good - Visible focus states
<button className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
  Accessible button
</button>
```

### Color Contrast
- Ensure sufficient contrast ratios (WCAG AA: 4.5:1 for normal text)
- Test with accessibility tools
- Use Tailwind's semantic color system

### Screen Reader Only Content
```tsx
// ✅ Good - Visually hidden but accessible
<span className="sr-only">Screen reader only text</span>
```
