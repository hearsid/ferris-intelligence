import * as React from 'react';
import { Link, Route, Routes } from 'react-router-dom';

// FAIL: const ContactUs = React.lazy(() => import('contact-us/Module'));
// FIX:  Use camelCase 'contactUs'
const ContactUs = React.lazy(() => import('contactUs/Module'));

// FAIL: const ComingSoon = React.lazy(() => import('coming-soon/Module'));
// FIX:  Use camelCase 'comingSoon'
const ComingSoon = React.lazy(() => import('comingSoon/Module'));

export function App() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <nav>
        <Link to="/">Home</Link> | <Link to="/contact">Contact</Link>
      </nav>
      <Routes>
        <Route path="/" element={<ComingSoon />} />
        <Route path="/contact/*" element={<ContactUs />} />
      </Routes>
    </React.Suspense>
  );
}

export default App;