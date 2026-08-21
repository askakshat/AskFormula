import { Atom, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative py-12 px-4">
      {/* Top border */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      <div className="max-w-4xl mx-auto text-center">
        {/* Logo */}
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-400/20 flex items-center justify-center">
            <Atom className="w-4 h-4 text-blue-400" />
          </div>
          <span className="text-lg font-semibold text-white">
            Ask<span className="text-blue-400">Formula</span>
          </span>
        </div>

        {/* Copyright */}
        <p className="text-sm text-slate-400 mb-2">
          © {new Date().getFullYear()} AskFormula. All rights reserved.
        </p>

        {/* Made by */}
        <p className="text-xs text-slate-500 flex items-center justify-center gap-1">
          Made with <Heart className="w-3 h-3 text-red-400 fill-red-400" /> by Akshat Agarwal
          (AskAkshat)
        </p>
      </div>
    </footer>
  );
}
