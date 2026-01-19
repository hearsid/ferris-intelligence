# Testing Rules

## Testing Stack

### Tools
- **Jest 30.0.2** - Test runner
- **@testing-library/react 16.3.0** - React component testing
- **@testing-library/dom 10.4.0** - DOM testing utilities
- **jest-environment-jsdom 30.0.2** - Browser-like environment

## Documentation
- Jest: https://jestjs.io/docs/getting-started
- React Testing Library: https://testing-library.com/docs/react-testing-library/intro
- Testing Library Queries: https://testing-library.com/docs/queries/about

## Running Tests

### Commands
```bash
# Test single project
nx test shell

# Test all projects
nx run-many -t test --all

# Test with coverage
nx test shell --coverage

# Test in watch mode
nx test shell --watch

# Test affected projects only
nx affected -t test
```

## Test File Structure

### File Naming
```
Component/
├── Component.tsx
└── Component.spec.tsx    # Test file
```

### Basic Test Structure
```tsx
import { render, screen } from '@testing-library/react';
import { Button } from './button';

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    screen.getByText('Click me').click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

## Testing Library Principles

### Query Priority
1. **Accessible queries** (preferred):
   - `getByRole`
   - `getByLabelText`
   - `getByPlaceholderText`
   - `getByText`

2. **Semantic queries**:
   - `getByAltText`
   - `getByTitle`

3. **Test IDs** (last resort):
   - `getByTestId`

### Example
```tsx
import { render, screen } from '@testing-library/react';

function LoginForm() {
  return (
    <form>
      <label htmlFor="username">Username</label>
      <input id="username" type="text" />
      <button type="submit">Submit</button>
    </form>
  );
}

describe('LoginForm', () => {
  it('renders form elements', () => {
    render(<LoginForm />);
    
    // ✅ Good - Use accessible queries
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
    
    // ❌ Avoid - Don't use testId unless necessary
    expect(screen.getByTestId('username-input')).toBeInTheDocument();
  });
});
```

## User Interactions

### userEvent (Recommended)
```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('SearchForm', () => {
  it('handles user input', async () => {
    const user = userEvent.setup();
    render(<SearchForm />);
    
    const input = screen.getByRole('textbox');
    await user.type(input, 'search query');
    
    expect(input).toHaveValue('search query');
  });

  it('submits form on button click', async () => {
    const user = userEvent.setup();
    const handleSubmit = jest.fn();
    render(<SearchForm onSubmit={handleSubmit} />);
    
    const button = screen.getByRole('button', { name: 'Search' });
    await user.click(button);
    
    expect(handleSubmit).toHaveBeenCalled();
  });
});
```

### fireEvent (Simple Cases)
```tsx
import { render, screen, fireEvent } from '@testing-library/react';

describe('Counter', () => {
  it('increments count on click', () => {
    render(<Counter />);
    
    const button = screen.getByRole('button', { name: '+' });
    fireEvent.click(button);
    
    expect(screen.getByText('Count: 1')).toBeInTheDocument();
  });
});
```

## Async Testing

### waitFor
```tsx
import { render, screen, waitFor } from '@testing-library/react';

describe('UserProfile', () => {
  it('loads and displays user data', async () => {
    render(<UserProfile userId="123" />);
    
    // Wait for loading to finish
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
  });
});
```

### findBy Queries (Async)
```tsx
describe('UserProfile', () => {
  it('loads user data', async () => {
    render(<UserProfile userId="123" />);
    
    // findBy* queries wait automatically
    const userName = await screen.findByText('John Doe');
    expect(userName).toBeInTheDocument();
  });
});
```

## Mocking

### Mock Functions
```tsx
describe('TodoList', () => {
  it('calls onDelete when delete button is clicked', () => {
    const handleDelete = jest.fn();
    render(<TodoList todos={[{ id: 1, text: 'Test' }]} onDelete={handleDelete} />);
    
    const deleteButton = screen.getByRole('button', { name: 'Delete' });
    deleteButton.click();
    
    expect(handleDelete).toHaveBeenCalledWith(1);
  });
});
```

### Mock Modules
```tsx
// Mock external module
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

// Mock API calls
jest.mock('./api', () => ({
  fetchUser: jest.fn(() => Promise.resolve({ name: 'John' })),
}));
```

### Mock Components
```tsx
// Mock child component
jest.mock('./ChildComponent', () => ({
  ChildComponent: () => <div>Mocked Child</div>,
}));

describe('ParentComponent', () => {
  it('renders with mocked child', () => {
    render(<ParentComponent />);
    expect(screen.getByText('Mocked Child')).toBeInTheDocument();
  });
});
```

## Testing Hooks

### Custom Hook Testing
```tsx
import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter';

describe('useCounter', () => {
  it('increments count', () => {
    const { result } = renderHook(() => useCounter());
    
    expect(result.current.count).toBe(0);
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(1);
  });
});
```

## Testing with Context

### Wrapper for Context
```tsx
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from './ThemeContext';

function renderWithTheme(ui: React.ReactElement) {
  return render(
    <ThemeProvider>
      {ui}
    </ThemeProvider>
  );
}

describe('ThemedButton', () => {
  it('renders with theme', () => {
    renderWithTheme(<ThemedButton>Click me</ThemedButton>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
```

### Custom Render Function
```tsx
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext';

interface CustomRenderOptions extends RenderOptions {
  initialRoute?: string;
}

function customRender(
  ui: React.ReactElement,
  { initialRoute = '/', ...options }: CustomRenderOptions = {}
) {
  window.history.pushState({}, 'Test page', initialRoute);
  
  return render(
    <BrowserRouter>
      <ThemeProvider>
        {ui}
      </ThemeProvider>
    </BrowserRouter>,
    options
  );
}

// Re-export everything
export * from '@testing-library/react';
export { customRender as render };
```

## Snapshot Testing

### When to Use
- ✅ Testing component structure
- ✅ Testing error messages
- ❌ Avoid for frequently changing UI

### Example
```tsx
import { render } from '@testing-library/react';

describe('Button', () => {
  it('matches snapshot', () => {
    const { container } = render(<Button>Click me</Button>);
    expect(container.firstChild).toMatchSnapshot();
  });
});
```

## Coverage

### Running Coverage
```bash
nx test shell --coverage
```

### Coverage Thresholds
```javascript
// jest.config.ts
export default {
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
```

## Best Practices

### Do's
- ✅ Test user behavior, not implementation
- ✅ Use accessible queries (getByRole, getByLabelText)
- ✅ Use userEvent for interactions
- ✅ Test error states and edge cases
- ✅ Keep tests simple and focused
- ✅ Use descriptive test names
- ✅ Mock external dependencies
- ✅ Test accessibility

### Don'ts
- ❌ Don't test implementation details
- ❌ Don't use getByTestId unless necessary
- ❌ Don't test third-party libraries
- ❌ Don't write tests that depend on each other
- ❌ Don't over-mock (mock only what's necessary)
- ❌ Don't ignore async behavior
- ❌ Don't test styles (use visual regression testing)

## Common Patterns

### Testing Forms
```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('ContactForm', () => {
  it('submits form with valid data', async () => {
    const user = userEvent.setup();
    const handleSubmit = jest.fn();
    render(<ContactForm onSubmit={handleSubmit} />);
    
    await user.type(screen.getByLabelText('Name'), 'John Doe');
    await user.type(screen.getByLabelText('Email'), 'john@example.com');
    await user.click(screen.getByRole('button', { name: 'Submit' }));
    
    expect(handleSubmit).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
    });
  });
});
```

### Testing Loading States
```tsx
describe('UserList', () => {
  it('shows loading state', () => {
    render(<UserList loading={true} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('shows users after loading', async () => {
    render(<UserList />);
    
    const users = await screen.findAllByRole('listitem');
    expect(users).toHaveLength(3);
  });
});
```

### Testing Error States
```tsx
describe('UserProfile', () => {
  it('displays error message on fetch failure', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    
    render(<UserProfile userId="invalid" />);
    
    const errorMessage = await screen.findByText('Failed to load user');
    expect(errorMessage).toBeInTheDocument();
  });
});
```
