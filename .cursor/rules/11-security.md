# Security Rules

## Standards
- **OWASP Top 10** - Web Application Security Risks
- **OWASP ASVS** - Application Security Verification Standard

## Documentation
- OWASP Top 10: https://owasp.org/www-project-top-ten/
- OWASP ASVS: https://owasp.org/www-project-application-security-verification-standard/
- OWASP Cheat Sheets: https://cheatsheetseries.owasp.org/
- Content Security Policy: https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP

## ⚠️ Critical Rules

### ALWAYS Ask Before:
- Adding authentication/authorization logic
- Implementing API endpoints
- Handling user data
- Adding third-party scripts
- Modifying security headers
- Implementing payment processing
- Adding file upload functionality
- Making changes to server-side code

### Server-Side Code Changes
**⚠️ EXTRA CAUTION REQUIRED:**
- **NEVER** trust client-side validation alone
- **ALWAYS** validate and sanitize on the server
- **ALWAYS** use parameterized queries
- **ALWAYS** implement rate limiting
- **ALWAYS** log security events
- **ALWAYS** ask user before implementing server endpoints

## OWASP Top 10 (2021)

### A01:2021 - Broken Access Control

#### Frontend Considerations
```tsx
// ✅ Good - Check permissions before rendering
function AdminPanel() {
  const { user } = useAuth();
  
  if (!user?.isAdmin) {
    return <Navigate to="/unauthorized" />;
  }
  
  return <div>Admin Content</div>;
}

// ⚠️ Important - Frontend checks are NOT security
// ALWAYS enforce access control on the server
```

#### API Requests
```tsx
// ✅ Good - Include auth token
async function fetchUserData() {
  const token = getAuthToken();
  
  const response = await fetch('/api/user/profile', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
  if (response.status === 403) {
    // Handle unauthorized access
    throw new Error('Access denied');
  }
  
  return response.json();
}

// ❌ Bad - Assuming user has access
async function fetchUserData(userId: string) {
  // No authorization check
  return fetch(`/api/users/${userId}`).then(r => r.json());
}
```

#### Server-Side (Example - ASK BEFORE IMPLEMENTING)
```typescript
// ⚠️ ALWAYS ask user before implementing server endpoints

// ✅ Good - Server-side access control
app.get('/api/admin/users', authenticateToken, requireAdmin, async (req, res) => {
  // Verify user is admin
  if (!req.user.isAdmin) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  
  const users = await db.users.findMany();
  res.json(users);
});

// ❌ Bad - No access control
app.get('/api/admin/users', async (req, res) => {
  const users = await db.users.findMany();
  res.json(users);
});
```

### A02:2021 - Cryptographic Failures

#### Sensitive Data Handling
```tsx
// ✅ Good - Never log sensitive data
function processPayment(cardData: CardData) {
  console.log('Processing payment', {
    orderId: cardData.orderId,
    amount: cardData.amount,
    // Do NOT log card numbers, CVV, etc.
  });
}

// ❌ Bad - Logging sensitive data
function processPayment(cardData: CardData) {
  console.log('Payment data:', cardData); // Contains sensitive info
}
```

#### Local Storage
```tsx
// ✅ Good - Don't store sensitive data in localStorage
// Use httpOnly cookies for auth tokens (server-side)

// ⚠️ Acceptable - Store non-sensitive preferences
localStorage.setItem('theme', 'dark');
localStorage.setItem('language', 'en');

// ❌ Bad - Storing sensitive data
localStorage.setItem('authToken', token); // Vulnerable to XSS
localStorage.setItem('creditCard', cardNumber); // Never do this
```

#### HTTPS Only
```tsx
// ✅ Good - Ensure all API calls use HTTPS in production
const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://api.ferris-intelligence.com'
  : 'http://localhost:3000';

// ❌ Bad - Using HTTP in production
const API_BASE_URL = 'http://api.ferris-intelligence.com';
```

### A03:2021 - Injection

#### XSS Prevention
```tsx
// ✅ Good - React escapes by default
function UserProfile({ user }: { user: User }) {
  return <div>{user.name}</div>; // Automatically escaped
}

// ⚠️ Dangerous - Only use when absolutely necessary
function RichTextContent({ html }: { html: string }) {
  // Sanitize HTML before using dangerouslySetInnerHTML
  const sanitizedHtml = DOMPurify.sanitize(html);
  
  return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
}

// ❌ Bad - Unsanitized HTML
function UnsafeContent({ html }: { html: string }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
```

#### SQL Injection (Server-Side)
```typescript
// ⚠️ ALWAYS ask before implementing database queries

// ✅ Good - Parameterized queries
async function getUser(userId: string) {
  const user = await db.query(
    'SELECT * FROM users WHERE id = $1',
    [userId]
  );
  return user;
}

// ❌ Bad - String concatenation
async function getUser(userId: string) {
  const user = await db.query(
    `SELECT * FROM users WHERE id = '${userId}'`
  );
  return user;
}
```

#### Command Injection (Server-Side)
```typescript
// ⚠️ ALWAYS ask before executing system commands

// ✅ Good - Avoid shell execution, use libraries
import { readFile } from 'fs/promises';

async function getFileContent(filename: string) {
  // Validate filename
  if (!/^[a-zA-Z0-9-_]+\.txt$/.test(filename)) {
    throw new Error('Invalid filename');
  }
  
  return readFile(`./uploads/${filename}`, 'utf-8');
}

// ❌ Bad - Shell execution with user input
import { exec } from 'child_process';

async function getFileContent(filename: string) {
  exec(`cat ./uploads/${filename}`, (error, stdout) => {
    // Vulnerable to command injection
  });
}
```

### A04:2021 - Insecure Design

#### Rate Limiting
```tsx
// ✅ Good - Implement rate limiting for sensitive operations
let loginAttempts = 0;
const MAX_ATTEMPTS = 5;
const LOCKOUT_TIME = 15 * 60 * 1000; // 15 minutes

async function handleLogin(email: string, password: string) {
  if (loginAttempts >= MAX_ATTEMPTS) {
    throw new Error('Too many login attempts. Please try again later.');
  }
  
  try {
    const result = await login(email, password);
    loginAttempts = 0; // Reset on success
    return result;
  } catch (error) {
    loginAttempts++;
    throw error;
  }
}
```

#### Input Validation
```tsx
// ✅ Good - Validate input on frontend AND backend
function EmailInput({ value, onChange }: EmailInputProps) {
  const [error, setError] = React.useState('');
  
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email format');
      return false;
    }
    setError('');
    return true;
  };
  
  return (
    <div>
      <input
        type="email"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          validateEmail(e.target.value);
        }}
        aria-invalid={!!error}
      />
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
}

// ⚠️ Remember - ALWAYS validate on server too
```

### A05:2021 - Security Misconfiguration

#### Security Headers
```typescript
// ⚠️ Configure in vercel.json or server

// vercel.json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "camera=(), microphone=(), geolocation=()"
        }
      ]
    }
  ]
}
```

#### Content Security Policy
```typescript
// ⚠️ Configure CSP headers
{
  "key": "Content-Security-Policy",
  "value": "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://api.ferris-intelligence.com;"
}
```

#### Environment Variables
```bash
# ✅ Good - Never commit secrets
# .env.local (in .gitignore)
NX_API_KEY=secret-key-here
NX_SENTRY_DSN=https://...

# .env.example (committed)
NX_API_KEY=your-api-key-here
NX_SENTRY_DSN=your-sentry-dsn-here
```

### A06:2021 - Vulnerable and Outdated Components

#### Dependency Management
```bash
# ✅ Good - Regularly update dependencies
pnpm update

# Check for vulnerabilities
pnpm audit

# Fix vulnerabilities
pnpm audit --fix

# Check for outdated packages
pnpm outdated
```

#### Package Installation
```bash
# ✅ Good - Review packages before installing
# Check npm page, GitHub stars, last update, etc.

# ❌ Bad - Installing unknown packages without review
pnpm add random-unknown-package
```

### A07:2021 - Identification and Authentication Failures

#### Password Handling
```tsx
// ✅ Good - Never store passwords in frontend
// Use secure authentication service (Auth0, Firebase, etc.)

// ✅ Good - Password requirements
function PasswordInput({ value, onChange }: PasswordInputProps) {
  const [strength, setStrength] = React.useState('weak');
  
  const checkStrength = (password: string) => {
    if (password.length < 8) return 'weak';
    if (password.length < 12) return 'medium';
    
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);
    
    if (hasUpper && hasLower && hasNumber && hasSpecial) {
      return 'strong';
    }
    return 'medium';
  };
  
  return (
    <div>
      <input
        type="password"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setStrength(checkStrength(e.target.value));
        }}
        minLength={8}
      />
      <p>Password strength: {strength}</p>
    </div>
  );
}
```

#### Session Management
```tsx
// ✅ Good - Implement session timeout
function useSessionTimeout() {
  const { logout } = useAuth();
  const TIMEOUT = 30 * 60 * 1000; // 30 minutes
  
  React.useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const resetTimeout = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        logout();
        alert('Session expired. Please log in again.');
      }, TIMEOUT);
    };
    
    // Reset on user activity
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach(event => {
      document.addEventListener(event, resetTimeout);
    });
    
    resetTimeout();
    
    return () => {
      clearTimeout(timeoutId);
      events.forEach(event => {
        document.removeEventListener(event, resetTimeout);
      });
    };
  }, [logout]);
}
```

#### Multi-Factor Authentication
```tsx
// ✅ Good - Support MFA
function LoginForm() {
  const [showMFA, setShowMFA] = React.useState(false);
  
  const handleLogin = async (email: string, password: string) => {
    const response = await login(email, password);
    
    if (response.requiresMFA) {
      setShowMFA(true);
    } else {
      // Login successful
    }
  };
  
  return showMFA ? <MFAVerification /> : <LoginFields onSubmit={handleLogin} />;
}
```

### A08:2021 - Software and Data Integrity Failures

#### Subresource Integrity
```html
<!-- ✅ Good - Use SRI for CDN resources -->
<script
  src="https://cdn.example.com/library.js"
  integrity="sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/uxy9rx7HNQlGYl1kPzQho1wx4JwY8wC"
  crossorigin="anonymous"
></script>

<!-- ❌ Bad - No integrity check -->
<script src="https://cdn.example.com/library.js"></script>
```

#### Code Signing
```bash
# ✅ Good - Verify package integrity
# pnpm automatically verifies package integrity using lock file
pnpm install --frozen-lockfile
```

### A09:2021 - Security Logging and Monitoring Failures

#### Security Event Logging
```tsx
// ✅ Good - Log security events
import * as Sentry from '@sentry/react';

function logSecurityEvent(event: string, details: Record<string, any>) {
  Sentry.captureMessage(`Security Event: ${event}`, {
    level: 'warning',
    tags: {
      type: 'security',
      event,
    },
    extra: details,
  });
}

// Usage
function handleFailedLogin(email: string) {
  logSecurityEvent('failed_login', {
    email,
    timestamp: new Date().toISOString(),
    ip: getUserIP(),
  });
}

function handleSuspiciousActivity(activity: string) {
  logSecurityEvent('suspicious_activity', {
    activity,
    userId: getCurrentUserId(),
    timestamp: new Date().toISOString(),
  });
}
```

#### Audit Trail
```tsx
// ✅ Good - Track important user actions
function trackUserAction(action: string, details: Record<string, any>) {
  // Send to analytics/logging service
  console.log('User Action', {
    action,
    userId: getCurrentUserId(),
    timestamp: new Date().toISOString(),
    ...details,
  });
}

// Usage
function handleDataExport() {
  trackUserAction('data_export', {
    dataType: 'user_profile',
    format: 'json',
  });
}
```

### A10:2021 - Server-Side Request Forgery (SSRF)

#### URL Validation (Server-Side)
```typescript
// ⚠️ ALWAYS ask before implementing URL fetching

// ✅ Good - Validate and whitelist URLs
const ALLOWED_DOMAINS = ['api.ferris-intelligence.com', 'cdn.example.com'];

function isAllowedUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return ALLOWED_DOMAINS.includes(parsed.hostname);
  } catch {
    return false;
  }
}

async function fetchExternalResource(url: string) {
  if (!isAllowedUrl(url)) {
    throw new Error('URL not allowed');
  }
  
  return fetch(url);
}

// ❌ Bad - No URL validation
async function fetchExternalResource(url: string) {
  return fetch(url); // Can be exploited
}
```

## Frontend-Specific Security

### Cross-Site Scripting (XSS)

#### React Default Protection
```tsx
// ✅ Good - React escapes by default
function UserComment({ comment }: { comment: string }) {
  return <p>{comment}</p>; // Safe
}

// ⚠️ Use DOMPurify for HTML content
import DOMPurify from 'dompurify';

function RichComment({ html }: { html: string }) {
  const clean = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p'],
    ALLOWED_ATTR: ['href'],
  });
  
  return <div dangerouslySetInnerHTML={{ __html: clean }} />;
}
```

#### URL Handling
```tsx
// ✅ Good - Validate URLs
function SafeLink({ href, children }: { href: string; children: React.ReactNode }) {
  const isSafe = href.startsWith('http://') || 
                 href.startsWith('https://') || 
                 href.startsWith('/');
  
  if (!isSafe) {
    console.warn('Unsafe URL blocked:', href);
    return <span>{children}</span>;
  }
  
  return <a href={href}>{children}</a>;
}

// ❌ Bad - Allowing javascript: URLs
<a href={userProvidedUrl}>Click here</a>
```

### Cross-Site Request Forgery (CSRF)

#### CSRF Token
```tsx
// ✅ Good - Include CSRF token in requests
async function submitForm(data: FormData) {
  const csrfToken = document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content;
  
  return fetch('/api/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken || '',
    },
    body: JSON.stringify(data),
  });
}
```

#### SameSite Cookies
```typescript
// ⚠️ Configure on server
// Set-Cookie: sessionId=abc123; SameSite=Strict; Secure; HttpOnly
```

### Clickjacking Protection

#### X-Frame-Options
```typescript
// ⚠️ Configure in vercel.json
{
  "key": "X-Frame-Options",
  "value": "DENY"
}

// Or allow specific origins
{
  "key": "X-Frame-Options",
  "value": "SAMEORIGIN"
}
```

### Data Validation

#### Client-Side Validation
```tsx
// ✅ Good - Validate all user input
function validateUserInput(input: string): boolean {
  // Length check
  if (input.length > 1000) {
    return false;
  }
  
  // Pattern check
  const allowedPattern = /^[a-zA-Z0-9\s.,!?-]+$/;
  if (!allowedPattern.test(input)) {
    return false;
  }
  
  return true;
}

// Usage
function CommentForm() {
  const [comment, setComment] = React.useState('');
  const [error, setError] = React.useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateUserInput(comment)) {
      setError('Invalid input detected');
      return;
    }
    
    // Submit comment
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        maxLength={1000}
      />
      {error && <p className="text-red-600">{error}</p>}
      <button type="submit">Submit</button>
    </form>
  );
}
```

## API Security

### Authentication
```tsx
// ✅ Good - Include auth token in requests
const authFetch = async (url: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
    },
  });
};
```

### CORS
```typescript
// ⚠️ Configure on server
// Allow specific origins only
const allowedOrigins = [
  'https://ferris-intelligence.com',
  'https://www.ferris-intelligence.com',
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  next();
});
```

### Rate Limiting
```tsx
// ✅ Good - Implement client-side rate limiting
class RateLimiter {
  private requests: number[] = [];
  private maxRequests: number;
  private windowMs: number;
  
  constructor(maxRequests: number, windowMs: number) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }
  
  canMakeRequest(): boolean {
    const now = Date.now();
    this.requests = this.requests.filter(time => now - time < this.windowMs);
    
    if (this.requests.length < this.maxRequests) {
      this.requests.push(now);
      return true;
    }
    
    return false;
  }
}

// Usage
const apiLimiter = new RateLimiter(10, 60000); // 10 requests per minute

async function makeApiCall() {
  if (!apiLimiter.canMakeRequest()) {
    throw new Error('Rate limit exceeded');
  }
  
  return fetch('/api/data');
}
```

## Best Practices

### Do's
- ✅ Always validate input on both client and server
- ✅ Use HTTPS for all communications
- ✅ Implement proper authentication and authorization
- ✅ Keep dependencies up to date
- ✅ Use security headers
- ✅ Log security events
- ✅ Implement rate limiting
- ✅ Use Content Security Policy
- ✅ Sanitize user-generated content
- ✅ Use httpOnly cookies for sensitive data
- ✅ Implement session timeouts
- ✅ Ask before making server-side changes

### Don'ts
- ❌ Never trust client-side validation alone
- ❌ Never store sensitive data in localStorage
- ❌ Never log sensitive information
- ❌ Never commit secrets to version control
- ❌ Never use eval() or Function() with user input
- ❌ Never allow arbitrary file uploads without validation
- ❌ Never expose stack traces in production
- ❌ Never use weak encryption
- ❌ Never implement your own crypto (use established libraries)
- ❌ Never make server changes without asking user first

## Security Checklist

### Before Deployment
- [ ] All dependencies updated and audited
- [ ] No secrets in code or environment variables committed
- [ ] Security headers configured
- [ ] CSP policy implemented
- [ ] HTTPS enforced
- [ ] Authentication implemented correctly
- [ ] Input validation on client and server
- [ ] Rate limiting implemented
- [ ] Error handling doesn't expose sensitive info
- [ ] Logging configured for security events
- [ ] Session management implemented
- [ ] CORS configured correctly

## Resources

- OWASP Top 10: https://owasp.org/www-project-top-ten/
- OWASP Cheat Sheets: https://cheatsheetseries.owasp.org/
- MDN Web Security: https://developer.mozilla.org/en-US/docs/Web/Security
- Content Security Policy: https://content-security-policy.com/
- Security Headers: https://securityheaders.com/
