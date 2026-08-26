import {
  Copy,
  ArrowRight,
  PlayCircle,
  Sparkles,
  BookOpen,
  Layers,
  Atom,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <div className="flex-grow pt-12 flex flex-col items-center w-full">
      {/* Hero Section */}
      <section className="relative w-full max-w-[1200px] px-6 md:px-12 py-20 md:py-[120px] flex flex-col items-center text-center overflow-hidden">
        {/* Background Grid - mimicking the Stitch mask-fade-out with tailwind bg */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#32353c_1px,transparent_1px),linear-gradient(to_bottom,#32353c_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 [mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)] z-0 pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center gap-6 mt-16 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#272a31] border border-[#32353c] rounded text-[13px] font-mono text-[#e1e2ec] mb-4">
            <Sparkles className="w-4 h-4" />
            <span>v3.0 Academic Edition Released</span>
          </div>

          <h1 className="text-4xl md:text-[56px] md:leading-[64px] font-bold tracking-tight text-[#e1e2ec]">
            <span className="sr-only">AskFormula by AskAkshat - Free Formula Sheets for JEE, NEET & NCERT</span>
            Every formula.
            <br />
            <span className="text-[#aec6ff]">Exactly where you need it.</span>
          </h1>

          <p className="text-base text-[#e1e2ec] max-w-xl">
            A high-density, distraction-free environment for scientific study.
            Build custom PDF reference sheets tailored to your CBSE Class 11 and 12
            curriculum in seconds.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <Button
              onClick={() => {
                window.location.href = "/build";
              }}
              className="bg-[#00275d] text-[#aec6ff] h-10 px-6 rounded border border-[#32353c] hover:border-[#aec6ff] hover:bg-[#00275d] transition-all text-[12px] font-medium tracking-wide flex items-center justify-center gap-2"
            >
              Build Your Sheet
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                document
                  .getElementById("how-it-works")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-transparent text-[#e1e2ec] h-10 px-6 rounded border border-[#32353c] hover:border-[#aec6ff] hover:text-[#aec6ff] hover:bg-transparent transition-all text-[12px] font-medium tracking-wide flex items-center justify-center gap-2"
            >
              View Demo
              <PlayCircle className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Formula Preview Card (Decorative) */}
        <div className="relative z-10 w-full max-w-2xl mt-16 bg-[#0b0e15] border border-[#32353c] rounded-lg p-6 shadow-2xl overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#aec6ff]" />

          <div className="flex justify-between items-center mb-4 border-b border-[#32353c] pb-2">
            <span className="text-[13px] font-mono text-[#e1e2ec]">
              physics/kinematics.tex
            </span>
            <Copy className="w-4 h-4 text-[#aec6ff]" />
          </div>

          <div className="flex justify-center py-6 text-[22px] leading-8 font-serif text-[#aec6ff]">
            v² = u² + 2as
          </div>

          <div className="grid grid-cols-4 gap-2 border-t border-[#32353c] pt-2">
            <div className="flex flex-col">
              <span className="text-[12px] font-bold text-[#aec6ff]">v</span>
              <span className="text-[11px] font-mono text-[#e1e2ec]">
                Final Vel.
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[12px] font-bold text-[#aec6ff]">u</span>
              <span className="text-[11px] font-mono text-[#e1e2ec]">
                Init Vel.
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[12px] font-bold text-[#aec6ff]">a</span>
              <span className="text-[11px] font-mono text-[#e1e2ec]">
                Accel.
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[12px] font-bold text-[#aec6ff]">s</span>
              <span className="text-[11px] font-mono text-[#e1e2ec]">
                Displace.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="w-full max-w-[1200px] px-6 md:px-12 py-16 md:py-24 border-t border-[#32353c] bg-[#11131a]"
      >
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-xl font-semibold text-[#e1e2ec] mb-2">
            Technical Workflow
          </h2>
          <p className="text-center max-w-lg text-[#e1e2ec]">
            Generate precise academic reference materials in four deterministic
            steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-6 w-full">
          {/* Step 1 */}
          <div className="bg-[#11131a] border border-[#32353c] rounded p-4 hover:border-[#aec6ff] transition-colors flex flex-col group">
            <div className="flex justify-between items-start mb-4">
              <span className="font-mono text-[13px] text-[#aec6ff] bg-[#00275d]/20 px-2 py-0.5 rounded">
                01
              </span>
              <BookOpen className="w-5 h-5 text-slate-400 group-hover:text-[#aec6ff] transition-colors" />
            </div>
            <h3 className="text-[12px] font-medium text-[#e1e2ec] mb-2 uppercase tracking-wide">
              Select Board
            </h3>
            <p className="font-mono text-[13px] text-[#e1e2ec]">
              Initialize curriculum parameters (e.g., CBSE, ICSE, State).
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-[#11131a] border border-[#32353c] rounded p-4 hover:border-[#aec6ff] transition-colors flex flex-col group">
            <div className="flex justify-between items-start mb-4">
              <span className="font-mono text-[13px] text-[#aec6ff] bg-[#00275d]/20 px-2 py-0.5 rounded">
                02
              </span>
              <Layers className="w-5 h-5 text-slate-400 group-hover:text-[#aec6ff] transition-colors" />
            </div>
            <h3 className="text-[12px] font-medium text-[#e1e2ec] mb-2 uppercase tracking-wide">
              Choose Class
            </h3>
            <p className="font-mono text-[13px] text-[#e1e2ec]">
              Define academic level requirements (Class 11, Class 12).
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-[#11131a] border border-[#32353c] rounded p-4 hover:border-[#aec6ff] transition-colors flex flex-col group">
            <div className="flex justify-between items-start mb-4">
              <span className="font-mono text-[13px] text-[#aec6ff] bg-[#00275d]/20 px-2 py-0.5 rounded">
                03
              </span>
              <Atom className="w-5 h-5 text-slate-400 group-hover:text-[#aec6ff] transition-colors" />
            </div>
            <h3 className="text-[12px] font-medium text-[#e1e2ec] mb-2 uppercase tracking-wide">
              Pick Subject
            </h3>
            <p className="font-mono text-[13px] text-[#e1e2ec]">
              Filter knowledge base (Physics, Chemistry, Mathematics).
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-[#11131a] border border-[#32353c] rounded p-4 hover:border-[#aec6ff] transition-colors flex flex-col group">
            <div className="flex justify-between items-start mb-4">
              <span className="font-mono text-[13px] text-[#aec6ff] bg-[#00275d]/20 px-2 py-0.5 rounded">
                04
              </span>
              <FileText className="w-5 h-5 text-slate-400 group-hover:text-[#aec6ff] transition-colors" />
            </div>
            <h3 className="text-[12px] font-medium text-[#e1e2ec] mb-2 uppercase tracking-wide">
              Export PDF
            </h3>
            <p className="font-mono text-[13px] text-[#e1e2ec]">
              Compile and download formatted LaTeX-style document.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
