import * as React from 'react';
import NxWelcome from './nx-welcome';
import { Link, Route, Routes } from 'react-router-dom';

const ContactUs = React.lazy(() => import('contactUs/Module'));

const ComingSoon = React.lazy(() => import('comingSoon/Module'));

export function App() {
  return (
    <React.Suspense fallback={null}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/contact-us">ContactUs</Link>
        </li>
        <li>
          <Link to="/coming-soon">ComingSoon</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<NxWelcome title="shell" />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/coming-soon" element={<ComingSoon />} />
      </Routes>
    </React.Suspense>
  );
}

export default App;
