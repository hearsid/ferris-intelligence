# Routing Rules

## Library
- **React Router v6.29.0**

## Documentation
- Official Docs: https://reactrouter.com/
- v6 Guide: https://reactrouter.com/en/main/start/overview

## Basic Setup

### Router Provider
```tsx
// apps/shell/src/main.ts
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
```

### Route Configuration
```tsx
// apps/shell/src/app/app.tsx
import * as React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

const ContactUs = React.lazy(() => import('contactUs/Module'));
const ComingSoon = React.lazy(() => import('comingSoon/Module'));

export function App() {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/contact-us">Contact Us</Link></li>
          <li><Link to="/coming-soon">Coming Soon</Link></li>
        </ul>
      </nav>

      <React.Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/coming-soon" element={<ComingSoon />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </React.Suspense>
    </div>
  );
}
```

## Navigation

### Link Component
```tsx
import { Link } from 'react-router-dom';

// Basic link
<Link to="/about">About</Link>

// Link with state
<Link to="/user" state={{ from: 'home' }}>User</Link>

// Link with relative path
<Link to="../parent">Parent</Link>

// Link with replace (doesn't add to history)
<Link to="/login" replace>Login</Link>
```

### NavLink Component
```tsx
import { NavLink } from 'react-router-dom';

// NavLink with active styling
<NavLink
  to="/about"
  className={({ isActive }) =>
    isActive ? 'text-blue-600 font-bold' : 'text-gray-600'
  }
>
  About
</NavLink>

// NavLink with active style object
<NavLink
  to="/about"
  style={({ isActive }) => ({
    color: isActive ? 'blue' : 'black',
    fontWeight: isActive ? 'bold' : 'normal',
  })}
>
  About
</NavLink>
```

### Programmatic Navigation
```tsx
import { useNavigate } from 'react-router-dom';

function MyComponent() {
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to path
    navigate('/about');

    // Navigate with state
    navigate('/user', { state: { from: 'home' } });

    // Navigate back
    navigate(-1);

    // Navigate forward
    navigate(1);

    // Replace current entry
    navigate('/login', { replace: true });
  };

  return <button onClick={handleClick}>Go</button>;
}
```

## Route Parameters

### Dynamic Routes
```tsx
// Define route with parameter
<Route path="/user/:id" element={<UserProfile />} />
<Route path="/blog/:category/:slug" element={<BlogPost />} />

// Access parameters
import { useParams } from 'react-router-dom';

function UserProfile() {
  const { id } = useParams();
  return <div>User ID: {id}</div>;
}

function BlogPost() {
  const { category, slug } = useParams();
  return <div>Category: {category}, Slug: {slug}</div>;
}
```

### Optional Parameters
```tsx
// Optional parameter with ?
<Route path="/user/:id?" element={<UserProfile />} />

function UserProfile() {
  const { id } = useParams();
  return <div>{id ? `User ${id}` : 'All Users'}</div>;
}
```

## Query Parameters

### Reading Query Params
```tsx
import { useSearchParams } from 'react-router-dom';

function SearchResults() {
  const [searchParams] = useSearchParams();
  
  const query = searchParams.get('q');
  const page = searchParams.get('page') || '1';
  
  return (
    <div>
      <p>Search: {query}</p>
      <p>Page: {page}</p>
    </div>
  );
}
```

### Setting Query Params
```tsx
import { useSearchParams } from 'react-router-dom';

function SearchForm() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = (query: string) => {
    // Set single param
    setSearchParams({ q: query });

    // Set multiple params
    setSearchParams({ q: query, page: '1' });

    // Update existing params
    const newParams = new URLSearchParams(searchParams);
    newParams.set('q', query);
    setSearchParams(newParams);
  };

  return <input onChange={(e) => handleSearch(e.target.value)} />;
}
```

## Nested Routes

### Parent Route
```tsx
<Routes>
  <Route path="/dashboard" element={<DashboardLayout />}>
    <Route index element={<DashboardHome />} />
    <Route path="profile" element={<Profile />} />
    <Route path="settings" element={<Settings />} />
  </Route>
</Routes>
```

### Outlet for Nested Routes
```tsx
import { Outlet, Link } from 'react-router-dom';

function DashboardLayout() {
  return (
    <div>
      <nav>
        <Link to="/dashboard">Home</Link>
        <Link to="/dashboard/profile">Profile</Link>
        <Link to="/dashboard/settings">Settings</Link>
      </nav>
      
      <main>
        <Outlet /> {/* Nested routes render here */}
      </main>
    </div>
  );
}
```

## Route Guards / Protected Routes

### Authentication Check
```tsx
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
}

function ProtectedRoute({ children, isAuthenticated }: ProtectedRouteProps) {
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

// Usage
<Route
  path="/dashboard"
  element={
    <ProtectedRoute isAuthenticated={user !== null}>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

## Hooks

### useLocation
```tsx
import { useLocation } from 'react-router-dom';

function CurrentPath() {
  const location = useLocation();
  
  return (
    <div>
      <p>Pathname: {location.pathname}</p>
      <p>Search: {location.search}</p>
      <p>Hash: {location.hash}</p>
      <p>State: {JSON.stringify(location.state)}</p>
    </div>
  );
}
```

### useNavigate
```tsx
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();

  const handleSubmit = async (credentials: Credentials) => {
    await login(credentials);
    navigate('/dashboard', { replace: true });
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

### useParams
```tsx
import { useParams } from 'react-router-dom';

function UserProfile() {
  const { userId } = useParams<{ userId: string }>();
  
  return <div>User: {userId}</div>;
}
```

### useSearchParams
```tsx
import { useSearchParams } from 'react-router-dom';

function Pagination() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  const nextPage = () => {
    setSearchParams({ page: String(page + 1) });
  };

  return <button onClick={nextPage}>Next Page</button>;
}
```

## 404 / Not Found

### Catch-All Route
```tsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  {/* Catch all unmatched routes */}
  <Route path="*" element={<NotFound />} />
</Routes>

function NotFound() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <Link to="/">Go Home</Link>
    </div>
  );
}
```

## Loading States

### Suspense with Routes
```tsx
import * as React from 'react';
import { Routes, Route } from 'react-router-dom';

const ContactUs = React.lazy(() => import('contactUs/Module'));

export function App() {
  return (
    <React.Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact-us" element={<ContactUs />} />
      </Routes>
    </React.Suspense>
  );
}
```

## Best Practices

### Do's
- ✅ Use `<Link>` and `<NavLink>` for navigation
- ✅ Use `useNavigate` for programmatic navigation
- ✅ Wrap lazy-loaded routes in `Suspense`
- ✅ Use catch-all route (`*`) for 404 pages
- ✅ Use TypeScript for route parameters
- ✅ Use `replace` for redirects after form submissions
- ✅ Store navigation state when redirecting to login

### Don'ts
- ❌ Don't use `<a>` tags for internal navigation
- ❌ Don't use `window.location` for navigation
- ❌ Don't forget to handle 404 routes
- ❌ Don't nest `<Routes>` without `<Outlet>`
- ❌ Don't use query params for sensitive data
- ❌ Don't forget loading states for lazy routes

## Module Federation Routing

### Shell App Routes
```tsx
// apps/shell/src/app/app.tsx
import * as React from 'react';
import { Routes, Route } from 'react-router-dom';

// Lazy load remote modules
const ContactUs = React.lazy(() => import('contactUs/Module'));
const ComingSoon = React.lazy(() => import('comingSoon/Module'));

export function App() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact-us/*" element={<ContactUs />} />
        <Route path="/coming-soon/*" element={<ComingSoon />} />
      </Routes>
    </React.Suspense>
  );
}
```

### Remote App Internal Routes
```tsx
// apps/contact-us/src/app/app.tsx
import { Routes, Route } from 'react-router-dom';

export function App() {
  return (
    <Routes>
      <Route index element={<ContactForm />} />
      <Route path="success" element={<Success />} />
    </Routes>
  );
}
```

**Note:** Use `/*` in shell routes to allow remote apps to handle their own nested routes.
