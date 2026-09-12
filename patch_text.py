import re

with open('src/pages/Landing.tsx', 'r') as f:
    content = f.read()

# Make hero title slightly brighter text shadow
content = content.replace('text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.05] drop-shadow-2xl mb-6', 'text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.05] drop-shadow-[0_4px_24px_rgba(255,255,255,0.4)] mb-6')

# Lighten up the dark zinc grays on the feature cards to improve contrast
content = content.replace('text-zinc-500', 'text-zinc-400')
content = content.replace('text-zinc-600', 'text-zinc-500')

with open('src/pages/Landing.tsx', 'w') as f:
    f.write(content)
