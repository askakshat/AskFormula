import re
with open('src/pages/Build.tsx', 'r') as f:
    content = f.read()

# Replace sky-400, sky-500, sky-950 with emerald variants
content = content.replace('sky-400', 'emerald-400')
content = content.replace('sky-500', 'emerald-500')
content = content.replace('sky-950', 'emerald-950')
# Fix the RGB shadow values for emerald (approx 52, 211, 153 for emerald-400)
content = content.replace('56,189,248', '52,211,153')

with open('src/pages/Build.tsx', 'w') as f:
    f.write(content)
