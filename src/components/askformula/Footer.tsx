import { Atom } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative py-16 px-6">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-white/[0.06]" />

      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 mb-5">
          <div className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
            <Atom className="w-3.5 h-3.5 text-blue-400/70" strokeWidth={1.5} />
          </div>
          <span className="text-base font-semibold tracking-[-0.02em] text-white">
            Ask<span className="text-blue-400/80">Formula</span>
          </span>
        </div>

        <p className="text-xs text-slate-600 mb-1">
          © {new Date().getFullYear()} AskFormula
        </p>
        <p className="text-[11px] text-slate-700">
          Made by Akshat Agarwal
        </p>
      </div>
    </footer>
  );
}
