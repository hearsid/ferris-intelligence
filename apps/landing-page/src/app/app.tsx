import { Shield, Zap, Eye, ArrowRight, CheckCircle2, Ship, TrendingUp, Menu, X, Sparkles } from 'lucide-react';

export function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800/50 backdrop-blur-xl bg-slate-950/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Ferris Intelligence
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-slate-300 hover:text-white transition-colors font-medium">Features</a>
              <a href="#use-cases" className="text-slate-300 hover:text-white transition-colors font-medium">Use Cases</a>
              <a href="#contact" className="text-slate-300 hover:text-white transition-colors font-medium">Contact</a>
              <button className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-blue-600/25">
                Get Started
              </button>
            </div>
            <button className="md:hidden text-slate-300 hover:text-white">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-32 pb-20 overflow-hidden">
        {/* Animated background effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-950/80 to-cyan-950/80 border border-blue-800/50 text-blue-300 text-sm mb-8 backdrop-blur-sm">
            <Sparkles className="w-4 h-4" />
            <span className="font-medium">Sovereign AI for Regulated Industries</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-8xl font-extrabold mb-8 tracking-tight leading-[1.1]">
            <span className="block text-white mb-2">Deploy AI Without</span>
            <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Compromising Security
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
            Deploy RAG pipelines and Edge Agents without data leaving your infrastructure. 
            <span className="text-blue-400 font-medium">Specialized for Maritime and Fintech industries.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-16">
            <button className="group px-10 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-xl transition-all duration-300 flex items-center gap-2 shadow-2xl shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-105 text-lg">
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-10 py-4 bg-transparent border-2 border-slate-700 hover:border-slate-500 text-white font-semibold rounded-xl transition-all duration-300 hover:bg-slate-800/50 text-lg">
              Learn More
            </button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-slate-400 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
              <span>Enterprise-Grade Security</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
              <span>100% On-Premise</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
              <span>Regulatory Compliant</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative px-4 py-32 md:py-40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6">
              Enterprise-Grade
              <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mt-2">
                AI Infrastructure
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Built for organizations that require complete control over their AI operations
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
            {/* Offline-First Inference */}
            <div className="group relative bg-gradient-to-br from-slate-900/90 to-slate-800/50 border border-slate-800/50 p-10 rounded-2xl hover:border-blue-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-900/30 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-cyan-600/0 group-hover:from-blue-600/10 group-hover:to-cyan-600/10 rounded-2xl transition-all duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-blue-600/25">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Offline-First Inference
                </h3>
                <p className="text-slate-300 leading-relaxed text-lg">
                  Run AI models entirely on-premise or at the edge. No cloud dependency, 
                  no data exposure. Complete sovereignty over your AI operations.
                </p>
              </div>
            </div>

            {/* Latency-Optimized Quantization */}
            <div className="group relative bg-gradient-to-br from-slate-900/90 to-slate-800/50 border border-slate-800/50 p-10 rounded-2xl hover:border-blue-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-900/30 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-cyan-600/0 group-hover:from-blue-600/10 group-hover:to-cyan-600/10 rounded-2xl transition-all duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-blue-600/25">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Latency-Optimized
                </h3>
                <p className="text-slate-300 leading-relaxed text-lg">
                  Purpose-built model compression for real-time inference on resource-constrained 
                  hardware. Achieve <span className="text-cyan-400 font-semibold">sub-100ms</span> response times.
                </p>
              </div>
            </div>

            {/* Audit-Grade Observability */}
            <div className="group relative bg-gradient-to-br from-slate-900/90 to-slate-800/50 border border-slate-800/50 p-10 rounded-2xl hover:border-blue-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-900/30 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-cyan-600/0 group-hover:from-blue-600/10 group-hover:to-cyan-600/10 rounded-2xl transition-all duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-blue-600/25">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Audit-Grade Observability
                </h3>
                <p className="text-slate-300 leading-relaxed text-lg">
                  Complete traceability of every inference. Built for compliance with maritime 
                  and financial regulations. Full audit trails included.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="use-cases" className="relative px-4 py-32 md:py-40 bg-gradient-to-b from-slate-900/50 to-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6">
              Built for Your
              <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mt-2">
                Industry
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Specialized solutions for regulated industries
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10 lg:gap-12">
            {/* Maritime */}
            <div className="group relative bg-gradient-to-br from-slate-900/90 via-slate-800/50 to-slate-900/90 border border-slate-800/50 p-12 rounded-3xl hover:border-blue-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-900/30 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-5 mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/25">
                    <Ship className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-white">Maritime</h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4 text-slate-300 text-lg">
                    <CheckCircle2 className="w-6 h-6 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span>Vessel route optimization with on-board AI</span>
                  </li>
                  <li className="flex items-start gap-4 text-slate-300 text-lg">
                    <CheckCircle2 className="w-6 h-6 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span>Predictive maintenance for critical systems</span>
                  </li>
                  <li className="flex items-start gap-4 text-slate-300 text-lg">
                    <CheckCircle2 className="w-6 h-6 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span>Compliance with SOLAS and IMO regulations</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Fintech */}
            <div className="group relative bg-gradient-to-br from-slate-900/90 via-slate-800/50 to-slate-900/90 border border-slate-800/50 p-12 rounded-3xl hover:border-blue-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-900/30 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-5 mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/25">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-white">Fintech</h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4 text-slate-300 text-lg">
                    <CheckCircle2 className="w-6 h-6 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span>Fraud detection with zero data exfiltration</span>
                  </li>
                  <li className="flex items-start gap-4 text-slate-300 text-lg">
                    <CheckCircle2 className="w-6 h-6 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span>Risk assessment models on-premise</span>
                  </li>
                  <li className="flex items-start gap-4 text-slate-300 text-lg">
                    <CheckCircle2 className="w-6 h-6 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span>GDPR and PCI-DSS compliant AI operations</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-4 py-32 md:py-40">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-cyan-600/10 to-blue-600/10"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="bg-gradient-to-br from-slate-900/90 via-slate-800/50 to-slate-900/90 border border-slate-800/50 rounded-3xl p-16 md:p-20 shadow-2xl shadow-blue-900/20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6">
              Ready to Deploy
              <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mt-2">
                Sovereign AI?
              </span>
            </h2>
            <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Join leading organizations that trust Ferris Intelligence for their 
              mission-critical AI infrastructure.
            </p>
            <button className="px-12 py-5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold rounded-xl transition-all duration-300 shadow-2xl shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-105 text-lg">
              Schedule a Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="relative px-4 py-20 border-t border-slate-800/50 bg-slate-950/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">Ferris Intelligence</span>
              </div>
              <p className="text-slate-400 text-lg max-w-md leading-relaxed">
                Sovereign AI infrastructure for regulated industries. Deploy AI without compromising security.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-6">Product</h3>
              <ul className="space-y-3 text-slate-400">
                <li><a href="#features" className="hover:text-cyan-400 transition-colors text-lg">Features</a></li>
                <li><a href="#use-cases" className="hover:text-cyan-400 transition-colors text-lg">Use Cases</a></li>
                <li><a href="#contact" className="hover:text-cyan-400 transition-colors text-lg">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-6">Company</h3>
              <ul className="space-y-3 text-slate-400">
                <li><a href="#contact" className="hover:text-cyan-400 transition-colors text-lg">Contact</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors text-lg">About</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors text-lg">Careers</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-lg">
              © 2026 Ferris Intelligence. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-slate-400">
              <a href="#" className="hover:text-cyan-400 transition-colors">Privacy</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
