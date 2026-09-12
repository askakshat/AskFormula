import re

with open('src/pages/Build.tsx', 'r') as f:
    content = f.read()

new_layout = """  return (
    <div className="bg-[#0b0e13] text-[#ded9d2] font-sans antialiased min-h-screen flex flex-col selection:bg-rose-500/30 selection:text-white relative overflow-x-hidden">
      {/* Photographic Dusk Landscape Atmosphere Background */}
      <div aria-hidden="true" className="fixed inset-0 pointer-events-none z-0">
        <img alt="Atmospheric dusk landscape" className="w-full h-full object-cover object-center opacity-70 scale-105 filter brightness-[0.85] contrast-[1.05]" src="/assets/hero-bg.png" />
        {/* Layered dusk color gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0e13]/70 via-[#101419]/50 to-[#0b0e13]/85"></div>
        <div className="absolute bottom-0 right-1/4 w-[1000px] h-[550px] bg-gradient-to-t from-[#2a1c22]/30 via-[#141a24]/40 to-transparent blur-[150px]"></div>
      </div>

      {/* Minimalist Editorial Header */}
      <header className="relative z-30 border-b border-white/[0.07] backdrop-blur-2xl bg-[#0e1217]/70 sticky top-0 transition-all">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => (window.location.href = "/")}>
            <div className="w-8 h-8 rounded-xl bg-white/10 text-white flex items-center justify-center font-serif font-semibold text-base tracking-tight shadow-md transition-transform group-hover:scale-105">
              F
            </div>
            <span className="font-medium text-[17px] tracking-tight text-white flex items-baseline">
              AskFormula<span className="text-[#e39f82] font-serif ml-0.5 font-normal text-lg">.</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-9 text-[14px] font-normal text-white/60">
            <a className="hover:text-white transition-colors duration-150" href="/">Home</a>
            <a className="text-white font-medium relative py-1.5" href="/build">
              Sheet Builder
              <span className="absolute bottom-0 inset-x-0 h-[2px] bg-[#e39f82] rounded-full"></span>
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content (Expansive & Airy Layout) */}
      <main className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-6 sm:px-10 lg:px-12 pt-16 sm:pt-24 pb-56">

        {/* Hero Header */}
        <section className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/[0.05] border border-white/[0.08] text-[12.5px] font-medium text-white/60 mb-7 backdrop-blur-md shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#e39f82] shadow-[0_0_8px_rgba(227,159,130,0.6)]"></span>
            Formula Sheet Builder
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-[52px] font-serif font-normal text-white tracking-tight leading-[1.18] mb-6">
            Build your personalized formula sheet.
          </h1>
          <p className="text-[16.5px] sm:text-[18px] text-white/60 font-normal leading-relaxed max-w-2xl mx-auto">
            Choose your curriculum, grade, and focus topics to compile a serene, verified revision companion ready for print.
          </p>
        </section>

        {/* Unified Bound-Notebook Frame */}
        <div className="bg-[#0f131a]/45 backdrop-blur-2xl rounded-3xl border border-white/[0.1] shadow-[0_24px_64px_rgba(0,0,0,0.45)] p-8 sm:p-12 lg:p-16 space-y-16 sm:space-y-20">

          {/* STEP 1: Target Track & Curriculum */}
          <section aria-labelledby="step-stream-title">
            <div className="flex items-baseline justify-between mb-9 pb-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-4">
                <span className="text-[12px] font-mono tracking-widest text-[#e39f82] uppercase font-semibold">01</span>
                <h2 className="text-lg sm:text-xl font-medium text-white tracking-tight" id="step-stream-title">Target Track & Curriculum</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { id: "school", label: "School & Boards", desc: "CBSE, ICSE & State Boards with core standard derivations and formulas" },
                { id: "jee", label: "JEE (Main & Adv.)", desc: "Calculus-based physics, multi-concept mechanics & advanced optics" },
                { id: "neet", label: "NEET UG", desc: "Medical entrance track with high-speed formula recall and core bio-physics" }
              ].map(track => (
                <div
                  key={track.id}
                  onClick={() => { setExam(track.id as any); setSelectedClass(null); setSubject(null); setSelectedChapters([]); }}
                  className={`relative p-7 rounded-2xl cursor-pointer transition-all duration-200 flex flex-col justify-between min-h-[170px] backdrop-blur-sm ${
                    exam === track.id
                    ? 'bg-[#1d232c]/90 border border-[#e39f82]/50 shadow-[0_0_32px_-4px_rgba(227,159,130,0.22)] ring-1 ring-[#e39f82]/35'
                    : 'bg-white/[0.03] border border-white/[0.07] hover:border-white/20 hover:bg-white/[0.06]'
                  }`}
                >
                  <div>
                    <div className={`flex items-center justify-between gap-3 mb-3 ${exam !== track.id && 'group-hover:text-white'}`}>
                      <div className={`text-[15px] ${exam === track.id ? 'font-semibold text-white' : 'font-medium text-white/95'}`}>{track.label}</div>
                      {exam === track.id && <span className="w-2.5 h-2.5 rounded-full bg-[#e39f82] shadow-[0_0_10px_rgba(227,159,130,0.7)]"></span>}
                    </div>
                    <p className={`text-[13px] leading-relaxed ${exam === track.id ? 'text-[#edd4c8]/90' : 'text-white/50'}`}>{track.desc}</p>
                  </div>
                  {exam === track.id && (
                    <div className="mt-5 text-[12px] text-[#e39f82] font-medium tracking-wide flex items-center gap-2">
                      <span>Active Selection</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* STEP 2: Academic Year & Subject */}
          <AnimatePresence>
            {exam && (
              <motion.section
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="flex items-baseline justify-between mb-9 pb-4 border-b border-white/[0.06]">
                  <div className="flex items-center gap-4">
                    <span className="text-[12px] font-mono tracking-widest text-[#e39f82] uppercase font-semibold">02</span>
                    <h2 className="text-lg sm:text-xl font-medium text-white tracking-tight">Academic Scope</h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <h3 className="text-sm font-medium text-white/70 uppercase tracking-widest">Select Class</h3>
                    <div className="flex gap-4">
                      {["11", "12"].map(cls => (
                        <button
                          key={cls}
                          onClick={() => { setSelectedClass(cls); setSelectedChapters([]); }}
                          className={`flex-1 py-4 rounded-xl text-sm font-medium transition-all ${
                            selectedClass === cls
                            ? 'bg-white/10 text-white border border-white/20'
                            : 'bg-white/[0.03] text-white/60 border border-white/[0.05] hover:bg-white/[0.06] hover:text-white'
                          }`}
                        >
                          Class {cls}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-sm font-medium text-white/70 uppercase tracking-widest">Select Subject</h3>
                    <div className="flex flex-wrap gap-4">
                      {["Physics", "Chemistry", "Mathematics", "Biology"].map(sub => (
                        <button
                          key={sub}
                          onClick={() => handleSubjectSelect(sub)}
                          className={`px-6 py-4 rounded-xl text-sm font-medium transition-all ${
                            subject === sub
                            ? 'bg-white/10 text-white border border-white/20'
                            : 'bg-white/[0.03] text-white/60 border border-white/[0.05] hover:bg-white/[0.06] hover:text-white'
                          }`}
                        >
                          {sub}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.section>
            )}
          </AnimatePresence>

          {/* STEP 3: Curate Chapters */}
          <AnimatePresence>
            {subject && selectedClass && (
              <motion.section
                ref={chapterRef}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="flex items-baseline justify-between mb-9 pb-4 border-b border-white/[0.06]">
                  <div className="flex items-center gap-4">
                    <span className="text-[12px] font-mono tracking-widest text-[#e39f82] uppercase font-semibold">03</span>
                    <h2 className="text-lg sm:text-xl font-medium text-white tracking-tight">Curate Chapters</h2>
                  </div>
                  <div className="flex gap-4">
                    <button onClick={selectAllChapters} className="text-sm text-white/60 hover:text-white transition-colors">Select All</button>
                    <button onClick={clearSelection} className="text-sm text-white/60 hover:text-white transition-colors">Clear</button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {chapters.length === 0 ? (
                    <div className="col-span-full py-12 text-center text-white/40">No chapters found for this selection.</div>
                  ) : (
                    chapters.map((chap) => {
                      const isSelected = selectedChapters.includes(chap.name);
                      return (
                        <div
                          key={chap.name}
                          onClick={() => toggleChapter(chap.name)}
                          className={`relative p-5 rounded-xl cursor-pointer transition-all duration-200 border ${
                            isSelected
                            ? 'bg-white/10 border-white/20 shadow-md'
                            : 'bg-white/[0.02] border-white/[0.05] hover:bg-white/[0.06] hover:border-white/10'
                          }`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h4 className={`text-sm font-medium pr-6 ${isSelected ? 'text-white' : 'text-white/80'}`}>{chap.name}</h4>
                            <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${isSelected ? 'bg-[#e39f82] border-[#e39f82] text-black' : 'border-white/20'}`}>
                              {isSelected && <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>}
                            </div>
                          </div>
                          <p className="text-xs text-white/40">{chap.formulas.length} formulas</p>
                        </div>
                      );
                    })
                  )}
                </div>
              </motion.section>
            )}
          </AnimatePresence>

        </div>

        {/* Floating Action Bar */}
        <AnimatePresence>
          {selectedChapters.length > 0 && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-2xl"
            >
              <div className="bg-[#101419]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white font-mono font-bold">
                    {selectedChapters.length}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">Chapters Selected</div>
                    <div className="text-xs text-white/50">{formulas.length} total formulas compiled</div>
                  </div>
                </div>

                <PDFButton
                  disabled={selectedChapters.length === 0}
                  formulas={formulas}
                  chapters={selectedChapters}
                  subject={subject || ""}
                  exam={exam || ""}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>
    </div>
  );
}
"""

content = content[:content.find('  return (')] + new_layout

with open('src/pages/Build.tsx', 'w') as f:
    f.write(content)
