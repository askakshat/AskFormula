import re

with open('src/pages/Landing.tsx', 'r') as f:
    content = f.read()

# Fix text color for numbers
content = content.replace('<span className="text-5xl font-mono font-bold text-white/5 block mb-6">', '<span className="text-5xl font-mono font-bold text-white/40 block mb-6">')

# Add 04 section for quizzes
quiz_section = """
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
"""

feature3_end = '              </motion.div>\n            </div>'
insert_idx = content.find(feature3_end) + len(feature3_end)

if insert_idx != -1:
    content = content[:insert_idx] + quiz_section + content[insert_idx:]

with open('src/pages/Landing.tsx', 'w') as f:
    f.write(content)
