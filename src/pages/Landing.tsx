import { LiquidGlassSurface } from "../components/LiquidGlassSurface";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

import { Button } from "@/components/ui/button";

import React from 'react';

export default function Landing() {



  // Generate random stars once on mount to avoid hydration mismatch and pure render issues
  const twinklingStars = React.useMemo(() => {
    return [...Array(40)].map((_, i) => ({
      id: i,

      top: `${Math.random() * 80}%`,

      left: `${Math.random() * 100}%`,

      width: `${Math.random() * 3 + 1}px`,

      height: `${Math.random() * 3 + 1}px`,

      duration: `${Math.random() * 4 + 2}s`,

      opacity: Math.random() * 0.5 + 0.1
    }));
  }, []);

  const shootingStars = React.useMemo(() => {
    return [...Array(6)].map((_, i) => ({
      id: i,

      top: `${Math.random() * 50 - 10}%`,

      left: `${Math.random() * 80 + 20}%`,

      duration: `${Math.random() * 6 + 4}s`,

      delay: `${Math.random() * 10}s`
    }));
  }, []);


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
            filter: 'brightness(1.1) contrast(1.05) saturate(1.2)',
          }}
        ></div>



        {/* Magical Stars Layer */}
        <div className="stars-container">
          {/* Twinkling stars */}
          {twinklingStars.map((star) => (
            <div
              key={`star-${star.id}`}
              className="star"
              style={{
                top: star.top,
                left: star.left,
                width: star.width,
                height: star.height,
                '--duration': star.duration,
                '--base-opacity': star.opacity
              } as React.CSSProperties}
            />
          ))}

          {/* Shooting stars */}
          {shootingStars.map((star) => (
            <div
              key={`shooting-${star.id}`}
              className="shooting-star"
              style={{
                top: star.top,
                left: star.left,
                '--duration': star.duration,
                animationDelay: star.delay
              } as React.CSSProperties}
            />
          ))}
        </div>

        {/* Soft magical glow behind hero text */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none z-0"></div>

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
            className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.05] drop-shadow-[0_4px_24px_rgba(255,255,255,0.4)] mb-6"
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


      {/* Intro Section */}
      <section className="py-24 px-6 sm:px-10 lg:px-16 bg-[#0b0c0f] relative z-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-xs uppercase tracking-widest text-zinc-400 font-semibold font-mono mb-4 block">Intro</motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white mb-6">
            The right formula at the right moment can change everything.
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="text-lg sm:text-xl text-zinc-400 leading-relaxed max-w-3xl mx-auto">
            Revision shouldn't feel like a scavenger hunt across five different notebooks, PDFs, and tabs. AskFormula gives your syllabus a home — organized, searchable, and built around how you actually learn.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="mt-10">
             <a href="#features" className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-zinc-300 transition-colors">
               See how it works <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
             </a>
          </motion.div>
        </div>
      </section>

      {/* Feature Narrative Section */}
      <section className="py-24 px-6 sm:px-10 lg:px-16 bg-[#0b0d11] border-t border-white/5 relative z-20 overflow-hidden" id="features">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none z-0"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none z-0"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-20">
            <span className="text-xs uppercase tracking-widest text-zinc-400 font-semibold font-mono block mb-2">A better way to revise</span>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">One calm place for<br/>everything that matters.</h2>
          </div>

          <div className="space-y-32">
            {/* Feature 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <span className="text-5xl font-mono font-bold text-white/40 block mb-6">01</span>
                <h3 className="text-3xl font-semibold text-white mb-4">Find the formula<br/>you're looking for.</h3>
                <p className="text-lg text-zinc-400 leading-relaxed mb-8">
                  Search across your entire syllabus in seconds. Filter by subject, class, chapter, or exam — and get straight to the useful part.
                </p>
                <a href="#" className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-zinc-300 transition-colors">
                  Explore the library &rarr;
                </a>
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="bg-[#14161a] border border-white/5 rounded-2xl p-8 relative overflow-hidden h-[400px] flex items-center justify-center">
                 <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5" />
                 {/* Search UI Mockup */}
                 <div className="w-full max-w-md bg-[#1a1d24] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-10">
                   <div className="p-4 border-b border-white/5 flex items-center gap-3">
                     <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                     <span className="text-sm text-zinc-300">Try &quot;kinematics&quot;</span>
                     <span className="ml-auto px-1.5 py-0.5 rounded text-[10px] font-mono bg-white/5 text-zinc-400 border border-white/10">⌘ K</span>
                   </div>
                   <div className="p-2 space-y-1">
                     <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                       <div className="text-sm text-white font-medium">Equations of motion</div>
                       <div className="text-xs text-zinc-400 mt-1">Physics · Kinematics</div>
                     </div>
                     <div className="p-3 hover:bg-white/[0.02] rounded-lg transition-colors">
                       <div className="text-sm text-zinc-400 font-medium">Motion in a straight line</div>
                       <div className="text-xs text-zinc-500 mt-1">Physics · Class 11</div>
                     </div>
                     <div className="p-3 hover:bg-white/[0.02] rounded-lg transition-colors">
                       <div className="text-sm text-zinc-400 font-medium">Projectile motion</div>
                       <div className="text-xs text-zinc-500 mt-1">Physics · JEE Main</div>
                     </div>
                   </div>
                 </div>
              </motion.div>
            </div>
            {/* Feature 4: Quizzes */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="bg-[#14161a] border border-white/5 rounded-2xl p-8 relative overflow-hidden h-[400px] flex items-center justify-center order-2 lg:order-1">
                 <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 to-blue-500/5" />
                 {/* Quiz UI Mockup */}
                 <div className="w-full max-w-sm bg-[#1a1d24] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-10 p-6">
                   <div className="flex justify-between items-center mb-6">
                     <span className="px-2 py-1 rounded bg-white/5 text-[10px] font-mono text-zinc-400 border border-white/10">Question 3 of 10</span>
                     <span className="text-[10px] font-medium text-emerald-400">Streak: 4 🔥</span>
                   </div>
                   <p className="text-sm text-white leading-relaxed mb-6 font-medium">Which principle explains why an airplane wing produces lift?</p>
                   <div className="space-y-2">
                     <div className="p-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg text-sm text-zinc-300 transition-colors cursor-pointer flex items-center gap-3">
                       <div className="w-4 h-4 rounded-full border border-white/20"></div> Archimedes' principle
                     </div>
                     <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-sm text-emerald-400 transition-colors flex items-center gap-3">
                       <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-[10px] text-white">✓</div> Bernoulli's principle
                     </div>
                     <div className="p-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg text-sm text-zinc-300 transition-colors cursor-pointer flex items-center gap-3">
                       <div className="w-4 h-4 rounded-full border border-white/20"></div> Pascal's law
                     </div>
                   </div>
                 </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="order-1 lg:order-2 lg:pl-12">
                <span className="text-5xl font-mono font-bold text-white/40 block mb-6">04</span>
                <h3 className="text-3xl font-semibold text-white mb-4">Test your memory<br/>instantly.</h3>
                <p className="text-lg text-zinc-400 leading-relaxed mb-8">
                  Convert your saved formula sheets into interactive quizzes. Reinforce your learning and track your mastery over time without leaving the platform.
                </p>
                <a href="#" className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-zinc-300 transition-colors">
                  Try a quick quiz &rarr;
                </a>
              </motion.div>
            </div>


            {/* Feature 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="bg-[#14161a] border border-white/5 rounded-2xl p-8 relative overflow-hidden h-[400px] flex items-center justify-center order-2 lg:order-1">
                 <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/5 to-orange-500/5" />
                 {/* Card UI Mockup */}
                 <div className="w-full max-w-sm bg-[#1a1d24] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-10 p-6">
                   <div className="text-[10px] font-mono text-zinc-400 mb-4 tracking-wider uppercase">Thermodynamics</div>
                   <div className="text-sm font-medium text-white mb-2">First law of thermodynamics</div>
                   <div className="text-2xl font-serif text-white mb-4 italic">ΔQ = ΔU + ΔW</div>
                   <p className="text-xs text-zinc-400 leading-relaxed mb-4 pb-4 border-b border-white/5">
                     Energy supplied to a system is used to increase its internal energy and do external work.
                   </p>
                   <div className="flex gap-2">
                     <span className="px-2 py-1 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-400">JEE · 11</span>
                     <span className="px-2 py-1 rounded text-[10px] font-medium bg-white/5 text-zinc-400">Definition</span>
                   </div>
                 </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="order-1 lg:order-2 lg:pl-12">
                <span className="text-5xl font-mono font-bold text-white/40 block mb-6">02</span>
                <h3 className="text-3xl font-semibold text-white mb-4">Understand it<br/>in context.</h3>
                <p className="text-lg text-zinc-400 leading-relaxed mb-8">
                  A formula is more than a line of symbols. Learn what each variable means, when to use it, and how it connects to the bigger idea.
                </p>
                <a href="#" className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-zinc-300 transition-colors">
                  See a formula up close &rarr;
                </a>
              </motion.div>
            </div>

            {/* Feature 3 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <span className="text-5xl font-mono font-bold text-white/40 block mb-6">03</span>
                <h3 className="text-3xl font-semibold text-white mb-4">Build a sheet<br/>that fits you.</h3>
                <p className="text-lg text-zinc-400 leading-relaxed mb-8">
                  Pick the chapters you need, remove the noise, and create a clean revision document ready for your next study session.
                </p>
                <a href="#" className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-zinc-300 transition-colors">
                  Open the builder &rarr;
                </a>
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="bg-[#14161a] border border-white/5 rounded-2xl p-8 relative overflow-hidden h-[400px] flex items-center justify-center">
                 <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5" />
                 {/* PDF Mockup */}
                 <div className="w-[280px] bg-white rounded shadow-2xl overflow-hidden z-10 flex flex-col p-6 rotate-2 transform-gpu">
                    <div className="border-b border-black/10 pb-4 mb-4 text-center">
                      <div className="text-[10px] font-bold tracking-widest text-black/40 mb-1">ASKFORMULA</div>
                      <div className="text-sm font-serif font-bold text-black/80">JEE Physics</div>
                      <div className="text-[8px] text-black/40 mt-1">MECHANICS · REVISION SHEET</div>
                    </div>
                    <div className="space-y-4 text-center font-serif text-black/80 text-sm italic">
                       <div>v = u + at</div>
                       <div>s = ut + ½at²</div>
                       <div>v² = u² + 2as</div>
                    </div>
                    <div className="mt-auto pt-6 flex justify-center">
                      <span className="px-2 py-1 rounded bg-black/5 text-[9px] font-medium text-black/40">Exported as PDF</span>
                    </div>
                 </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing/CTA Section */}
      <section className="py-24 px-6 sm:px-10 lg:px-16 bg-[#0b0c0f] border-t border-white/5 relative z-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-zinc-400 font-semibold font-mono block mb-2">Pricing</span>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">Start simple.<br/>Grow from there.</h2>
            <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl mx-auto">
              Everything you need to build a better revision habit, without adding another complicated tool to your life.
            </p>
          </div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-[#14161a] border border-white/10 rounded-3xl p-8 sm:p-12 max-w-2xl mx-auto relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
               <svg className="w-32 h-32 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13h-13L12 6.5z"/></svg>
            </div>

            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-2">Free to focus.</h3>
              <p className="text-zinc-400 mb-8 max-w-sm">Full access to the formula library and sheet builder for your core exam prep.</p>

              <ul className="space-y-4 mb-10">
                {['Full formula library', 'JEE, NEET & NCERT coverage', 'Custom revision sheets', 'Browser-based PDF export', 'Progress & quick quiz tools'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-zinc-300">
                    <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    {item}
                  </li>
                ))}
              </ul>

              <Button asChild className="w-full h-12 rounded-xl bg-white text-zinc-950 hover:bg-zinc-200 text-sm font-semibold transition-all">
                <Link to="/build">Get started free</Link>
              </Button>
              <p className="text-center text-xs text-zinc-400 mt-4">No credit card required.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 px-6 sm:px-10 lg:px-16 bg-[#0b0d11] border-t border-white/5 relative z-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none z-0"></div>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-16 relative z-10">
          <div className="md:w-1/3 shrink-0">
             <span className="text-xs uppercase tracking-widest text-zinc-400 font-semibold font-mono block mb-2">FAQ</span>
             <h2 className="text-3xl font-bold text-white mb-4">Questions,<br/>answered.</h2>
             <p className="text-sm text-zinc-400 mb-6">Can't find what you're looking for?</p>
             <a href="#" className="text-sm font-medium text-white hover:text-zinc-300 underline decoration-white/20 underline-offset-4">Reach out</a>
          </div>

          <div className="md:w-2/3 space-y-8">
             <div>
               <h4 className="text-lg font-medium text-white mb-2">What is AskFormula?</h4>
               <p className="text-sm text-zinc-400 leading-relaxed">AskFormula is a focused formula library and revision-sheet builder for students preparing for JEE, NEET, and NCERT exams.</p>
             </div>
             <div className="border-t border-white/5 pt-8">
               <h4 className="text-lg font-medium text-white mb-2">Which syllabuses are covered?</h4>
               <p className="text-sm text-zinc-400 leading-relaxed">Currently, we cover Physics, Chemistry, and Math for Class 11 and 12, perfectly aligned with NCERT and competitive exam requirements.</p>
             </div>
             <div className="border-t border-white/5 pt-8">
               <h4 className="text-lg font-medium text-white mb-2">Can I export my formula sheet?</h4>
               <p className="text-sm text-zinc-400 leading-relaxed">Yes. Our builder allows you to generate clean, vector-quality PDF exports directly from your browser, optimized for printing.</p>
             </div>
             <div className="border-t border-white/5 pt-8">
               <h4 className="text-lg font-medium text-white mb-2">Is AskFormula free to use?</h4>
               <p className="text-sm text-zinc-400 leading-relaxed">The core library and builder are completely free to use. Advanced quiz tracking and collaborative features are coming soon.</p>
             </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 sm:px-10 lg:px-16 bg-[#0b0c0f] border-t border-white/5 relative z-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <span className="text-xs uppercase tracking-widest text-zinc-400 font-semibold font-mono block mb-4">Your next session is one click away</span>
          <h2 className="text-5xl sm:text-7xl font-bold tracking-tight text-white mb-8">Make revision<br/>feel lighter.</h2>
          <Button asChild className="h-14 px-10 rounded-full bg-white text-zinc-950 hover:bg-zinc-200 text-base font-semibold transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.15)] border-0">
             <Link to="/build">Start for free</Link>
          </Button>
        </div>
      </section>

      {/* Global Footer */}
      <footer className="bg-[#0b0c0f] border-t border-white/5 py-12 px-6 sm:px-10 lg:px-16" data-purpose="main-footer">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <img src="/assets/logo-new.png" alt="AskFormula" className="h-5 object-contain opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all" />
            <span className="text-sm text-zinc-400 font-medium ml-2">AskFormula by AskAkshat. All formulas verified.</span>
          </div>
          <div className="flex items-center space-x-6 text-xs text-zinc-400">
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
