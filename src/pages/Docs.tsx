import { Link } from "react-router";

export default function Docs() {
  return (
    <div className="min-h-screen bg-[#0b0c0f] text-zinc-300 font-sans p-6 md:p-12 lg:p-24 selection:bg-emerald-500/30">
      <div className="max-w-3xl mx-auto space-y-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors mb-8">
          &larr; Back to home
        </Link>
        <h1 className="text-4xl font-bold text-white mb-6">Documentation</h1>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Getting Started</h2>
          <p>AskFormula provides a minimalist interface for generating and printing mathematical and scientific formulas. Navigate to the Builder to select your class, subject, and target chapters.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">PDF Export</h2>
          <p>We utilize native browser printing to generate PDFs. To ensure optimal results, verify that "Background graphics" is enabled in your print dialog, and margins are set appropriately.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Quiz Engine</h2>
          <p>The Quiz feature dynamically evaluates your retention based on the chapters you select. Results are stored locally to suggest which topics you should include in your next formula sheet.</p>
        </section>
      </div>
    </div>
  );
}
