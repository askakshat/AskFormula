import re

with open('src/pages/Landing.tsx', 'r') as f:
    content = f.read()

# Make sure the LiquidGlassSurface doesn't capture the entire screen's events if it fails
content = content.replace('<div className="fixed top-4 inset-x-0 z-50 flex justify-center pointer-events-none">', '<div className="fixed top-4 inset-x-0 z-50 flex justify-center pointer-events-none w-full max-w-4xl mx-auto">')

# Restore the old visual blur fallback just in case the canvas is off
content = content.replace('<nav className="px-6 lg:px-8 py-3 flex items-center justify-between gap-8 md:gap-16">', '<nav className="px-6 lg:px-8 py-3 flex items-center justify-between gap-8 md:gap-16 bg-[#0b0c0f]/70 backdrop-blur-md rounded-[30px] border border-white/10 w-full max-w-4xl mx-auto">')

with open('src/pages/Landing.tsx', 'w') as f:
    f.write(content)
