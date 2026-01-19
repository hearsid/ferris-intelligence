import { Shield, Zap, Eye } from 'lucide-react';

export function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950">
      {/* Hero Section */}
      <section className="px-4 py-32 md:py-40">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            Ferris Intelligence: Sovereign AI for Regulated Industries.
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
            Deploy RAG pipelines and Edge Agents without data leaving your
            infrastructure. Specialized for Maritime and Fintech.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Offline-First Inference */}
            <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-lg">
              <div className="w-12 h-12 bg-blue-950 border border-blue-800 rounded-lg flex items-center justify-center mb-5">
                <Shield className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Offline-First Inference
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Run AI models entirely on-premise or at the edge. No cloud
                dependency, no data exposure.
              </p>
            </div>

            {/* Latency-Optimized Quantization */}
            <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-lg">
              <div className="w-12 h-12 bg-blue-950 border border-blue-800 rounded-lg flex items-center justify-center mb-5">
                <Zap className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Latency-Optimized Quantization
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Purpose-built model compression for real-time inference on
                resource-constrained hardware.
              </p>
            </div>

            {/* Audit-Grade Observability */}
            <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-lg">
              <div className="w-12 h-12 bg-blue-950 border border-blue-800 rounded-lg flex items-center justify-center mb-5">
                <Eye className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Audit-Grade Observability
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Complete traceability of every inference. Built for compliance
                with maritime and financial regulations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-8 border-t border-slate-800">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-sm text-slate-500">
            © 2026 Ferris Intelligence. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
