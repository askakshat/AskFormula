import { Link } from "react-router";

export default function Status() {
  return (
    <div className="min-h-screen bg-[#0b0c0f] text-zinc-300 font-sans p-6 md:p-12 lg:p-24 selection:bg-emerald-500/30 flex items-center justify-center">
      <div className="max-w-xl mx-auto text-center space-y-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors mb-4">
          &larr; Back to home
        </Link>
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/10 mb-2">
          <span className="w-8 h-8 rounded-full bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]"></span>
        </div>
        <h1 className="text-4xl font-bold text-white mb-2">All Systems Operational</h1>
        <p className="text-zinc-400">AskFormula is functioning optimally. Frontend hosting, formula search indexing, and local data persistence are healthy.</p>

        <div className="mt-12 bg-white/5 border border-white/10 rounded-2xl p-6 text-left space-y-4">
          <div className="flex justify-between items-center border-b border-white/5 pb-4">
            <span>Web App Rendering</span>
            <span className="text-emerald-400 font-medium">Operational</span>
          </div>
          <div className="flex justify-between items-center border-b border-white/5 pb-4">
            <span>Formula Database (Static)</span>
            <span className="text-emerald-400 font-medium">Operational</span>
          </div>
          <div className="flex justify-between items-center">
            <span>PDF Export Engine</span>
            <span className="text-emerald-400 font-medium">Operational</span>
          </div>
        </div>
      </div>
    </div>
  );
}
