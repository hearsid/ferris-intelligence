# Accessibility Rules (WCAG 2.1)

## Standards
- **WCAG 2.1** - Web Content Accessibility Guidelines
- **Target Level**: AA (minimum), AAA (where feasible)

## Documentation
- WCAG 2.1: https://www.w3.org/TR/WCAG21/
- WCAG Overview: https://www.w3.org/WAI/standards-guidelines/wcag/
- Understanding WCAG 2.1: https://www.w3.org/WAI/WCAG21/Understanding/
- How to Meet WCAG: https://www.w3.org/WAI/WCAG21/quickref/
- ARIA Practices: https://www.w3.org/WAI/ARIA/apg/

## Core Principles (POUR)

### 1. Perceivable
Information and UI components must be presentable to users in ways they can perceive.

### 2. Operable
UI components and navigation must be operable by all users.

### 3. Understandable
Information and UI operation must be understandable.

### 4. Robust
Content must be robust enough to be interpreted by a wide variety of user agents, including assistive technologies.

## Level A Requirements (Must Have)

### 1.1 Text Alternatives

#### 1.1.1 Non-text Content (A)
```tsx
// ✅ Good - Meaningful alt text
<img src="logo.png" alt="Ferris Intelligence Company Logo" />

// ✅ Good - Decorative images
<img src="decoration.png" alt="" role="presentation" />

// ✅ Good - Complex images with description
<img 
  src="chart.png" 
  alt="Sales growth chart showing 25% increase"
  aria-describedby="chart-description"
/>
<div id="chart-description">
  Detailed description: Sales increased from $100k to $125k...
</div>

// ❌ Bad - Missing alt text
<img src="logo.png" />

// ❌ Bad - Redundant alt text
<img src="logo.png" alt="image" />
```

### 1.2 Time-based Media

#### 1.2.1 Audio-only and Video-only (A)
```tsx
// ✅ Good - Provide transcript for audio
<audio src="podcast.mp3" controls />
<div>
  <a href="transcript.pdf">Download Transcript</a>
</div>

// ✅ Good - Provide audio description for video
<video src="demo.mp4" controls>
  <track kind="descriptions" src="descriptions.vtt" />
</video>
```

#### 1.2.2 Captions (Prerecorded) (A)
```tsx
// ✅ Good - Captions for video
<video src="presentation.mp4" controls>
  <track kind="captions" src="captions.vtt" srclang="en" label="English" />
</video>
```

### 1.3 Adaptable

#### 1.3.1 Info and Relationships (A)
```tsx
// ✅ Good - Semantic HTML
<form>
  <label htmlFor="email">Email Address</label>
  <input id="email" type="email" required />
  
  <fieldset>
    <legend>Subscription Type</legend>
    <label>
      <input type="radio" name="type" value="free" />
      Free
    </label>
    <label>
      <input type="radio" name="type" value="premium" />
      Premium
    </label>
  </fieldset>
</form>

// ✅ Good - Table structure
<table>
  <caption>Monthly Sales Report</caption>
  <thead>
    <tr>
      <th scope="col">Month</th>
      <th scope="col">Sales</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>January</td>
      <td>$10,000</td>
    </tr>
  </tbody>
</table>

// ❌ Bad - Div soup without semantics
<div onClick={handleSubmit}>
  <div>Email</div>
  <div><input /></div>
</div>
```

#### 1.3.2 Meaningful Sequence (A)
```tsx
// ✅ Good - Logical DOM order
<article>
  <h1>Article Title</h1>
  <p>Introduction paragraph...</p>
  <h2>Section 1</h2>
  <p>Section content...</p>
</article>

// ❌ Bad - Visual order doesn't match DOM order
<div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
  <div>This appears last visually but first in DOM</div>
  <div>This appears first visually but last in DOM</div>
</div>
```

### 1.4 Distinguishable

#### 1.4.1 Use of Color (A)
```tsx
// ✅ Good - Don't rely on color alone
<button className="bg-red-500 text-white">
  <XIcon aria-hidden="true" />
  <span>Delete</span>
</button>

// ✅ Good - Error with icon and text
<div className="text-red-600 flex items-center gap-2">
  <AlertIcon aria-hidden="true" />
  <span>Error: Email is required</span>
</div>

// ❌ Bad - Color only
<span className="text-red-600">*</span>
```

#### 1.4.2 Audio Control (A)
```tsx
// ✅ Good - Provide controls for auto-playing audio
<audio src="background.mp3" autoPlay controls />

// ❌ Bad - Auto-play without controls
<audio src="background.mp3" autoPlay />
```

### 2.1 Keyboard Accessible

#### 2.1.1 Keyboard (A)
```tsx
// ✅ Good - Keyboard accessible custom button
<button onClick={handleClick} className="custom-button">
  Click me
</button>

// ✅ Good - Keyboard accessible custom component
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }}
>
  Custom Button
</div>

// ❌ Bad - Not keyboard accessible
<div onClick={handleClick}>Click me</div>
```

#### 2.1.2 No Keyboard Trap (A)
```tsx
// ✅ Good - Modal with focus trap and escape
function Modal({ isOpen, onClose, children }: ModalProps) {
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  return isOpen ? (
    <div role="dialog" aria-modal="true">
      {children}
      <button onClick={onClose}>Close</button>
    </div>
  ) : null;
}
```

### 2.2 Enough Time

#### 2.2.1 Timing Adjustable (A)
```tsx
// ✅ Good - Allow users to extend time limits
function TimedSession() {
  const [timeLeft, setTimeLeft] = React.useState(300);
  
  return (
    <div>
      <p>Session expires in {timeLeft} seconds</p>
      <button onClick={() => setTimeLeft(timeLeft + 300)}>
        Extend Session
      </button>
    </div>
  );
}
```

#### 2.2.2 Pause, Stop, Hide (A)
```tsx
// ✅ Good - Provide controls for moving content
function Carousel({ items }: CarouselProps) {
  const [isPaused, setIsPaused] = React.useState(false);
  
  return (
    <div>
      <div className="carousel" aria-live="polite" aria-atomic="true">
        {/* Carousel content */}
      </div>
      <button onClick={() => setIsPaused(!isPaused)}>
        {isPaused ? 'Play' : 'Pause'}
      </button>
    </div>
  );
}
```

### 2.3 Seizures and Physical Reactions

#### 2.3.1 Three Flashes or Below Threshold (A)
```tsx
// ⚠️ Avoid flashing content
// If necessary, ensure flashes are below 3 per second

// ✅ Good - Provide warning
<div>
  <p className="text-yellow-600 font-bold">
    ⚠️ Warning: The following content contains flashing lights
  </p>
  <button onClick={showContent}>Continue</button>
</div>
```

### 2.4 Navigable

#### 2.4.1 Bypass Blocks (A)
```tsx
// ✅ Good - Skip to main content link
export function Layout({ children }: LayoutProps) {
  return (
    <>
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:p-4 focus:bg-white"
      >
        Skip to main content
      </a>
      <nav>{/* Navigation */}</nav>
      <main id="main-content">{children}</main>
    </>
  );
}
```

#### 2.4.2 Page Titled (A)
```tsx
// ✅ Good - Descriptive page titles
import { Helmet } from 'react-helmet';

function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Contact Us - Ferris Intelligence</title>
      </Helmet>
      {/* Page content */}
    </>
  );
}
```

#### 2.4.3 Focus Order (A)
```tsx
// ✅ Good - Logical tab order
<form>
  <input type="text" placeholder="First Name" />
  <input type="text" placeholder="Last Name" />
  <input type="email" placeholder="Email" />
  <button type="submit">Submit</button>
</form>

// ❌ Bad - Custom tabindex breaking natural order
<form>
  <input type="text" tabIndex={3} />
  <input type="text" tabIndex={1} />
  <input type="email" tabIndex={2} />
</form>
```

#### 2.4.4 Link Purpose (In Context) (A)
```tsx
// ✅ Good - Descriptive link text
<a href="/about">Learn more about our company</a>

// ✅ Good - Context provided
<article>
  <h2>New Product Launch</h2>
  <p>We're excited to announce...</p>
  <a href="/products/new">Read more about the new product</a>
</article>

// ❌ Bad - Generic link text
<a href="/about">Click here</a>
<a href="/more">Read more</a>
```

### 2.5 Input Modalities (WCAG 2.1)

#### 2.5.1 Pointer Gestures (A)
```tsx
// ✅ Good - Provide single-pointer alternative
function ImageViewer() {
  return (
    <div>
      {/* Pinch to zoom alternative */}
      <button onClick={zoomIn}>Zoom In</button>
      <button onClick={zoomOut}>Zoom Out</button>
      <img src="photo.jpg" alt="Product photo" />
    </div>
  );
}
```

#### 2.5.2 Pointer Cancellation (A)
```tsx
// ✅ Good - Action on mouseup/touchend
<button
  onMouseUp={handleClick}
  onTouchEnd={handleClick}
>
  Submit
</button>

// ❌ Bad - Action on mousedown (can't be cancelled)
<button onMouseDown={handleDelete}>Delete</button>
```

#### 2.5.3 Label in Name (A)
```tsx
// ✅ Good - Visible label matches accessible name
<button aria-label="Search products">
  <SearchIcon />
  Search
</button>

// ❌ Bad - Visible text doesn't match accessible name
<button aria-label="Find items">
  Search
</button>
```

#### 2.5.4 Motion Actuation (A)
```tsx
// ✅ Good - Provide alternative to motion-based input
function ShakeToUndo() {
  return (
    <div>
      <p>Shake device to undo</p>
      <button onClick={undo}>Or click here to undo</button>
    </div>
  );
}
```

### 3.1 Readable

#### 3.1.1 Language of Page (A)
```tsx
// ✅ Good - Set language in HTML
// In index.html
<html lang="en">
```

#### 3.1.2 Language of Parts (AA)
```tsx
// ✅ Good - Mark language changes
<p>
  The French phrase <span lang="fr">bonjour</span> means hello.
</p>
```

### 3.2 Predictable

#### 3.2.1 On Focus (A)
```tsx
// ✅ Good - No context change on focus
<input 
  type="text" 
  onFocus={() => console.log('Focused')}
/>

// ❌ Bad - Submitting form on focus
<input 
  type="text" 
  onFocus={submitForm}
/>
```

#### 3.2.2 On Input (A)
```tsx
// ✅ Good - Explicit submission
<form onSubmit={handleSubmit}>
  <input type="text" onChange={handleChange} />
  <button type="submit">Submit</button>
</form>

// ❌ Bad - Auto-submit on input
<input 
  type="text" 
  onChange={(e) => {
    if (e.target.value.length === 5) submitForm();
  }}
/>
```

### 3.3 Input Assistance

#### 3.3.1 Error Identification (A)
```tsx
// ✅ Good - Clear error messages
<div>
  <label htmlFor="email">Email</label>
  <input 
    id="email" 
    type="email" 
    aria-invalid={hasError}
    aria-describedby={hasError ? 'email-error' : undefined}
  />
  {hasError && (
    <p id="email-error" className="text-red-600" role="alert">
      Error: Please enter a valid email address
    </p>
  )}
</div>
```

#### 3.3.2 Labels or Instructions (A)
```tsx
// ✅ Good - Clear labels and instructions
<div>
  <label htmlFor="password">
    Password
    <span className="text-sm text-gray-600">
      (Must be at least 8 characters)
    </span>
  </label>
  <input id="password" type="password" minLength={8} />
</div>
```

### 4.1 Compatible

#### 4.1.1 Parsing (A)
```tsx
// ✅ Good - Valid HTML
<div id="unique-id">
  <button>Click me</button>
</div>

// ❌ Bad - Duplicate IDs
<div id="my-id">Content 1</div>
<div id="my-id">Content 2</div>
```

#### 4.1.2 Name, Role, Value (A)
```tsx
// ✅ Good - Proper ARIA attributes
<div
  role="button"
  aria-label="Close dialog"
  aria-pressed={isPressed}
  tabIndex={0}
  onClick={handleClick}
>
  <XIcon />
</div>

// ✅ Good - Custom checkbox
<div
  role="checkbox"
  aria-checked={isChecked}
  aria-labelledby="checkbox-label"
  tabIndex={0}
  onClick={toggleChecked}
>
  {isChecked && <CheckIcon />}
</div>
<span id="checkbox-label">Accept terms</span>
```

## Level AA Requirements (Should Have)

### 1.4.3 Contrast (Minimum) (AA)
```tsx
// ✅ Good - Sufficient contrast (4.5:1 for normal text)
<p className="text-gray-900 bg-white">
  High contrast text
</p>

// ✅ Good - Use Tailwind colors with good contrast
<button className="bg-blue-600 text-white hover:bg-blue-700">
  Submit
</button>

// ❌ Bad - Insufficient contrast
<p className="text-gray-400 bg-white">
  Low contrast text
</p>
```

**Contrast Ratios:**
- Normal text: 4.5:1 minimum
- Large text (18pt+ or 14pt+ bold): 3:1 minimum
- UI components and graphics: 3:1 minimum

### 1.4.4 Resize Text (AA)
```tsx
// ✅ Good - Use relative units
<p className="text-base">
  Text that scales with user preferences
</p>

// ✅ Good - Responsive text sizing
<h1 className="text-2xl md:text-4xl lg:text-5xl">
  Responsive heading
</h1>

// ❌ Bad - Fixed pixel sizes that don't scale
<p style={{ fontSize: '12px' }}>
  Fixed size text
</p>
```

### 1.4.5 Images of Text (AA)
```tsx
// ✅ Good - Use actual text with CSS styling
<h1 className="text-4xl font-bold text-blue-600">
  Styled Text Heading
</h1>

// ❌ Bad - Text as image (unless essential like logos)
<img src="heading-text.png" alt="Styled Text Heading" />
```

### 1.4.10 Reflow (AA) - WCAG 2.1
```tsx
// ✅ Good - Content reflows without horizontal scrolling
<div className="max-w-full overflow-x-hidden">
  <p className="break-words">
    Long content that wraps properly...
  </p>
</div>

// ✅ Good - Responsive design
<div className="container mx-auto px-4">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {/* Content */}
  </div>
</div>
```

### 1.4.11 Non-text Contrast (AA) - WCAG 2.1
```tsx
// ✅ Good - UI components with 3:1 contrast
<button className="border-2 border-gray-700 bg-white text-gray-900">
  High contrast button
</button>

// ✅ Good - Focus indicators with sufficient contrast
<input className="border-2 border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600" />
```

### 1.4.12 Text Spacing (AA) - WCAG 2.1
```tsx
// ✅ Good - Allow text spacing adjustments
// Ensure content doesn't break when users apply:
// - Line height: 1.5x font size
// - Paragraph spacing: 2x font size
// - Letter spacing: 0.12x font size
// - Word spacing: 0.16x font size

<p className="leading-relaxed">
  Text with adequate spacing
</p>
```

### 1.4.13 Content on Hover or Focus (AA) - WCAG 2.1
```tsx
// ✅ Good - Dismissible, hoverable, persistent tooltip
function Tooltip({ trigger, content }: TooltipProps) {
  const [isVisible, setIsVisible] = React.useState(false);
  
  return (
    <div className="relative">
      <button
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
        aria-describedby="tooltip"
      >
        {trigger}
      </button>
      {isVisible && (
        <div
          id="tooltip"
          role="tooltip"
          className="absolute z-10 p-2 bg-gray-900 text-white rounded"
          onMouseEnter={() => setIsVisible(true)}
          onMouseLeave={() => setIsVisible(false)}
        >
          {content}
        </div>
      )}
    </div>
  );
}
```

### 2.4.5 Multiple Ways (AA)
```tsx
// ✅ Good - Provide multiple navigation methods
// - Main navigation menu
// - Search functionality
// - Sitemap
// - Breadcrumbs

function Navigation() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
      <SearchBar />
    </nav>
  );
}
```

### 2.4.6 Headings and Labels (AA)
```tsx
// ✅ Good - Descriptive headings and labels
<article>
  <h1>Getting Started with React</h1>
  <h2>Installation</h2>
  <h2>Creating Your First Component</h2>
  <h2>Next Steps</h2>
</article>

<form>
  <label htmlFor="full-name">Full Name</label>
  <input id="full-name" type="text" />
</form>
```

### 2.4.7 Focus Visible (AA)
```tsx
// ✅ Good - Visible focus indicators
<button className="focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">
  Click me
</button>

<a 
  href="/about" 
  className="focus:outline-none focus:underline focus:text-blue-700"
>
  About Us
</a>

// ❌ Bad - Removing focus indicators
<button className="focus:outline-none">
  Click me
</button>
```

### 2.5.5 Target Size (AAA, but recommended) - WCAG 2.1
```tsx
// ✅ Good - Touch targets at least 44x44 pixels
<button className="min-w-[44px] min-h-[44px] p-3">
  <Icon />
</button>

// ✅ Good - Adequate spacing between targets
<div className="flex gap-4">
  <button className="p-3">Button 1</button>
  <button className="p-3">Button 2</button>
</div>
```

### 3.2.3 Consistent Navigation (AA)
```tsx
// ✅ Good - Same navigation on all pages
function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header /> {/* Same header on all pages */}
      <main>{children}</main>
      <Footer /> {/* Same footer on all pages */}
    </>
  );
}
```

### 3.2.4 Consistent Identification (AA)
```tsx
// ✅ Good - Same icons/labels for same functions
// Use consistent "Save" button across all forms
<button>
  <SaveIcon />
  Save
</button>

// Don't use "Submit" in one place and "Save" in another for the same action
```

### 3.3.3 Error Suggestion (AA)
```tsx
// ✅ Good - Provide correction suggestions
<div>
  <label htmlFor="email">Email</label>
  <input 
    id="email" 
    type="email" 
    value={email}
    aria-invalid={hasError}
    aria-describedby="email-error"
  />
  {hasError && (
    <p id="email-error" role="alert">
      Error: Email format is invalid. 
      Did you mean: {suggestedEmail}?
    </p>
  )}
</div>
```

### 3.3.4 Error Prevention (Legal, Financial, Data) (AA)
```tsx
// ✅ Good - Confirmation for important actions
function DeleteAccount() {
  const [confirmed, setConfirmed] = React.useState(false);
  
  return (
    <form onSubmit={handleDelete}>
      <p className="text-red-600 font-bold">
        Warning: This action cannot be undone
      </p>
      <label>
        <input 
          type="checkbox" 
          checked={confirmed}
          onChange={(e) => setConfirmed(e.target.checked)}
        />
        I understand this will permanently delete my account
      </label>
      <button type="submit" disabled={!confirmed}>
        Delete Account
      </button>
    </form>
  );
}
```

### 4.1.3 Status Messages (AA) - WCAG 2.1
```tsx
// ✅ Good - Announce status messages to screen readers
function Form() {
  const [status, setStatus] = React.useState('');
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Form fields */}
      </form>
      
      {/* Success message */}
      {status === 'success' && (
        <div role="status" aria-live="polite" className="text-green-600">
          Form submitted successfully!
        </div>
      )}
      
      {/* Error message */}
      {status === 'error' && (
        <div role="alert" aria-live="assertive" className="text-red-600">
          Error: Please fix the errors and try again.
        </div>
      )}
    </div>
  );
}
```

## ARIA Best Practices

### Use Semantic HTML First
```tsx
// ✅ Best - Use native elements
<button onClick={handleClick}>Click me</button>

// ⚠️ Acceptable - Custom element with ARIA
<div role="button" tabIndex={0} onClick={handleClick}>
  Click me
</div>

// ❌ Bad - Div without ARIA
<div onClick={handleClick}>Click me</div>
```

### Common ARIA Patterns

#### Live Regions
```tsx
// Polite announcements (non-urgent)
<div aria-live="polite" aria-atomic="true">
  {statusMessage}
</div>

// Assertive announcements (urgent)
<div aria-live="assertive" role="alert">
  {errorMessage}
</div>
```

#### Hidden Content
```tsx
// Visually hidden but available to screen readers
<span className="sr-only">
  Additional context for screen readers
</span>

// Hidden from everyone
<div aria-hidden="true">
  <DecorativeIcon />
</div>
```

#### Expanded/Collapsed
```tsx
function Accordion({ title, content }: AccordionProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  
  return (
    <div>
      <button
        aria-expanded={isExpanded}
        aria-controls="accordion-content"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {title}
      </button>
      <div id="accordion-content" hidden={!isExpanded}>
        {content}
      </div>
    </div>
  );
}
```

## Testing Accessibility

### ⚠️ ALWAYS Test Before Deploying

### Automated Testing
```bash
# Install axe-core for automated testing
pnpm add -D @axe-core/react

# Use in development
import React from 'react';
if (process.env.NODE_ENV !== 'production') {
  import('@axe-core/react').then((axe) => {
    axe.default(React, ReactDOM, 1000);
  });
}
```

### Manual Testing Checklist
- [ ] Keyboard navigation (Tab, Enter, Space, Arrows, Escape)
- [ ] Screen reader testing (NVDA, JAWS, VoiceOver)
- [ ] Color contrast (use browser DevTools or online tools)
- [ ] Zoom to 200% (text should remain readable)
- [ ] Test with browser extensions (axe DevTools, WAVE)
- [ ] Test on mobile devices
- [ ] Test with different input methods

### Tools
- **axe DevTools**: Browser extension for automated testing
- **WAVE**: Web accessibility evaluation tool
- **Lighthouse**: Built into Chrome DevTools
- **Screen Readers**: NVDA (Windows), JAWS (Windows), VoiceOver (Mac/iOS)
- **Contrast Checkers**: WebAIM, Coolors, Adobe Color

## Common Patterns

### Accessible Forms
```tsx
function AccessibleForm() {
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  
  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="name">
          Name <span aria-label="required">*</span>
        </label>
        <input
          id="name"
          type="text"
          required
          aria-required="true"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <p id="name-error" role="alert" className="text-red-600">
            {errors.name}
          </p>
        )}
      </div>
      
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Accessible Modal
```tsx
function AccessibleModal({ isOpen, onClose, title, children }: ModalProps) {
  const modalRef = React.useRef<HTMLDivElement>(null);
  
  React.useEffect(() => {
    if (isOpen) {
      // Focus trap
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements?.[0] as HTMLElement;
      firstElement?.focus();
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
      
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="bg-white p-6 rounded-lg max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="modal-title" className="text-2xl font-bold mb-4">
          {title}
        </h2>
        {children}
        <button onClick={onClose} className="mt-4">
          Close
        </button>
      </div>
    </div>
  );
}
```

## Best Practices

### Do's
- ✅ Use semantic HTML elements
- ✅ Provide text alternatives for non-text content
- ✅ Ensure keyboard accessibility
- ✅ Maintain sufficient color contrast
- ✅ Provide clear focus indicators
- ✅ Use ARIA when semantic HTML isn't enough
- ✅ Test with real assistive technologies
- ✅ Include accessibility in code reviews

### Don'ts
- ❌ Don't rely on color alone to convey information
- ❌ Don't remove focus indicators
- ❌ Don't use ARIA when semantic HTML is available
- ❌ Don't create keyboard traps
- ❌ Don't auto-play audio or video
- ❌ Don't use very small text or touch targets
- ❌ Don't assume automated testing is enough

## Resources

- WCAG 2.1: https://www.w3.org/TR/WCAG21/
- ARIA Authoring Practices: https://www.w3.org/WAI/ARIA/apg/
- WebAIM: https://webaim.org/
- A11y Project: https://www.a11yproject.com/
- Inclusive Components: https://inclusive-components.design/
