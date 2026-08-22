import { motion } from "framer-motion";
import { Atom, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Deep, clean background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-[#0a0f1e] to-slate-950" />

      {/* Single large ambient glow — Apple-style depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/[0.07] rounded-full blur-[120px]" />
      <div className="absolute top-[20%] right-[15%] w-64 h-64 bg-indigo-400/[0.05] rounded-full blur-[100px]" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Icon mark */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="inline-flex items-center justify-center w-16 h-16 mb-8 rounded-2xl bg-white/[0.04] backdrop-blur-2xl border border-white/[0.06]"
          >
            <Atom className="w-8 h-8 text-blue-400/90" strokeWidth={1.5} />
          </motion.div>

          {/* Title */}
          <h1 className="text-5xl sm:text-6xl md:text-[4.5rem] font-bold tracking-[-0.03em] leading-[1.05] mb-5">
            <span className="text-white">Ask</span>
            <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-indigo-400 bg-clip-text text-transparent">
              Formula
            </span>
          </h1>

          {/* Subtitle — clean, confident */}
          <p className="text-lg sm:text-xl text-slate-400/90 mb-6 font-normal tracking-[-0.01em]">
            Every formula you need. One sheet. Zero hassle.
          </p>

          {/* Content Stats / Pill tags */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
            {["200+ Formulas", "NCERT Class 11–12", "Export to PDF"].map((tag) => (
              <span
                key={tag}
                className="px-4 py-1.5 text-[13px] font-medium tracking-wide rounded-full bg-white/[0.04] backdrop-blur-md border border-white/[0.06] text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button
              onClick={() => {
                document
                  .getElementById("app-section")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              size="lg"
              className="bg-white text-slate-950 hover:bg-slate-100 px-8 py-6 text-base font-semibold rounded-full shadow-[0_0_40px_-8px_rgba(255,255,255,0.15)] hover:shadow-[0_0_50px_-8px_rgba(255,255,255,0.2)] transition-all duration-300 cursor-pointer"
            >
              Build Your Sheet
              <ArrowDown className="w-4 h-4 ml-1 opacity-60" />
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-white/[0.12] flex items-start justify-center p-1.5"
        >
          <div className="w-1 h-1.5 bg-white/30 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
