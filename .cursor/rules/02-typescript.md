# TypeScript Rules

## Version
- **TypeScript 5.9.2**

## Documentation
- Official Docs: https://www.typescriptlang.org/docs/
- TypeScript Handbook: https://www.typescriptlang.org/docs/handbook/intro.html

## Configuration
- Base config: `tsconfig.base.json`
- App configs extend the base config
- Strict mode is enabled

## Type Definitions

### Prefer Interfaces for Objects
```tsx
// ✅ Good - Interface for component props
interface UserCardProps {
  name: string;
  email: string;
  age?: number;
}

// ✅ Good - Type for unions
type Status = 'idle' | 'loading' | 'success' | 'error';

// ✅ Good - Type for complex types
type AsyncData<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
};
```

### Explicit Return Types
```tsx
// ✅ Good - Explicit return type for functions
function calculateTotal(items: Item[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// ✅ Good - Explicit return type for React components
function Button({ label }: ButtonProps): JSX.Element {
  return <button>{label}</button>;
}
```

### Avoid `any`
```tsx
// ❌ Bad
function process(data: any) {
  return data.value;
}

// ✅ Good - Use proper types
function process(data: { value: string }) {
  return data.value;
}

// ✅ Good - Use generics for flexibility
function process<T extends { value: string }>(data: T) {
  return data.value;
}

// ✅ Acceptable - Use unknown when type is truly unknown
function process(data: unknown) {
  if (typeof data === 'object' && data !== null && 'value' in data) {
    return (data as { value: string }).value;
  }
}
```

## React-Specific Types

### Component Props
```tsx
import * as React from 'react';

// Basic props
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

// Props with children
interface CardProps {
  title: string;
  children: React.ReactNode;
}

// Props extending HTML attributes
interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

// Props with ref forwarding
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, ...props }, ref) => {
    return (
      <div>
        <label>{label}</label>
        <input ref={ref} {...props} />
      </div>
    );
  }
);
```

### Event Handlers
```tsx
// Form events
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
};

// Input events
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  console.log(e.target.value);
};

// Click events
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  console.log('Clicked');
};
```

### Hooks Types
```tsx
// useState with explicit type
const [user, setUser] = React.useState<User | null>(null);

// useRef for DOM elements
const inputRef = React.useRef<HTMLInputElement>(null);

// useRef for mutable values
const countRef = React.useRef<number>(0);

// Custom hook with return type
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // Implementation
  return [value, setValue];
}
```

## Advanced Patterns

### Generics
```tsx
// Generic component
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return <ul>{items.map(renderItem)}</ul>;
}

// Usage
<List<User> items={users} renderItem={(user) => <li>{user.name}</li>} />
```

### Utility Types
```tsx
// Partial - Make all properties optional
type PartialUser = Partial<User>;

// Pick - Select specific properties
type UserPreview = Pick<User, 'name' | 'email'>;

// Omit - Exclude specific properties
type UserWithoutPassword = Omit<User, 'password'>;

// Record - Create object type with specific keys
type UserMap = Record<string, User>;

// Required - Make all properties required
type RequiredConfig = Required<Config>;
```

### Type Guards
```tsx
// Type predicate
function isUser(value: unknown): value is User {
  return (
    typeof value === 'object' &&
    value !== null &&
    'name' in value &&
    'email' in value
  );
}

// Usage
if (isUser(data)) {
  // data is typed as User here
  console.log(data.name);
}
```

## Module Federation Types

### Remote Module Types
```tsx
// In remotes.d.ts (shell app)
declare module 'contactUs/Module' {
  const Module: React.ComponentType;
  export default Module;
}

declare module 'comingSoon/Module' {
  const Module: React.ComponentType;
  export default Module;
}
```

## Best Practices

### Do's
- ✅ Use strict mode
- ✅ Define explicit types for function parameters
- ✅ Use type inference for simple cases
- ✅ Create reusable type definitions
- ✅ Use const assertions when appropriate
- ✅ Leverage utility types

### Don'ts
- ❌ Don't use `any` unless absolutely necessary
- ❌ Don't use `@ts-ignore` without a good reason
- ❌ Don't create overly complex types
- ❌ Don't duplicate type definitions
- ❌ Don't use `Function` type (use proper function signatures)

## Type Organization
```
src/
  ├── types/
  │   ├── index.ts         # Re-export all types
  │   ├── user.ts          # User-related types
  │   └── api.ts           # API response types
  └── components/
      └── Button/
          ├── Button.tsx
          └── Button.types.ts  # Component-specific types
```

## Import/Export Types
```tsx
// Export types
export interface User {
  id: string;
  name: string;
}

export type UserRole = 'admin' | 'user' | 'guest';

// Import types
import type { User, UserRole } from './types';

// Or use type-only imports
import { type User, type UserRole } from './types';
```
