import re

with open('src/components/LiquidGlassSurface.tsx', 'r') as f:
    content = f.read()

# Try explicitly making the CSS handle the overflow instead of canvas crashing
content = content.replace('proposal={{ width: 800, height: 72 }}', 'proposal={{ width: window.innerWidth > 800 ? 800 : window.innerWidth - 32, height: 72 }}')
content = content.replace('<Frame width={800} height={72}>', '<Frame width={typeof window !== "undefined" && window.innerWidth > 800 ? 800 : typeof window !== "undefined" ? window.innerWidth - 32 : 800} height={72}>')

with open('src/components/LiquidGlassSurface.tsx', 'w') as f:
    f.write(content)
