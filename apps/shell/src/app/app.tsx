import * as React from 'react';
import NxWelcome from './nx-welcome';
import { Link, Route, Routes } from 'react-router-dom';

const ContactUs = React.lazy(() => import('contactUs/Module'));

const ComingSoon = React.lazy(() => import('comingSoon/Module'));
const LandingPage = React.lazy(() => import('landingPage/Module'));

export function App() {
  return (
    <React.Suspense fallback={null}>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-sm border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6 h-16">
            <Link 
              to="/" 
              className="text-slate-300 hover:text-white transition-colors font-medium px-3 py-2 rounded-lg hover:bg-slate-800/50"
            >
              Home
            </Link>
            <Link 
              to="/contact-us" 
              className="text-slate-300 hover:text-white transition-colors font-medium px-3 py-2 rounded-lg hover:bg-slate-800/50"
            >
              Contact Us
            </Link>
            <Link 
              to="/coming-soon" 
              className="text-slate-300 hover:text-white transition-colors font-medium px-3 py-2 rounded-lg hover:bg-slate-800/50"
            >
              Coming Soon
            </Link>
            <Link 
              to="/landing" 
              className="text-slate-300 hover:text-white transition-colors font-medium px-3 py-2 rounded-lg hover:bg-slate-800/50"
            >
              Landing Page
            </Link>
          </div>
        </div>
      </nav>
      <div className="pt-16">
        <Routes>
          <Route path="/" element={<NxWelcome title="shell" />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/coming-soon" element={<ComingSoon />} />
          <Route path="/landing" element={<LandingPage />} />
        </Routes>
      </div>
    </React.Suspense>
  );
}

export default App;
