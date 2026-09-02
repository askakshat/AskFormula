import React from 'react';
import { useNavigate, Link } from 'react-router';

export default function QuizDashboard() {
  const navigate = useNavigate();

  // Actually we shouldn't fully scrap ChapterSelector, we should embed it within the "Start Practice" flow
  // as per the user's instructions: "Let user select chapter when clicked start practice. Use filters like JEE, CBSE, NEET or Class 11 / 12."

  // But wait, the stitch UI for QuizDashboard has "Available Subjects" as cards.
  // I will make the cards clickable. Clicking a card opens a modal/drawer to select chapters, then starts the quiz.

  return (
    <div className="bg-[#11131a] text-[#e3e2e6] font-sans min-h-screen flex flex-col md:flex-row antialiased selection:bg-[#324565] selection:text-[#d8e2ff] overflow-x-hidden">
      {/* Desktop Side Navigation */}
      <nav className="hidden md:flex flex-col gap-2 p-4 h-screen w-64 fixed left-0 top-0 border-r border-[#272a31] bg-[#15171e] z-40">
        <div className="mb-8 px-2 mt-4">
          <Link to="/">
              <h1 className="text-xl font-bold text-[#d8e2ff] tracking-tight">AskFormula</h1>
          </Link>
          <p className="text-xs text-slate-400 mt-1">Practice Environment</p>
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <Link className="flex items-center gap-3 px-4 py-2 text-slate-400 hover:bg-[#1c1e26] rounded-lg hover:bg-[#272a31] transition-all duration-150" to="/dashboard">
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>dashboard</span>
            <span>Dashboard</span>
          </Link>
          <Link className="flex items-center gap-3 px-4 py-2 bg-[#d8e2ff]/10 text-[#d8e2ff] font-bold rounded-lg transition-all scale-95 duration-150" to="/quiz">
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>quiz</span>
            <span>Practice</span>
          </Link>
          <Link className="flex items-center gap-3 px-4 py-2 text-slate-400 hover:bg-[#1c1e26] rounded-lg hover:bg-[#272a31] transition-all duration-150" to="/build">
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>menu_book</span>
            <span>Library</span>
          </Link>
        </div>
        <div className="mt-auto pt-4 border-t border-[#272a31]">
          <button
             onClick={() => navigate('/quiz/setup')}
             className="w-full flex justify-center items-center gap-2 bg-[#d8e2ff] text-[#003122] py-2 px-4 rounded-lg text-sm font-semibold hover:bg-white transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">play_arrow</span>
            Start Quiz
          </button>
        </div>
      </nav>

      {/* Mobile Top Navigation */}
      <header className="md:hidden w-full top-0 sticky flex justify-between items-center h-14 px-4 bg-[#11131a] z-40 border-b border-[#272a31]">
        <Link to="/">
            <h1 className="text-lg font-bold text-[#d8e2ff] tracking-tight">AskFormula</h1>
        </Link>
      </header>

      {/* Main Canvas */}
      <main className="flex-1 md:ml-64 w-full max-w-[1200px] mx-auto px-4 md:px-8 py-8 md:py-12 pb-24 md:pb-12 flex flex-col gap-8">

        {/* Header & Mode Selection */}
        <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h2 className="text-2xl md:text-[28px] font-semibold text-white mb-1 tracking-tight">Quiz Dashboard</h2>
            <p className="text-slate-400 text-sm">Select a subject to configure your session.</p>
          </div>
          <div className="flex gap-1 bg-[#15171e] p-1 rounded-lg border border-[#272a31]">
            <button className="flex items-center gap-1 px-4 py-2 text-slate-400 hover:bg-[#1c1e26] hover:text-white rounded text-sm transition-colors">
              <span className="material-symbols-outlined text-[16px]">psychology</span>
              Recall Mode
            </button>
            <button className="flex items-center gap-1 px-4 py-2 bg-[#324565]/30 text-[#d8e2ff] rounded text-sm border border-[#324565]/50 transition-colors">
              <span className="material-symbols-outlined text-[16px]">calculate</span>
              Practice Mode
            </button>
          </div>
        </section>

        {/* Progress Overview Bento Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#11131a] border border-[#272a31] rounded-xl p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3 text-slate-400">
                <span className="material-symbols-outlined text-[18px]">monitoring</span>
                <h3 className="text-xs uppercase tracking-wider font-medium">Overall Mastery</h3>
              </div>
              <div className="text-4xl font-semibold text-[#d8e2ff] tracking-tight">68%</div>
            </div>
            <div className="mt-8">
              <div className="flex justify-between text-xs text-slate-400 mb-2">
                <span>Syllabus Coverage</span>
                <span>42/120 Topics</span>
              </div>
              <div className="h-1 bg-[#1c1e26] rounded-full overflow-hidden flex">
                <div className="h-full bg-[#d8e2ff]" style={{ width: '35%' }}></div>
              </div>
            </div>
          </div>

          <div className="bg-[#11131a] border border-[#272a31] rounded-xl p-5 md:col-span-2 relative overflow-hidden flex flex-col md:flex-row items-center md:items-stretch gap-4">
            <div className="absolute inset-0 bg-gradient-to-r from-[#15171e] to-transparent opacity-50 z-0 pointer-events-none"></div>
            <div className="relative z-10 flex-1">
              <div className="flex items-center gap-2 mb-3 text-red-400">
                <span className="material-symbols-outlined text-[18px]">warning</span>
                <h3 className="text-xs uppercase tracking-wider font-medium">Critical Focus Required</h3>
              </div>
              <h4 className="text-xl font-semibold text-white mb-1">Thermodynamics</h4>
              <p className="text-slate-400 text-sm line-clamp-2">Consistent errors in identifying relationships in Isothermal vs Adiabatic processes. Recommend recall session focusing on First Law applications.</p>
              <button
                 onClick={() => navigate('/quiz/setup')}
                 className="mt-4 flex items-center gap-2 px-4 py-2 bg-[#1c1e26] hover:bg-[#272a31] text-white rounded border border-[#272a31] text-sm transition-colors"
              >
                Start Targeted Quiz
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
            <div className="relative z-10 w-full md:w-1/3 flex flex-col justify-center gap-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Recall Accuracy</span>
                <span className="text-red-400">32%</span>
              </div>
              <div className="h-1 bg-[#1c1e26] rounded-full overflow-hidden flex mb-3">
                <div className="h-full bg-red-400" style={{ width: '32%' }}></div>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Practice Success</span>
                <span className="text-[#61dcb0]">45%</span>
              </div>
              <div className="h-1 bg-[#1c1e26] rounded-full overflow-hidden flex">
                <div className="h-full bg-[#61dcb0]" style={{ width: '45%' }}></div>
              </div>
            </div>
          </div>
        </section>

        {/* Subject Selection */}
        <section className="mt-4">
          <div className="flex items-center justify-between mb-4 border-b border-[#272a31] pb-2">
            <h3 className="text-xs uppercase tracking-wider text-slate-400 font-medium">Available Subjects</h3>
            <span className="text-xs text-slate-400 flex items-center gap-1 cursor-pointer hover:text-white transition-colors">
              <span className="material-symbols-outlined text-[14px]">filter_list</span> Sort: Mastery (Low-High)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            {/* Physics Card */}
            <div
              onClick={() => navigate('/quiz/setup')}
              className="bg-[#11131a] border border-[#272a31] rounded-xl p-5 hover:border-[#324565] transition-colors cursor-pointer group flex flex-col"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="p-2 bg-[#324565]/30 text-[#d8e2ff] rounded border border-[#324565]/50">
                  <span className="material-symbols-outlined">rocket_launch</span>
                </div>
                <div className="text-right">
                  <div className="text-xl font-semibold text-[#d8e2ff] group-hover:text-white transition-colors">72%</div>
                  <div className="text-xs text-slate-400">Mastery</div>
                </div>
              </div>
              <h4 className="text-base text-white mb-1 font-semibold">Physics</h4>
              <p className="text-xs text-slate-400 mb-4 flex-1">Mechanics, Thermodynamics, Electromagnetism.</p>
              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>Progress</span>
                  <span>28/40 Chapters</span>
                </div>
                <div className="h-1 bg-[#1c1e26] rounded-full overflow-hidden flex">
                  <div className="h-full bg-[#d8e2ff]" style={{ width: '70%' }}></div>
                </div>
              </div>
            </div>

            {/* Chemistry Card */}
            <div
              onClick={() => navigate('/quiz/setup')}
              className="bg-[#11131a] border border-[#272a31] rounded-xl p-5 hover:border-[#61dcb0]/30 transition-colors cursor-pointer group flex flex-col"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="p-2 bg-[#61dcb0]/10 text-[#61dcb0] rounded border border-[#61dcb0]/30">
                  <span className="material-symbols-outlined">science</span>
                </div>
                <div className="text-right">
                  <div className="text-xl font-semibold text-[#61dcb0] group-hover:text-[#15a47c] transition-colors">54%</div>
                  <div className="text-xs text-slate-400">Mastery</div>
                </div>
              </div>
              <h4 className="text-base text-white mb-1 font-semibold">Chemistry</h4>
              <p className="text-xs text-slate-400 mb-4 flex-1">Physical, Organic, Inorganic properties.</p>
              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>Progress</span>
                  <span>14/30 Chapters</span>
                </div>
                <div className="h-1 bg-[#1c1e26] rounded-full overflow-hidden flex">
                  <div className="h-full bg-[#61dcb0]" style={{ width: '54%' }}></div>
                </div>
              </div>
            </div>

             {/* Math Card */}
             <div
              onClick={() => navigate('/quiz/setup')}
              className="bg-[#11131a] border border-[#272a31] rounded-xl p-5 hover:border-[#facc15]/30 transition-colors cursor-pointer group flex flex-col"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="p-2 bg-[#facc15]/10 text-[#facc15] rounded border border-[#facc15]/30">
                  <span className="material-symbols-outlined">calculate</span>
                </div>
                <div className="text-right">
                  <div className="text-xl font-semibold text-[#facc15] group-hover:text-[#ca8a04] transition-colors">81%</div>
                  <div className="text-xs text-slate-400">Mastery</div>
                </div>
              </div>
              <h4 className="text-base text-white mb-1 font-semibold">Mathematics</h4>
              <p className="text-xs text-slate-400 mb-4 flex-1">Calculus, Algebra, Coordinate Geometry.</p>
              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>Progress</span>
                  <span>32/38 Chapters</span>
                </div>
                <div className="h-1 bg-[#1c1e26] rounded-full overflow-hidden flex">
                  <div className="h-full bg-[#facc15]" style={{ width: '81%' }}></div>
                </div>
              </div>
            </div>

          </div>
        </section>

      </main>
    </div>
  );
}
