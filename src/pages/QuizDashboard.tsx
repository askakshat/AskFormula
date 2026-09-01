import React from "react";
import { useNavigate } from "react-router";
import { BrainCircuit, Activity, ChevronRight, Target } from "lucide-react";

export default function QuizDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-200 font-sans pb-24">
      {/* Navbar simulation if needed, assuming user accesses this via standard navigation */}
      <header className="w-full h-16 border-b border-white/5 flex items-center px-8 sticky top-0 bg-[#0a0a0a]/80 backdrop-blur-md z-40">
        <h1 className="text-xl font-bold text-[#d8e2ff] tracking-tight">
          AskFormula{" "}
          <span className="text-slate-500 font-normal text-sm ml-2">
            Practice
          </span>
        </h1>
      </header>

      <main className="w-full max-w-[1200px] mx-auto p-4 md:p-8 mt-4 flex flex-col gap-8">
        {/* Header */}
        <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Quiz Dashboard
            </h2>
            <p className="text-slate-400">
              Master your formulas through dynamic, algorithmically generated
              practice sessions.
            </p>
          </div>
          <button
            onClick={() => navigate("/quiz/active")}
            className="bg-[#d8e2ff] text-[#003122] font-semibold px-6 py-3 rounded-lg hover:bg-white transition-colors flex items-center gap-2 shadow-[0_0_20px_rgba(216,226,255,0.1)]"
          >
            Start Practice Session
            <ChevronRight className="w-5 h-5" />
          </button>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#11131a] border border-slate-800 rounded-xl p-6 flex flex-col justify-between">
            <div className="flex items-center gap-3 text-slate-400 mb-4">
              <Activity className="w-5 h-5" />
              <h3 className="text-sm font-semibold uppercase tracking-wider">
                Engine Status
              </h3>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#61dcb0]">Online</div>
              <p className="text-slate-500 text-sm mt-2">
                Zero-compute generation active.
              </p>
            </div>
          </div>

          <div className="bg-[#11131a] border border-slate-800 rounded-xl p-6 md:col-span-2 relative overflow-hidden flex flex-col justify-center">
            <div className="absolute inset-0 bg-gradient-to-r from-[#11131a] to-transparent opacity-80 z-0 pointer-events-none"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 text-[#d8e2ff] mb-4">
                <BrainCircuit className="w-5 h-5" />
                <h3 className="text-sm font-semibold uppercase tracking-wider">
                  Infinite Practice
                </h3>
              </div>
              <h4 className="text-2xl font-semibold text-white mb-2">
                Dynamic Question Generation
              </h4>
              <p className="text-slate-400 text-sm max-w-lg">
                Questions are generated algorithmically from the AskFormula
                static database. Test your knowledge on formula identification,
                proportional relationships, and basic numerical computation.
              </p>
            </div>
          </div>
        </section>

        {/* Categories / Modes preview */}
        <section className="mt-8">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <Target className="w-5 h-5 text-slate-400" />
            Question Types
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl border border-slate-800 bg-[#11131a]/50 hover:bg-[#11131a] transition-colors">
              <h4 className="font-semibold text-slate-200 mb-2">
                Formula Identification
              </h4>
              <p className="text-sm text-slate-400">
                Match the correct formula to a given scenario or set of
                variables.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-slate-800 bg-[#11131a]/50 hover:bg-[#11131a] transition-colors">
              <h4 className="font-semibold text-slate-200 mb-2">
                Proportionality
              </h4>
              <p className="text-sm text-slate-400">
                Understand how changing one variable affects the final outcome.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-slate-800 bg-[#11131a]/50 hover:bg-[#11131a] transition-colors">
              <h4 className="font-semibold text-slate-200 mb-2">
                Numerical Computation
              </h4>
              <p className="text-sm text-slate-400">
                Calculate the answer given randomly generated inputs for simpler
                formulas.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
