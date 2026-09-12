import re

with open('src/pages/Landing.tsx', 'r') as f:
    content = f.read()

# Brighten the main background
content = content.replace("filter: 'brightness(0.8) contrast(1.1)',", "filter: 'brightness(1.1) contrast(1.05) saturate(1.2)',")

# Add a soft magical glow behind the text
glow_html = """
        {/* Soft magical glow behind hero text */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none z-0"></div>
"""

content = content.replace('{/* Ambient Top Gradient Overlay */}', glow_html + '\n        {/* Ambient Top Gradient Overlay */}')

with open('src/pages/Landing.tsx', 'w') as f:
    f.write(content)
