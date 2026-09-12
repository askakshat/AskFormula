import os

new_sections = """
      {/* Intro Section */}
      <section className="py-24 px-6 sm:px-10 lg:px-16 bg-[#0b0c0f] relative z-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-xs uppercase tracking-widest text-zinc-500 font-semibold font-mono mb-4 block">Intro</motion.span>
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
      <section className="py-24 px-6 sm:px-10 lg:px-16 bg-[#0e1014] border-t border-white/5 relative z-20" id="features">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <span className="text-xs uppercase tracking-widest text-zinc-500 font-semibold font-mono block mb-2">A better way to revise</span>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">One calm place for<br/>everything that matters.</h2>
          </div>

          <div className="space-y-32">
            {/* Feature 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <span className="text-5xl font-mono font-bold text-white/5 block mb-6">01</span>
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
                     <svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                     <span className="text-sm text-zinc-300">Try &quot;kinematics&quot;</span>
                     <span className="ml-auto px-1.5 py-0.5 rounded text-[10px] font-mono bg-white/5 text-zinc-500 border border-white/10">⌘ K</span>
                   </div>
                   <div className="p-2 space-y-1">
                     <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                       <div className="text-sm text-white font-medium">Equations of motion</div>
                       <div className="text-xs text-zinc-500 mt-1">Physics · Kinematics</div>
                     </div>
                     <div className="p-3 hover:bg-white/[0.02] rounded-lg transition-colors">
                       <div className="text-sm text-zinc-400 font-medium">Motion in a straight line</div>
                       <div className="text-xs text-zinc-600 mt-1">Physics · Class 11</div>
                     </div>
                     <div className="p-3 hover:bg-white/[0.02] rounded-lg transition-colors">
                       <div className="text-sm text-zinc-400 font-medium">Projectile motion</div>
                       <div className="text-xs text-zinc-600 mt-1">Physics · JEE Main</div>
                     </div>
                   </div>
                 </div>
              </motion.div>
            </div>

            {/* Feature 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="bg-[#14161a] border border-white/5 rounded-2xl p-8 relative overflow-hidden h-[400px] flex items-center justify-center order-2 lg:order-1">
                 <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/5 to-orange-500/5" />
                 {/* Card UI Mockup */}
                 <div className="w-full max-w-sm bg-[#1a1d24] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-10 p-6">
                   <div className="text-[10px] font-mono text-zinc-500 mb-4 tracking-wider uppercase">Thermodynamics</div>
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
                <span className="text-5xl font-mono font-bold text-white/5 block mb-6">02</span>
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
                <span className="text-5xl font-mono font-bold text-white/5 block mb-6">03</span>
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
            <span className="text-xs uppercase tracking-widest text-zinc-500 font-semibold font-mono block mb-2">Pricing</span>
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
              <p className="text-center text-xs text-zinc-500 mt-4">No credit card required.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 sm:px-10 lg:px-16 bg-[#0e1014] border-t border-white/5 relative z-20">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-16">
          <div className="md:w-1/3 shrink-0">
             <span className="text-xs uppercase tracking-widest text-zinc-500 font-semibold font-mono block mb-2">FAQ</span>
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
          <span className="text-xs uppercase tracking-widest text-zinc-500 font-semibold font-mono block mb-4">Your next session is one click away</span>
          <h2 className="text-5xl sm:text-7xl font-bold tracking-tight text-white mb-8">Make revision<br/>feel lighter.</h2>
          <Button asChild className="h-14 px-10 rounded-full bg-white text-zinc-950 hover:bg-zinc-200 text-base font-semibold transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.15)] border-0">
             <Link to="/build">Start for free</Link>
          </Button>
        </div>
      </section>
"""

with open('src/pages/Landing.tsx', 'r') as f:
    content = f.read()

# Instead of blindly searching and failing, we know we want to replace the
# Core Features Matrix section and the Global Footer. Let's just find the start of the
# features section and replace from there to the footer.

start_idx = content.find('{/* Core Features Matrix Section */}')
end_of_file = content.rfind('{/* Global Footer */}')

if start_idx != -1 and end_of_file != -1:
    content = content[:start_idx] + new_sections + '\n      ' + content[end_of_file:]

with open('src/pages/Landing.tsx', 'w') as f:
    f.write(content)
