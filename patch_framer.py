import re

with open('src/pages/Landing.tsx', 'r') as f:
    content = f.read()

# Add framer motion import
if 'import { motion }' not in content:
    content = content.replace('import { useState, useEffect } from "react";', 'import { useState, useEffect } from "react";\nimport { motion } from "framer-motion";')

# Wrap hero content in motion divs
hero_content_old = """
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
"""

hero_content_new = """
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
"""
content = content.replace(hero_content_old.strip(), hero_content_new.strip())

# Wrap section header
content = content.replace('<div className="max-w-2xl mb-16">', '<motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7 }} className="max-w-2xl mb-16">')
content = content.replace('            </p>\n          </div>\n\n          {/* Feature Grid */}', '            </p>\n          </motion.div>\n\n          {/* Feature Grid */}')

# Wrap feature cards
feature_card1_old = '<div className="group cursor-pointer rounded-2xl p-7 bg-[#14161a] border border-white/5 hover:border-white/20 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">'
feature_card1_new = '<motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: 0.1 }} className="group cursor-pointer rounded-2xl p-7 bg-[#14161a] border border-white/5 hover:border-white/20 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">'

feature_card2_old = '<div className="group cursor-pointer rounded-2xl p-7 bg-[#14161a] border border-white/5 hover:border-white/20 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">'
feature_card2_new = '<motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: 0.2 }} className="group cursor-pointer rounded-2xl p-7 bg-[#14161a] border border-white/5 hover:border-white/20 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">'

feature_card3_old = '<div className="group cursor-pointer rounded-2xl p-7 bg-[#14161a] border border-white/5 hover:border-white/20 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">'
feature_card3_new = '<motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: 0.3 }} className="group cursor-pointer rounded-2xl p-7 bg-[#14161a] border border-white/5 hover:border-white/20 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">'

# We need to replace them sequentially
content = content.replace(feature_card1_old, feature_card1_new, 1)
content = content.replace(feature_card2_old, feature_card2_new, 1)
content = content.replace(feature_card3_old, feature_card3_new, 1)

# Close motion divs for cards
content = content.replace('              </div>\n            </div>\n\n            <motion.div initial={{ opacity: 0, y: 50 }}', '              </div>\n            </motion.div>\n\n            <motion.div initial={{ opacity: 0, y: 50 }}')
content = content.replace('              </div>\n            </div>\n\n          </div>', '              </div>\n            </motion.div>\n\n          </div>')

with open('src/pages/Landing.tsx', 'w') as f:
    f.write(content)
