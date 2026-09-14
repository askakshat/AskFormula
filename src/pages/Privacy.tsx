import { Link } from "react-router";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#0b0c0f] text-zinc-300 font-sans p-6 md:p-12 lg:p-24 selection:bg-emerald-500/30">
      <div className="max-w-3xl mx-auto space-y-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors mb-8">
          &larr; Back to home
        </Link>
        <h1 className="text-4xl font-bold text-white mb-6">Privacy Policy</h1>
        <p>Effective Date: {new Date().toLocaleDateString()}</p>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">1. Information We Collect</h2>
          <p>We do not collect any personal data. All formula generation, quiz data, and progress are stored locally on your device via browser local storage or session storage.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">2. How We Use Information</h2>
          <p>Your local data is used strictly to provide you with a personalized experience within AskFormula. We do not sell, share, or transmit this data to external servers.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">3. Third-Party Services</h2>
          <p>Our application may be hosted on Vercel and utilize standard web hosting analytics. We do not integrate any invasive tracking cookies or targeted advertising.</p>
        </section>
      </div>
    </div>
  );
}
