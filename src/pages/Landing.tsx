import GlobalSearch from "@/components/askformula/GlobalSearch";
import Hero from "@/components/askformula/Hero";
import Footer from "@/components/askformula/Footer";
import { Link } from "react-router";
import { LogoDropdown } from "@/components/LogoDropdown";

export default function Landing() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0b0e15] text-[#e1e2ec] font-sans flex flex-col">
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 md:px-12 h-16 bg-[#0b0e15]/80 backdrop-blur-md border-b border-[#32353c]">
        <div className="flex items-center gap-2">
          <LogoDropdown />
          <span className="font-headline-md text-xl font-bold text-[#aec6ff]">
            AskFormula
          </span>
        </div>
        <nav className="hidden md:flex gap-6">
          <Link
            to="/"
            className="text-[#e1e2ec]/70 hover:text-[#aec6ff] transition-colors text-sm font-medium"
          >
            Home
          </Link>
          <a
            href="#faq"
            className="text-[#e1e2ec]/70 hover:text-[#aec6ff] transition-colors text-sm font-medium"
          >
            FAQ
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-1 text-[13px] text-[#e1e2ec]/60 mr-4 font-mono">
            <span className="bg-[#272a31] border border-[#32353c] px-1.5 rounded text-[11px]">
              Cmd
            </span>
            <span>+</span>
            <span className="bg-[#272a31] border border-[#32353c] px-1.5 rounded text-[11px]">
              K
            </span>
            <span className="ml-1">to search</span>
          </div>
          <Link
            to="/build"
            className="text-[14px] font-medium text-[#e1e2ec] hover:text-[#aec6ff] transition-colors"
          >
            Builder
          </Link>
        </div>
      </header>

      <Hero />

      <section className="w-full max-w-[1000px] mx-auto px-6 md:px-12 py-12 mt-10">
        <h2 className="text-xl md:text-2xl font-bold text-[#e1e2ec] mb-6 flex items-center gap-2">
          <span className="text-[#aec6ff]">⚡</span> Quick Templates
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Link
            to="/build?template=jee-physics"
            className="bg-[#11131a] hover:bg-[#1a1d24] border border-[#32353c] hover:border-[#aec6ff]/50 rounded-lg p-5 transition-all group flex flex-col items-start text-left"
          >
            <div className="bg-blue-500/10 text-blue-400 p-2 rounded-md mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
                <path d="M12 18v-6" />
                <path d="m9 15 3-3 3 3" />
              </svg>
            </div>
            <h3 className="text-md font-semibold text-[#e1e2ec] mb-1 group-hover:text-[#aec6ff] transition-colors">
              JEE Physics Revise
            </h3>
            <p className="text-sm text-[#e1e2ec]/60">
              Mechanics & Electromagnetism
            </p>
          </Link>

          <Link
            to="/build?template=neet-bio"
            className="bg-[#11131a] hover:bg-[#1a1d24] border border-[#32353c] hover:border-[#aec6ff]/50 rounded-lg p-5 transition-all group flex flex-col items-start text-left"
          >
            <div className="bg-green-500/10 text-green-400 p-2 rounded-md mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22v-4" />
                <path d="M12 8V4" />
                <path d="M16 11.5 20 9" />
                <path d="m8 11.5-4-2.5" />
                <path d="M4.5 17 8 15" />
                <path d="m19.5 17-3.5-2" />
              </svg>
            </div>
            <h3 className="text-md font-semibold text-[#e1e2ec] mb-1 group-hover:text-[#aec6ff] transition-colors">
              NEET Biology Map
            </h3>
            <p className="text-sm text-[#e1e2ec]/60">
              Human Physiology & Genetics
            </p>
          </Link>

          <Link
            to="/build?template=cbse-math"
            className="bg-[#11131a] hover:bg-[#1a1d24] border border-[#32353c] hover:border-[#aec6ff]/50 rounded-lg p-5 transition-all group flex flex-col items-start text-left"
          >
            <div className="bg-purple-500/10 text-purple-400 p-2 rounded-md mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M7 7h.01" />
                <path d="M17 7h.01" />
                <path d="M7 17h.01" />
                <path d="M17 17h.01" />
                <path d="M12 12h.01" />
              </svg>
            </div>
            <h3 className="text-md font-semibold text-[#e1e2ec] mb-1 group-hover:text-[#aec6ff] transition-colors">
              Class 12 Math
            </h3>
            <p className="text-sm text-[#e1e2ec]/60">
              Calculus & Algebra Cheat Sheet
            </p>
          </Link>
        </div>
      </section>

      <section
        id="faq"
        className="w-full max-w-[800px] mx-auto px-6 md:px-12 py-20 mt-10"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-center text-[#e1e2ec] mb-12">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">
          <div className="bg-[#11131a] border border-[#32353c] rounded-lg p-6">
            <h3 className="text-lg font-semibold text-[#aec6ff] mb-2">
              What is AskFormula?
            </h3>
            <p className="text-[#e1e2ec]/80 text-sm leading-relaxed">
              AskFormula is an advanced technical reference generation tool
              designed to help students quickly build, customize, and export
              concise formula sheets for their curriculum.
            </p>
          </div>

          <div className="bg-[#11131a] border border-[#32353c] rounded-lg p-6">
            <h3 className="text-lg font-semibold text-[#aec6ff] mb-2">
              Are all chapters covered?
            </h3>
            <p className="text-[#e1e2ec]/80 text-sm leading-relaxed">
              Currently, we support comprehensive coverage for Class 11 and
              Class 12 Physics, Chemistry, Mathematics, and Biology
              (CBSE/NCERT).
            </p>
          </div>

          <div className="bg-[#11131a] border border-[#32353c] rounded-lg p-6">
            <h3 className="text-lg font-semibold text-[#aec6ff] mb-2">
              Can I export to PDF?
            </h3>
            <p className="text-[#e1e2ec]/80 text-sm leading-relaxed">
              Yes, our platform features a native, browser-based PDF export
              utility. After selecting your chapters, simply click "Export to
              PDF" to generate your high-density revision document.
            </p>
          </div>
        </div>
      </section>

      <GlobalSearch />
      <Footer />
    </div>
  );
}
