# React Development Rules

## Version
- **React 19.0.0** - Use the latest features and patterns

## Documentation
- Official Docs: https://react.dev/
- React 19 Release: https://react.dev/blog/2024/12/05/react-19

## Component Patterns

### Functional Components Only
```tsx
// ✅ Good - Use function declarations
export function MyComponent() {
  return <div>Content</div>;
}

// ❌ Avoid - No class components
export class MyComponent extends React.Component {}
```

### Hooks Usage
```tsx
import * as React from 'react';

export function ExampleComponent() {
  const [state, setState] = React.useState('');
  const ref = React.useRef(null);
  
  React.useEffect(() => {
    // Side effects
  }, []);
  
  return <div ref={ref}>{state}</div>;
}
```

### Import Pattern
```tsx
// ✅ Preferred - Namespace import
import * as React from 'react';

// ✅ Also acceptable for specific hooks
import { useState, useEffect } from 'react';
```

## React 19 Features

### Use Transitions
```tsx
const [isPending, startTransition] = React.useTransition();

function handleClick() {
  startTransition(() => {
    // Non-urgent updates
  });
}
```

### Suspense for Data Fetching
```tsx
<React.Suspense fallback={<Loading />}>
  <AsyncComponent />
</React.Suspense>
```

### Lazy Loading (Module Federation Pattern)
```tsx
// In shell app
const RemoteApp = React.lazy(() => import('remoteName/Module'));

export function App() {
  return (
    <React.Suspense fallback={null}>
      <RemoteApp />
    </React.Suspense>
  );
}
```

## Component Structure

### File Naming
- Use PascalCase for component files: `MyComponent.tsx`
- Use kebab-case for utility files: `use-my-hook.ts`
- Co-locate tests: `MyComponent.spec.tsx`

### Component Organization
```tsx
import * as React from 'react';
import { ExternalDependency } from 'external-lib';
import { InternalComponent } from './internal-component';
import styles from './component.module.scss';

// Types/Interfaces
interface MyComponentProps {
  title: string;
  onAction?: () => void;
}

// Component
export function MyComponent({ title, onAction }: MyComponentProps) {
  // Hooks
  const [state, setState] = React.useState('');
  
  // Event handlers
  const handleClick = () => {
    onAction?.();
  };
  
  // Render
  return (
    <div className={styles.container}>
      <h1>{title}</h1>
      <button onClick={handleClick}>Action</button>
    </div>
  );
}

// Default export if needed
export default MyComponent;
```

## Best Practices

### Props
- Define explicit prop types
- Use optional chaining for optional callbacks
- Destructure props in function signature
- Use default parameters when appropriate

### State Management
- Keep state as local as possible
- Use `useState` for simple state
- Use `useReducer` for complex state logic
- Avoid prop drilling - consider context for deep trees

### Performance
- Use `React.memo()` for expensive components
- Use `React.useMemo()` for expensive calculations
- Use `React.useCallback()` for stable function references
- Lazy load heavy components

### Accessibility
- Use semantic HTML elements
- Include ARIA labels where needed
- Ensure keyboard navigation works
- Test with screen readers

## Common Patterns

### Conditional Rendering
```tsx
// ✅ Good
{isVisible && <Component />}
{condition ? <ComponentA /> : <ComponentB />}

// ❌ Avoid
{isVisible === true && <Component />}
```

### Lists and Keys
```tsx
// ✅ Good - Stable, unique keys
{items.map(item => (
  <Item key={item.id} {...item} />
))}

// ❌ Avoid - Index as key
{items.map((item, index) => (
  <Item key={index} {...item} />
))}
```

### Event Handlers
```tsx
// ✅ Good - Inline for simple cases
<button onClick={() => setCount(count + 1)}>+</button>

// ✅ Good - Named function for complex logic
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  // Complex logic
};

<form onSubmit={handleSubmit}>...</form>
```

## Testing
- Use `@testing-library/react` for component tests
- Test user interactions, not implementation details
- Use `jest` as the test runner
- Keep tests next to components: `Component.spec.tsx`
