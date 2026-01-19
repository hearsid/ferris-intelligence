# Observability & Monitoring Rules

## Tools

### Error Tracking
- **Sentry** - Error monitoring and performance tracking

### Telemetry
- **OpenTelemetry** - Distributed tracing and metrics

## Documentation
- Sentry Docs: https://docs.sentry.io/
- Sentry React: https://docs.sentry.io/platforms/javascript/guides/react/
- OpenTelemetry: https://opentelemetry.io/docs/
- OpenTelemetry JS: https://opentelemetry.io/docs/instrumentation/js/

## ⚠️ Important Rules

### Ask Before Installing
**ALWAYS ask the user before:**
- Installing Sentry or OpenTelemetry packages
- Adding monitoring configuration
- Setting up error tracking
- Implementing custom instrumentation
- Adding performance monitoring
- Configuring sampling rates

### Environment Variables
**Never commit sensitive data:**
- Sentry DSN should be in environment variables
- API keys must be in `.env` files (not committed)
- Use different projects for dev/staging/production

## Sentry Setup

### Installation
**⚠️ Ask user before running:**
```bash
# Install Sentry SDK
pnpm add @sentry/react

# For Rspack/Webpack source maps
pnpm add -D @sentry/rspack-plugin
```

### Basic Configuration

#### Initialize Sentry
```tsx
// apps/shell/src/main.ts
import * as Sentry from '@sentry/react';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app/app';

// Initialize Sentry before rendering
if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: process.env.NX_SENTRY_DSN,
    environment: process.env.NX_ENVIRONMENT || 'production',
    
    // Set sample rate for performance monitoring
    tracesSampleRate: 0.1, // 10% of transactions
    
    // Set sample rate for session replay
    replaysSessionSampleRate: 0.1, // 10% of sessions
    replaysOnErrorSampleRate: 1.0, // 100% of sessions with errors
    
    integrations: [
      new Sentry.BrowserTracing({
        // Set up routing instrumentation
        routingInstrumentation: Sentry.reactRouterV6Instrumentation(
          React.useEffect,
          useLocation,
          useNavigationType,
          createRoutesFromChildren,
          matchRoutes
        ),
      }),
      new Sentry.Replay({
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],
    
    // Filter out sensitive data
    beforeSend(event, hint) {
      // Remove sensitive information
      if (event.request) {
        delete event.request.cookies;
      }
      return event;
    },
  });
}

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

### Environment Variables
```bash
# .env.local (not committed)
NX_SENTRY_DSN=https://your-dsn@sentry.io/project-id
NX_ENVIRONMENT=development

# .env.production (set in Vercel/CI)
NX_SENTRY_DSN=https://your-production-dsn@sentry.io/project-id
NX_ENVIRONMENT=production
```

## Error Tracking

### Automatic Error Capture
```tsx
// Sentry automatically captures:
// - Unhandled exceptions
// - Unhandled promise rejections
// - Console errors (optional)

// No additional code needed for basic error tracking
```

### Manual Error Capture
```tsx
import * as Sentry from '@sentry/react';

// Capture exception
try {
  riskyOperation();
} catch (error) {
  Sentry.captureException(error);
  // Show user-friendly error message
}

// Capture message
Sentry.captureMessage('Something went wrong', 'warning');

// Capture with context
Sentry.captureException(error, {
  tags: {
    section: 'checkout',
    payment_method: 'credit_card',
  },
  extra: {
    orderId: '12345',
    amount: 99.99,
  },
});
```

### Error Boundaries
```tsx
import * as Sentry from '@sentry/react';
import * as React from 'react';

// Sentry Error Boundary
function App() {
  return (
    <Sentry.ErrorBoundary
      fallback={({ error, resetError }) => (
        <div className="p-8 text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Something went wrong
          </h1>
          <p className="text-gray-600 mb-4">
            We've been notified and are working on a fix.
          </p>
          <button
            onClick={resetError}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Try again
          </button>
        </div>
      )}
      showDialog
    >
      <Routes>
        {/* Your routes */}
      </Routes>
    </Sentry.ErrorBoundary>
  );
}

// Custom Error Boundary with Sentry
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

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log to Sentry
    Sentry.captureException(error, {
      contexts: {
        react: {
          componentStack: errorInfo.componentStack,
        },
      },
    });
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}
```

### Context and Breadcrumbs
```tsx
import * as Sentry from '@sentry/react';

// Set user context
Sentry.setUser({
  id: user.id,
  email: user.email,
  username: user.username,
});

// Clear user context (on logout)
Sentry.setUser(null);

// Set tags
Sentry.setTag('page_locale', 'en-US');
Sentry.setTag('subscription_tier', 'premium');

// Set extra context
Sentry.setContext('character', {
  name: 'Mighty Fighter',
  age: 19,
  attack_type: 'melee',
});

// Add breadcrumb
Sentry.addBreadcrumb({
  category: 'auth',
  message: 'User logged in',
  level: 'info',
});

// Add breadcrumb with data
Sentry.addBreadcrumb({
  category: 'api',
  message: 'API request',
  level: 'info',
  data: {
    url: '/api/users',
    method: 'GET',
    status_code: 200,
  },
});
```

## Performance Monitoring

### Automatic Performance Tracking
```tsx
// Sentry automatically tracks:
// - Page load times
// - Navigation between routes
// - API requests (fetch, XHR)
// - Component render times

// Configured in Sentry.init() with BrowserTracing integration
```

### Custom Transactions
```tsx
import * as Sentry from '@sentry/react';

// Start transaction
const transaction = Sentry.startTransaction({
  name: 'Checkout Process',
  op: 'checkout',
});

// Set transaction on scope
Sentry.getCurrentHub().configureScope((scope) => {
  scope.setSpan(transaction);
});

// Create child span
const span = transaction.startChild({
  op: 'payment',
  description: 'Process payment',
});

try {
  await processPayment();
  span.setStatus('ok');
} catch (error) {
  span.setStatus('internal_error');
  throw error;
} finally {
  span.finish();
  transaction.finish();
}
```

### Measure Component Performance
```tsx
import * as Sentry from '@sentry/react';

// Wrap component with profiler
const MyComponent = Sentry.withProfiler(function MyComponent() {
  return <div>Content</div>;
});

// Or use HOC
export default Sentry.withProfiler(MyComponent);
```

### Custom Measurements
```tsx
import * as Sentry from '@sentry/react';

// Measure custom operation
const startTime = performance.now();

await fetchData();

const duration = performance.now() - startTime;

Sentry.getCurrentHub().configureScope((scope) => {
  const transaction = scope.getTransaction();
  if (transaction) {
    transaction.setMeasurement('data_fetch_time', duration, 'millisecond');
  }
});
```

## OpenTelemetry Setup

### Installation
**⚠️ Ask user before running:**
```bash
# Install OpenTelemetry packages
pnpm add @opentelemetry/api
pnpm add @opentelemetry/sdk-trace-web
pnpm add @opentelemetry/instrumentation
pnpm add @opentelemetry/instrumentation-fetch
pnpm add @opentelemetry/instrumentation-xml-http-request
pnpm add @opentelemetry/exporter-trace-otlp-http
```

### Basic Configuration
```tsx
// apps/shell/src/telemetry.ts
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch';
import { XMLHttpRequestInstrumentation } from '@opentelemetry/instrumentation-xml-http-request';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';

export function initTelemetry() {
  if (process.env.NODE_ENV !== 'production') {
    return; // Only in production
  }

  const provider = new WebTracerProvider({
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: 'ferris-intelligence-shell',
      [SemanticResourceAttributes.SERVICE_VERSION]: '1.0.0',
      environment: process.env.NX_ENVIRONMENT || 'production',
    }),
  });

  // Configure exporter
  const exporter = new OTLPTraceExporter({
    url: process.env.NX_OTEL_EXPORTER_OTLP_ENDPOINT || 'http://localhost:4318/v1/traces',
  });

  provider.addSpanProcessor(new BatchSpanProcessor(exporter));
  provider.register();

  // Register instrumentations
  registerInstrumentations({
    instrumentations: [
      new FetchInstrumentation({
        propagateTraceHeaderCorsUrls: [
          /^https:\/\/api\.ferris-intelligence\.com\/.*/,
        ],
        clearTimingResources: true,
      }),
      new XMLHttpRequestInstrumentation({
        propagateTraceHeaderCorsUrls: [
          /^https:\/\/api\.ferris-intelligence\.com\/.*/,
        ],
      }),
    ],
  });
}

// In main.ts
import { initTelemetry } from './telemetry';

initTelemetry();
```

### Custom Spans
```tsx
import { trace } from '@opentelemetry/api';

const tracer = trace.getTracer('ferris-intelligence-frontend');

async function fetchUserData(userId: string) {
  const span = tracer.startSpan('fetchUserData', {
    attributes: {
      'user.id': userId,
    },
  });

  try {
    const response = await fetch(`/api/users/${userId}`);
    const data = await response.json();
    
    span.setAttribute('http.status_code', response.status);
    span.setStatus({ code: 0 }); // OK
    
    return data;
  } catch (error) {
    span.recordException(error as Error);
    span.setStatus({ code: 2, message: String(error) }); // ERROR
    throw error;
  } finally {
    span.end();
  }
}
```

## Logging Best Practices

### Structured Logging
```tsx
// ✅ Good - Structured logs
console.log('User action', {
  action: 'button_click',
  buttonId: 'submit',
  userId: user.id,
  timestamp: new Date().toISOString(),
});

// ❌ Bad - Unstructured logs
console.log('User clicked submit button');
```

### Log Levels
```tsx
// Use appropriate log levels
console.debug('Detailed debugging information');
console.info('Informational messages');
console.warn('Warning messages');
console.error('Error messages');

// In production, filter out debug logs
if (process.env.NODE_ENV === 'production') {
  console.debug = () => {};
}
```

### Sensitive Data
```tsx
// ✅ Good - Redact sensitive information
console.log('Payment processed', {
  orderId: order.id,
  amount: order.amount,
  cardLast4: order.card.slice(-4), // Only last 4 digits
});

// ❌ Bad - Logging sensitive data
console.log('Payment processed', {
  cardNumber: order.cardNumber, // Never log full card numbers
  cvv: order.cvv, // Never log CVV
});
```

## Monitoring Dashboards

### Key Metrics to Track

#### Frontend Performance
- Page load time
- Time to First Byte (TTFB)
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)
- First Input Delay (FID)

#### Error Tracking
- Error rate
- Unique errors
- Affected users
- Error trends over time

#### User Experience
- Session duration
- Bounce rate
- User flows
- Feature adoption

### Alerts
**⚠️ Configure alerts for:**
- Error rate spikes
- Performance degradation
- High memory usage
- Failed deployments

## Integration with CI/CD

### Source Maps Upload
```typescript
// rspack.config.prod.ts
import { sentryRspackPlugin } from '@sentry/rspack-plugin';

export default {
  devtool: 'source-map',
  plugins: [
    sentryRspackPlugin({
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
      authToken: process.env.SENTRY_AUTH_TOKEN,
      release: process.env.VERCEL_GIT_COMMIT_SHA,
    }),
  ],
};
```

### Release Tracking
```bash
# In CI/CD pipeline
# Create Sentry release
sentry-cli releases new $RELEASE_VERSION

# Associate commits
sentry-cli releases set-commits $RELEASE_VERSION --auto

# Finalize release
sentry-cli releases finalize $RELEASE_VERSION

# Create deploy
sentry-cli releases deploys $RELEASE_VERSION new -e production
```

## Privacy Considerations

### GDPR Compliance
```tsx
// Configure Sentry to respect user privacy
Sentry.init({
  dsn: process.env.NX_SENTRY_DSN,
  
  // Scrub sensitive data
  beforeSend(event) {
    // Remove PII
    if (event.request) {
      delete event.request.cookies;
      delete event.request.headers;
    }
    
    // Scrub user data
    if (event.user) {
      delete event.user.email;
      delete event.user.ip_address;
    }
    
    return event;
  },
  
  // Mask replay data
  integrations: [
    new Sentry.Replay({
      maskAllText: true,
      maskAllInputs: true,
      blockAllMedia: true,
    }),
  ],
});
```

### User Consent
```tsx
// Only initialize monitoring after user consent
function App() {
  const [hasConsent, setHasConsent] = React.useState(false);
  
  React.useEffect(() => {
    const consent = localStorage.getItem('analytics-consent');
    if (consent === 'true') {
      setHasConsent(true);
      initSentry();
      initTelemetry();
    }
  }, []);
  
  return (
    <>
      {!hasConsent && <CookieConsent onAccept={() => setHasConsent(true)} />}
      {/* App content */}
    </>
  );
}
```

## Best Practices

### Do's
- ✅ Initialize monitoring early in app lifecycle
- ✅ Use environment variables for configuration
- ✅ Set appropriate sample rates
- ✅ Add context to errors
- ✅ Use error boundaries
- ✅ Track custom metrics
- ✅ Upload source maps for production
- ✅ Respect user privacy
- ✅ Monitor performance metrics
- ✅ Set up alerts for critical issues

### Don'ts
- ❌ Don't log sensitive data (passwords, tokens, PII)
- ❌ Don't commit API keys or DSNs
- ❌ Don't track 100% of transactions (use sampling)
- ❌ Don't ignore console warnings in development
- ❌ Don't track users without consent (GDPR)
- ❌ Don't send errors from development environment
- ❌ Don't forget to test error tracking
- ❌ Don't ignore performance budgets

## Testing Monitoring

### Test Error Tracking
```tsx
// Add a test button in development
{process.env.NODE_ENV === 'development' && (
  <button
    onClick={() => {
      throw new Error('Test Sentry Error');
    }}
  >
    Test Error Tracking
  </button>
)}
```

### Test Performance Tracking
```tsx
// Verify transactions are being sent
import * as Sentry from '@sentry/react';

if (process.env.NODE_ENV === 'development') {
  Sentry.init({
    dsn: process.env.NX_SENTRY_DSN,
    debug: true, // Enable debug mode
    tracesSampleRate: 1.0, // Track all transactions in dev
  });
}
```

## Troubleshooting

### Common Issues

**Errors not appearing in Sentry:**
- Check DSN is correct
- Verify environment is not filtered
- Check sample rate settings
- Ensure Sentry is initialized before errors occur

**Source maps not working:**
- Verify source maps are uploaded
- Check release version matches
- Ensure auth token has correct permissions

**High event volume:**
- Reduce sample rates
- Add filters in `beforeSend`
- Use rate limiting in Sentry dashboard

## Resources

- Sentry Documentation: https://docs.sentry.io/
- OpenTelemetry Docs: https://opentelemetry.io/docs/
- Web Vitals: https://web.dev/vitals/
- Performance API: https://developer.mozilla.org/en-US/docs/Web/API/Performance
