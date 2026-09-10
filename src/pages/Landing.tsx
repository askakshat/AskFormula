import { useState, useEffect } from "react";
import { Link } from "react-router";
import { ArrowRight, FileText, Search, MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Landing() {
  const [activeMockTab, setActiveMockTab] = useState('overview');
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyLatex = () => {
    navigator.clipboard.writeText("\\mathcal{L} = T - V").then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1800);
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const dashboard = document.getElementById('dashboard-container');
      const bgHero = document.getElementById('bg-hero-image');

      if (bgHero && scrollY < 1200) {
        bgHero.style.transform = `scale(1.05) translateY(${scrollY * 0.15}px)`;
      }

      if (dashboard) {
        if (scrollY > 120 && scrollY < 800) {
          dashboard.style.transform = `scale(1.01) translateY(-${Math.min(scrollY * 0.04, 16)}px)`;
        } else {
          dashboard.style.transform = `scale(1) translateY(0px)`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-[#0b0c0f] min-h-screen font-sans text-white overflow-x-hidden selection:bg-rose-500/30 selection:text-white">
      {/* Global Navigation - Minimal & Translucent */}
      <nav className="fixed top-0 inset-x-0 z-50 px-6 lg:px-12 py-4 flex items-center justify-between border-b border-white/5 bg-[#0b0c0f]/70 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
            <span className="text-zinc-950 font-bold text-lg leading-none mt-[-2px]">F</span>
          </div>
          <span className="text-lg font-semibold tracking-tight text-white">AskFormula.</span>
        </div>

        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-zinc-400">
          <a href="#" className="hover:text-white transition-colors">About</a>
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#" className="hover:text-white transition-colors">Curriculum</a>
          <a href="#" className="hover:text-white transition-colors">Sheets</a>
          <a href="#" className="hover:text-white transition-colors">Pricing</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/auth" className="text-sm font-medium text-zinc-300 hover:text-white hidden sm:block transition-colors">Login</Link>
          <Button asChild className="h-9 px-5 rounded-full bg-white text-zinc-950 hover:bg-zinc-200 text-sm font-semibold transition-transform active:scale-95 border-0">
            <Link to="/build">Get started</Link>
          </Button>
        </div>
      </nav>

      {/* Cinematic Hero Section */}
      <div className="relative w-full h-[120vh] min-h-[900px] flex flex-col items-center justify-start pt-32 sm:pt-40 lg:pt-48 overflow-hidden" data-purpose="cinematic-hero">

        {/* Background Layer: Mountain/Sunset Abstract (Darkened & Blurred) */}
        <div
          id="bg-hero-image"
          className="absolute inset-0 z-0 pointer-events-none transform-gpu transition-transform duration-700 ease-out"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=3506&ixlib=rb-4.0.3')",
            backgroundSize: 'cover',
            backgroundPosition: 'center 30%',
            filter: 'brightness(0.3) contrast(1.2) saturate(1.5) blur(4px)',
          }}
        ></div>

        {/* Ambient Top Gradient Overlay */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0b0c0f] via-[#0b0c0f]/60 to-transparent"></div>

        <div className="relative z-10 w-full max-w-4xl px-6 mx-auto text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
            <span className="text-[10px] uppercase tracking-widest text-zinc-300 font-medium">Community platform for scholars & creators</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.05] drop-shadow-2xl mb-6">
            Your formulas<br/>deserve their own<br/>home.
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 max-w-2xl font-normal leading-relaxed drop-shadow-md mb-10">
            AskFormula gives students, educators, and researchers a fully branded space with verified derivations, courses, discussions, and members.
          </p>

          <Button asChild className="h-12 px-8 rounded-full bg-white text-zinc-950 hover:bg-zinc-200 text-sm font-semibold transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.15)] border-0">
             <Link to="/build">Get started free</Link>
          </Button>
        </div>

        {/* Floating App Mockup (Fora Style) */}
        <div
          id="dashboard-container"
          className="relative z-20 w-[90%] max-w-[1000px] mt-20 sm:mt-24 rounded-2xl sm:rounded-[2rem] border border-white/10 shadow-2xl bg-[#1a1d24]/80 backdrop-blur-xl overflow-hidden flex flex-col sm:flex-row transform-gpu transition-transform duration-700 ease-out will-change-transform"
          style={{ height: '500px' }}
        >
          {/* Mock Sidebar */}
          <div className="w-full sm:w-64 bg-[#14161a] border-r border-white/5 p-4 flex flex-col gap-6 hidden sm:flex shrink-0">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                placeholder="Search formulas..."
                className="w-full h-9 bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 text-xs text-zinc-300 focus:outline-none focus:ring-1 focus:ring-white/20"
                readOnly
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <Search className="w-3 h-3 text-zinc-600 hidden" />
              </div>
            </div>

            <div id="mock-tabs" className="flex flex-col gap-1">
              <button
                onClick={() => setActiveMockTab('overview')}
                className={`tab-btn w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors text-left ${activeMockTab === 'overview' ? 'bg-white/10 text-white' : 'text-zinc-400 hover:bg-white/[0.05]'}`}
              >
                <div className="w-4 h-4 grid grid-cols-2 gap-[2px]">
                  <div className={`rounded-[2px] ${activeMockTab === 'overview' ? 'bg-zinc-100' : 'bg-zinc-400'}`}></div>
                  <div className={`rounded-[2px] ${activeMockTab === 'overview' ? 'bg-zinc-100' : 'bg-zinc-400'}`}></div>
                  <div className={`rounded-[2px] ${activeMockTab === 'overview' ? 'bg-zinc-100' : 'bg-zinc-400'}`}></div>
                  <div className={`rounded-[2px] ${activeMockTab === 'overview' ? 'bg-zinc-100' : 'bg-zinc-400'}`}></div>
                </div>
                <span className="font-medium">Overview</span>
              </button>

              <button
                onClick={() => setActiveMockTab('derivations')}
                className={`tab-btn w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors text-left ${activeMockTab === 'derivations' ? 'bg-white/10 text-white' : 'text-zinc-400 hover:bg-white/[0.05]'}`}
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4" />
                  <span className="font-medium">Derivations</span>
                </div>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-rose-500/20 text-rose-300 uppercase">New</span>
              </button>

              <button
                onClick={() => setActiveMockTab('discussions')}
                className={`tab-btn w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors text-left ${activeMockTab === 'discussions' ? 'bg-white/10 text-white' : 'text-zinc-400 hover:bg-white/[0.05]'}`}
              >
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-4 h-4" />
                  <span className="font-medium">Discussions</span>
                </div>
                <span className="text-[10px] text-zinc-500 font-mono">24</span>
              </button>

              <button
                className="tab-btn w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-zinc-400 hover:bg-white/[0.05] transition-colors text-left"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
                <span className="font-medium">Problem Sets</span>
              </button>
              <button
                className="tab-btn w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-zinc-400 hover:bg-white/[0.05] transition-colors text-left"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                <span className="font-medium">Courses</span>
              </button>
              <button
                className="tab-btn w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-zinc-400 hover:bg-white/[0.05] transition-colors text-left"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                <span className="font-medium">Members</span>
              </button>
              <button
                className="tab-btn w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-zinc-400 hover:bg-white/[0.05] transition-colors text-left"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
                <span className="font-medium">Leaderboard</span>
              </button>
            </div>

            <div className="mt-auto pt-4 flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
               <span className="text-[10px] text-zinc-500 font-medium">1,244 Syncing</span>
            </div>
          </div>

          {/* Mock Main Content Area */}
          <div className="flex-1 bg-gradient-to-br from-[#1c2130] to-[#12151e] relative p-8 flex items-center justify-center overflow-hidden">

             {/* Content 1: Overview (LaTeX Card) */}
             <div id="content-overview" className={`tab-content w-full max-w-lg transition-all duration-500 ease-out ${activeMockTab === 'overview' ? 'opacity-100 translate-y-0' : 'hidden opacity-0 translate-y-2'}`}>
                <div className="p-8 rounded-2xl bg-[#242936]/80 backdrop-blur-md border border-white/10 shadow-2xl flex flex-col items-center text-center group hover:bg-[#282d3b]/90 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 transition-transform">
                    <span className="font-serif italic text-xl text-zinc-300">f</span>
                  </div>

                  <div className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold mb-3">Lagrangian Mechanics • Classical Field Theory</div>

                  {/* Large Fake Math Display */}
                  <div className="font-mono text-3xl sm:text-4xl text-white font-bold tracking-tight mb-6">
                    \mathcal{"{L}"} = T - V
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed max-w-xs mx-auto mb-8">
                    Principle of stationary action yielding the Euler-Lagrange equations of motion for generalized coordinates.
                  </p>

                  <div className="flex items-center gap-3">
                     <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">Verified 100%</span>
                     <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-xs font-medium">3,402 solved today</span>

                     <button
                       onClick={handleCopyLatex}
                       className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white text-xs font-medium transition-colors flex items-center gap-1.5"
                     >
                       <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                       <span>{isCopied ? 'Copied!' : 'Copy LaTeX'}</span>
                     </button>
                  </div>
                </div>
             </div>

             {/* Content 2: Derivations */}
             <div id="content-derivations" className={`tab-content w-full transition-all duration-500 ease-out ${activeMockTab === 'derivations' ? 'opacity-100 translate-y-0' : 'hidden opacity-0 translate-y-2'}`}>
               <div className="space-y-4">
                 <h3 className="text-xl font-medium text-white mb-6">Recent Derivations</h3>

                 {[1,2,3].map(i => (
                   <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer flex items-center justify-between">
                     <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                         <span className="font-serif italic text-indigo-300 text-sm">dx</span>
                       </div>
                       <div>
                         <div className="text-sm font-medium text-white">Navier-Stokes Momentum Equation</div>
                         <div className="text-xs text-zinc-400 mt-1">Fluid Dynamics • 12 steps</div>
                       </div>
                     </div>
                     <ArrowRight className="w-4 h-4 text-zinc-500" />
                   </div>
                 ))}
               </div>
             </div>

             {/* Content 3: Discussions */}
             <div id="content-discussions" className={`tab-content w-full transition-all duration-500 ease-out ${activeMockTab === 'discussions' ? 'opacity-100 translate-y-0' : 'hidden opacity-0 translate-y-2'}`}>
                <div className="flex flex-col items-center justify-center text-center h-full text-zinc-400">
                  <MessageCircle className="w-12 h-12 text-zinc-600 mb-4 opacity-50" />
                  <p className="text-sm font-medium text-white mb-1">Community Discussions</p>
                  <p className="text-xs">Join the conversation on advanced topics.</p>
                </div>
             </div>

          </div>
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
          <div className="max-w-2xl mb-16">
            <span className="text-xs uppercase tracking-widest text-zinc-500 font-semibold font-mono">Everything in one space</span>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mt-2">
              One platform to master your entire mathematical universe.
            </h2>
            <p className="mt-4 text-base text-zinc-400 leading-relaxed">
              From competitive high school Olympiads to university-level tensor calculus, empower your academic journey with high precision.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="group cursor-pointer rounded-2xl p-7 bg-[#14161a] border border-white/5 hover:border-white/20 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1" onClick={() => setActiveMockTab('overview')}>
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
            </div>

            <div className="group cursor-pointer rounded-2xl p-7 bg-[#14161a] border border-white/5 hover:border-white/20 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1" onClick={() => setActiveMockTab('derivations')}>
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
            </div>

            <div className="group cursor-pointer rounded-2xl p-7 bg-[#14161a] border border-white/5 hover:border-white/20 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1" onClick={() => setActiveMockTab('discussions')}>
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
            </div>

          </div>
        </div>
      </section>

      {/* Floating Action Chat Bubble */}
      <div className="fixed bottom-6 right-6 z-50">
        <button aria-label="Support & Community Chat" className="w-12 h-12 rounded-full bg-[#20232a] hover:bg-[#2c303a] text-white shadow-2xl border border-white/15 transition-all duration-200 hover:scale-110 active:scale-95 flex items-center justify-center focus:outline-none">
          <MessageCircle className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Global Footer */}
      <footer className="bg-[#0b0c0f] border-t border-white/5 py-12 px-6 sm:px-10 lg:px-16" data-purpose="main-footer">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-white flex items-center justify-center text-zinc-950 font-bold text-xs">
              A
            </div>
            <span className="text-sm text-zinc-400 font-medium">AskFormula by AskAkshat. All formulas verified.</span>
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
