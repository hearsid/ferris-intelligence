import * as React from 'react';
import { Zap, ShieldCheck, Palette, ArrowRight, BookOpen, Rocket } from 'lucide-react';
import styles from './app.module.scss';

export function App() {
  return (
    <div className={styles.app}>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Welcome to Our Platform
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Discover amazing features and transform your workflow with our
            cutting-edge solutions
          </p>
          <div className="flex gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center gap-2">
              Get Started
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Key Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Lightning Fast
              </h3>
              <p className="text-gray-600">
                Experience blazing-fast performance with our optimized platform.
                Get things done in record time.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Secure & Reliable
              </h3>
              <p className="text-gray-600">
                Your data is protected with enterprise-grade security measures.
                Trust us with your most important information.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Palette className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Easy to Use
              </h3>
              <p className="text-gray-600">
                Intuitive interface designed for everyone. No technical expertise
                required to get started.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of satisfied users who have transformed their
            workflow with our platform.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center gap-2 mx-auto">
            <Rocket className="w-5 h-5" />
            Start Your Free Trial
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm">
            © 2024 Your Company Name. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
