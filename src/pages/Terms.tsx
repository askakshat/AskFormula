import { Link } from "react-router";

export default function Terms() {
  return (
    <div className="min-h-screen bg-[#0b0c0f] text-zinc-300 font-sans p-6 md:p-12 lg:p-24 selection:bg-emerald-500/30">
      <div className="max-w-3xl mx-auto space-y-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors mb-8"
        >
          &larr; Back to home
        </Link>

        <h1 className="text-4xl font-bold text-white mb-6">Terms of Service</h1>
        <p>Effective Date: {new Date().toLocaleDateString()}</p>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">1. Acceptance of Terms</h2>
          <p>
            By accessing and using AskFormula, you accept and agree to be bound by the terms and
            provisions of this agreement.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">2. Educational Use</h2>
          <p>
            AskFormula is designed as a study aid. While we strive for accuracy in all provided
            formulas, users should verify critical information against their official textbooks
            (NCERT).
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">3. Modifications to Service</h2>
          <p>
            We reserve the right to modify or discontinue, temporarily or permanently, the service
            with or without notice.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">4. Disclaimer of Liability</h2>
          <p>
            AskFormula is provided “as is” without warranties of any kind. We are not liable for
            errors, omissions, or outcomes resulting from reliance on the content.
          </p>
        </section>
      </div>
    </div>
  );
}
