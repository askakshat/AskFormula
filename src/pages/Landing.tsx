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
          <span className="font-headline-md text-xl font-bold text-[#aec6ff]">AskFormula</span>
        </div>
        <nav className="hidden md:flex gap-6">
          <Link to="/" className="text-[#e1e2ec]/70 hover:text-[#aec6ff] transition-colors text-sm font-medium">Home</Link>
          <a href="#faq" className="text-[#e1e2ec]/70 hover:text-[#aec6ff] transition-colors text-sm font-medium">FAQ</a>
        </nav>
        <div className="flex items-center gap-4">
          <Link to="/build" className="bg-[#aec6ff] text-[#002e6a] px-4 py-2 rounded font-medium text-sm hover:opacity-90 transition-opacity">Build Sheet</Link>
        </div>
      </header>

      <Hero />

      <section id="faq" className="w-full max-w-[800px] mx-auto px-6 md:px-12 py-20 mt-10">
        <h2 className="text-3xl font-bold text-center text-[#e1e2ec] mb-12">Frequently Asked Questions</h2>

        <div className="space-y-6">
          <div className="bg-[#11131a] border border-[#32353c] rounded-lg p-6">
            <h3 className="text-lg font-semibold text-[#aec6ff] mb-2">What is AskFormula?</h3>
            <p className="text-[#e1e2ec]/80 text-sm leading-relaxed">
              AskFormula is an advanced technical reference generation tool designed to help students quickly build, customize, and export concise formula sheets for their curriculum.
            </p>
          </div>

          <div className="bg-[#11131a] border border-[#32353c] rounded-lg p-6">
            <h3 className="text-lg font-semibold text-[#aec6ff] mb-2">Are all chapters covered?</h3>
            <p className="text-[#e1e2ec]/80 text-sm leading-relaxed">
              Currently, we support comprehensive coverage for Class 11 and Class 12 Physics, Chemistry, Mathematics, and Biology (CBSE/NCERT).
            </p>
          </div>

          <div className="bg-[#11131a] border border-[#32353c] rounded-lg p-6">
            <h3 className="text-lg font-semibold text-[#aec6ff] mb-2">Can I export to PDF?</h3>
            <p className="text-[#e1e2ec]/80 text-sm leading-relaxed">
              Yes, our platform features a native, browser-based PDF export utility. After selecting your chapters, simply click "Export to PDF" to generate your high-density revision document.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
