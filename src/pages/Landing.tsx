import { LiquidGlassSurface } from "../components/LiquidGlassSurface";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

import { Button } from "@/components/ui/button";

export default function Landing() {

  useEffect(() => {
    const handleScroll = () => {

    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-[#0b0c0f] min-h-screen font-sans text-white overflow-x-hidden selection:bg-rose-500/30 selection:text-white">
      {/* Global Navigation - Minimal & Translucent */}
      <div className="fixed top-4 inset-x-0 z-50 flex justify-center pointer-events-none w-full max-w-4xl mx-auto">
        <LiquidGlassSurface className="pointer-events-auto rounded-[30px]">
          <nav className="px-6 lg:px-8 py-3 flex items-center justify-between gap-8 md:gap-16 bg-[#0b0c0f]/70 backdrop-blur-md rounded-[30px] border border-white/10 w-full max-w-4xl mx-auto">
            <div className="flex items-center gap-3">
              <img src="/assets/logo-new.png" alt="AskFormula" className="h-7 object-contain" />
              <span className="font-semibold text-lg tracking-tight text-white/90">AskFormula</span>
            </div>

            <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-zinc-300">
              <a href="#" className="hover:text-white transition-colors">About</a>
              <a href="#features" className="hover:text-white transition-colors">Features</a>
              <a href="#" className="hover:text-white transition-colors">Curriculum</a>
              <a href="#" className="hover:text-white transition-colors">Pricing</a>
            </div>

            <div className="flex items-center gap-4">
              <Link to="/auth" className="text-sm font-medium text-zinc-300 hover:text-white hidden sm:block transition-colors">Login</Link>
              <Button asChild className="h-8 px-4 rounded-full bg-white/10 text-white hover:bg-white/20 border border-white/10 text-sm font-medium transition-colors active:scale-95 shadow-none">
                <Link to="/build">Get started</Link>
              </Button>
            </div>
          </nav>
        </LiquidGlassSurface>
      </div>

      {/* Cinematic Hero Section */}
      <div className="relative w-full h-[120vh] min-h-[900px] flex flex-col items-center justify-start pt-32 sm:pt-40 lg:pt-48 overflow-hidden" data-purpose="cinematic-hero">

        {/* Background Layer: Mountain/Sunset Abstract (Darkened & Blurred) */}
        <div
          id="bg-hero-image"
          className="absolute inset-0 z-0 pointer-events-none transform-gpu transition-transform duration-700 ease-out"
          style={{
            backgroundImage: "url('/assets/hero-bg.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center 30%',
            filter: 'brightness(0.8) contrast(1.1)',
          }}
        ></div>

        {/* Ambient Top Gradient Overlay */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0b0c0f] via-[#0b0c0f]/60 to-transparent"></div>

        <div className="relative z-10 w-full max-w-4xl px-6 mx-auto text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8"
          >
            <span className="text-[10px] uppercase tracking-widest text-zinc-300 font-medium">Community platform for scholars & creators</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.05] drop-shadow-2xl mb-6"
          >
            Your formulas<br/>deserve their own<br/>home.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg sm:text-xl text-zinc-300 max-w-2xl font-normal leading-relaxed drop-shadow-md mb-10"
          >
            AskFormula gives students, educators, and researchers a fully branded space with verified derivations, courses, discussions, and members.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button asChild className="h-12 px-8 rounded-full bg-white text-zinc-950 hover:bg-zinc-200 text-sm font-semibold transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.15)] border-0">
               <Link to="/build">Get started free</Link>
            </Button>
          </motion.div>
        </div>

        {/* Misty Copper Autumn Treeline (SVG overlapping bottom) */}
        <div className="absolute bottom-0 left-0 right-0 w-full h-[200px] z-30 pointer-events-none transform translate-y-2">
          <svg viewBox="0 0 1440 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full preserve-3d" preserveAspectRatio="none">
            <path d="M0 220V120C45 125 90 140 135 138C185 135 228 115 278 117C328 119 368 139 418 137C468 135 508 115 558 118C608 121 650 141 700 138C750 135 790 115 840 117C890 119 932 139 982 136C1032 133 1072 113 1122 116C1172 119 1215 139 1265 136C1315 133 1358 113 1408 116C1419 117 1430 118 1440 120V220H0Z" fill="#2d1316" />
            <path d="M0 220V140C45 138 90 126 135 129C185 133 228 147 278 144C328 141 368 127 418 130C468 133 508 147 558 145C608 143 650 129 700 132C750 135 790 149 840 147C890 145 932 131 982 134C1032 137 1072 151 1122 149C1172 147 1215 133 1265 136C1315 139 1358 153 1408 150C1419 149 1430 148 1440 145V220H0Z" fill="#1e0e12" />
            <path d="M0 220V165C45 160 90 152 135 156C185 160 228 174 278 169C328 164 368 150 418 152C468 154 508 166 558 164C608 162 650 150 700 153C750 156 790 168 840 165C890 162 932 150 982 154C1032 158 1072 170 1122 166C1172 162 1215 150 1265 153C1315 156 1358 168 1408 164C1419 163 1430 162 1440 160V220H0Z" fill="#0e1014" />
          </svg>
        </div>
      </div>

      {/* Core Features Matrix Section */}
      <section className="py-24 px-6 sm:px-10 lg:px-16 bg-[#0e1014] border-t border-white/5 relative z-20" id="features">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7 }} className="max-w-2xl mb-16">
            <span className="text-xs uppercase tracking-widest text-zinc-500 font-semibold font-mono">Everything in one space</span>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mt-2">
              One platform to master your entire mathematical universe.
            </h2>
            <p className="mt-4 text-base text-zinc-400 leading-relaxed">
              From competitive high school Olympiads to university-level tensor calculus, empower your academic journey with high precision.
            </p>
          </motion.div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: 0.1 }} className="group cursor-pointer rounded-2xl p-7 bg-[#14161a] border border-white/5 hover:border-white/20 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
              <div>
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-zinc-300 mb-5 border border-white/5 group-hover:bg-white/10 group-hover:text-white transition-colors">
                  <span className="font-mono text-sm font-bold">\sqrt{"{x}"}</span>
                </div>
                <h3 className="text-lg font-medium text-white mb-2 group-hover:text-primary transition-colors">Pristine LaTeX Typography</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Every formula is rendered with micro-typographical precision, instantaneous copy-to-clipboard LaTeX, and vector PDF exports.
                </p>
              </div>
              <div className="mt-6 pt-5 border-t border-white/5 flex items-center justify-between text-xs text-zinc-400">
                <span>Over 12,000 equations</span>
                <span className="text-white group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">Preview LaTeX &rarr;</span>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: 0.2 }} className="group cursor-pointer rounded-2xl p-7 bg-[#14161a] border border-white/5 hover:border-white/20 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
              <div>
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-zinc-300 mb-5 border border-white/5 group-hover:bg-white/10 group-hover:text-white transition-colors">
                  <svg className="w-5 h-5 text-zinc-300 group-hover:text-white transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-white mb-2 group-hover:text-primary transition-colors">Step-by-Step Derivations</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Never memorize blindly again. Unfold every intermediate step with geometric visualizations and physical intuition guides.
                </p>
              </div>
              <div className="mt-6 pt-5 border-t border-white/5 flex items-center justify-between text-xs text-zinc-400">
                <span>Physics & Calculus</span>
                <span className="text-white group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">View proof sheet &rarr;</span>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: 0.3 }} className="group cursor-pointer rounded-2xl p-7 bg-[#14161a] border border-white/5 hover:border-white/20 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
              <div>
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-zinc-300 mb-5 border border-white/5 group-hover:bg-white/10 group-hover:text-white transition-colors">
                  <svg className="w-5 h-5 text-zinc-300 group-hover:text-white transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-white mb-2 group-hover:text-primary transition-colors">Scholarly Circles</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Join tight-knit cohorts moderated by university professors and Olympiad medalists. Share custom formula sets with your classmates.
                </p>
              </div>
              <div className="mt-6 pt-5 border-t border-white/5 flex items-center justify-between text-xs text-zinc-400">
                <span>Top 1% Rankers</span>
                <span className="text-white group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">Explore circles &rarr;</span>
              </div>
            </motion.div>

          </div>
        </div>
      </section>


      {/* Global Footer */}
      <footer className="bg-[#0b0c0f] border-t border-white/5 py-12 px-6 sm:px-10 lg:px-16" data-purpose="main-footer">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <img src="/assets/logo-new.png" alt="AskFormula" className="h-5 object-contain opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all" />
            <span className="text-sm text-zinc-400 font-medium ml-2">AskFormula by AskAkshat. All formulas verified.</span>
          </div>
          <div className="flex items-center space-x-6 text-xs text-zinc-500">
            <a href="#" className="hover:text-zinc-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">Documentation</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">Status</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
